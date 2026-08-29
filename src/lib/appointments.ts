import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { sql, ensureSchema } from "./db";

export type Appointment = {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  treatmentSlug: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  createdAt: string;
};

export type NewAppointmentInput = {
  date: string;
  time: string;
  treatmentSlug: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
};

// Clinic hours: Monday–Saturday 09:00–19:00, Sunday closed.
// Slots are 30 minutes apart.
const SLOT_MINUTES = 30;
const CLINIC_TIMEZONE = "Europe/Lisbon";

function dayHours(dateStr: string): { start: string; end: string }[] {
  const day = new Date(`${dateStr}T00:00:00`).getDay(); // 0=Sun..6=Sat
  if (day === 0) return [];
  return [{ start: "09:00", end: "19:00" }];
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function toHHMM(mins: number): string {
  const h = Math.floor(mins / 60)
    .toString()
    .padStart(2, "0");
  const m = (mins % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

// Current date/time in the clinic's timezone, independent of the server's
// own timezone (Vercel functions run in UTC).
function nowAtClinic(): { dateStr: string; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: CLINIC_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";
  const dateStr = `${get("year")}-${get("month")}-${get("day")}`;
  const minutes = Number(get("hour")) * 60 + Number(get("minute"));
  return { dateStr, minutes };
}

export function isDateInPast(dateStr: string): boolean {
  return dateStr < nowAtClinic().dateStr;
}

export function getAllSlotsForDate(dateStr: string): string[] {
  const { dateStr: todayStr, minutes: nowMinutes } = nowAtClinic();
  if (dateStr < todayStr) return [];

  const ranges = dayHours(dateStr);
  const slots: string[] = [];
  for (const range of ranges) {
    let cur = toMinutes(range.start);
    const end = toMinutes(range.end);
    while (cur < end) {
      if (dateStr > todayStr || cur > nowMinutes) slots.push(toHHMM(cur));
      cur += SLOT_MINUTES;
    }
  }
  return slots;
}

export class SlotUnavailableError extends Error {
  constructor() {
    super("O horário selecionado já não está disponível.");
    this.name = "SlotUnavailableError";
  }
}

// ---------------------------------------------------------------------------
// File-based backend — used for local development when no DATABASE_URL is
// configured. Not suitable for serverless production (ephemeral filesystem).
// ---------------------------------------------------------------------------

const DATA_FILE = path.join(process.cwd(), "data", "appointments.json");

async function ensureDataFile(): Promise<void> {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify({ appointments: [] }, null, 2));
  }
}

async function readAllFromFile(): Promise<Appointment[]> {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed.appointments) ? parsed.appointments : [];
  } catch {
    return [];
  }
}

async function writeAllToFile(appointments: Appointment[]): Promise<void> {
  await ensureDataFile();
  await fs.writeFile(DATA_FILE, JSON.stringify({ appointments }, null, 2));
}

async function getBookedTimesFromFile(dateStr: string): Promise<string[]> {
  const all = await readAllFromFile();
  return all.filter((a) => a.date === dateStr).map((a) => a.time);
}

async function createAppointmentInFile(
  appointment: Appointment
): Promise<void> {
  const all = await readAllFromFile();
  const alreadyBooked = all.some(
    (a) => a.date === appointment.date && a.time === appointment.time
  );
  if (alreadyBooked) throw new SlotUnavailableError();
  all.push(appointment);
  await writeAllToFile(all);
}

async function getAllAppointmentsFromFile(): Promise<Appointment[]> {
  return readAllFromFile();
}

// ---------------------------------------------------------------------------
// Postgres backend (Neon) — used automatically when DATABASE_URL is set,
// which is the case once a database is linked to the Vercel project.
// ---------------------------------------------------------------------------

type AppointmentRow = {
  id: string;
  date: string;
  time: string;
  treatment_slug: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  created_at: string | Date;
};

function rowToAppointment(row: AppointmentRow): Appointment {
  return {
    id: row.id,
    date: row.date,
    time: row.time,
    treatmentSlug: row.treatment_slug,
    name: row.name,
    email: row.email,
    phone: row.phone,
    notes: row.notes,
    createdAt:
      row.created_at instanceof Date
        ? row.created_at.toISOString()
        : String(row.created_at),
  };
}

async function getBookedTimesFromDb(dateStr: string): Promise<string[]> {
  await ensureSchema();
  const rows = (await sql!`
    SELECT time FROM appointments WHERE date = ${dateStr}
  `) as { time: string }[];
  return rows.map((r) => r.time);
}

async function createAppointmentInDb(appointment: Appointment): Promise<void> {
  await ensureSchema();
  try {
    await sql!`
      INSERT INTO appointments
        (id, date, time, treatment_slug, name, email, phone, notes, created_at)
      VALUES
        (${appointment.id}, ${appointment.date}, ${appointment.time},
         ${appointment.treatmentSlug}, ${appointment.name}, ${appointment.email},
         ${appointment.phone}, ${appointment.notes}, ${appointment.createdAt})
    `;
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "23505") throw new SlotUnavailableError();
    throw err;
  }
}

async function getAllAppointmentsFromDb(): Promise<Appointment[]> {
  await ensureSchema();
  const rows = (await sql!`
    SELECT id, date, time, treatment_slug, name, email, phone, notes, created_at
    FROM appointments
    ORDER BY date, time
  `) as AppointmentRow[];
  return rows.map(rowToAppointment);
}

// ---------------------------------------------------------------------------
// Public API — dispatches to the Postgres backend when configured, otherwise
// falls back to the local file backend.
// ---------------------------------------------------------------------------

const usingDb = sql !== null;

export async function getBookedTimesForDate(dateStr: string): Promise<string[]> {
  return usingDb ? getBookedTimesFromDb(dateStr) : getBookedTimesFromFile(dateStr);
}

export async function getAvailableSlotsForDate(dateStr: string): Promise<string[]> {
  const all = getAllSlotsForDate(dateStr);
  const booked = new Set(await getBookedTimesForDate(dateStr));
  return all.filter((s) => !booked.has(s));
}

export async function createAppointment(
  input: NewAppointmentInput
): Promise<Appointment> {
  const validSlots = new Set(getAllSlotsForDate(input.date));
  if (!validSlots.has(input.time)) throw new SlotUnavailableError();

  const appointment: Appointment = {
    id: randomUUID(),
    date: input.date,
    time: input.time,
    treatmentSlug: input.treatmentSlug,
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    notes: (input.notes ?? "").trim(),
    createdAt: new Date().toISOString(),
  };

  if (usingDb) {
    await createAppointmentInDb(appointment);
  } else {
    await createAppointmentInFile(appointment);
  }

  return appointment;
}

export async function getAllAppointments(): Promise<Appointment[]> {
  const all = usingDb ? await getAllAppointmentsFromDb() : await getAllAppointmentsFromFile();
  return all.sort((a, b) =>
    a.date === b.date ? a.time.localeCompare(b.time) : a.date.localeCompare(b.date)
  );
}

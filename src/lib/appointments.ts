import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

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

const DATA_FILE = path.join(process.cwd(), "data", "appointments.json");

// Clinic hours: Monday–Friday 09:00–13:00 and 14:00–19:00, Saturday 09:00–13:00.
// Sunday closed. Slots are 30 minutes apart.
const SLOT_MINUTES = 30;

function dayHours(dateStr: string): { start: string; end: string }[] {
  const day = new Date(`${dateStr}T00:00:00`).getDay(); // 0=Sun..6=Sat
  if (day === 0) return [];
  if (day === 6) return [{ start: "09:00", end: "13:00" }];
  return [
    { start: "09:00", end: "13:00" },
    { start: "14:00", end: "19:00" },
  ];
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

export function getAllSlotsForDate(dateStr: string): string[] {
  const ranges = dayHours(dateStr);
  const slots: string[] = [];
  for (const range of ranges) {
    let cur = toMinutes(range.start);
    const end = toMinutes(range.end);
    while (cur < end) {
      slots.push(toHHMM(cur));
      cur += SLOT_MINUTES;
    }
  }
  return slots;
}

async function ensureDataFile(): Promise<void> {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify({ appointments: [] }, null, 2));
  }
}

async function readAll(): Promise<Appointment[]> {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed.appointments) ? parsed.appointments : [];
  } catch {
    return [];
  }
}

async function writeAll(appointments: Appointment[]): Promise<void> {
  await ensureDataFile();
  await fs.writeFile(DATA_FILE, JSON.stringify({ appointments }, null, 2));
}

export async function getBookedTimesForDate(dateStr: string): Promise<string[]> {
  const all = await readAll();
  return all.filter((a) => a.date === dateStr).map((a) => a.time);
}

export async function getAvailableSlotsForDate(dateStr: string): Promise<string[]> {
  const all = getAllSlotsForDate(dateStr);
  const booked = new Set(await getBookedTimesForDate(dateStr));
  return all.filter((s) => !booked.has(s));
}

export class SlotUnavailableError extends Error {
  constructor() {
    super("O horário selecionado já não está disponível.");
    this.name = "SlotUnavailableError";
  }
}

export async function createAppointment(
  input: NewAppointmentInput
): Promise<Appointment> {
  const all = await readAll();
  const validSlots = new Set(getAllSlotsForDate(input.date));
  const alreadyBooked = all.some(
    (a) => a.date === input.date && a.time === input.time
  );
  if (!validSlots.has(input.time) || alreadyBooked) {
    throw new SlotUnavailableError();
  }

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

  all.push(appointment);
  await writeAll(all);
  return appointment;
}

export async function getAllAppointments(): Promise<Appointment[]> {
  const all = await readAll();
  return all.sort((a, b) =>
    a.date === b.date ? a.time.localeCompare(b.time) : a.date.localeCompare(b.date)
  );
}

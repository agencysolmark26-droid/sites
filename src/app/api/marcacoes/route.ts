import { NextRequest, NextResponse } from "next/server";
import {
  createAppointment,
  getAvailableSlotsForDate,
  isDateInPast,
  SlotUnavailableError,
} from "@/lib/appointments";
import { treatments } from "@/lib/treatments";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}$/;

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");
  if (!date || !DATE_RE.test(date)) {
    return NextResponse.json(
      { error: "Parâmetro 'date' inválido. Use o formato AAAA-MM-DD." },
      { status: 400 }
    );
  }

  const slots = await getAvailableSlotsForDate(date);
  return NextResponse.json({ date, slots });
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const date = typeof data.date === "string" ? data.date : "";
  const time = typeof data.time === "string" ? data.time : "";
  const treatmentSlug = typeof data.treatmentSlug === "string" ? data.treatmentSlug : "";
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const phone = typeof data.phone === "string" ? data.phone.trim() : "";
  const notes = typeof data.notes === "string" ? data.notes : "";

  const errors: Record<string, string> = {};

  if (!DATE_RE.test(date)) errors.date = "Data inválida.";
  if (!TIME_RE.test(time)) errors.time = "Hora inválida.";
  if (!treatments.some((t) => t.slug === treatmentSlug))
    errors.treatmentSlug = "Selecione um tratamento válido.";
  if (name.length < 2) errors.name = "Indique o seu nome completo.";
  if (!EMAIL_RE.test(email)) errors.email = "Indique um email válido.";
  if (phone.replace(/\D/g, "").length < 9) errors.phone = "Indique um contacto válido.";

  if (DATE_RE.test(date) && isDateInPast(date)) {
    errors.date = "A data tem de ser hoje ou no futuro.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Dados inválidos.", fields: errors }, { status: 400 });
  }

  try {
    const appointment = await createAppointment({
      date,
      time,
      treatmentSlug,
      name,
      email,
      phone,
      notes,
    });
    return NextResponse.json({ appointment }, { status: 201 });
  } catch (err) {
    if (err instanceof SlotUnavailableError) {
      return NextResponse.json({ error: err.message }, { status: 409 });
    }
    console.error(err);
    return NextResponse.json(
      { error: "Não foi possível concluir a marcação. Tente novamente." },
      { status: 500 }
    );
  }
}

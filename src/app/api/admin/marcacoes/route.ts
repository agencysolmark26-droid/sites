import { NextRequest, NextResponse } from "next/server";
import { getAllAppointments } from "@/lib/appointments";

const DEFAULT_SECRET = "biomagnetismo2026";

function getExpectedSecret(): string {
  return process.env.ADMIN_SECRET && process.env.ADMIN_SECRET.length > 0
    ? process.env.ADMIN_SECRET
    : DEFAULT_SECRET;
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const secret = typeof data.secret === "string" ? data.secret : "";

  if (secret !== getExpectedSecret()) {
    return NextResponse.json({ error: "Palavra-passe incorreta." }, { status: 401 });
  }

  const appointments = await getAllAppointments();
  return NextResponse.json({ appointments });
}

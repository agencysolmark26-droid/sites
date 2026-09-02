import type { Appointment } from "./appointments";
import { getTreatmentBySlug } from "./treatments";

const DEFAULT_NOTIFY_EMAIL = "consultorioalexabdrabio@gmail.com";
const FROM_EMAIL = "Consultório Alexandra Maia <marcacoes@consultorioalexandramaia.com>";

async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return; // notifications not configured — booking still succeeds

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: FROM_EMAIL, to: [to], subject, html }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(`Falha ao enviar email (Resend ${res.status}): ${body}`);
    }
  } catch (err) {
    // Never let an email failure break the booking itself.
    console.error("Falha ao enviar email:", err);
  }
}

// Notifies the clinic that a new booking was made.
export async function sendBookingNotification(appointment: Appointment): Promise<void> {
  const to = process.env.NOTIFY_EMAIL || DEFAULT_NOTIFY_EMAIL;
  const treatmentName = getTreatmentBySlug(appointment.treatmentSlug)?.name ?? appointment.treatmentSlug;

  await sendEmail(
    to,
    `Nova marcação: ${appointment.date} às ${appointment.time}`,
    `
      <h2>Nova marcação recebida</h2>
      <p><strong>Tratamento:</strong> ${treatmentName}</p>
      <p><strong>Data:</strong> ${appointment.date}</p>
      <p><strong>Hora:</strong> ${appointment.time}</p>
      <hr />
      <p><strong>Nome:</strong> ${appointment.name}</p>
      <p><strong>Email:</strong> ${appointment.email}</p>
      <p><strong>Telemóvel:</strong> ${appointment.phone}</p>
      <p><strong>Notas:</strong> ${appointment.notes || "—"}</p>
    `
  );
}

// Confirms the booking to the client who made it.
export async function sendBookingConfirmationToClient(appointment: Appointment): Promise<void> {
  const treatmentName = getTreatmentBySlug(appointment.treatmentSlug)?.name ?? appointment.treatmentSlug;

  await sendEmail(
    appointment.email,
    `Confirmação da sua marcação — ${appointment.date} às ${appointment.time}`,
    `
      <h2>A sua marcação está confirmada</h2>
      <p>Olá ${appointment.name},</p>
      <p>A sua consulta de <strong>${treatmentName}</strong> ficou marcada para o dia
      <strong>${appointment.date}</strong>, às <strong>${appointment.time}</strong>.</p>
      <p>Se precisar de alterar ou cancelar a marcação, contacte-nos:</p>
      <p>
        Rua Teresa de Jesus Pereira, Nº 9<br />
        917 874 725<br />
        consultorioalexabdrabio@gmail.com
      </p>
      <p>Até breve,<br />Consultório Alexandra Maia</p>
    `
  );
}

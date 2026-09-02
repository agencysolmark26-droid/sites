import type { Appointment } from "./appointments";
import { getTreatmentBySlug } from "./treatments";

const DEFAULT_NOTIFY_EMAIL = "consultorioalexabdrabio@gmail.com";

export async function sendBookingNotification(appointment: Appointment): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return; // notifications not configured — booking still succeeds

  const to = process.env.NOTIFY_EMAIL || DEFAULT_NOTIFY_EMAIL;
  const treatmentName = getTreatmentBySlug(appointment.treatmentSlug)?.name ?? appointment.treatmentSlug;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Consultório Alexandra Maia <onboarding@resend.dev>",
        to: [to],
        subject: `Nova marcação: ${appointment.date} às ${appointment.time}`,
        html: `
          <h2>Nova marcação recebida</h2>
          <p><strong>Tratamento:</strong> ${treatmentName}</p>
          <p><strong>Data:</strong> ${appointment.date}</p>
          <p><strong>Hora:</strong> ${appointment.time}</p>
          <hr />
          <p><strong>Nome:</strong> ${appointment.name}</p>
          <p><strong>Email:</strong> ${appointment.email}</p>
          <p><strong>Telemóvel:</strong> ${appointment.phone}</p>
          <p><strong>Notas:</strong> ${appointment.notes || "—"}</p>
        `,
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(`Falha ao enviar notificação (Resend ${res.status}): ${body}`);
    }
  } catch (err) {
    // Never let a notification failure break the booking itself.
    console.error("Falha ao enviar notificação de marcação:", err);
  }
}

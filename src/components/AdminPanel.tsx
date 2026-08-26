"use client";

import { useState } from "react";
import { treatments } from "@/lib/treatments";

type Appointment = {
  id: string;
  date: string;
  time: string;
  treatmentSlug: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  createdAt: string;
};

function treatmentName(slug: string): string {
  return treatments.find((t) => t.slug === slug)?.name ?? slug;
}

export default function AdminPanel() {
  const [secret, setSecret] = useState("");
  const [appointments, setAppointments] = useState<Appointment[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/marcacoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Não foi possível autenticar.");
        return;
      }
      setAppointments(data.appointments);
    } catch {
      setError("Erro de ligação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (!appointments) {
    return (
      <form onSubmit={handleLogin} className="max-w-sm space-y-4">
        <div>
          <label htmlFor="secret" className="block text-sm font-medium text-stone-700">
            Palavra-passe de acesso
          </label>
          <input
            id="secret"
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-2.5 focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-200"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-amber-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-amber-800 disabled:opacity-50"
        >
          {loading ? "A entrar…" : "Entrar"}
        </button>
      </form>
    );
  }

  return (
    <div>
      <p className="mb-4 text-sm text-stone-500">
        {appointments.length} marcação(ões) encontrada(s).
      </p>
      <div className="overflow-x-auto rounded-2xl border border-stone-200">
        <table className="min-w-full divide-y divide-stone-200 text-sm">
          <thead className="bg-stone-50 text-left text-stone-500">
            <tr>
              <th className="px-4 py-3 font-medium">Data</th>
              <th className="px-4 py-3 font-medium">Hora</th>
              <th className="px-4 py-3 font-medium">Tratamento</th>
              <th className="px-4 py-3 font-medium">Nome</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Telemóvel</th>
              <th className="px-4 py-3 font-medium">Notas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 bg-white">
            {appointments.map((a) => (
              <tr key={a.id}>
                <td className="px-4 py-3">{a.date}</td>
                <td className="px-4 py-3">{a.time}</td>
                <td className="px-4 py-3">{treatmentName(a.treatmentSlug)}</td>
                <td className="px-4 py-3">{a.name}</td>
                <td className="px-4 py-3">{a.email}</td>
                <td className="px-4 py-3">{a.phone}</td>
                <td className="px-4 py-3 max-w-[200px] truncate" title={a.notes}>
                  {a.notes || "—"}
                </td>
              </tr>
            ))}
            {appointments.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-stone-400">
                  Ainda não há marcações.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

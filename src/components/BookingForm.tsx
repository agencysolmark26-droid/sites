"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { treatments } from "@/lib/treatments";

function todayISO(): string {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function formatDatePT(dateStr: string): string {
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString("pt-PT", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

type FormErrors = Record<string, string>;

export default function BookingForm() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("tratamento") ?? "";

  const [treatmentSlug, setTreatmentSlug] = useState(
    treatments.some((t) => t.slug === preselected) ? preselected : treatments[0].slug
  );
  const [date, setDate] = useState(todayISO());
  const [time, setTime] = useState("");
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [slotsError, setSlotsError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{ date: string; time: string } | null>(null);
  const [submitError, setSubmitError] = useState("");

  const minDate = todayISO();

  useEffect(() => {
    let cancelled = false;

    fetch(`/api/marcacoes?date=${date}`)
      .then((res) => {
        if (!res.ok) throw new Error("Falha ao obter horários.");
        return res.json();
      })
      .then((data: { slots: string[] }) => {
        if (!cancelled) {
          setSlots(data.slots ?? []);
          setSlotsError("");
        }
      })
      .catch(() => {
        if (!cancelled) setSlotsError("Não foi possível carregar os horários disponíveis.");
      })
      .finally(() => {
        if (!cancelled) setLoadingSlots(false);
      });

    return () => {
      cancelled = true;
    };
  }, [date]);

  function handleDateChange(newDate: string) {
    setDate(newDate);
    setTime("");
    setLoadingSlots(true);
    setSlotsError("");
  }

  const selectedTreatment = useMemo(
    () => treatments.find((t) => t.slug === treatmentSlug),
    [treatmentSlug]
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");
    setErrors({});

    if (!time) {
      setErrors({ time: "Selecione um horário disponível." });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/marcacoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, time, treatmentSlug, name, email, phone, notes }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.fields) setErrors(data.fields);
        setSubmitError(data.error ?? "Não foi possível concluir a marcação.");
        if (res.status === 409) {
          setSlots((prev) => prev.filter((s) => s !== time));
          setTime("");
        }
        return;
      }

      setSuccess({ date, time });
    } catch {
      setSubmitError("Ocorreu um erro de ligação. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="mx-auto max-w-lg rounded-3xl border border-teal-200 bg-teal-50 p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-700 text-2xl text-white">
          ✓
        </div>
        <h2 className="mt-4 text-2xl font-bold text-stone-900">Marcação confirmada!</h2>
        <p className="mt-3 text-stone-600">
          A sua consulta de <span className="font-semibold">{selectedTreatment?.name}</span> ficou
          marcada para <span className="font-semibold">{formatDatePT(success.date)}</span>, às{" "}
          <span className="font-semibold">{success.time}</span>.
        </p>
        <p className="mt-2 text-sm text-stone-500">
          Enviámos os detalhes para o email indicado. Se precisar de alterar a
          marcação, contacte-nos através da página de Contactos.
        </p>
        <button
          type="button"
          onClick={() => {
            setSuccess(null);
            setName("");
            setEmail("");
            setPhone("");
            setNotes("");
            setTime("");
          }}
          className="mt-6 rounded-full bg-teal-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
        >
          Fazer outra marcação
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-8">
      {/* Treatment */}
      <div>
        <label className="block text-sm font-semibold text-stone-800">Tratamento</label>
        <select
          value={treatmentSlug}
          onChange={(e) => setTreatmentSlug(e.target.value)}
          className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-200"
        >
          {treatments.map((t) => (
            <option key={t.slug} value={t.slug}>
              {t.name} — {t.duration}
            </option>
          ))}
        </select>
        {selectedTreatment && (
          <p className="mt-2 text-sm text-stone-500">{selectedTreatment.summary}</p>
        )}
      </div>

      {/* Date */}
      <div>
        <label htmlFor="date" className="block text-sm font-semibold text-stone-800">
          Dia da consulta
        </label>
        <input
          id="date"
          type="date"
          min={minDate}
          value={date}
          onChange={(e) => handleDateChange(e.target.value)}
          className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-200"
        />
        <p className="mt-2 text-sm capitalize text-stone-500">{formatDatePT(date)}</p>
      </div>

      {/* Time slots */}
      <div>
        <span className="block text-sm font-semibold text-stone-800">Horário disponível</span>
        {loadingSlots && <p className="mt-2 text-sm text-stone-500">A carregar horários…</p>}
        {slotsError && <p className="mt-2 text-sm text-red-600">{slotsError}</p>}
        {!loadingSlots && !slotsError && slots.length === 0 && (
          <p className="mt-2 text-sm text-stone-500">
            Não há horários disponíveis neste dia. Escolha outra data.
          </p>
        )}
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {slots.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setTime(s)}
              className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                time === s
                  ? "border-teal-700 bg-teal-700 text-white"
                  : "border-stone-300 bg-white text-stone-700 hover:border-teal-500 hover:text-teal-700"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        {errors.time && <p className="mt-2 text-sm text-red-600">{errors.time}</p>}
      </div>

      {/* Personal info */}
      <div className="space-y-5 rounded-2xl border border-stone-200 bg-white p-6">
        <h3 className="font-semibold text-stone-900">As suas informações pessoais</h3>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-stone-700">
            Nome completo
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-stone-900 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-200"
            placeholder="O seu nome"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-stone-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-stone-900 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-200"
              placeholder="nome@email.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-stone-700">
              Telemóvel
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-stone-900 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-200"
              placeholder="912 345 678"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-stone-700">
            Notas (opcional)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-stone-900 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-200"
            placeholder="Alguma informação relevante para a sua consulta"
          />
        </div>
      </div>

      {submitError && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{submitError}</p>
      )}

      <button
        type="submit"
        disabled={submitting || slots.length === 0}
        className="w-full rounded-full bg-teal-700 px-7 py-3.5 text-base font-semibold text-white shadow-md transition-colors hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? "A confirmar…" : "Confirmar marcação"}
      </button>
    </form>
  );
}

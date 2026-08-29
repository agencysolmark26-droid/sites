import Link from "next/link";
import type { Metadata } from "next";
import { MagnetPairIcon, HandsIcon } from "@/components/illustrations";
import { treatments } from "@/lib/treatments";

export const metadata: Metadata = {
  title: "Tratamentos | Consultório Alexandra Maia",
  description:
    "Conheça os tratamentos do Consultório Alexandra Maia: Biomagnetismo Clínico e Acupressão.",
};

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  "biomagnetismo-clinico": MagnetPairIcon,
  acupressao: HandsIcon,
};

export default function TratamentosPage() {
  return (
    <div>
      <section className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6">
        <h1 className="text-4xl font-bold text-stone-900">Os Nossos Tratamentos</h1>
        <p className="mt-4 text-lg text-stone-600">
          Cada sessão é adaptada à pessoa e ao motivo da consulta. Abaixo
          encontra uma descrição detalhada de cada tratamento disponível para
          marcação.
        </p>
      </section>

      <section className="mx-auto max-w-5xl space-y-10 px-4 pb-20 sm:px-6">
        {treatments.map((t) => {
          const Icon = icons[t.slug] ?? MagnetPairIcon;
          return (
            <div
              key={t.slug}
              id={t.slug}
              className="scroll-mt-24 rounded-3xl border border-amber-900/10 bg-white p-8 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
                    <Icon className="h-8 w-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-stone-900">{t.name}</h2>
                    <span className="text-sm font-medium text-amber-700">
                      Duração aproximada: {t.duration}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/marcar?tratamento=${t.slug}`}
                  className="rounded-full bg-amber-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-800"
                >
                  Marcar este tratamento
                </Link>
              </div>

              <p className="mt-6 text-stone-600">{t.description}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {t.benefits.map((b) => (
                  <div key={b} className="flex items-start gap-2 text-sm text-stone-700">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
                    {b}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

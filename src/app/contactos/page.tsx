import Link from "next/link";
import type { Metadata } from "next";
import { CalendarIcon, LeafIcon, MagnetPairIcon } from "@/components/illustrations";

export const metadata: Metadata = {
  title: "Contactos | Clínica Equilíbrio Bio",
  description:
    "Contactos, morada e horário de funcionamento da Clínica Equilíbrio Bio.",
};

export default function ContactosPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-stone-900">Contactos</h1>
        <p className="mt-3 text-stone-600">
          Tem dúvidas antes de marcar? Contacte-nos por qualquer um dos meios
          abaixo — teremos todo o gosto em ajudar.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        <div className="rounded-2xl border border-amber-900/10 bg-white p-6 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-800">
            <MagnetPairIcon className="h-7 w-7" />
          </div>
          <h2 className="mt-4 font-semibold text-stone-900">Morada</h2>
          <p className="mt-2 text-sm text-stone-600">
            Rua Teresa de Jesus Pereira, Nº 9
          </p>
        </div>

        <div className="rounded-2xl border border-amber-900/10 bg-white p-6 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-800">
            <CalendarIcon className="h-7 w-7" />
          </div>
          <h2 className="mt-4 font-semibold text-stone-900">Horário</h2>
          <p className="mt-2 text-sm text-stone-600">
            Segunda a Sábado: 09h–19h
            <br />
            Domingo: encerrado
          </p>
        </div>

        <div className="rounded-2xl border border-amber-900/10 bg-white p-6 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-800">
            <LeafIcon className="h-7 w-7" />
          </div>
          <h2 className="mt-4 font-semibold text-stone-900">Contacto direto</h2>
          <p className="mt-2 text-sm text-stone-600">
            917 874 725
            <br />
            geral@equilibriobio.pt
          </p>
        </div>
      </div>

      <div className="mt-14 rounded-3xl bg-amber-700 px-8 py-12 text-center text-white">
        <h2 className="text-2xl font-bold">Pronto para marcar a sua sessão?</h2>
        <p className="mx-auto mt-2 max-w-md text-amber-100">
          Consulte os horários disponíveis e marque a sua consulta em poucos
          minutos.
        </p>
        <Link
          href="/marcar"
          className="mt-6 inline-block rounded-full bg-white px-7 py-3 text-base font-semibold text-amber-800 shadow-md transition-colors hover:bg-amber-50"
        >
          Marcar Consulta
        </Link>
      </div>
    </div>
  );
}

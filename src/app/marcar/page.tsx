import type { Metadata } from "next";
import { Suspense } from "react";
import BookingForm from "@/components/BookingForm";
import { CalendarIcon } from "@/components/illustrations";

export const metadata: Metadata = {
  title: "Marcar Consulta | Consultório Alexandra Maia",
  description:
    "Marque a sua consulta de biomagnetismo online: escolha o dia, a hora e preencha os seus dados pessoais.",
};

export default function MarcarPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-800">
          <CalendarIcon className="h-8 w-8" />
        </div>
        <h1 className="mt-4 text-4xl font-bold text-stone-900">Marcar Consulta</h1>
        <p className="mt-3 text-stone-600">
          Escolha o tratamento, o dia e o horário que prefere, e indique as
          suas informações pessoais para confirmarmos a sua sessão.
        </p>
      </div>

      <div className="mt-12">
        <Suspense fallback={<p className="text-center text-stone-500">A carregar…</p>}>
          <BookingForm />
        </Suspense>
      </div>
    </div>
  );
}

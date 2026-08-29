import type { Metadata } from "next";
import AdminPanel from "@/components/AdminPanel";

export const metadata: Metadata = {
  title: "Área da Clínica | Consultório Alexandra Maia",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold text-stone-900">Área da Clínica</h1>
      <p className="mt-2 text-stone-600">
        Consulte aqui as marcações efetuadas pelos clientes.
      </p>
      <div className="mt-10">
        <AdminPanel />
      </div>
    </div>
  );
}

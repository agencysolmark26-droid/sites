import Link from "next/link";
import { MagnetPairIcon } from "./illustrations";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-teal-900/10 bg-teal-950 text-teal-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 text-white">
            <MagnetPairIcon className="h-8 w-8" />
            <span className="text-lg font-semibold">Clínica Equilíbrio Bio</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-teal-200">
            Espaço dedicado ao biomagnetismo, focado no equilíbrio natural do
            corpo e do bem-estar emocional.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-teal-300">
            Navegação
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-teal-100">
            <li><Link href="/o-que-e-o-biomagnetismo" className="hover:text-white">O que é o Biomagnetismo</Link></li>
            <li><Link href="/tratamentos" className="hover:text-white">Tratamentos</Link></li>
            <li><Link href="/marcar" className="hover:text-white">Marcar Consulta</Link></li>
            <li><Link href="/contactos" className="hover:text-white">Contactos</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-teal-300">
            Contacto
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-teal-100">
            <li>Rua das Terapias Naturais, 123, Lisboa</li>
            <li>+351 912 345 678</li>
            <li>geral@equilibriobio.pt</li>
            <li>Seg–Sex 09h–13h / 14h–19h · Sáb 09h–13h</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-teal-300 sm:px-6">
        <p>
          O biomagnetismo é uma prática complementar e não substitui o
          acompanhamento médico convencional.
        </p>
        <p className="mt-1">
          © {new Date().getFullYear()} Clínica Equilíbrio Bio. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

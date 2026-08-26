import Link from "next/link";
import type { Metadata } from "next";
import { BodyEnergyIllustration, GalleryPanel } from "@/components/illustrations";

export const metadata: Metadata = {
  title: "O que é o Biomagnetismo | Clínica Equilíbrio Bio",
  description:
    "Entenda o que é o biomagnetismo, como funciona a técnica do Par Biomagnético e o que esperar de uma sessão.",
};

export default function OQueEBiomagnetismoPage() {
  return (
    <div>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold text-stone-900">O que é o Biomagnetismo</h1>
          <p className="mt-5 text-lg text-stone-600">
            O Biomagnetismo, também conhecido como Par Biomagnético, é uma
            terapia complementar desenvolvida a partir da observação de que
            muitos desequilíbrios no organismo estão associados a alterações
            no pH (equilíbrio ácido-base) de determinados tecidos.
          </p>
          <p className="mt-4 text-stone-600">
            A técnica consiste em colocar pares de ímanes de polaridade
            oposta — um positivo e um negativo — em pontos específicos do
            corpo, identificados através de uma escuta biomagnética
            cuidadosa. A ideia central é que, ao aproximar dois polos opostos
            de zonas com pH alterado, se favorece a criação de um ambiente
            mais equilibrado, no qual o próprio organismo pode regular-se de
            forma mais eficiente.
          </p>
        </div>
        <div className="mx-auto w-full max-w-sm">
          <BodyEnergyIllustration className="w-full" />
        </div>
      </section>

      <section className="bg-teal-50/60 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-stone-900">Como surgiu a técnica</h2>
          <p className="mt-4 text-stone-600">
            O conceito de Par Biomagnético foi desenvolvido a partir de
            décadas de observação clínica, cruzando conhecimentos de
            biomagnetismo médico com uma leitura sistémica do corpo humano.
            Hoje, é praticado por terapeutas em diversos países como
            abordagem complementar de bem-estar, sempre em articulação — e
            nunca em substituição — do acompanhamento médico convencional.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold text-stone-900">Como decorre uma sessão</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <ol className="space-y-5">
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-700 text-sm font-bold text-white">1</span>
              <p className="text-stone-600">
                <span className="font-semibold text-stone-900">Conversa inicial —</span>{" "}
                falamos sobre o seu historial de saúde, hábitos e queixas
                atuais, para compreender o seu ponto de partida.
              </p>
            </li>
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-700 text-sm font-bold text-white">2</span>
              <p className="text-stone-600">
                <span className="font-semibold text-stone-900">Escuta biomagnética —</span>{" "}
                deitado(a) na marquesa, com roupa vestida, identificamos os
                pontos de maior relevância para a sessão.
              </p>
            </li>
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-700 text-sm font-bold text-white">3</span>
              <p className="text-stone-600">
                <span className="font-semibold text-stone-900">Aplicação dos pares —</span>{" "}
                colocamos os ímanes nos pontos identificados, permanecendo em
                repouso durante alguns minutos em cada par.
              </p>
            </li>
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-700 text-sm font-bold text-white">4</span>
              <p className="text-stone-600">
                <span className="font-semibold text-stone-900">Encerramento —</span>{" "}
                terminamos com recomendações simples para os dias seguintes e,
                se aplicável, sugestão de acompanhamento.
              </p>
            </li>
          </ol>
          <GalleryPanel variant="hands" className="h-full min-h-[280px] w-full" />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h3 className="font-semibold text-amber-900">Nota importante</h3>
          <p className="mt-2 text-sm text-amber-900/80">
            O biomagnetismo é uma prática complementar de bem-estar e não
            substitui diagnósticos, tratamentos ou o acompanhamento de
            profissionais de saúde. Recomendamos sempre a articulação com o
            seu médico assistente.
          </p>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/marcar"
            className="rounded-full bg-teal-700 px-7 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-teal-800"
          >
            Marcar a minha consulta
          </Link>
        </div>
      </section>
    </div>
  );
}

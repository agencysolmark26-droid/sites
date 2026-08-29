import Link from "next/link";
import type { Metadata } from "next";
import { BodyEnergyIllustration, GalleryPanel } from "@/components/illustrations";

export const metadata: Metadata = {
  title: "As Nossas Técnicas | Consultório Alexandra Maia",
  description:
    "Entenda o que é o Biomagnetismo Clínico e a Acupressão, como funcionam estas técnicas e o que esperar de uma sessão.",
};

export default function OQueEBiomagnetismoPage() {
  return (
    <div>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2">
        <div>
          <p className="inline-block rounded-full bg-amber-100 px-4 py-1 text-sm font-medium text-amber-800">
            As nossas técnicas
          </p>
          <h1 className="mt-4 text-4xl font-bold text-stone-900">O que é o Biomagnetismo</h1>
          <p className="mt-5 text-lg text-stone-600">
            O Biomagnetismo, também conhecido como Biomagnetismo Clínico, é uma
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

      <section className="bg-amber-50/60 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-stone-900">Como surgiu a técnica</h2>
          <p className="mt-4 text-stone-600">
            O conceito de Biomagnetismo Clínico foi desenvolvido a partir de
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
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-700 text-sm font-bold text-white">1</span>
              <p className="text-stone-600">
                <span className="font-semibold text-stone-900">Conversa inicial —</span>{" "}
                falamos sobre o seu historial de saúde, hábitos e queixas
                atuais, para compreender o seu ponto de partida.
              </p>
            </li>
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-700 text-sm font-bold text-white">2</span>
              <p className="text-stone-600">
                <span className="font-semibold text-stone-900">Escuta biomagnética —</span>{" "}
                deitado(a) na marquesa, com roupa vestida, identificamos os
                pontos de maior relevância para a sessão.
              </p>
            </li>
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-700 text-sm font-bold text-white">3</span>
              <p className="text-stone-600">
                <span className="font-semibold text-stone-900">Aplicação dos pares —</span>{" "}
                colocamos os ímanes nos pontos identificados, permanecendo em
                repouso durante alguns minutos em cada par.
              </p>
            </li>
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-700 text-sm font-bold text-white">4</span>
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

      <section className="mx-auto max-w-4xl px-4 pb-4 sm:px-6">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h3 className="font-semibold text-amber-900">Nota importante</h3>
          <p className="mt-2 text-sm text-amber-900/80">
            O biomagnetismo é uma prática complementar de bem-estar e não
            substitui diagnósticos, tratamentos ou o acompanhamento de
            profissionais de saúde. Recomendamos sempre a articulação com o
            seu médico assistente.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <GalleryPanel variant="meridians" className="h-full min-h-[280px] w-full" />
        </div>
        <div className="order-1 md:order-2">
          <h2 className="text-3xl font-bold text-stone-900">O que é a Acupressão</h2>
          <p className="mt-4 text-stone-600">
            A Acupressão é uma técnica manual milenar, com origem na Medicina
            Tradicional Chinesa, que consiste em aplicar pressão firme e
            gradual com os dedos e as mãos sobre pontos específicos do corpo
            — os mesmos pontos trabalhados na acupuntura, mas sem recurso a
            agulhas.
          </p>
          <p className="mt-4 text-stone-600">
            Ao estimular estes pontos, distribuídos ao longo dos chamados
            meridianos energéticos do corpo, a Acupressão ajuda a aliviar
            tensões musculares, dores de cabeça e enxaquecas, melhora a
            circulação e promove um estado geral de relaxamento e
            equilíbrio — física e mentalmente.
          </p>
          <p className="mt-4 text-stone-600">
            É também particularmente eficaz na redução de níveis elevados de
            stress e ansiedade, ajudando o corpo e a mente a regressar a um
            estado de calma.
          </p>
        </div>
      </section>

      <section className="bg-amber-50/60 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-stone-900">Como decorre uma sessão de Acupressão</h2>
          <ol className="mt-8 space-y-5">
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-700 text-sm font-bold text-white">1</span>
              <p className="text-stone-600">
                <span className="font-semibold text-stone-900">Conversa inicial —</span>{" "}
                identificamos as suas principais queixas: tensão, dores de
                cabeça, stress, dificuldade em relaxar ou dormir bem.
              </p>
            </li>
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-700 text-sm font-bold text-white">2</span>
              <p className="text-stone-600">
                <span className="font-semibold text-stone-900">Identificação dos pontos —</span>{" "}
                localizamos os pontos de pressão mais relevantes para o seu
                caso específico.
              </p>
            </li>
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-700 text-sm font-bold text-white">3</span>
              <p className="text-stone-600">
                <span className="font-semibold text-stone-900">Aplicação da pressão —</span>{" "}
                com os dedos e polegares, aplicamos pressão firme e gradual em
                cada ponto, mantida durante alguns segundos, por vezes
                acompanhada de uma massagem suave.
              </p>
            </li>
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-700 text-sm font-bold text-white">4</span>
              <p className="text-stone-600">
                <span className="font-semibold text-stone-900">Relaxamento final —</span>{" "}
                terminamos com um momento de relaxamento geral e, se útil,
                sugestões simples de auto-massagem para o dia a dia.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 text-center">
        <Link
          href="/marcar"
          className="rounded-full bg-amber-700 px-7 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-amber-800"
        >
          Marcar a minha consulta
        </Link>
      </section>
    </div>
  );
}

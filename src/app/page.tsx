import Link from "next/link";
import {
  BodyEnergyIllustration,
  GalleryPanel,
  CalendarIcon,
  LeafIcon,
  HandsIcon,
} from "@/components/illustrations";
import { treatments } from "@/lib/treatments";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20">
        <div>
          <p className="inline-block rounded-full bg-amber-100 px-4 py-1 text-sm font-medium text-amber-800">
            Terapia complementar de equilíbrio biomagnético
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-tight text-stone-900 sm:text-5xl">
            Reencontre o equilíbrio natural do seu corpo
          </h1>
          <p className="mt-5 max-w-lg text-lg text-stone-600">
            Na Clínica Equilíbrio Bio ajudamo-lo a cuidar de si através do
            biomagnetismo, numa abordagem calma, personalizada e sem dor.
            Marque a sua consulta em poucos minutos, à hora que melhor lhe
            convier.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/marcar"
              className="rounded-full bg-amber-700 px-7 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-amber-800"
            >
              Marcar Consulta
            </Link>
            <Link
              href="/o-que-e-o-biomagnetismo"
              className="rounded-full border border-amber-700 px-7 py-3 text-base font-semibold text-amber-800 transition-colors hover:bg-amber-50"
            >
              O que é o biomagnetismo?
            </Link>
          </div>
        </div>
        <div className="mx-auto w-full max-w-sm">
          <BodyEnergyIllustration className="w-full" />
        </div>
      </section>

      {/* What is biomagnetismo — short */}
      <section className="bg-amber-50/60 py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2">
          <GalleryPanel variant="balance" className="h-72 w-full" />
          <div>
            <h2 className="text-3xl font-bold text-stone-900">
              O que é o Biomagnetismo?
            </h2>
            <p className="mt-4 text-stone-600">
              O Biomagnetismo é uma técnica complementar que utiliza pares de
              ímanes de polaridade oposta, colocados em pontos específicos do
              corpo, com o objetivo de ajudar a restaurar o pH natural dos
              tecidos e favorecer o equilíbrio do organismo. É uma sessão
              tranquila, não invasiva e realizada sempre com roupa vestida.
            </p>
            <p className="mt-4 text-stone-600">
              Cada pessoa é única — por isso, cada sessão começa com uma
              escuta atenta ao seu historial e às suas queixas antes de
              qualquer aplicação.
            </p>
            <Link
              href="/o-que-e-o-biomagnetismo"
              className="mt-5 inline-block font-semibold text-amber-800 underline underline-offset-4 hover:text-amber-900"
            >
              Saber mais sobre a técnica →
            </Link>
          </div>
        </div>
      </section>

      {/* Treatments preview */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-stone-900">Os Nossos Tratamentos</h2>
          <p className="mt-3 text-stone-600">
            Sessões adaptadas a diferentes necessidades — do primeiro contacto
            com o biomagnetismo ao acompanhamento contínuo.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {treatments.map((t) => (
            <div
              key={t.slug}
              className="rounded-2xl border border-amber-900/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-stone-900">{t.name}</h3>
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800">
                  {t.duration}
                </span>
              </div>
              <p className="mt-2 text-sm text-stone-600">{t.summary}</p>
              <Link
                href={`/tratamentos#${t.slug}`}
                className="mt-4 inline-block text-sm font-semibold text-amber-800 hover:text-amber-900"
              >
                Ver detalhes →
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/marcar"
            className="rounded-full bg-amber-700 px-7 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-amber-800"
          >
            Marcar a minha consulta
          </Link>
        </div>
      </section>

      {/* Gallery of illustrations */}
      <section className="bg-stone-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold text-stone-900">
            Um espaço de calma e cuidado
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <GalleryPanel variant="hands" className="h-48 w-full" />
            <GalleryPanel variant="meridians" className="h-48 w-full" />
            <GalleryPanel variant="calm" className="h-48 w-full" />
            <GalleryPanel variant="balance" className="h-48 w-full" />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-3xl font-bold text-stone-900">
          Como funciona a marcação
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-800">
              <CalendarIcon className="h-9 w-9" />
            </div>
            <h3 className="mt-4 font-semibold text-stone-900">1. Escolha o dia e a hora</h3>
            <p className="mt-2 text-sm text-stone-600">
              Consulte os horários disponíveis e selecione o que melhor se
              adapta à sua rotina.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-800">
              <HandsIcon className="h-9 w-9" />
            </div>
            <h3 className="mt-4 font-semibold text-stone-900">2. Preencha os seus dados</h3>
            <p className="mt-2 text-sm text-stone-600">
              Indique nome, contacto e o tratamento pretendido para
              prepararmos a sua sessão.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-800">
              <LeafIcon className="h-9 w-9" />
            </div>
            <h3 className="mt-4 font-semibold text-stone-900">3. Compareça na clínica</h3>
            <p className="mt-2 text-sm text-stone-600">
              Receberá a confirmação da marcação e só precisa de comparecer
              no dia combinado.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

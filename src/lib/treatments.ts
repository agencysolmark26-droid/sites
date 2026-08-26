export type Treatment = {
  slug: string;
  name: string;
  duration: string;
  summary: string;
  description: string;
  benefits: string[];
};

export const treatments: Treatment[] = [
  {
    slug: "biomagnetismo-par-biomagnetico",
    name: "Par Biomagnético",
    duration: "60 min",
    summary:
      "A técnica original de biomagnetismo: pares de ímanes colocados em pontos específicos do corpo para reequilibrar o pH e favorecer o ambiente natural de autorregulação do organismo.",
    description:
      "O Par Biomagnético consiste na aplicação de ímanes de polaridade oposta em pontos concretos do corpo, previamente identificados através de uma escuta biomagnética. O objetivo é reequilibrar zonas com alterações de pH, ajudando o corpo a recuperar o seu estado natural de equilíbrio. É uma sessão calma, sem dor, realizada com roupa vestida, deitado numa marquesa.",
    benefits: [
      "Sessão sem dor e não invasiva",
      "Avaliação personalizada em cada visita",
      "Indicado para adultos e crianças",
      "Compatível com outros acompanhamentos de saúde",
    ],
  },
  {
    slug: "biomagnetismo-emocional",
    name: "Biomagnetismo Emocional",
    duration: "50 min",
    summary:
      "Abordagem focada no impacto de emoções retidas e stress no equilíbrio geral, combinando escuta terapêutica com a aplicação de pares magnéticos.",
    description:
      "Esta sessão dá especial atenção à componente emocional: ansiedade, stress acumulado, memórias associadas a desconforto físico. Através de uma conversa inicial e da identificação de pontos de tensão, aplicam-se pares biomagnéticos direcionados a ajudar a libertar cargas emocionais que se refletem no corpo.",
    benefits: [
      "Espaço de escuta ativa e acolhimento",
      "Foco na relação corpo-emoção",
      "Ambiente tranquilo e confidencial",
      "Sessões de acompanhamento contínuo disponíveis",
    ],
  },
  {
    slug: "biomagnetismo-desportivo",
    name: "Biomagnetismo Desportivo",
    duration: "45 min",
    summary:
      "Sessões orientadas para quem pratica desporto, com foco em recuperação muscular, sobrecargas e prevenção de lesões.",
    description:
      "Pensada para atletas amadores e profissionais, esta sessão identifica zonas de sobrecarga muscular e articular associadas à prática desportiva, aplicando pares biomagnéticos que apoiam a recuperação e o retorno ao equilíbrio funcional do corpo.",
    benefits: [
      "Apoio à recuperação pós-esforço",
      "Atenção a zonas de sobrecarga recorrente",
      "Complementa fisioterapia e treino",
      "Sessões de manutenção periódicas",
    ],
  },
  {
    slug: "primeira-consulta",
    name: "Primeira Consulta",
    duration: "75 min",
    summary:
      "Uma avaliação completa e sem pressa para quem experimenta o biomagnetismo pela primeira vez, com explicação detalhada de todo o processo.",
    description:
      "Ideal para quem nunca fez biomagnetismo. Inclui uma conversa inicial sobre o historial de saúde, explicação do funcionamento da técnica, escuta biomagnética completa e a primeira sessão de aplicação de pares. No final, ficará com recomendações personalizadas para as sessões seguintes.",
    benefits: [
      "Explicação completa da técnica",
      "Avaliação inicial detalhada",
      "Sem compromisso de continuidade",
      "Plano de sessões recomendado à medida",
    ],
  },
];

export function getTreatmentBySlug(slug: string) {
  return treatments.find((t) => t.slug === slug);
}

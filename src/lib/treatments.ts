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
    slug: "biomagnetismo-clinico",
    name: "Biomagnetismo Clínico",
    duration: "60 min",
    summary:
      "A técnica original de biomagnetismo: pares de ímanes colocados em pontos específicos do corpo para reequilibrar o pH e favorecer o ambiente natural de autorregulação do organismo.",
    description:
      "O Biomagnetismo Clínico consiste na aplicação de ímanes de polaridade oposta em pontos concretos do corpo, previamente identificados através de uma escuta biomagnética. O objetivo é reequilibrar zonas com alterações de pH, ajudando o corpo a recuperar o seu estado natural de equilíbrio. É uma sessão calma, sem dor, realizada com roupa vestida, deitado numa marquesa.",
    benefits: [
      "Sessão sem dor e não invasiva",
      "Avaliação personalizada em cada visita",
      "Indicado para adultos e crianças",
      "Compatível com outros acompanhamentos de saúde",
    ],
  },
  {
    slug: "acupressao",
    name: "Acupressão",
    duration: "50 min",
    summary:
      "Técnica manual que aplica pressão em pontos específicos do corpo para aliviar tensões, promover o relaxamento e estimular o equilíbrio energético.",
    description:
      "A Acupressão utiliza a pressão dos dedos e das mãos sobre pontos específicos do corpo — os mesmos pontos trabalhados na acupuntura, mas sem agulhas. Ajuda a aliviar tensões musculares, dores de cabeça, ansiedade e cansaço, e é particularmente eficaz a reduzir níveis elevados de stress, promovendo um estado geral de relaxamento e bem-estar.",
    benefits: [
      "Técnica manual, sem agulhas",
      "Ajuda a aliviar tensão e dores de cabeça",
      "Ajuda a reduzir níveis elevados de stress",
      "Promove relaxamento profundo",
      "Pode ser combinada com o Biomagnetismo Clínico",
    ],
  },
];

export function getTreatmentBySlug(slug: string) {
  return treatments.find((t) => t.slug === slug);
}

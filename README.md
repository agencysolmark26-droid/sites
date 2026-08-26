# Clínica Equilíbrio Bio

Site para uma clínica de biomagnetismo, construído com [Next.js](https://nextjs.org) (App Router) e Tailwind CSS.

## Funcionalidades

- **Página inicial** com apresentação da clínica, explicação resumida do biomagnetismo, tratamentos em destaque e ilustrações originais em SVG.
- **O que é o Biomagnetismo** — página com texto explicativo sobre a técnica, como surgiu e como decorre uma sessão.
- **Tratamentos** — descrição detalhada de cada tratamento disponível.
- **Marcar Consulta** — formulário onde o cliente escolhe o tratamento, o dia e a hora (a partir dos horários realmente disponíveis) e preenche os seus dados pessoais (nome, email, telemóvel, notas).
- **Contactos** — morada, horário de funcionamento e contactos diretos.
- **Área da clínica** (`/admin`) — página protegida por palavra-passe onde a clínica pode consultar as marcações efetuadas.

## Marcações

As marcações são guardadas em `data/appointments.json` através das rotas de API em `src/app/api/marcacoes`. O horário de funcionamento (e os intervalos de 30 minutos entre consultas) está definido em `src/lib/appointments.ts`.

A área da clínica (`/admin`) usa a variável de ambiente `ADMIN_SECRET` como palavra-passe de acesso — ver `.env.example`. Se não for definida, usa uma palavra-passe por omissão (apenas para desenvolvimento).

## Desenvolvimento

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Build de produção

```bash
npm run build
npm run start
```

## Notas

- Todas as imagens do site são ilustrações originais em SVG (não são usadas fotografias externas).
- O biomagnetismo é apresentado como prática complementar, nunca como substituto de acompanhamento médico.

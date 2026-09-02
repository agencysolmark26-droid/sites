# Consultório Alexandra Maia

Site para uma clínica de biomagnetismo, construído com [Next.js](https://nextjs.org) (App Router) e Tailwind CSS.

## Funcionalidades

- **Página inicial** com apresentação da clínica, explicação resumida do biomagnetismo, tratamentos em destaque e ilustrações originais em SVG.
- **O que é o Biomagnetismo** — página com texto explicativo sobre a técnica, como surgiu e como decorre uma sessão.
- **Tratamentos** — descrição detalhada de cada tratamento disponível.
- **Marcar Consulta** — formulário onde o cliente escolhe o tratamento, o dia e a hora (a partir dos horários realmente disponíveis) e preenche os seus dados pessoais (nome, email, telemóvel, notas).
- **Contactos** — morada, horário de funcionamento e contactos diretos.
- **Área da clínica** (`/admin`) — página protegida por palavra-passe onde a clínica pode consultar as marcações efetuadas.

## Marcações

As marcações são guardadas através das rotas de API em `src/app/api/marcacoes`, geridas por `src/lib/appointments.ts`. O horário de funcionamento (e os intervalos de 30 minutos entre consultas) também está definido nesse ficheiro.

O armazenamento tem dois modos, escolhidos automaticamente:

- **Com `DATABASE_URL` definida** (produção, ex: Vercel) — as marcações são guardadas numa base de dados Postgres (Neon).
- **Sem `DATABASE_URL`** (desenvolvimento local) — as marcações são guardadas em `data/appointments.json`. Este modo não é adequado para produção em plataformas *serverless*, cujo sistema de ficheiros não é persistente.

A área da clínica (`/admin`) usa a variável de ambiente `ADMIN_SECRET` como palavra-passe de acesso — ver `.env.example`. Se não for definida, usa uma palavra-passe por omissão (apenas para desenvolvimento).

## Emails (confirmação ao cliente + aviso à clínica)

Sempre que é feita uma marcação, o site usa o [Resend](https://resend.com) para enviar dois emails: uma confirmação para o cliente (`src/lib/notify.ts` → `sendBookingConfirmationToClient`) e um aviso interno para a clínica (`sendBookingNotification`). Isto é opcional: sem a variável `RESEND_API_KEY` definida, as marcações continuam a funcionar normalmente, só não há emails.

O domínio `consultorioalexandramaia.com` está verificado no Resend (DNS configurado no Hostinger), pelo que os emails são enviados a partir de `marcacoes@consultorioalexandramaia.com` para qualquer destinatário, incluindo os clientes.

Para ativar/configurar:

1. Criar conta gratuita em [resend.com](https://resend.com) e verificar o domínio em **Domains**.
2. Em **API Keys**, criar uma nova chave e copiar o valor.
3. No Vercel, em **Settings → Environment Variables**, adicionar `RESEND_API_KEY` com esse valor.
4. (Opcional) Adicionar `NOTIFY_EMAIL` com o email para onde quer receber os avisos internos — se não definir, usa o email de contacto da clínica.
5. Fazer um novo deployment (ou "Redeploy") para as variáveis passarem a ter efeito.

## Publicar no Vercel

1. Criar conta em [vercel.com](https://vercel.com) (pode entrar diretamente com o GitHub).
2. **Add New… → Project**, escolher o repositório `agencysolmark26-droid/sites` e a branch pretendida.
3. Antes ou depois do primeiro deploy, ir a **Storage** → **Create Database** → escolher **Neon (Postgres)** e ligar ao projeto. Isto cria automaticamente a variável de ambiente `DATABASE_URL`.
4. Em **Settings → Environment Variables**, adicionar `ADMIN_SECRET` com a palavra-passe pretendida para a área da clínica, e opcionalmente `RESEND_API_KEY` / `NOTIFY_EMAIL` (ver secção acima).
5. Clicar em **Deploy**. O site fica disponível num link público (`*.vercel.app`), e volta a publicar-se automaticamente sempre que houver um novo push na branch ligada.

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

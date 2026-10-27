# IELTS.ai

AI-powered IELTS mock test platform. Phase 1 (MVP) is **frontend only**: every
feature runs on mock data, local state and mock handlers in `src/mocks/`.

## Stack

- Next.js 16 (App Router, Cache Components) + TypeScript (strict, no `any`)
- Tailwind CSS v4 + shadcn/ui (Base UI) + Lucide icons
- next-intl — `uz` (default) and `en`
- React Hook Form + Zod
- Recharts (dashboard)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 — it redirects to `/uz`.

## Structure

```
src/
├─ app/
│  ├─ [locale]/
│  │  ├─ layout.tsx          # html/body, fonts, NextIntlClientProvider, header/footer
│  │  ├─ page.tsx            # Landing
│  │  ├─ writing/            # (phase 1b) task picker, editor, result
│  │  ├─ reading/            # (phase 1c) mock test, result
│  │  └─ dashboard/          # (phase 1d) student dashboard
│  ├─ globals.css            # Tailwind + design tokens
│  └─ manifest.ts            # PWA manifest
├─ components/
│  ├─ ui/                    # shadcn/ui primitives (generated)
│  ├─ layout/                # site-header, mobile-nav, locale-switcher, site-footer
│  ├─ shared/                # logo, section-heading
│  ├─ landing/               # hero, how-it-works, pricing-teaser, waitlist, faq
│  ├─ writing/  reading/  dashboard/
├─ i18n/                     # routing, request config, typed navigation
├─ messages/                 # uz.json, en.json
├─ lib/validations/          # Zod schemas
├─ mocks/                    # mock API handlers + mock JSON data
├─ hooks/                    # shared client hooks
├─ types/ielts.ts            # all IELTS domain types
└─ proxy.ts                  # next-intl locale routing (Next 16 "proxy", formerly middleware)
```

## Content policy

All test content is original. Nothing is copied from official Cambridge/IELTS
materials. IELTS is a trademark of the British Council, IDP and Cambridge
University Press & Assessment; IELTS.ai is not affiliated with them.

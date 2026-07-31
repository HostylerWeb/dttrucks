# DT Trucks Website Rebuild Plan

**Project:** Remake dttrucks.com as a modern Next.js application with PostgreSQL  
**Based on:** `structure.md` content audit (July 30, 2026)  
**Target Stack:** Next.js 16.x (App Router), PostgreSQL, TypeScript, Tailwind CSS

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Technology Stack & Packages](#2-technology-stack--packages)
3. [Next.js 16.x — Why the Latest Version](#3-nextjs-16x--why-the-latest-version)
4. [Architecture Overview](#4-architecture-overview)
5. [Phase 0 – Project Setup & Foundation](#phase-0--project-setup--foundation)
6. [Phase 1 – Database Design & Backend Core](#phase-1--database-design--backend-core)
7. [Phase 2 – Authentication & Authorization](#phase-2--authentication--authorization)
8. [Phase 3 – Admin Dashboard (CMS)](#phase-3--admin-dashboard-cms)
9. [Phase 4 – Public Frontend – Layout & Global Components](#phase-4--public-frontend--layout--global-components)
10. [Phase 5 – Public Frontend – Core Pages](#phase-5--public-frontend--core-pages)
11. [Phase 6 – Blog, Careers & Dynamic Content](#phase-6--blog-careers--dynamic-content)
12. [Phase 7 – Forms, Integrations & Third-Party Services](#phase-7--forms-integrations--third-party-services)
13. [Phase 8 – SEO, Performance & Analytics](#phase-8--seo-performance--analytics)
14. [Phase 9 – Testing, Security & Deployment](#phase-9--testing-security--deployment)
15. [Phase 10 – Content Migration, Launch & Post-Launch](#phase-10--content-migration-launch--post-launch)
16. [Database Schema Reference](#database-schema-reference)
17. [API Routes Reference](#api-routes-reference)
18. [Folder Structure](#folder-structure)
19. [Timeline Estimate](#timeline-estimate)

---

## 1. Executive Summary

DT Trucks is an authorised Isuzu commercial vehicle dealership in Barking, Essex. The current WordPress site serves as a marketing brochure with contact forms, blog, eBay embed, and job listings. The rebuild will:

- Replace WordPress with a **Next.js 16.x App Router** application (latest stable — see Section 3)
- Store all content, enquiries, and admin data in **PostgreSQL**
- Provide a **custom admin dashboard** for non-technical staff to manage pages, blog, trucks, services, jobs, and enquiries
- Improve performance, SEO, mobile UX, and add modern features (service booking, structured data, analytics)
- Maintain all existing content and URL structure (with clean URL redirects from legacy paths)

**Build order:** Database → API/Backend → Auth → Admin Dashboard → Public Frontend → Integrations → Launch

---

## 2. Technology Stack & Packages

### Core Framework

| Package | Version | Purpose |
|---|---|---|
| `next` | ^16.x (latest) | React framework, App Router, Cache Components, Turbopack, Server Actions |
| `react` | ^19.2.x | UI library (React 19.2 bundled with Next.js 16) |
| `react-dom` | ^19.2.x | React DOM renderer |
| `typescript` | ^5.1+ | Type safety (Next.js 16 minimum: TypeScript 5.1.0) |

### Database & ORM

| Package | Purpose |
|---|---|
| `postgresql` (server) | Primary relational database |
| `@prisma/client` | ORM, type-safe database client, migrations |
| `prisma` | CLI for schema management and migrations |

**Alternative considered:** Drizzle ORM — Prisma chosen for mature ecosystem, Prisma Studio for admin debugging, and excellent TypeScript inference.

### Authentication

| Package | Purpose |
|---|---|
| `next-auth` (Auth.js v5) | Session management, credentials + optional OAuth |
| `@auth/prisma-adapter` | Persist sessions/users in PostgreSQL via Prisma |
| `bcryptjs` | Password hashing for admin users |
| `@types/bcryptjs` | TypeScript types |

### Validation & Forms

| Package | Purpose |
|---|---|
| `zod` | Schema validation for API inputs and forms |
| `react-hook-form` | Client-side form state management |
| `@hookform/resolvers` | Zod resolver for react-hook-form |

### UI & Styling

| Package | Purpose |
|---|---|
| `tailwindcss` | Utility-first CSS |
| `@tailwindcss/typography` | Prose styling for blog/legal content |
| `@tailwindcss/forms` | Form element styling |
| `class-variance-authority` | Component variant management |
| `clsx` + `tailwind-merge` | Conditional class merging |
| `lucide-react` | Icon library (replaces Font Awesome) |
| `@radix-ui/react-*` | Headless accessible UI primitives (dialog, dropdown, select, tabs, etc.) |

### Rich Text / CMS Content

| Package | Purpose |
|---|---|
| `@tiptap/react` + `@tiptap/starter-kit` | Rich text editor in admin for blog/pages |
| `@tiptap/extension-image` | Image insertion in editor |
| `@tiptap/extension-link` | Link insertion in editor |

**Alternative:** `@payloadcms` or `sanity` — custom Tiptap + Prisma chosen for full control and no extra service dependency.

### File Uploads & Media

| Package | Purpose |
|---|---|
| `@aws-sdk/client-s3` | S3-compatible storage (AWS S3, Cloudflare R2, MinIO) |
| `sharp` | Image optimisation and resizing on upload |

### Email

| Package | Purpose |
|---|---|
| `resend` | Transactional email (contact form, enquiry notifications) |
| `@react-email/components` | React-based email templates |

**Alternative:** Nodemailer + SMTP — Resend chosen for simplicity and deliverability.

### SEO & Metadata

| Package | Purpose |
|---|---|
| Built-in Next.js `metadata` API | Page-level SEO metadata |
| `next-sitemap` | Auto-generate sitemap.xml and robots.txt |

### Analytics

| Package | Purpose |
|---|---|
| `@next/third-parties` | Google Analytics 4 integration |

### Date & Utilities

| Package | Purpose |
|---|---|
| `date-fns` | Date formatting for blog posts, job listings |
| `slugify` | Generate URL slugs from titles |

### Development Tools

| Package | Purpose |
|---|---|
| `eslint` + `eslint-config-next` | Linting (run `eslint` CLI directly — `next lint` removed in Next.js 16) |
| `prettier` + `prettier-plugin-tailwindcss` | Code formatting |
| `dotenv` | Environment variable loading |
| `@types/node` | Node.js types |

### Testing (Phase 9)

| Package | Purpose |
|---|---|
| `vitest` | Unit/integration tests |
| `@testing-library/react` | Component tests |
| `playwright` | End-to-end browser tests |

### Deployment

| Tool | Purpose |
|---|---|
| Docker + Docker Compose | Local dev PostgreSQL + optional app container |
| Vercel or self-hosted Node | Next.js hosting |
| GitHub Actions | CI/CD pipeline |

**Node.js requirement:** Next.js 16 requires **Node.js 20.9+** (LTS). Node.js 18 is no longer supported. Use Node 22 LTS in production where possible.

---

## 3. Next.js 16.x — Why the Latest Version

> **Reference:** [Next.js 16 release blog](https://nextjs.org/blog/next-16) (October 2025). Minor releases 16.1–16.3 added filesystem caching, faster dev startup, Build Adapters API stability, and instant navigation improvements. As of project planning (July 2026), **always pin to the latest 16.x patch** (`next@latest`).

This project deliberately targets **Next.js 16.x** — not Next.js 15 — so we build on the current stable architecture from day one. Downgrading to older caching models or bundler defaults would mean rework within months.

### 3.1 Why Next.js 16 for DT Trucks

| Benefit | What it means for this project |
|---|---|
| **Turbopack (stable, default)** | 2–5× faster production builds and up to 10× faster Fast Refresh. Faster iteration across 20+ public pages, admin CMS, and truck catalogue. No webpack config unless we explicitly opt out. |
| **Cache Components + `"use cache"`** | Marketing pages (home, about, sales, services, blog) are **mostly static content edited in admin**. Explicit opt-in caching is clearer and safer than Next.js 15’s implicit `fetch` caching — we tag cached data and invalidate precisely when staff publish. |
| **`updateTag()` in Server Actions** | When Kimberley publishes a blog post or updates truck specs, admin sees changes **immediately** (read-your-writes). Public site updates without confusing stale admin previews. |
| **`revalidateTag()` + `cacheLife`** | Public visitors get **fast cached pages** with background stale-while-revalidate refresh — ideal for SEO landing pages that change occasionally. |
| **Partial Prerendering (PPR) via Cache Components** | Static page shells (header, footer, layout) load instantly; dynamic bits (e.g. enquiry counts on admin dashboard) stream in via Suspense. Better perceived performance than full SSR on every request. |
| **Enhanced routing & prefetching** | Truck catalogue has many internal links (categories → models). Layout deduplication and incremental prefetch make navigation between `/sales`, `/sales/[slug]`, and `/service` feel near-instant without building a SPA. |
| **React 19.2** | View Transitions for smoother page changes, `useEffectEvent` for cleaner client components (mobile menu, cookie banner), stable React Compiler option for admin tables/forms. |
| **`proxy.ts` (replaces `middleware.ts`)** | Clear network boundary for admin route protection; runs on Node.js runtime by default — aligns with Auth.js session checks. |
| **DevTools MCP** | AI-assisted debugging with route/caching context — useful during long CMS build phases. |
| **Build Adapters API (stable in 16.2+)** | Flexibility to deploy on Vercel, self-hosted Node, or adapters (AWS, Cloudflare) without losing Next.js 16 features. |

### 3.2 Next.js 16 vs Next.js 15 — Key Differences (Do Not Forget)

These are **architectural changes**, not cosmetic. Building as if we are on Next.js 15 will cause bugs or silent performance regressions.

#### Caching model (the biggest change)

| Next.js 15 | Next.js 16 |
|---|---|
| `fetch()` cached implicitly by default in Server Components | **Nothing cached by default** — all dynamic code runs at request time unless opted in |
| `export const revalidate = 3600` on pages for ISR | Prefer **`"use cache"`** on pages/components/data functions + `cacheLife()` + `cacheTag()` |
| `unstable_cache()` wrappers | Replace with async functions using **`'use cache'`** at top |
| `revalidatePath()` / single-arg `revalidateTag()` | **`updateTag(tag)`** in Server Actions for instant CMS freshness; **`revalidateTag(tag, 'max')`** for public SWR refresh |
| `experimental.ppr` flag | Removed → enable **`cacheComponents: true`** in `next.config.ts` |
| Implicit static generation surprises | **Explicit:** see `"use cache"` = cached; no directive = dynamic |

**Rule for DT Trucks:** Public content loaders (`getPageBySlug`, `getTruckModels`, `getBlogPosts`) → `'use cache'` + tags. Admin dashboard, enquiry API, auth → always dynamic (no cache directive). Admin publish actions → `updateTag('pages')`, `updateTag('trucks')`, etc.

#### Request APIs (breaking — runtime errors if ignored)

| API | Next.js 15 | Next.js 16 |
|---|---|---|
| `params` in pages/layouts | Sync access (deprecated warning) | **Must `await params`** |
| `searchParams` | Sync access | **Must `await searchParams`** |
| `cookies()` | Sync (deprecated) | **Must `await cookies()`** |
| `headers()` | Sync (deprecated) | **Must `await headers()`** |
| `draftMode()` | Sync | **Must `await draftMode()`** |

Every dynamic route (`/sales/[slug]`, `/blog/[slug]`, `/admin/pages/[id]`) must use async params:

```typescript
export default async function TruckPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  // ...
}
```

#### Network boundary

| Next.js 15 | Next.js 16 |
|---|---|
| `middleware.ts` on Edge | **`proxy.ts`** recommended (Node.js runtime); `middleware.ts` deprecated |
| Export `middleware` function | Export **`proxy`** function — same logic, clearer naming |

#### Bundler & tooling

| Next.js 15 | Next.js 16 |
|---|---|
| Webpack default (Turbopack opt-in) | **Turbopack default** — opt out with `--webpack` only if needed |
| `next lint` built-in | Removed — use **ESLint directly** (`eslint` CLI) |
| Node.js 18 supported | **Node.js 20.9+ required** |

#### Images (`next/image` defaults changed)

- `images.minimumCacheTTL` default: 60s → **4 hours** (good for truck photos — fewer re-optimisation calls)
- Default `qualities`: full range → **`[75]`** — set explicit `quality` or extend `images.qualities` in config if needed
- Local images with query strings require `images.localPatterns`

### 3.3 Required `next.config.ts` for This Project

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enable Cache Components (required for "use cache" to work)
  cacheComponents: true,

  // Optional: Turbopack filesystem cache for faster dev restarts (large admin CMS)
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'dttrucks.com' },
      { protocol: 'https', hostname: '*.amazonaws.com' },
      { protocol: 'https', hostname: '*.r2.cloudflarestorage.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' }, // YouTube thumbnails
    ],
    qualities: [75, 90], // if we need higher quality on hero images
  },

  // Legacy WordPress URL redirects (see Phase 5)
  async redirects() {
    return [
      { source: '/about-us', destination: '/about', permanent: true },
      // ... full list in Phase 5
    ]
  },
}

export default nextConfig
```

### 3.4 Caching Patterns for DT Trucks (Implementation Reference)

Use this table throughout Phases 1–8. **Do not mix Next.js 15 ISR patterns with Next.js 16 Cache Components.**

| Route / Data | Cache strategy | Invalidation on admin publish |
|---|---|---|
| Home, About, Legal pages | `'use cache'` on page + `cacheLife('hours')` + `cacheTag('pages', slug)` | `updateTag('pages')` or `updateTag(`page-${slug}`)` |
| Truck catalogue (`/sales`) | `'use cache'` on `getTruckCategories()` + tag `trucks` | `updateTag('trucks')` |
| Truck detail (`/sales/[slug]`) | `'use cache'` per model + tag `truck-${slug}` | `updateTag(`truck-${slug}`)` + `updateTag('trucks')` |
| Services (`/service`, `/service/[slug]`) | `'use cache'` + tag `services` | `updateTag('services')` |
| Blog index + posts | `'use cache'` + tags `blog`, `post-${slug}` | `updateTag('blog')` |
| Site settings (header/footer) | `'use cache'` + tag `settings` | `updateTag('settings')` |
| Admin dashboard (`/admin/*`) | **No cache** — always dynamic | N/A |
| Enquiry API (`POST /api/enquiries`) | **No cache** | N/A |
| Sitemap (`/sitemap.xml`) | `'use cache'` + tag `sitemap`, short `cacheLife` | `revalidateTag('sitemap', 'hours')` on any publish |

**Example — cached data function (public site):**

```typescript
// src/lib/db/pages.ts
import { cacheLife, cacheTag } from 'next/cache'

export async function getPageBySlug(slug: string) {
  'use cache'
  cacheTag('pages', `page-${slug}`)
  cacheLife('hours') // marketing pages change infrequently

  return prisma.pages.findFirst({
    where: { slug, status: 'published', deleted_at: null },
  })
}
```

**Example — admin Server Action (instant freshness):**

```typescript
// src/app/admin/pages/actions.ts
'use server'

import { updateTag } from 'next/cache'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function publishPage(id: string) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  const page = await prisma.pages.update({
    where: { id },
    data: { status: 'published', published_at: new Date() },
  })

  // Read-your-writes: admin and subsequent requests see fresh data immediately
  updateTag('pages')
  updateTag(`page-${page.slug}`)

  return page
}
```

**Example — public page component:**

```typescript
// src/app/about/page.tsx
export default async function AboutPage() {
  const page = await getPageBySlug('about')
  // page data is cached via getPageBySlug's "use cache"
  return <AboutContent page={page} />
}
```

### 3.5 What We Explicitly Do NOT Use (Legacy Next.js 15 Patterns)

- ❌ `export const revalidate = 3600` on pages (replace with `'use cache'` + `cacheLife`)
- ❌ `fetch(url, { next: { revalidate: 60 } })` for Prisma data (Prisma does not use `fetch` cache layer)
- ❌ `unstable_cache()` (deprecated — use `'use cache'`)
- ❌ `experimental.ppr` or `export const experimental_ppr`
- ❌ Sync `params`, `cookies()`, `headers()` in Server Components
- ❌ `middleware.ts` for admin auth (use `proxy.ts`)
- ❌ Single-argument `revalidateTag('blog')` without `cacheLife` profile (deprecated)
- ❌ Assuming static generation without adding `'use cache'`

### 3.6 Upgrade & Version Pinning

```bash
# New project (recommended)
npx create-next-app@latest

# Or explicit latest 16.x
npm install next@latest react@latest react-dom@latest

# Upgrade codemod (if migrating from 15)
npx @next/codemod@canary upgrade latest
```

**Pin in `package.json`:** `"next": "^16.3.0"` (or latest 16.x at install time). Run `npm update next` monthly for security patches.

---

## 4. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                         │
├──────────────────────────────┬──────────────────────────────────┤
│     Public Website           │       Admin Dashboard            │
│   (Next.js App Router)       │    (/admin/* routes)             │
│   - Cache Components (use cache) │    - Protected by Auth.js        │
│   - Static shells + cached content │    - CMS for all content         │
│   - Blog, contact forms      │    - Enquiry management          │
└──────────────┬───────────────┴──────────────┬───────────────────┘
               │                              │
               ▼                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              Next.js API Routes / Server Actions                │
│   /api/contact  /api/enquiries  /api/admin/*  Server Actions    │
└──────────────────────────────┬──────────────────────────────────┘
                               │
               ┌───────────────┼───────────────┐
               ▼               ▼               ▼
        ┌──────────┐   ┌──────────┐   ┌──────────────┐
        │PostgreSQL │   │ S3/R2    │   │  Resend      │
        │ (Prisma)  │   │ (Media)  │   │  (Email)     │
        └──────────┘   └──────────┘   └──────────────┘
```

### Rendering Strategy (Next.js 16 Cache Components)

| Page Type | Strategy | Invalidation on admin publish |
|---|---|---|
| Home, About, Services | `'use cache'` + `cacheLife('hours')` + `cacheTag` | `updateTag()` in Server Actions |
| Truck catalogue | `'use cache'` + tag `trucks` | `updateTag('trucks')` |
| Blog posts / index | `'use cache'` + tags `blog`, `post-${slug}` | `updateTag('blog')` |
| Contact, Legal pages | `'use cache'` + long `cacheLife` | `updateTag('pages')` |
| Admin dashboard | Dynamic (no `'use cache'`) | Always fresh |
| API routes (enquiries) | Dynamic | N/A |

**Note:** Next.js 16 does not use `export const revalidate` or implicit ISR. All public caching is explicit via Cache Components (see Section 3).

---

## Phase 0 – Project Setup & Foundation

**Goal:** Scaffold the project, configure tooling, establish dev environment.  
**Duration:** 1–2 days

### 0.1 Initialise Next.js 16 Project

```bash
# create-next-app@latest scaffolds Next.js 16 by default (October 2025+)
npx create-next-app@latest dttrucks --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd dttrucks

# Verify version — must be 16.x
npm list next
```

Configuration choices:
- App Router (`app/` directory) — default in Next.js 16
- `src/` directory for cleaner root
- TypeScript strict mode enabled
- Tailwind CSS (included in create-next-app template)
- **Node.js 20.9+** (verify: `node -v`)

### 0.1b Configure Next.js 16 (`next.config.ts`)

Enable Cache Components immediately — required for `'use cache'` (see Section 3.3):

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
}

export default nextConfig
```

### 0.2 Configure TypeScript Strict Mode

Update `tsconfig.json`:
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "paths": { "@/*": ["./src/*"] }
  }
}
```

### 0.3 Environment Variables

Create `.env.local` (never commit) and `.env.example` (commit):

```env
# Database
DATABASE_URL="postgresql://dttrucks:password@localhost:5432/dttrucks"

# Auth
AUTH_SECRET="generate-with-openssl-rand-base64-32"
AUTH_URL="http://localhost:3000"

# Email
RESEND_API_KEY=""
CONTACT_EMAIL="enquiries@dttrucks.com"

# Storage
S3_BUCKET=""
S3_REGION=""
S3_ACCESS_KEY_ID=""
S3_SECRET_ACCESS_KEY=""
S3_ENDPOINT=""  # for R2/MinIO

# Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"

# Site
NEXT_PUBLIC_SITE_URL="https://dttrucks.com"
NEXT_PUBLIC_SITE_NAME="DT Trucks"

# External (optional)
EBAY_STORE_URL=""
LIVE_CHAT_ID=""
```

### 0.4 Docker Compose for Local PostgreSQL

```yaml
# docker-compose.yml
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: dttrucks
      POSTGRES_PASSWORD: password
      POSTGRES_DB: dttrucks
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### 0.5 Install Core Dependencies

```bash
npm install @prisma/client next-auth@beta @auth/prisma-adapter bcryptjs zod react-hook-form @hookform/resolvers
npm install class-variance-authority clsx tailwind-merge lucide-react
npm install date-fns slugify sharp
npm install -D prisma @types/bcryptjs
```

### 0.6 Configure Tailwind

- Set up design tokens (colours matching DT Trucks branding — Isuzu red/blue, professional commercial vehicle aesthetic)
- Configure `@tailwindcss/typography` for blog/legal prose
- Configure `@tailwindcss/forms`
- Create `src/styles/globals.css` with CSS variables for theming

### 0.7 ESLint & Prettier

```bash
npm install -D prettier prettier-plugin-tailwindcss
```

Create `.prettierrc` and ensure ESLint extends `next/core-web-vitals`.

### 0.8 Git Repository

```bash
git init
git add .
git commit -m "Initial Next.js project scaffold"
```

Create `.gitignore` ensuring `.env.local`, `node_modules`, `.next` are excluded.

### 0.9 Deliverables Checklist

- [ ] Next.js **16.x** project running on `localhost:3000` (Turbopack dev server)
- [ ] `cacheComponents: true` in `next.config.ts`
- [ ] Node.js 20.9+ verified
- [ ] PostgreSQL running via Docker Compose
- [ ] Environment variables documented in `.env.example`
- [ ] Tailwind configured with base design tokens
- [ ] Git repository initialised

---

## Phase 1 – Database Design & Backend Core

**Goal:** Design and implement the full PostgreSQL schema, Prisma setup, seed data.  
**Duration:** 3–5 days

### 1.1 Initialise Prisma

```bash
npx prisma init
```

### 1.2 Database Schema Design

Design principles:
- Lowercase table and column names with underscores
- Plural table names (`users`, `blog_posts`, not `user`, `blog_post`)
- `created_at` and `updated_at` on all tables
- Soft deletes where content may need recovery (`deleted_at`)
- Enum values lowercase and consistent across DB and code

#### Core Tables

**users** – Admin users only (public site has no user accounts initially)

```prisma
model users {
  id            String   @id @default(cuid())
  email         String   @unique
  password_hash String
  name          String
  role          user_role @default(editor)
  is_active     Boolean  @default(true)
  created_at    DateTime @default(now())
  updated_at    DateTime @updatedAt
  last_login_at DateTime?

  blog_posts    blog_posts[]
  enquiries     enquiries[] @relation("assigned_to")
}

enum user_role {
  admin
  editor
  viewer
}
```

**pages** – CMS-managed static pages (About, Specialist Applications, etc.)

```prisma
model pages {
  id              String   @id @default(cuid())
  slug            String   @unique
  title           String
  subtitle        String?
  content         String   // HTML from Tiptap editor
  meta_title      String?
  meta_description String?
  status          content_status @default(draft)
  published_at    DateTime?
  created_at      DateTime @default(now())
  updated_at      DateTime @updatedAt
  deleted_at      DateTime?

  sections        page_sections[]
}

enum content_status {
  draft
  published
  archived
}
```

**page_sections** – Reusable sections within pages (hero, features grid, CTA blocks)

```prisma
model page_sections {
  id          String   @id @default(cuid())
  page_id     String
  page        pages    @relation(fields: [page_id], references: [id], onDelete: Cascade)
  section_type section_type
  title       String?
  content     String?  // JSON or HTML depending on section_type
  sort_order  Int      @default(0)
  is_visible  Boolean  @default(true)
  created_at  DateTime @default(now())
  updated_at  DateTime @updatedAt
}

enum section_type {
  hero
  text_block
  feature_grid
  image_gallery
  video_embed
  cta_banner
  team_members
  faq
  contact_info
}
```

**services** – Workshop services (Tachograph, AC, Brake Testing, etc.)

```prisma
model services {
  id              String   @id @default(cuid())
  slug            String   @unique
  title           String
  short_description String?
  content         String
  icon            String?  // lucide icon name
  image_url       String?
  meta_title      String?
  meta_description String?
  status          content_status @default(draft)
  sort_order      Int      @default(0)
  is_featured     Boolean  @default(false)
  published_at    DateTime?
  created_at      DateTime @default(now())
  updated_at      DateTime @updatedAt
  deleted_at      DateTime?

  faqs            service_faqs[]
}
```

**service_faqs** – FAQ items per service (e.g. tachograph page FAQs)

```prisma
model service_faqs {
  id         String   @id @default(cuid())
  service_id String
  service    services @relation(fields: [service_id], references: [id], onDelete: Cascade)
  question   String
  answer     String
  sort_order Int      @default(0)
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
}
```

**truck_categories** – GVW weight categories (3.5t, 7.5t, etc.)

```prisma
model truck_categories {
  id              String   @id @default(cuid())
  slug            String   @unique
  name            String   // "3.5 tonnes GVW"
  description     String?
  image_url       String?
  sort_order      Int      @default(0)
  created_at      DateTime @default(now())
  updated_at      DateTime @updatedAt

  truck_models    truck_models[]
}
```

**truck_models** – Individual truck models (N35.125 Grafter, N75.190, etc.)

```prisma
model truck_models {
  id              String   @id @default(cuid())
  category_id     String
  category        truck_categories @relation(fields: [category_id], references: [id])
  slug            String   @unique
  name            String   // "N35.125 Grafter"
  model_code      String?  // "N35.125"
  description     String
  specifications  String?  // JSON: engine, GVW, payload, etc.
  image_url       String?
  is_driveaway    Boolean  @default(false)
  driveaway_type  String?  // tipper, dropside, box, curtainsider, utilitruck
  status          content_status @default(draft)
  sort_order      Int      @default(0)
  published_at    DateTime?
  created_at      DateTime @default(now())
  updated_at      DateTime @updatedAt
  deleted_at      DateTime?

  images          truck_images[]
}
```

**truck_images** – Multiple images per truck model

```prisma
model truck_images {
  id         String   @id @default(cuid())
  truck_id   String
  truck      truck_models @relation(fields: [truck_id], references: [id], onDelete: Cascade)
  url        String
  alt_text   String?
  sort_order Int      @default(0)
  created_at DateTime @default(now())
}
```

**blog_posts**

```prisma
model blog_posts {
  id              String   @id @default(cuid())
  slug            String   @unique
  title           String
  excerpt         String?
  content         String
  featured_image  String?
  author_id       String?
  author          users?   @relation(fields: [author_id], references: [id])
  category_id     String?
  category        blog_categories? @relation(fields: [category_id], references: [id])
  status          content_status @default(draft)
  published_at    DateTime?
  meta_title      String?
  meta_description String?
  created_at      DateTime @default(now())
  updated_at      DateTime @updatedAt
  deleted_at      DateTime?
}

model blog_categories {
  id         String   @id @default(cuid())
  slug       String   @unique
  name       String
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt

  posts      blog_posts[]
}
```

**team_members** – Staff profiles for About page

```prisma
model team_members {
  id         String   @id @default(cuid())
  name       String
  role       String
  bio        String?
  photo_url  String?
  sort_order Int      @default(0)
  is_visible Boolean  @default(true)
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
}
```

**job_listings** – Careers/Jobs (replaces EasyJobs plugin)

```prisma
model job_listings {
  id              String   @id @default(cuid())
  title           String
  slug            String   @unique
  description     String
  requirements    String?
  location        String   @default("Barking, Essex")
  employment_type employment_type @default(full_time)
  status          content_status @default(draft)
  published_at    DateTime?
  expires_at      DateTime?
  created_at      DateTime @default(now())
  updated_at      DateTime @updatedAt
  deleted_at      DateTime?

  applications    job_applications[]
}

enum employment_type {
  full_time
  part_time
  contract
  apprenticeship
}
```

**job_applications**

```prisma
model job_applications {
  id         String   @id @default(cuid())
  job_id     String
  job        job_listings @relation(fields: [job_id], references: [id])
  name       String
  email      String
  phone      String?
  cover_letter String?
  resume_url String?  // uploaded to S3
  status     application_status @default(new)
  notes      String?
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
}

enum application_status {
  new
  reviewing
  shortlisted
  rejected
  hired
}
```

**enquiries** – All contact form submissions

```prisma
model enquiries {
  id          String   @id @default(cuid())
  type        enquiry_type
  name        String
  email       String
  phone       String?
  subject     String?
  message     String
  source_page String?  // which page form was submitted from
  status      enquiry_status @default(new)
  assigned_to_id String?
  assigned_to users?  @relation("assigned_to", fields: [assigned_to_id], references: [id])
  notes       String?
  metadata    String?  // JSON: truck model interest, service type, etc.
  created_at  DateTime @default(now())
  updated_at  DateTime @updatedAt
}

enum enquiry_type {
  general
  sales
  service
  parts
  tachograph
  specialist
  careers
}

enum enquiry_status {
  new
  in_progress
  resolved
  spam
}
```

**media** – Central media library

```prisma
model media {
  id         String   @id @default(cuid())
  filename   String
  url        String
  alt_text   String?
  mime_type  String
  size_bytes Int
  width      Int?
  height     Int?
  created_at DateTime @default(now())
}
```

**site_settings** – Global site configuration (key-value store)

```prisma
model site_settings {
  id         String   @id @default(cuid())
  key        String   @unique
  value      String   // JSON string for complex values
  updated_at DateTime @updatedAt
}
```

Settings keys to seed:
- `company_name`, `company_phone`, `company_email`, `company_address`
- `sales_phone`, `sales_email`, `sales_contact_name`
- `opening_hours` (JSON)
- `social_facebook`, `social_linkedin`, `social_instagram`
- `what3words`
- `google_maps_embed_url`
- `ebay_store_url`
- `internal_portal_url`
- `live_chat_enabled`

**videos** – YouTube embeds for homepage and pages

```prisma
model videos {
  id         String   @id @default(cuid())
  title      String
  youtube_id String
  page_slug  String?  // null = homepage
  sort_order Int      @default(0)
  is_visible Boolean  @default(true)
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
}
```

### 1.3 Run Initial Migration

```bash
npx prisma migrate dev --name init
```

### 1.4 Create Prisma Client Singleton

```typescript
// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### 1.5 Seed Script

Create `prisma/seed.ts` to populate:

1. **Default admin user** (email + hashed password from env)
2. **Site settings** (all contact info from structure.md)
3. **Pages** (About, Specialist Applications, Terms, Conditions of Sale, GDPR)
4. **Services** (all 8 service types from Barking page + Tachograph)
5. **Truck categories** (3.5t, 5.5/6.5t, 7.5t, 11/13.5t, Driveaway)
6. **Truck models** (all models from sales page)
7. **Team members** (5 people from About page)
8. **Blog categories** (Commercial Vehicle News, Uncategorized)
9. **Blog posts** (2 existing posts with full content)
10. **Videos** (5 YouTube embeds from homepage)
11. **Service FAQs** (tachograph page FAQs)

```bash
npx prisma db seed
```

### 1.6 Data Access Layer

Create repository/service files in `src/lib/db/`:

```
src/lib/db/
  pages.ts          # getPageBySlug, getAllPublishedPages
  services.ts       # getServices, getServiceBySlug
  trucks.ts         # getCategories, getModels, getModelBySlug
  blog.ts           # getPosts, getPostBySlug, getCategories
  team.ts           # getTeamMembers
  jobs.ts           # getJobListings, getJobBySlug
  enquiries.ts      # createEnquiry, getEnquiries (admin)
  settings.ts       # getSetting, getAllSettings
  media.ts          # uploadMedia, getMedia
```

Each file exports typed functions using Prisma client. Wrap read functions used on **public pages** with `'use cache'`, `cacheTag()`, and `cacheLife()` (see Section 3.4). Admin-only queries stay uncached.

### 1.7 Deliverables Checklist

- [ ] Full Prisma schema with all tables
- [ ] Migration applied to local PostgreSQL
- [ ] Seed script populates all content from structure.md
- [ ] Prisma client singleton
- [ ] Data access layer functions for all entities
- [ ] Prisma Studio accessible for data inspection

---

## Phase 2 – Authentication & Authorization

**Goal:** Secure admin area with role-based access.  
**Duration:** 2–3 days

### 2.1 Configure Auth.js (NextAuth v5)

```typescript
// src/lib/auth.ts
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/admin/login',
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Validate with Zod, find user, compare password
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role
      return token
    },
    async session({ session, token }) {
      session.user.role = token.role
      return session
    },
  },
})
```

### 2.2 API Route Handler

```typescript
// src/app/api/auth/[...nextauth]/route.ts
import { handlers } from '@/lib/auth'
export const { GET, POST } = handlers
```

### 2.3 Admin Route Protection (`proxy.ts`)

Next.js 16 replaces `middleware.ts` with **`proxy.ts`** for the application network boundary (Node.js runtime). Use this for admin auth redirects:

```typescript
// src/proxy.ts
import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  const session = await auth()
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isLoginPage = request.nextUrl.pathname === '/admin/login'

  if (isAdminRoute && !isLoginPage && !session) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  if (isLoginPage && session) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
```

> **Note:** `middleware.ts` still works on Edge but is deprecated in Next.js 16. Do not use it for this project.
```

### 2.4 Role-Based Permissions

```typescript
// src/lib/permissions.ts
type Permission = 'read' | 'write' | 'delete' | 'manage_users'

const rolePermissions: Record<string, Permission[]> = {
  admin: ['read', 'write', 'delete', 'manage_users'],
  editor: ['read', 'write'],
  viewer: ['read'],
}

export function hasPermission(role: string, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) ?? false
}
```

### 2.5 Admin Login Page

- Route: `/admin/login`
- Simple email/password form
- Error handling for invalid credentials
- Redirect to `/admin` dashboard on success

### 2.6 Deliverables Checklist

- [ ] Auth.js configured with credentials provider
- [ ] Admin routes protected by `proxy.ts`
- [ ] Role stored in JWT session
- [ ] Login page functional
- [ ] Logout functionality
- [ ] Permission helper for UI conditional rendering

---

## Phase 3 – Admin Dashboard (CMS)

**Goal:** Full content management system for staff to manage all site content without code.  
**Duration:** 10–15 days

### 3.1 Admin Layout

Route group: `src/app/admin/`

```
src/app/admin/
  layout.tsx          # Sidebar + header layout
  page.tsx            # Dashboard overview
  login/page.tsx      # Login page (outside protected layout)
  pages/
    page.tsx          # List all CMS pages
    [id]/page.tsx     # Edit page
    new/page.tsx      # Create page
  services/
    page.tsx
    [id]/page.tsx
    new/page.tsx
  trucks/
    page.tsx          # Categories + models tree view
    categories/[id]/page.tsx
    models/[id]/page.tsx
    models/new/page.tsx
  blog/
    page.tsx
    [id]/page.tsx
    new/page.tsx
    categories/page.tsx
  team/page.tsx
  jobs/
    page.tsx
    [id]/page.tsx
    new/page.tsx
    applications/page.tsx
  enquiries/
    page.tsx          # All contact form submissions
    [id]/page.tsx     # View/respond to enquiry
  media/page.tsx      # Media library
  videos/page.tsx
  settings/page.tsx   # Site settings editor
  users/page.tsx      # Admin user management (admin role only)
```

### 3.2 Admin UI Components

Build reusable admin components in `src/components/admin/`:

| Component | Purpose |
|---|---|
| `AdminSidebar` | Navigation with icons, active state |
| `AdminHeader` | User info, logout, breadcrumbs |
| `DataTable` | Sortable, filterable table for lists |
| `StatusBadge` | Draft/Published/Archived badges |
| `ConfirmDialog` | Delete confirmation |
| `RichTextEditor` | Tiptap wrapper for content editing |
| `ImageUploader` | Upload to S3 with preview |
| `ImagePicker` | Select from media library |
| `FormField` | Label + input + error display |
| `PageHeader` | Title + action buttons (Save, Publish, Delete) |
| `DashboardStats` | Enquiry count, recent activity |
| `EnquiryStatusSelect` | Status dropdown for enquiries |

### 3.3 Dashboard Overview (`/admin`)

Display:
- New enquiries count (with link)
- Recent enquiries list (last 10)
- Published pages count
- Blog posts count
- Active job listings count
- Quick actions: New blog post, View enquiries, Edit homepage

### 3.4 Pages Management

**List view:** Table with title, slug, status, last updated, actions (edit, delete)

**Edit view:**
- Title, slug (auto-generated, editable)
- Subtitle
- Rich text content editor (Tiptap)
- SEO fields: meta title, meta description
- Status: Draft / Published / Archived
- Page sections manager (add/remove/reorder sections)
- Preview button (opens public page in new tab)
- Publish button triggers `updateTag()` for instant cache refresh (Next.js 16)

**Section types in editor:**
- Hero (title, subtitle, background image, CTA button)
- Text block (rich text)
- Feature grid (icon, title, description per item)
- Image gallery (multiple images from media library)
- Video embed (YouTube ID)
- CTA banner (title, button text, button link)
- Team members (select from team_members table)
- FAQ (question/answer pairs)
- Contact info (auto-populated from site settings)

### 3.5 Services Management

- List all services with status and sort order
- Edit: title, slug, short description, full content, icon, image, FAQs
- Drag-to-reorder for sort_order
- Featured toggle for homepage display

### 3.6 Trucks Management

**Categories view:**
- Tree: Category → Models
- Edit category: name, description, image
- Add model under category

**Model edit:**
- Name, model code, description
- Specifications editor (key-value pairs: Engine, GVW, Payload, Transmission, etc.)
- Multiple images (upload or pick from media)
- Driveaway toggle + type selector
- Status and sort order

### 3.7 Blog Management

- Post list with filters (status, category, date)
- Rich text editor with featured image
- Category management (CRUD)
- Excerpt field (auto-generated from content or manual)
- Publish date scheduling
- Author assignment

### 3.8 Team Management

- Simple CRUD: name, role, bio, photo
- Drag-to-reorder
- Visibility toggle

### 3.9 Jobs Management

- Job listing CRUD
- Application viewer per job
- Application status workflow (new → reviewing → shortlisted → rejected/hired)
- Download resume from S3

### 3.10 Enquiries Management

**Critical for business operations.**

- Filterable table: type, status, date, source page
- Detail view: full message, contact info, metadata
- Status updates: new → in_progress → resolved / spam
- Assign to team member
- Internal notes field
- Email reply link (opens mailto or Resend compose)

### 3.11 Media Library

- Grid view of all uploaded images
- Upload multiple files
- Auto-optimise with Sharp (resize, WebP conversion)
- Alt text editing
- Delete with confirmation
- Used-in tracking (which pages/posts reference this image)

### 3.12 Site Settings

Form sections:
- **Company Info:** name, address, phone, email, What3Words
- **Sales Contact:** name, phone, email
- **Opening Hours:** Mon-Fri, Sat, Sun (time pickers)
- **Social Media:** Facebook, LinkedIn, Instagram URLs
- **Integrations:** eBay store URL, internal portal URL, live chat ID
- **SEO Defaults:** default meta title, description
- **Legal:** company registration number

### 3.13 User Management (Admin only)

- List admin users
- Create new user (email, name, role, password)
- Deactivate users
- Cannot delete self

### 3.14 Server Actions for Admin

All admin mutations use Next.js Server Actions (not API routes) for simplicity:

```typescript
// src/app/admin/pages/actions.ts
'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { updateTag } from 'next/cache'

export async function updatePage(id: string, data: UpdatePageInput) {
  const session = await auth()
  if (!session || !hasPermission(session.user.role, 'write')) {
    throw new Error('Unauthorized')
  }

  const page = await prisma.pages.update({ where: { id }, data })

  // Next.js 16: read-your-writes — admin and public site see fresh content immediately
  updateTag('pages')
  updateTag(`page-${page.slug}`)

  return page
}
```

### 3.15 Deliverables Checklist

- [ ] Admin layout with sidebar navigation
- [ ] Dashboard with stats and quick actions
- [ ] Full CRUD for pages, services, trucks, blog, team, jobs
- [ ] Enquiry management with status workflow
- [ ] Media library with upload and optimisation
- [ ] Site settings editor
- [ ] User management
- [ ] Rich text editor (Tiptap) working in all content fields
- [ ] All mutations trigger cache invalidation via `updateTag()` (Next.js 16)

---

## Phase 4 – Public Frontend – Layout & Global Components

**Goal:** Build the shared layout, navigation, footer, and reusable UI components.  
**Duration:** 5–7 days

### 4.1 Design System

Establish in `src/styles/globals.css` and Tailwind config:

**Colours (suggested — confirm with client/branding):**
```css
--color-primary: #C8102E;      /* Isuzu red */
--color-primary-dark: #9B0D24;
--color-secondary: #1A1A2E;    /* Dark navy */
--color-accent: #F5F5F5;       /* Light grey backgrounds */
--color-text: #1A1A2E;
--color-text-muted: #6B7280;
```

**Typography:**
- Headings: Inter or similar professional sans-serif (via `next/font`)
- Body: Same family, 16px base
- Use `next/font` for zero layout shift

### 4.2 Root Layout

```typescript
// src/app/layout.tsx
// - Font loading
// - Global metadata defaults
// - Analytics script
// - Cookie consent banner
// - Live chat script (conditional)
```

### 4.3 Header Component

`src/components/layout/Header.tsx`

Features:
- Logo (link to home)
- Primary navigation (from config, not DB — nav structure is stable)
- Mobile hamburger menu with slide-out drawer
- Phone CTA button (020 8595 4400)
- Operating hours bar (collapsible on mobile)
- Sticky on scroll with background transition

Navigation items:
```typescript
const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Isuzu Truck Sales', href: '/sales' },
  { label: 'Service & Parts', href: '/service' },
  { label: 'Specialist Applications', href: '/specialist-applications' },
  { label: 'eBay Listings', href: '/ebay' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]
```

### 4.4 Footer Component

`src/components/layout/Footer.tsx`

Sections:
- Company info (address, phone, email from site_settings)
- Quick links (main nav + legal links)
- Opening hours
- Social media icons (Facebook, LinkedIn, Instagram)
- Legal links: Terms & Conditions, Conditions of Sale, Privacy/GDPR
- Copyright: DT Trucks Limited, Reg. 9501804
- Internal Portal link (external, staff only)

### 4.5 Reusable Public Components

`src/components/ui/`:
- `Button` (primary, secondary, outline, ghost variants)
- `Input`, `Textarea`, `Select`, `Label`
- `Card` (with header, content, footer)
- `Badge` (status, category)
- `Dialog`, `Sheet` (mobile menu)
- `Accordion` (FAQs)
- `Tabs`

`src/components/public/`:
- `HeroSection` – full-width hero with image/video background
- `FeatureGrid` – icon + title + description grid
- `CTABanner` – call-to-action strip
- `ContactForm` – reusable enquiry form
- `TeamGrid` – team member cards
- `VideoEmbed` – YouTube responsive embed
- `ImageGallery` – lightbox gallery
- `Breadcrumbs` – page hierarchy
- `ShareButtons` – Facebook share
- `PhoneButton` – click-to-call
- `WhatsAppButton` – optional click-to-chat
- `MapEmbed` – Google Maps for contact page
- `TruckCard` – truck model display card
- `ServiceCard` – service listing card
- `BlogCard` – blog post preview card
- `FAQAccordion` – expandable FAQ list
- `CookieConsent` – GDPR cookie banner
- `ScrollToTop` – "Go to Top" button

### 4.6 Deliverables Checklist

- [ ] Design tokens and Tailwind config
- [ ] Root layout with fonts and metadata
- [ ] Header with responsive navigation
- [ ] Footer with all links and info
- [ ] All reusable UI and public components
- [ ] Cookie consent banner
- [ ] Mobile-responsive across all components

---

## Phase 5 – Public Frontend – Core Pages

**Goal:** Build all main public pages with content from database.  
**Duration:** 10–12 days

### 5.1 Home Page (`/`)

**Data sources:** page_sections (home), services (featured), videos, site_settings

**Sections to build:**
1. **Hero** – Welcome message, SALES | SERVICE & PARTS CTAs
2. **Intro** – Trusted Commercial Vehicle Partner paragraph
3. **Fleet Efficiency** – Uptime/minimise downtime section
4. **Expert Support** – On-the-spot query resolution
5. **Isuzu Dealer** – Number one dealer in London & Essex, 96% parts pick rate
6. **Three Pillars** – Parts | Sales | Workshop (feature cards)
7. **Specialist Support** – A&E, PTS section
8. **Air Conditioning** – AC services section
9. **O-Licence Inspections** – Compliance section with equipment list
10. **Contact CTA** – Phone numbers, George Smith contact, live chat prompt
11. **Video Gallery** – 5 YouTube embeds in grid

**Caching:** `'use cache'` on data loaders + `cacheLife('hours')` + `updateTag('pages')` on admin publish (see Section 3.4)

### 5.2 About Page (`/about`)

**Data sources:** pages (about), team_members, page_sections

**Sections:**
1. Hero with title
2. Company intro paragraph
3. "How we were founded" – timeline/history section (1995 → today)
4. Team grid – 5 team members with photos and bios
5. CTA to contact or sales

### 5.3 Truck Sales Page (`/sales`)

**Data sources:** truck_categories, truck_models, pages (sales intro), site_settings

**Layout:**
1. Sales intro with George Smith contact card (photo, phone, email)
2. "Why Choose" feature list (Expert Guidance, O Licence, Finance)
3. Truck categories as tabs or accordion:
   - Each category shows description + models grid
4. Driveaway section – separate grid with driveaway_type badges
5. Each truck model card links to detail page

**Truck Model Detail (`/sales/[slug]`):**
- Hero image gallery
- Model name, code, description
- Specifications table (from JSON)
- Enquiry CTA form (pre-filled enquiry_type: sales, metadata: truck model)
- Related models in same category

### 5.4 Service & Parts Page (`/service`)

**Data sources:** services, pages (service intro), site_settings

**Sections:**
1. Location header (Castle Works address)
2. "One-Stop Repair Shop" intro
3. Services grid – all services as cards linking to detail pages
4. Workshop stats (10 bays, 30 employees, 131 years experience)
5. Contact Barking form

**Service Detail (`/service/[slug]`):**
- Full service content
- FAQs accordion (if service_faqs exist)
- Enquiry CTA (pre-filled enquiry_type based on service)
- Related services

**Tachograph page** maps to `/service/tachograph-calibrations` (slug from services table)

### 5.5 Specialist Applications (`/specialist-applications`)

**Data sources:** pages, page_sections (image gallery)

- CMS-managed content
- Image gallery of specialist vehicles
- Enquiry CTA (enquiry_type: specialist)

### 5.6 eBay Listings (`/ebay`)

Options (decide with client):
- **Option A:** Embed eBay store widget (iframe from eBay store URL in settings)
- **Option B:** Manual listing management in admin (title, image, price, eBay URL) displayed as cards
- **Option C:** eBay API integration for live listings

Recommended: Option A for launch (minimal dev), Option B as enhancement.

### 5.7 Contact Page (`/contact`)

**Data sources:** site_settings

**Sections:**
1. "Your issue is ours!" intro
2. Contact information cards (phone, email, address, What3Words)
3. Contact form (enquiry_type: general, source_page: contact)
4. Google Maps embed
5. Opening hours display

### 5.8 Legal Pages

Routes:
- `/legal/terms` – Terms & Conditions (CMS page)
- `/legal/conditions-of-sale` – Conditions of Sale (CMS page)
- `/legal/privacy` – GDPR/Privacy Policy (CMS page)

All rendered from `pages` table with `prose` typography styling. No special components needed.

### 5.9 URL Redirects

Create `next.config.ts` redirects from legacy WordPress URLs:

```typescript
const redirects = [
  { source: '/about-us', destination: '/about', permanent: true },
  { source: '/about-us/', destination: '/about', permanent: true },
  { source: '/isuzu-truck-sales', destination: '/sales', permanent: true },
  { source: '/isuzu-truck-sales/', destination: '/sales', permanent: true },
  { source: '/barking-trucks-isuzu', destination: '/service', permanent: true },
  { source: '/barking-trucks-isuzu/', destination: '/service', permanent: true },
  { source: '/tachograph-calibrations', destination: '/service/tachograph-calibrations', permanent: true },
  { source: '/tachograph-calibrations/', destination: '/service/tachograph-calibrations', permanent: true },
  { source: '/ebay-listings', destination: '/ebay', permanent: true },
  { source: '/ebay-listings/', destination: '/ebay', permanent: true },
  { source: '/contact/', destination: '/contact', permanent: true },
  { source: '/gdpr', destination: '/legal/privacy', permanent: true },
  { source: '/gdpr/', destination: '/legal/privacy', permanent: true },
  { source: '/terms-conditions-dt-trucks-ltd', destination: '/legal/terms', permanent: true },
  { source: '/terms-conditions-dt-trucks-ltd/', destination: '/legal/terms', permanent: true },
  { source: '/conditions-of-sale', destination: '/legal/conditions-of-sale', permanent: true },
  { source: '/conditions-of-sale/', destination: '/legal/conditions-of-sale', permanent: true },
  { source: '/jobs', destination: '/careers', permanent: true },
  { source: '/jobs/', destination: '/careers', permanent: true },
  // Blog post redirects
  { source: '/isuzu-for-small-business', destination: '/blog/isuzu-for-small-business', permanent: true },
  { source: '/isuzu-for-small-business/', destination: '/blog/isuzu-for-small-business', permanent: true },
  { source: '/exclusive-discount-on-ac-regassing', destination: '/blog/exclusive-discount-on-ac-regassing', permanent: true },
  { source: '/exclusive-discount-on-ac-regassing/', destination: '/blog/exclusive-discount-on-ac-regassing', permanent: true },
]
```

### 5.10 Deliverables Checklist

- [ ] Home page with all sections
- [ ] About page with team
- [ ] Sales page with truck catalogue
- [ ] Truck model detail pages
- [ ] Service page with all services
- [ ] Service detail pages with FAQs
- [ ] Specialist Applications page
- [ ] eBay page
- [ ] Contact page with form and map
- [ ] Legal pages (terms, conditions, privacy)
- [ ] All legacy URL redirects configured
- [ ] All pages mobile-responsive
- [ ] All pages have correct metadata/SEO tags

---

## Phase 6 – Blog, Careers & Dynamic Content

**Goal:** Blog system and careers/jobs section.  
**Duration:** 4–5 days

### 6.1 Blog Index (`/blog`)

- Grid of blog post cards (featured image, title, excerpt, date, category)
- Category filter tabs
- Pagination (12 posts per page)
- SEO metadata

### 6.2 Blog Post Detail (`/blog/[slug]`)

- Featured image hero
- Title, author, date, category badge
- Rich content (prose styling)
- Share buttons (Facebook)
- Related posts (same category, max 3)
- CTA banner (contact or sales)

### 6.3 Careers Index (`/careers`)

- List of active job listings
- Each card: title, location, employment type, excerpt
- "No current openings" state when empty

### 6.4 Job Detail (`/careers/[slug]`)

- Full job description
- Requirements list
- Application form:
  - Name, email, phone (required)
  - Cover letter (textarea)
  - Resume upload (PDF/DOC, max 5MB, upload to S3)
- Submits to `job_applications` table
- Email notification to admin

### 6.5 Deliverables Checklist

- [ ] Blog index with pagination and category filter
- [ ] Blog post detail with related posts
- [ ] Careers index page
- [ ] Job detail with application form
- [ ] Resume upload to S3
- [ ] Application email notification

---

## Phase 7 – Forms, Integrations & Third-Party Services

**Goal:** Wire up all forms, emails, external services.  
**Duration:** 4–5 days

### 7.1 Contact/Enquiry Form API

```typescript
// src/app/api/enquiries/route.ts
// POST: create enquiry
// Validation with Zod
// Save to database
// Send email notification via Resend
// Return success/error
```

**Zod schema:**
```typescript
const enquirySchema = z.object({
  type: z.enum(['general', 'sales', 'service', 'parts', 'tachograph', 'specialist', 'careers']),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().max(200).optional(),
  message: z.string().min(10).max(5000),
  source_page: z.string().optional(),
  metadata: z.record(z.string()).optional(),
})
```

### 7.2 Email Templates

Create with `@react-email/components`:

| Template | Trigger | Recipient |
|---|---|---|
| `EnquiryNotification` | New contact form submission | enquiries@dttrucks.com |
| `EnquiryConfirmation` | New contact form submission | Customer email |
| `JobApplicationNotification` | New job application | enquiries@dttrucks.com |
| `JobApplicationConfirmation` | New job application | Applicant email |

### 7.3 Email Routing Logic

| enquiry_type | Primary recipient | CC |
|---|---|---|
| sales | George.Smith@dttrucks.com | enquiries@dttrucks.com |
| service, parts, tachograph | enquiries@dttrucks.com | — |
| specialist | enquiries@dttrucks.com | — |
| general | enquiries@dttrucks.com | — |
| careers | enquiries@dttrucks.com | — |

### 7.4 Google Analytics 4

```typescript
// src/app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'

// Only render if NEXT_PUBLIC_GA_ID is set
<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
```

Track custom events:
- `enquiry_submitted` (with type)
- `phone_click`
- `email_click`
- `job_application_submitted`

### 7.5 Live Chat Integration

Options:
- **Tawk.to** (free) – embed script from settings
- **Crisp** – embed script
- **Custom** – build later

Implementation: conditional script in root layout based on `site_settings.live_chat_enabled` and `live_chat_id`.

### 7.6 Google Maps Embed

Contact page: embed from `site_settings.google_maps_embed_url` or generate from address.

### 7.7 YouTube Embeds

`VideoEmbed` component:
```typescript
// Responsive 16:9 iframe
// Lazy load with loading="lazy"
// Privacy-enhanced mode (youtube-nocookie.com)
```

### 7.8 eBay Integration

For launch: simple iframe or link to eBay store URL from settings.
Future: eBay API for live inventory.

### 7.9 Spam Protection

- Honeypot field on all forms (hidden field, reject if filled)
- Rate limiting on enquiry API (max 5 submissions per IP per hour)
- Optional: Cloudflare Turnstile captcha (add if spam becomes issue)

### 7.10 Deliverables Checklist

- [ ] Enquiry form API with validation
- [ ] Email notifications (admin + customer confirmation)
- [ ] Job application form with file upload
- [ ] Google Analytics 4 tracking
- [ ] Live chat widget (if provider chosen)
- [ ] Google Maps on contact page
- [ ] YouTube embeds working
- [ ] Spam protection (honeypot + rate limiting)

---

## Phase 8 – SEO, Performance & Analytics

**Goal:** Optimise for search engines, page speed, and accessibility.  
**Duration:** 3–4 days

### 8.1 Metadata API

Every page exports metadata:

```typescript
// src/app/sales/page.tsx
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getAllSettings()
  return {
    title: 'Isuzu Truck Sales | DT Trucks Barking',
    description: 'Explore Isuzu trucks from 3.5t to 13.5t GVW...',
    openGraph: {
      title: '...',
      description: '...',
      images: ['/og-image.jpg'],
      url: 'https://dttrucks.com/sales',
      siteName: 'DT Trucks',
      locale: 'en_GB',
      type: 'website',
    },
    alternates: {
      canonical: 'https://dttrucks.com/sales',
    },
  }
}
```

### 8.2 Structured Data (JSON-LD)

Add to relevant pages:

**LocalBusiness** (all pages via layout):
```json
{
  "@type": "AutoRepair",
  "name": "DT Trucks Limited",
  "address": { ... },
  "telephone": "020 8595 4400",
  "openingHours": ["Mo-Fr 07:00-17:00", "Sa 07:00-12:00"],
  "geo": { ... },
  "sameAs": ["facebook", "linkedin", "instagram URLs"]
}
```

**Product** (truck model pages):
```json
{
  "@type": "Product",
  "name": "Isuzu N35.125 Grafter",
  "description": "...",
  "brand": { "@type": "Brand", "name": "Isuzu" },
  "offers": { "@type": "Offer", "availability": "InStock" }
}
```

**BlogPosting** (blog posts):
```json
{
  "@type": "BlogPosting",
  "headline": "...",
  "author": { ... },
  "datePublished": "...",
  "image": "..."
}
```

**FAQPage** (service pages with FAQs):
```json
{
  "@type": "FAQPage",
  "mainEntity": [ { "@type": "Question", ... } ]
}
```

### 8.3 Sitemap Generation

```typescript
// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://dttrucks.com',
  generateRobotsTxt: true,
  exclude: ['/admin/*', '/api/*'],
  additionalPaths: async () => {
    // Fetch all published pages, blog posts, trucks, services from DB
    // Return array of { loc, lastmod }
  },
}
```

Or dynamic sitemap:
```typescript
// src/app/sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getAllPublishedPages()
  const posts = await getAllPublishedPosts()
  const trucks = await getAllPublishedTrucks()
  const services = await getAllPublishedServices()
  // Map to sitemap entries
}
```

### 8.4 Performance Optimisation

- **Images:** Next.js `<Image>` component everywhere, WebP format, responsive sizes
- **Fonts:** `next/font` with `display: swap`
- **Code splitting:** Automatic via App Router
- **Cache Components:** Public pages use `'use cache'` — not `export const revalidate` or implicit ISR (Next.js 16)
- **Lazy loading:** YouTube embeds, maps, below-fold images
- **Bundle analysis:** `@next/bundle-analyzer` to check bundle size

Target metrics:
- Lighthouse Performance: 90+
- Lighthouse SEO: 95+
- Lighthouse Accessibility: 90+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s

### 8.5 Accessibility (WCAG 2.1 AA)

- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`)
- All images have alt text
- Form labels and error messages
- Keyboard navigation for all interactive elements
- Focus indicators
- Skip to content link
- ARIA labels on icon-only buttons
- Colour contrast ratios meet AA standards
- `prefers-reduced-motion` support

### 8.6 Deliverables Checklist

- [ ] Metadata on all pages
- [ ] Open Graph tags for social sharing
- [ ] JSON-LD structured data
- [ ] Dynamic sitemap.xml
- [ ] robots.txt
- [ ] Lighthouse scores meet targets
- [ ] Accessibility audit passed

---

## Phase 9 – Testing, Security & Deployment

**Goal:** Ensure quality, security, and production readiness.  
**Duration:** 5–7 days

### 9.1 Unit & Integration Tests

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

Test coverage priorities:
- Zod validation schemas (all form inputs)
- Data access layer functions
- Permission/authorization helpers
- Email template rendering
- Slug generation utility
- Server action authorization checks

### 9.2 End-to-End Tests (Playwright)

```bash
npm install -D @playwright/test
```

Critical user flows:
1. Home page loads, navigation works
2. Contact form submission (success + validation errors)
3. Truck sales page → model detail → enquiry form
4. Service page → service detail → enquiry form
5. Blog index → post detail
6. Careers → job detail → application form with file upload
7. Admin login → dashboard → edit page → publish
8. Admin enquiry management (view, update status)
9. Mobile navigation (hamburger menu)
10. Legacy URL redirects work

### 9.3 Security Checklist

| Area | Implementation |
|---|---|
| Authentication | Auth.js with secure session, bcrypt passwords |
| Authorization | Role checks on all admin server actions |
| Input validation | Zod on all API inputs and server actions |
| SQL injection | Prisma parameterized queries (automatic) |
| XSS | React auto-escaping + sanitize HTML from Tiptap |
| CSRF | Server Actions have built-in CSRF protection |
| Rate limiting | Enquiry API rate limited per IP |
| File uploads | Type validation (PDF/DOC only), size limit (5MB), S3 private bucket |
| Environment vars | Never exposed to client (no `NEXT_PUBLIC_` for secrets) |
| HTTPS | Enforced in production |
| Headers | `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` |
| Dependencies | `npm audit` regularly |

### 9.4 Production Environment

**Recommended hosting:** Vercel (Next.js native) + managed PostgreSQL

Options for PostgreSQL:
- **Supabase** (free tier, managed PostgreSQL)
- **Neon** (serverless PostgreSQL, free tier)
- **Railway** (simple managed PostgreSQL)
- **Self-hosted** (Docker on VPS)

For media storage:
- **Cloudflare R2** (S3-compatible, no egress fees)
- **AWS S3** (standard)

### 9.5 CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: test
        ports: ['5432:5432']
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'  # Next.js 16 requires Node 20.9+
      - run: npm ci
      - run: npx prisma migrate deploy
      - run: npm run lint
      - run: npm run test
      - run: npm run build
```

### 9.6 Deployment Steps

1. Set up production PostgreSQL database
2. Configure environment variables on hosting platform
3. Run `prisma migrate deploy` on production DB
4. Run seed script (or import migrated content)
5. Configure custom domain (dttrucks.com) with SSL
6. Set up S3/R2 bucket for media
7. Configure Resend domain for email sending
8. Deploy application
9. Verify all redirects from old URLs
10. Submit new sitemap to Google Search Console

### 9.7 Deliverables Checklist

- [ ] Unit tests for critical paths
- [ ] E2E tests for all user flows
- [ ] Security audit completed
- [ ] Production environment configured
- [ ] CI/CD pipeline running
- [ ] Application deployed and accessible
- [ ] SSL certificate active
- [ ] Email sending verified

---

## Phase 10 – Content Migration, Launch & Post-Launch

**Goal:** Migrate all content, launch, monitor, and iterate.  
**Duration:** 3–5 days

### 10.1 Content Migration

1. **Text content** – Already in seed script from structure.md
2. **Images** – Download from WordPress uploads, upload to S3:
   - Logo
   - Team photos (if available)
   - Truck category images
   - Truck model images (Driveaway range)
   - Specialist applications gallery
   - George Smith sales photo
   - Blog featured images
3. **Verify** all content renders correctly on new pages
4. **Client review** – Share staging URL for approval

### 10.2 Pre-Launch Checklist

- [ ] All pages render correctly (desktop + mobile)
- [ ] All forms submit and emails arrive
- [ ] All images load from S3/CDN
- [ ] All legacy URL redirects tested
- [ ] Google Analytics tracking verified
- [ ] Sitemap submitted to Google Search Console
- [ ] robots.txt correct
- [ ] Cookie consent working
- [ ] Live chat working (if configured)
- [ ] Admin dashboard accessible and functional
- [ ] SSL certificate active
- [ ] Performance benchmarks met
- [ ] Client sign-off received

### 10.3 Launch Day

1. Point DNS for dttrucks.com to new hosting
2. Monitor error logs for 24 hours
3. Verify Google Search Console shows new site
4. Test all forms from production
5. Keep WordPress site as backup (do not delete immediately)

### 10.4 Post-Launch (First 30 Days)

- Monitor Google Analytics for traffic patterns
- Check Google Search Console for indexing issues
- Review enquiry submissions in admin dashboard
- Fix any reported bugs
- Gather client feedback on admin dashboard usability
- Plan Phase 2 features (see below)

### 10.5 Future Enhancements (Phase 2)

| Feature | Priority | Effort |
|---|---|---|
| Online service booking | High | Medium |
| Parts enquiry with vehicle model selector | High | Medium |
| Fleet customer portal (login) | Medium | High |
| WhatsApp click-to-chat | Medium | Low |
| Google Reviews integration | Medium | Low |
| Case studies / testimonials section | Medium | Medium |
| Truck configurator | Low | High |
| Multi-language support | Low | High |
| eBay API live listings | Low | Medium |
| Newsletter signup | Low | Low |

### 10.6 Deliverables Checklist

- [ ] All content migrated and verified
- [ ] Staging reviewed and approved by client
- [ ] Production launch completed
- [ ] Monitoring in place
- [ ] Post-launch issues resolved
- [ ] WordPress backup retained

---

## Database Schema Reference

See Phase 1 for full Prisma schema. Summary of tables:

| Table | Records (estimated) | Purpose |
|---|---|---|
| users | 3–5 | Admin users |
| pages | 8–10 | CMS pages + legal |
| page_sections | 30–50 | Homepage/service sections |
| services | 8–10 | Workshop services |
| service_faqs | 5–10 | Tachograph FAQs |
| truck_categories | 5 | GVW categories |
| truck_models | 15–20 | Individual models |
| truck_images | 30–40 | Model photos |
| blog_posts | 2+ | Blog articles |
| blog_categories | 2 | Blog categories |
| team_members | 5 | Staff profiles |
| job_listings | 0–5 | Career openings |
| job_applications | — | Applications |
| enquiries | — | Contact form submissions |
| media | 50–100 | Media library |
| site_settings | 20–25 | Global config |
| videos | 5 | YouTube embeds |

---

## API Routes Reference

| Route | Method | Auth | Purpose |
|---|---|---|---|
| `/api/auth/[...nextauth]` | GET/POST | — | Auth.js handlers |
| `/api/enquiries` | POST | — | Submit contact form |
| `/api/job-applications` | POST | — | Submit job application |
| `/api/admin/upload` | POST | Admin | Upload media to S3 |

All other admin operations use **Server Actions** (not API routes).

---

## Folder Structure

```
dttrucks/
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
├── public/
│   ├── favicon.ico
│   ├── og-image.jpg
│   └── robots.txt (or generated)
├── next.config.ts              # cacheComponents: true, images, redirects
├── src/
│   ├── proxy.ts                # Next.js 16 admin route protection (replaces middleware.ts)
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # Home
│   │   ├── about/page.tsx
│   │   ├── sales/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── service/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── specialist-applications/page.tsx
│   │   ├── ebay/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── careers/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── legal/
│   │   │   ├── terms/page.tsx
│   │   │   ├── conditions-of-sale/page.tsx
│   │   │   └── privacy/page.tsx
│   │   ├── admin/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── login/page.tsx
│   │   │   ├── pages/
│   │   │   ├── services/
│   │   │   ├── trucks/
│   │   │   ├── blog/
│   │   │   ├── team/
│   │   │   ├── jobs/
│   │   │   ├── enquiries/
│   │   │   ├── media/
│   │   │   ├── videos/
│   │   │   ├── settings/
│   │   │   └── users/
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.ts
│   │   │   ├── enquiries/route.ts
│   │   │   ├── job-applications/route.ts
│   │   │   └── admin/upload/route.ts
│   │   ├── sitemap.ts
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── admin/          # Admin dashboard components
│   │   ├── layout/         # Header, Footer, Sidebar
│   │   ├── public/         # Public page sections
│   │   └── ui/             # Base UI primitives
│   ├── lib/
│   │   ├── auth.ts
│   │   ├── prisma.ts
│   │   ├── permissions.ts
│   │   ├── email.ts        # Resend client + send functions
│   │   ├── storage.ts      # S3 upload helpers
│   │   ├── utils.ts        # cn(), slugify, etc.
│   │   └── db/             # Data access layer
│   │       ├── pages.ts
│   │       ├── services.ts
│   │       ├── trucks.ts
│   │       ├── blog.ts
│   │       ├── team.ts
│   │       ├── jobs.ts
│   │       ├── enquiries.ts
│   │       ├── settings.ts
│   │       └── media.ts
│   ├── emails/             # React Email templates
│   │   ├── enquiry-notification.tsx
│   │   ├── enquiry-confirmation.tsx
│   │   └── job-application-notification.tsx
│   ├── types/
│   │   └── index.ts        # Shared TypeScript types
│   └── styles/
│       └── globals.css
├── tests/
│   ├── unit/
│   └── e2e/
├── docker-compose.yml
├── tailwind.config.ts
├── tsconfig.json
├── .env.example
├── .gitignore
├── structure.md
└── plan.md
```

---

## Timeline Estimate

| Phase | Duration | Dependencies |
|---|---|---|
| Phase 0: Setup | 1–2 days | — |
| Phase 1: Database | 3–5 days | Phase 0 |
| Phase 2: Auth | 2–3 days | Phase 1 |
| Phase 3: Admin Dashboard | 10–15 days | Phase 1, 2 |
| Phase 4: Layout & Components | 5–7 days | Phase 0 |
| Phase 5: Core Pages | 10–12 days | Phase 1, 4 |
| Phase 6: Blog & Careers | 4–5 days | Phase 1, 4 |
| Phase 7: Forms & Integrations | 4–5 days | Phase 1, 5 |
| Phase 8: SEO & Performance | 3–4 days | Phase 5, 6 |
| Phase 9: Testing & Deployment | 5–7 days | All above |
| Phase 10: Migration & Launch | 3–5 days | Phase 9 |

**Total estimated duration: 8–12 weeks** (single developer, full-time)

Phases 3 and 4 can run in parallel after Phase 1 is complete.
Phases 5 and 6 can start once Phase 4 components are ready.

### Parallel Work Strategy

```
Week 1-2:  Phase 0 + Phase 1 (Setup + Database)
Week 2-3:  Phase 2 (Auth) + Phase 4 (Layout/Components) [parallel]
Week 3-6:  Phase 3 (Admin Dashboard) + Phase 5 (Core Pages) [parallel]
Week 6-7:  Phase 6 (Blog/Careers) + Phase 7 (Integrations)
Week 7-8:  Phase 8 (SEO/Performance)
Week 8-9:  Phase 9 (Testing/Deployment)
Week 9-10: Phase 10 (Migration/Launch)
```

---

*End of plan.md*

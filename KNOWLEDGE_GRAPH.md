# 🧠 Vexcort — Full Project Knowledge Graph

> **Purpose:** This document is a complete AI-readable reference for the Vexcort website codebase.
> Any AI assistant working on this project MUST read this file first before making any changes.
> Last updated: October 2026

---

## 📋 Table of Contents

1. [Project Identity](#1-project-identity)
2. [Tech Stack](#2-tech-stack)
3. [Directory Structure](#3-directory-structure)
4. [Routes & Pages Map](#4-routes--pages-map)
5. [Component Inventory](#5-component-inventory)
6. [Design System](#6-design-system)
7. [Font System](#7-font-system)
8. [State & Data Flow](#8-state--data-flow)
9. [Third-Party Integrations](#9-third-party-integrations)
10. [Environment Variables](#10-environment-variables)
11. [Build & Development](#11-build--development)
12. [Deployment (Hostinger)](#12-deployment-hostinger)
13. [GitHub Repository](#13-github-repository)
14. [Where to Edit Specific Things](#14-where-to-edit-specific-things)
15. [Known Issues & Constraints](#15-known-issues--constraints)
16. [File Relationship Graph](#16-file-relationship-graph)

---

## 1. Project Identity

| Field | Value |
|---|---|
| **Brand Name** | Vexcort |
| **Tagline** | Premium Web, AI & Digital Agency |
| **Domain** | `https://vexcort.com` / `https://www.vexcort.com` |
| **Contact Email** | `connect@vexcort.com` |
| **Location** | Islamabad, Pakistan |
| **Project Folder** | `C:/Users/4G TRADERS/OneDrive/Desktop/Saif/Cortvex-main` |
| **Folder Name mismatch** | Folder is `Cortvex-main` but brand is **Vexcort** — do NOT rename the folder |

### Company Description
Vexcort is a digital agency based in Islamabad offering: Web Development, Web Design, AI Automation, Web Chatbots, Voice Bots, App Development, SEO, Marketing, and Social Media services.

### Team Members (for About page)
| Name | Role | Image | Location |
|---|---|---|---|
| Saif | Founder & CEO | `/saif.png` | Islamabad |
| Hassan | Co-Founder & AI Developer | `/hassan.jpeg` | Islamabad |
| Umer | AI/ML Developer | `/umer.jpeg` | Islamabad |
| Husnain | Web/App Developer | `/husnain.jpeg` | Islamabad |
| Fariz | Business Development | `/fariz.jpeg` | Lahore |
| Areeba | UI/UX & SEO Expert | `/areeba.jpeg` | Islamabad |

---

## 2. Tech Stack

| Layer | Technology | Version |
|---|---|---|
| **Framework** | Next.js (App Router) | `^16.3.5` |
| **Language** | TypeScript | latest |
| **Styling** | Tailwind CSS v4 | `^4.2.1` |
| **Animation** | Framer Motion | `^12.42.2` |
| **Animation** | GSAP | `^3.15.0` |
| **3D Graphics** | Three.js + @react-three/fiber | `^0.185.0` / `^9.6.1` |
| **3D Helpers** | @react-three/drei | `^10.7.7` |
| **UI Components** | shadcn/ui (Radix UI) | 46 components |
| **Icons** | Lucide React | `^0.575.0` |
| **Backend/DB** | Supabase | `^2.106.2` |
| **Forms** | react-hook-form + zod | `^7.71.2` / `^3.24.2` |
| **Charts** | Recharts | `^2.15.4` |
| **Node runtime** | Node.js (standard http module) | — |
| **Package manager** | npm | — |

### ⚠️ Important: Legacy Dependencies (NOT used in Next.js)
These are leftover from the original Vite/TanStack/Cloudflare build and are safe to ignore:
- `@tanstack/react-router`, `@tanstack/react-start`, `@tanstack/react-query`
- `@cloudflare/vite-plugin`, `vite-tsconfig-paths`
- `lib/error-capture.ts`, `lib/error-page.ts` (h3 server leftovers)

---

## 3. Directory Structure

```
Cortvex-main/                          ← project root
│
├── app/                               ← Next.js App Router pages & config
│   ├── globals.css                    ← Global styles, fonts, Tailwind directives
│   ├── layout.tsx                     ← Root layout: metadata, JSON-LD, font <link> tags
│   ├── page.tsx                       ← Homepage (/)
│   ├── not-found.tsx                  ← 404 page
│   ├── sitemap.ts                     ← /sitemap.xml generator
│   ├── robots.ts                      ← /robots.txt generator
│   ├── about/page.tsx                 ← /about
│   ├── contact/page.tsx               ← /contact
│   ├── faq/page.tsx                   ← /faq
│   ├── portfolio/page.tsx             ← /portfolio
│   └── services/page.tsx             ← /services
│
├── components/                        ← Shared React components
│   ├── Navbar.tsx                     ← Top navigation bar
│   ├── Footer.tsx                     ← Site footer
│   ├── SiteLayout.tsx                 ← Page wrapper (Navbar + main + Footer + splash)
│   ├── CTASection.tsx                 ← Call-to-action section (reused on multiple pages)
│   ├── Logo.tsx                       ← Vexcort logo image component
│   ├── NeuralSphere.tsx               ← 3D animated sphere (Three.js, SSR disabled)
│   ├── InteractiveParticles.tsx       ← Canvas particle animation background
│   └── ui/                            ← 46 shadcn/ui base components
│       └── [accordion.tsx ... tooltip.tsx]
│
├── lib/                               ← Utility modules
│   ├── utils.ts                       ← cn() class merging utility
│   ├── supabase.ts                    ← Supabase client
│   ├── error-capture.ts               ← LEGACY: unused (TanStack leftover)
│   └── error-page.ts                  ← LEGACY: unused (TanStack leftover)
│
├── hooks/                             ← Custom React hooks
│   └── use-mobile.tsx                 ← useIsMobile() hook (breakpoint: 768px)
│
├── public/                            ← Static assets (served at root /)
│   ├── fonts/                         ← Self-hosted font files
│   │   ├── SpaceGrotesk-latin.woff2
│   │   ├── SpaceGrotesk-latinext.woff2
│   │   ├── Orbitron.woff2
│   │   ├── mokoto.regular.ttf
│   │   ├── Wistania.ttf
│   │   └── Inter.woff2
│   ├── textlogo.png                   ← Vexcort logo (used in Navbar, OG image, favicon)
│   ├── home.mp4                       ← Hero background video
│   ├── splash_screen.mp4              ← Intro splash screen video
│   ├── homerobo.png                   ← Hero robot illustration
│   ├── particle_bg.png                ← Background texture
│   ├── text4hero.png / text4hero-cropped.png  ← Hero text assets
│   ├── saif.png, hassan.jpeg, umer.jpeg, husnain.jpeg, fariz.jpeg, areeba.jpeg ← Team photos
│   ├── sonulynx.png, soulimaging.png, sanctuary.png, sarah_mitchell.png  ← Portfolio screenshots
│   ├── austin.png, astra.png          ← Other portfolio/client images
│   ├── ai_auto_showcase.png, app_dev_showcase.png, growth_sys_showcase.png, web_dev_showcase.png ← Service showcase images
│   ├── voice-agent-logo.png           ← Voice bot portfolio logo
│   ├── robots.txt                     ← Static fallback robots.txt
│   └── submit.php                     ← Legacy PHP mailer (not used in Next.js)
│
├── next.config.mjs                    ← Next.js config (images whitelist, strict mode)
├── postcss.config.mjs                 ← Tailwind v4 PostCSS plugin
├── tsconfig.json                      ← TypeScript config (@/* path alias)
├── package.json                       ← npm scripts, dependencies
├── server.js                          ← Production HTTP server (for Hostinger)
├── .env                               ← Local env vars (⚠️ NOT in .gitignore — see §10)
├── .gitignore                         ← Git ignore rules
├── KNOWLEDGE_GRAPH.md                 ← THIS FILE
└── HOSTINGER_DEPLOYMENT.md            ← Hostinger deployment guide
```

---

## 4. Routes & Pages Map

| URL Route | File | Client? | Key Sections |
|---|---|---|---|
| `/` | `app/page.tsx` | ✅ | Hero (video bg + NeuralSphere), Services grid, Testimonials/Stats, CTA |
| `/about` | `app/about/page.tsx` | ✅ | Mission, Team cards (6 members), Company story, Stats counters, Animations |
| `/contact` | `app/contact/page.tsx` | ✅ | Contact form (react-hook-form + Supabase), Social links, Trust badges, FloatingParticles |
| `/faq` | `app/faq/page.tsx` | ✅ | Category tabs (7), Accordion Q&A (25+ items) |
| `/services` | `app/services/page.tsx` | ✅ | 9 service cards with framer-motion 3D tilt, CTASection |
| `/portfolio` | `app/portfolio/page.tsx` | ✅ | Filter categories, Project cards, Modal/lightbox, AnimatePresence, CTASection |
| `/sitemap.xml` | `app/sitemap.ts` | — | Auto-generated sitemap |
| `/robots.txt` | `app/robots.ts` | — | Auto-generated robots |
| `*` (404) | `app/not-found.tsx` | — | "Lost In Space" 404 page |

### All pages use `'use client'` — they are client-rendered. SEO metadata is set ONLY in `app/layout.tsx`.

---

## 5. Component Inventory

### `components/SiteLayout.tsx`
- **What it does:** Wraps every page with `<Navbar>` + `<main>` + `<Footer>`. Handles splash screen logic.
- **Splash screen:** On first visit (checks `sessionStorage["Vexcort_splash_shown"]`), plays `/splash_screen.mp4` fullscreen at 1.45× speed. Hides after 1500ms or video end. Not shown on subsequent navigations.
- **Import:** `import { SiteLayout } from '@/components/SiteLayout'`
- **Usage:** `<SiteLayout><YourContent /></SiteLayout>` — used in every `app/*/page.tsx`

### `components/Navbar.tsx`
- **What it does:** Fixed top nav bar. Shrinks on scroll. Mobile hamburger menu. Active link highlighting.
- **Links:** Home `/`, Services `/services`, Portfolio `/portfolio`, FAQ `/faq`, About `/about`
- **Active state logic:** Uses `usePathname()` + IntersectionObserver on `#home-services-section`
- **Scroll shrink:** At `scrollY > 24`, changes `max-w-6xl` → `max-w-4xl`
- **Mobile:** Sheet panel opens on hamburger; closes on route change
- **CTA:** "Contact Us" button (ArrowUpRight) → `/contact`
- **Import:** `import { Navbar } from '@/components/Navbar'`

### `components/Footer.tsx`
- **What it does:** Site footer with nav columns, social icons, contact info, giant VEXCORT wordmark
- **Nav columns:** Company (5 links), Services (5 links → `/services`), Resources (2 links → `/contact`)
- **Socials:** LinkedIn, Instagram, Facebook — icons from CDN (`cdn.simpleicons.org`)
- **Email:** `connect@vexcort.com`
- **Wordmark:** `text-[12vw]` "VEXCORT" with teal glow at bottom strip
- **Import:** `import { Footer } from '@/components/Footer'`

### `components/CTASection.tsx`
- **What it does:** Reusable CTA card used at bottom of Services and Portfolio pages
- **Content:** "Ready to ship something your customers love?", 2 buttons: Book Meeting (`/contact`), Explore Services (`/services`)
- **Import:** `import { CTASection } from '@/components/CTASection'`

### `components/Logo.tsx`
- **What it does:** Vexcort logo as a clickable `<Link href="/">` wrapping `/textlogo.png`
- **Props:** `className?: string`, `showText?: boolean` (default: true — shows "Vexcort" span)
- **Usage in Navbar:** `<Logo showText={false} />` (image only)
- **Import:** `import { Logo } from '@/components/Logo'`

### `components/NeuralSphere.tsx`
- **What it does:** 3D organic animated sphere using Three.js + @react-three/fiber with GLSL simplex noise shader
- **SSR:** DISABLED — must always use `dynamic(() => import('@/components/NeuralSphere'), { ssr: false })`
- **Uniforms:** `uTime` (float, animates over time), `uMouse` (vec2, tracks mouse position)
- **Used:** Only in `app/page.tsx` (homepage hero)

### `components/InteractiveParticles.tsx`
- **What it does:** Raw Three.js canvas-based interactive particle field (mouse repulsion, wave motion)
- **SSR:** Should also be dynamically imported if used on new pages
- **Uniforms:** `uTime`, `uMouse`, `uMouseStrength`, `uParallaxOffset`
- **Used:** Can be re-used as a background layer

### `components/ui/` — shadcn/ui Components (46 total)
All standard shadcn/ui components built on Radix UI + Tailwind. Import as:
```tsx
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
// etc.
```
Available: accordion, alert-dialog, alert, aspect-ratio, avatar, badge, breadcrumb, button, calendar, card, carousel, chart, checkbox, collapsible, command, context-menu, dialog, drawer, dropdown-menu, form, hover-card, input-otp, input, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner, switch, table, tabs, textarea, toggle-group, toggle, tooltip

---

## 6. Design System

### Brand Colors
| Token | Value | Usage |
|---|---|---|
| `#1800AD` | Deep Indigo / Blue-Violet | Primary brand, buttons, accents |
| `#0EA5A4` | Teal | Secondary brand, alt accents, glow |
| `#FAF9F6` | Off-white | Page background |
| `#FAFAFA` | Near-white | Splash screen background |

### CSS Custom Properties (defined in `app/globals.css`)
```css
--brand: #1800AD;            /* Primary brand color */
--brand-soft: ...;           /* Lighter brand tint */
--gradient-brand: ...;       /* Gradient for CTA cards */
--color-background: #FAF9F6;
--color-foreground: ...;
--color-card: ...;
--color-border: ...;
--color-surface: ...;
--radius-sm / -md / -lg / -xl / -2xl / -3xl   /* Border radius scale */
```

### Tailwind Theme (defined via `@theme inline` in `app/globals.css`)
```css
--font-sans: "Space Grotesk", "Inter", sans-serif;
--font-display: "Space Grotesk", "Inter", sans-serif;
--font-logo: "Mokoto", "Orbitron", "Space Grotesk", monospace;
```

### Utility Classes
- `.font-logo` — applies `font-family: "Mokoto", "Orbitron", "Space Grotesk", monospace !important`
- `.container-x` — horizontal padding container
- `.grid-bg` — decorative grid background overlay

### Service Card Colors (homepage + services page)
- Services alternate between `#1800AD` and `#0EA5A4` as accent colors
- Cards 1, 3, 5 → `#1800AD`; cards 2, 4, 6 → `#0EA5A4`

---

## 7. Font System

### Fonts Used
| Font | Use | Source | CSS Class/Var |
|---|---|---|---|
| **Mokoto** | Logo, hero headings, brand text | Self-hosted `/fonts/mokoto.regular.ttf` | `.font-logo`, `--font-logo` |
| **Space Grotesk** | Body text, UI, all default text | Self-hosted `/fonts/SpaceGrotesk-latin.woff2` | Default `body`, `--font-sans` |
| **Orbitron** | Fallback display font | Self-hosted `/fonts/Orbitron.woff2` | Part of `--font-logo` fallback |
| **Wistania** | Decorative script | Self-hosted `/fonts/Wistania.ttf` | Used sparingly |
| **Inter** | Fallback body | Self-hosted `/fonts/Inter.woff2` | Fallback for Space Grotesk |
| **Mrs Saint Delafield** | Script accents | Google Fonts only | Via `<link>` in layout.tsx |
| **Herr Von Muellerhoff** | Script accents | Google Fonts only | Via `<link>` in layout.tsx |

### How Fonts Are Loaded (critical — do NOT change this)
1. **`app/layout.tsx`**: Individual `<link>` tags per Google Font (separate tags — NOT combined with `&` — because React escapes `&` as `&amp;` which breaks Google Fonts).
2. **`app/globals.css`**: `@font-face` declarations for all self-hosted fonts, loading from `/fonts/*.woff2` and `/fonts/*.ttf`.
3. **`app/globals.css`**: `@theme inline` block defines CSS variables `--font-sans` and `--font-logo`.
4. **`app/globals.css`**: `@layer base` has explicit `body { font-family: "Space Grotesk", ... }` to bypass CSS variable resolution issues.
5. **`app/globals.css`**: `.font-logo` class in `@layer components` with `!important`.

### ⚠️ Font Rules
- **NEVER** combine multiple Google Font families in a single `<link>` tag using `&family=`. React will HTML-escape the `&` → `&amp;` and only the FIRST font will load.
- Always add separate `<link>` tags — one per font family.
- The `.font-logo` class uses `!important` — it will override any Tailwind utility classes on the same element.
- To change the logo font, edit BOTH `--font-logo` in `@theme inline` AND the `.font-logo` rule in `@layer components` in `app/globals.css`.

---

## 8. State & Data Flow

### Per-Page State
- All pages are `'use client'` — they manage their own local state with `useState`, `useEffect`, `useRef`
- No global state manager (no Redux, Zustand, etc.)
- No server-side data fetching — all data is hardcoded in the page files

### Contact Form (app/contact/page.tsx)
- Built with `react-hook-form` + `zod` validation
- On submit: sends data to Supabase via `lib/supabase.ts`
- Fields include: service type, budget range, name, email, message
- `serviceOptions` and `budgetOptions` arrays defined at top of file

### Splash Screen State
- Managed in `components/SiteLayout.tsx`
- Key: `sessionStorage["Vexcort_splash_shown"]`
- Effect: shown once per browser tab session

### Navbar Active State
- `usePathname()` from `next/navigation` for current route
- `IntersectionObserver` on `#home-services-section` to detect services section visibility on homepage
- Active link = `pathname === link.href` OR `servicesInView && link.label === 'Services'`

---

## 9. Third-Party Integrations

### Supabase
- **File:** `lib/supabase.ts`
- **Export:** `supabase` (client instance)
- **URL:** `https://whatwprvrxqdwcdoicrl.supabase.co`
- **Used for:** Contact form submissions (probably storing inquiries)
- **Env vars:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Next.js)
  - Fallback also checks: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` (legacy)

### Google Fonts
- Space Grotesk (300–700), Inter (300–800), Orbitron (500/700/900), Mrs Saint Delafield, Herr Von Muellerhoff
- Loaded via separate `<link>` tags in `app/layout.tsx`

### Three.js / @react-three/fiber
- Used for `NeuralSphere.tsx` (3D sphere on homepage)
- Must be dynamically imported with `ssr: false`

### Framer Motion
- Used in `app/services/page.tsx` for 3D card tilt effect
- Used in `app/portfolio/page.tsx` for AnimatePresence filter transitions
- Import: `from 'framer-motion'`

### CDN-served icons (Footer)
- LinkedIn: `https://upload.wikimedia.org/...`
- Instagram, Facebook: `https://cdn.simpleicons.org/...`
- These domains are whitelisted in `next.config.mjs` under `images.remotePatterns`

### Portfolio Projects (live links — never change these)
| Project | URL |
|---|---|
| Sonolynx | `https://www.sonolynx.com/` |
| Soul Imaging Voice Agent | `https://soul-imaging-voice-agent.fly.dev/orb/` |
| Sanctuary Real Estate | `https://real-estate-three-woad.vercel.app/` |
| Sarah Mitchell Real Estate | `https://react-sitr-x9l62.vercel.app/` |
| Precise Surgery | `https://precise-surgery.vercel.app/` |

---

## 10. Environment Variables

### Local `.env` file (project root)
```env
VITE_SUPABASE_URL=https://whatwprvrxqdwcdoicrl.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_9I-XIqPjpquRKzVgvrWBpw_eUIgh-uJ
```

> ⚠️ **SECURITY WARNING:** `.env` is NOT in `.gitignore` — these credentials ARE committed to the GitHub repo. This should be fixed by adding `.env` to `.gitignore`.

### For Next.js Production (Hostinger / any server)
Set these environment variables on the server:
```env
NEXT_PUBLIC_SUPABASE_URL=https://whatwprvrxqdwcdoicrl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
PORT=3000
NODE_ENV=production
```

> `NEXT_PUBLIC_` prefix is required for browser-accessible Next.js env vars.
> The `lib/supabase.ts` checks BOTH `NEXT_PUBLIC_*` and `VITE_*` names as fallbacks.

---

## 11. Build & Development

### Scripts (`package.json`)
```bash
npm run dev      # Start dev server: next dev --webpack
npm run build    # Production build: next build --webpack
npm start        # Start production: node server.js
npm run lint     # ESLint: next lint
npm run format   # Prettier: prettier --write .
```

### Why `--webpack`?
The machine has an Application Control Policy blocking `@next/swc-win32-x64-msvc.node` (the native Next.js compiler). Next.js falls back to WASM bindings, which don't support Turbopack. The `--webpack` flag forces webpack bundler and avoids the warning spam.

### Port
- Dev: `http://localhost:3000` (default Next.js dev)
- Production: `process.env.PORT || 3000`

### PowerShell Note (Windows-specific)
> `&&` does NOT work in PowerShell. Always use: `cmd /c "command1 && command2"` for chained commands.

### Path Alias `@/*`
Defined in `tsconfig.json`: `"@/*": ["./*"]`
- This maps to the **project root** — NOT to `src/`
- `@/components/X` → `./components/X`
- `@/lib/X` → `./lib/X`
- `@/hooks/X` → `./hooks/X`
- `@/app/X` → `./app/X`

### Tailwind v4 Setup
- **No** `tailwind.config.ts` — Tailwind v4 reads config from CSS
- PostCSS plugin: `@tailwindcss/postcss` in `postcss.config.mjs`
- CSS entry: `@import "tailwindcss"` in `app/globals.css`
- Custom theme tokens: defined in `@theme inline { }` block in `app/globals.css`

---

## 12. Deployment (Hostinger)

### Production Entry Point
`server.js` — a standard Node.js HTTP server wrapping Next.js:
- Runs: `node server.js`
- Binds to `0.0.0.0:PORT` (all interfaces)
- Forces `NODE_ENV=production`
- Suitable for VPS / Docker (NOT Vercel serverless)

### Deploy Steps
1. **On local machine:**
   ```bash
   npm run build
   git add . && git commit -m "deploy" && git push
   ```
2. **On Hostinger server:**
   ```bash
   git pull origin main
   npm install --production
   node server.js
   ```
   Or using PM2:
   ```bash
   pm2 start server.js --name vexcort
   pm2 save
   ```
3. **Set env vars on server:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `PORT`, `NODE_ENV=production`

### Hostinger Node.js Config
- Set entry point to: `server.js`
- Node version: 18+ recommended
- `.next/` folder is generated by `npm run build` and must be present on the server

---

## 13. GitHub Repository

| Field | Value |
|---|---|
| **Active repo** | `https://github.com/SaifDevAI/new-vexcort-hostinger.git` |
| **Branch** | `main` |
| **Old repo (DO NOT push here)** | `https://github.com/SaifDevAI/cortvex-new.git` |

### Push Commands
```bash
git add .
git commit -m "your message"
git push origin main
```

---

## 14. Where to Edit Specific Things

> Use this section to quickly find where to make any specific change.

### Content Changes
| What to change | File | Notes |
|---|---|---|
| Hero video | `app/page.tsx` | Change `/home.mp4?v=2` src |
| Hero headline ("Vexcort" big text) | `app/page.tsx` | Hero component, uses `.font-logo` class |
| Hero tagline | `app/page.tsx` | Below hero heading |
| Services list (homepage) | `app/page.tsx` | `services` const array at top of file |
| Services list (services page, more detailed) | `app/services/page.tsx` | `servicesList` const array |
| Portfolio projects | `app/portfolio/page.tsx` | `projects` const array |
| FAQ questions & answers | `app/faq/page.tsx` | `faqs` const array |
| Team members | `app/about/page.tsx` | `team` const array at top of file |
| Company story / mission | `app/about/page.tsx` | Inline JSX below team array |
| Contact form fields | `app/contact/page.tsx` | `serviceOptions`, `budgetOptions` arrays |
| Footer navigation links | `components/Footer.tsx` | `nav` const (3 column object) |
| Footer social links | `components/Footer.tsx` | `socials` const array |
| Footer email | `components/Footer.tsx` | Hardcoded `connect@vexcort.com` |
| Footer big wordmark | `components/Footer.tsx` | Last `<div>` — `text-[12vw]` "VEXCORT" |
| CTA section text | `components/CTASection.tsx` | Hardcoded headline + subtext |
| CTA buttons | `components/CTASection.tsx` | Two `<Link>` buttons |
| Navbar links | `components/Navbar.tsx` | `links` const array |
| Navbar CTA button | `components/Navbar.tsx` | "Contact Us" `<Link href="/contact">` |
| Splash screen video | `components/SiteLayout.tsx` | `/splash_screen.mp4?v=2` |
| 404 page content | `app/not-found.tsx` | Heading, badge, grid of links |

### Metadata / SEO
| What to change | File | Notes |
|---|---|---|
| Page title | `app/layout.tsx` | `metadata.title` |
| Meta description | `app/layout.tsx` | `metadata.description` |
| OG image | `app/layout.tsx` | `metadata.openGraph.images` → `/textlogo.png` |
| Twitter card | `app/layout.tsx` | `metadata.twitter` |
| Favicon | `app/layout.tsx` | `metadata.icons` → `/textlogo.png` |
| JSON-LD schema | `app/layout.tsx` | `organizationSchema` object |
| Sitemap routes | `app/sitemap.ts` | Array of route objects with priority |
| robots.txt rules | `app/robots.ts` | `allow`/`disallow` strings |

### Styling
| What to change | File | Notes |
|---|---|---|
| Brand colors | `app/globals.css` | `--brand`, `--gradient-brand`, etc. in `@theme inline` |
| Body font | `app/globals.css` | `body { font-family: ... }` in `@layer base` |
| Logo font | `app/globals.css` | `--font-logo` in `@theme inline` AND `.font-logo` in `@layer components` |
| Add new font | 1. Add `@font-face` in `app/globals.css`, 2. Place file in `public/fonts/`, 3. Add `<link>` in `app/layout.tsx` if using Google Fonts |
| Global CSS utilities | `app/globals.css` | Add to `@layer utilities` or `@layer components` |
| Tailwind theme tokens | `app/globals.css` | `@theme inline { }` block |

### Adding a New Page
1. Create `app/[route]/page.tsx`
2. Add `'use client'` at top
3. Import and wrap with `<SiteLayout>`
4. Add route to `app/sitemap.ts`
5. Add link in `components/Navbar.tsx` `links` array and `components/Footer.tsx` `nav` object if needed

### Adding a New Component
1. Create `components/MyComponent.tsx`
2. Add `'use client'` at top if using hooks/effects
3. Import with `@/components/MyComponent`

---

## 15. Known Issues & Constraints

### 🔴 Critical
1. **`.env` is committed to GitHub** — Supabase credentials are exposed. Fix: add `.env` to `.gitignore` and rotate the keys in Supabase dashboard.
2. **Env var naming mismatch** — `.env` uses `VITE_` prefix; Next.js needs `NEXT_PUBLIC_` prefix. `lib/supabase.ts` handles this with fallback checks, but production server MUST have `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` set.

### 🟡 Important
3. **Native SWC blocked by machine policy** — The system Application Control Policy blocks `@next/swc-win32-x64-msvc.node`. Next.js falls back to WASM. This causes build/dev warnings but does NOT break anything. Always use `--webpack` flag on this machine.
4. **NeuralSphere MUST use dynamic import** — `NeuralSphere.tsx` uses Three.js which cannot run during SSR. Always import as: `dynamic(() => import('@/components/NeuralSphere'), { ssr: false })`.
5. **All pages are `'use client'`** — This means `export const metadata = ...` will NOT work inside page files. All SEO metadata must be defined in `app/layout.tsx` only.
6. **Google Fonts MUST use separate `<link>` tags** — Never combine with `&family=` in React JSX because React HTML-escapes `&` → `&amp;` which breaks Google Fonts. Use individual `<link>` per font.

### 🟢 Minor
7. **Legacy dependencies** — `@tanstack/react-router`, `@cloudflare/vite-plugin`, etc. are in `package.json` but not used. They won't cause errors but bloat `node_modules`.
8. **`lib/error-capture.ts` and `lib/error-page.ts`** — Legacy from TanStack/h3 era. Not imported anywhere in the Next.js codebase. Safe to delete.
9. **`public/submit.php`** — Legacy PHP mailer from old stack. Not used in Next.js. Safe to delete.
10. **`@tailwindcss/vite`** in dependencies — leftover from Vite era; unused since PostCSS plugin is used now.
11. **Port 3000 conflicts** — On this machine, Python processes (like `main.py`) may occupy port 3000. Kill them before starting Node server: `netstat -ano | findstr :3000`.

---

## 16. File Relationship Graph

```
app/layout.tsx
  └── imports: globals.css
  └── renders: {children} (all pages)

app/*/page.tsx (all 6 pages)
  └── imports: SiteLayout (wraps everything)
  └── imports: CTASection (services, portfolio pages)
  └── imports: components/ui/* (shadcn components)
  └── imports: lucide-react (icons)
  └── imports: framer-motion (services, portfolio)
  └── imports: next/link, next/navigation

app/page.tsx (homepage only)
  └── dynamic imports: NeuralSphere (ssr: false)

components/SiteLayout.tsx
  └── imports: Navbar
  └── imports: Footer
  └── renders: splash screen (splash_screen.mp4)

components/Navbar.tsx
  └── imports: Logo
  └── uses: next/link, next/navigation (usePathname)

components/Footer.tsx
  └── imports: Logo
  └── uses: next/link

components/Logo.tsx
  └── uses: next/link, /textlogo.png

components/NeuralSphere.tsx
  └── uses: @react-three/fiber, three, GLSL shaders

components/InteractiveParticles.tsx
  └── uses: three, GLSL shaders

lib/supabase.ts
  └── uses: @supabase/supabase-js
  └── reads: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY

lib/utils.ts
  └── uses: clsx, tailwind-merge
  └── exported as: cn()
  └── imported by: all components/ui/* files

hooks/use-mobile.tsx
  └── exported as: useIsMobile()
  └── uses: window.matchMedia (breakpoint: 768px)
```

---

*This knowledge graph was auto-generated from the full codebase survey. Keep it updated when making significant structural changes.*

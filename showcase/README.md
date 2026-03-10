# Briques Showcase

Application demo integrant toutes les briques reutilisables pour coaches, consultants et formateurs.

## Stack

- **Next.js 16** App Router
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4**
- **Supabase** (Auth, PostgreSQL, Storage, Realtime)
- **@phosphor-icons/react** (icones)
- **Framer Motion** (animations)
- **Recharts** (graphiques)
- **Sonner** (toasts)

## Installation

```bash
cd showcase
npm install
npm run dev
```

## Structure

```
showcase/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Layout principal
│   │   ├── providers.tsx        # React Query provider
│   │   ├── globals.css          # Theme Tailwind CSS 4
│   │   ├── page.tsx             # Landing page
│   │   └── demo/
│   │       ├── layout.tsx       # Layout demos avec sidebar
│   │       ├── dashboard/       # Demo Dashboard
│   │       ├── onboarding/      # Demo Onboarding
│   │       └── ...              # Autres demos
│   ├── components/              # Composants UI
│   └── lib/
│       └── utils.ts             # Helpers (cn, formatCurrency, etc.)
├── package.json
├── tsconfig.json
├── next.config.ts
└── postcss.config.mjs
```

## Theme

L'application utilise un theme dark-first avec accent violet (`#8b5cf6`).

### Couleurs principales

| Variable | Description |
|----------|-------------|
| `--color-primary` | Violet (#8b5cf6) |
| `--color-background` | Fond sombre |
| `--color-card` | Surface des cards |
| `--color-border` | Bordures |
| `--color-muted` | Elements desactives |

### Classes utilitaires

- `.glass` : Effet glassmorphism
- `.gradient-text` : Texte degrade violet
- `.gradient-border` : Bordure avec degrade

## Demos disponibles

| Brique | Description | Route |
|--------|-------------|-------|
| AppShell | Layout avec sidebar responsive | `/demo/appshell` |
| Dashboard | Stats, graphiques, activite | `/demo/dashboard` |
| iClosed | Calendrier et reservations | `/demo/iclosed` |
| Messaging | Chat temps reel | `/demo/messaging` |
| NamEIA | Chatbot IA | `/demo/nameia` |
| Skool | LMS et formations | `/demo/skool` |
| Typeform | Formulaires wizard | `/demo/typeform` |
| Payments | Checkout Stripe | `/demo/payments` |
| Onboarding | Flow multi-etapes | `/demo/onboarding` |

## Personnalisation

### Modifier l'accent

Dans `src/app/globals.css`, changez la valeur de `--color-primary` :

```css
@theme {
  --color-primary: oklch(0.65 0.25 285); /* Violet */
  /* ou */
  --color-primary: oklch(0.65 0.20 160); /* Emerald */
}
```

### Ajouter une demo

1. Creer un dossier dans `src/app/demo/[nom]/`
2. Ajouter un `page.tsx`
3. Ajouter l'entree dans `navItems` du layout

## Build

```bash
npm run build
npm start
```

## Deploy

L'application peut etre deployee sur :

- **Vercel** (recommande)
- **Netlify**
- **Railway**
- **Fly.io**

```bash
# Vercel
npx vercel

# Build Docker
docker build -t briques-showcase .
```

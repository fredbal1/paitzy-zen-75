
# Paitzy 🐾

**Paitzy** est une application de suivi du bien-être des animaux domestiques, conçue pour aider les familles à organiser les soins, suivre la santé et conserver les souvenirs de leurs compagnons.

## ✨ Fonctionnalités

### Version actuelle (Frontend seul)
- 📊 **Tableau de bord** avec KPIs en temps réel
- 🐕 **Gestion des compagnons** avec cartes compactes/étendues
- 💜 **Suivi du bien-être** avec gauge et tendances
- 📅 **Timeline/Agenda** des rendez-vous et soins
- 📸 **Galerie de souvenirs** (nécessite Supabase Storage)
- 📱 **Design responsive** mobile-first
- 🌙 **Thème sombre** clay/neumorphisme premium
- ♿ **Accessibilité WCAG 2.2 AA**

### Prochaines étapes
- 🔐 **Authentification** (Supabase Auth)
- 💾 **Base de données** complète (Supabase)
- 📁 **Upload de fichiers** (Supabase Storage)
- 📊 **Analytics** et métriques avancées

## 🚀 Démarrage rapide

### Prérequis
- Node.js 18+ ou Bun
- npm, pnpm ou yarn

### Installation

```bash
# Cloner le projet
git clone <repository-url>
cd paitzy

# Installer les dépendances
npm install
# ou
pnpm install
# ou
bun install

# Lancer en développement
npm run dev
# ou
pnpm dev
# ou
bun dev
```

### Scripts disponibles

```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run preview      # Aperçu du build
npm run typecheck    # Vérification TypeScript
npm run lint         # Linting ESLint
npm run test         # Tests Vitest
```

## 🏗️ Architecture

### Stack technique
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Design tokens personnalisés
- **UI**: shadcn/ui + Radix UI primitives
- **Animation**: Framer Motion (respecte `prefers-reduced-motion`)
- **State**: TanStack Query + Zustand (léger)
- **Router**: React Router v6
- **Icônes**: Lucide React
- **Tests**: Vitest + React Testing Library
- **Qualité**: ESLint + Prettier + Husky

### Structure des fichiers

```
src/
├── components/           # Composants réutilisables
│   ├── layout/          # Header, navigation
│   ├── kpi/             # Cartes KPI et carrousel
│   ├── pet/             # Composants animaux
│   ├── wellbeing/       # Widget bien-être
│   ├── memories/        # Galerie souvenirs
│   ├── timeline/        # Agenda et timeline
│   ├── common/          # Empty, Error, Skeleton
│   └── ui/              # Primitives shadcn/ui
├── lib/
│   ├── design/          # Tokens et utilitaires neumorphisme
│   ├── motion/          # Variants Framer Motion
│   ├── data/            # Adaptateurs données (stubs)
│   ├── hooks/           # Hooks TanStack Query
│   └── utils/           # Utilitaires divers
├── pages/               # Pages principales
└── styles/              # CSS globaux
```

## 🎨 Design System

### Thème Dark Clay/Neumorphisme

Le design adopte un style **neumorphisme sombre** premium avec :

- **Palette** : Tons sombres (#0f1115, #17191f) avec accents lavande (#8b6cff) et menthe (#4cd4bd)
- **Ombres** : Inset et relief pour créer la profondeur neumorphique
- **Rayons** : Bordures arrondies généreuses (18-24px)
- **Typographie** : Inter avec variantes et espacement optimisés

### Tokens CSS

Tous les tokens sont centralisés dans `src/lib/design/tokens.css` :

```css
:root {
  --bg: #0f1115;
  --surface: #17191f;
  --text: #e9e9ed;
  --brand: #8b6cff;
  --shadow: 0 10px 22px rgba(0,0,0,.35);
  --inset-1: inset 2px 2px 4px rgba(0,0,0,.45);
  /* ... */
}
```

### Utilitaires neumorphisme

Classes CSS utilitaires dans `src/lib/design/neumorphism.css` :

- `.neumo-card` : Cartes avec relief
- `.neumo-inset` : Surfaces creusées
- `.neumo-button` : Boutons avec effet tactile
- `.neumo-chip` : Pills et badges
- `.status-pill` : Indicateurs d'état

## 📱 Responsive & Navigation

### Header sticky
- **Desktop** : Logo + onglets + actions
- **Mobile** : Logo + actions + hamburger → drawer
- **Shrink on scroll** : 72px → 60px avec animation fluide
- **Safe areas** : Support iOS avec `env(safe-area-inset-top)`

### Layout mobile-first
1. **KPI carrousel** (scroll-snap + indicateurs)
2. **Mes compagnons** (cartes accordéon)
3. **Bien-être + Souvenirs** (colonne)
4. **Timeline** (pleine largeur)

### Desktop
- Grille 8/4 : Compagnons + Timeline / Bien-être + Souvenirs
- KPI en grille 4 colonnes

## ♿ Accessibilité

### WCAG 2.2 AA
- **Contraste** : Textes ≥ 4.5:1, éléments graphiques ≥ 3:1
- **Navigation clavier** : Focus visible, tab-order logique
- **Zones tactiles** : ≥ 44×44px sur mobile
- **ARIA** : Labels, rôles et états appropriés
- **Lecteurs d'écran** : Descriptions et landmarks

### Motion respectueux
- **`prefers-reduced-motion`** : Désactivation automatique des animations
- **Durées courtes** : 0.06s pour les interactions, 0.26s pour les entrées
- **Easing naturel** : Courbes de Bézier optimisées

## 🔌 Intégration Supabase

### État actuel (Stub)
- **Lectures** : Retournent des tableaux vides `[]`
- **Écritures** : Lancent `NotConnectedError`
- **Pas de mock** : Interface claire pour les états vides

### Préparation backend

Structure prête pour Supabase :
- Types TypeScript (`src/types/supabase.ts`)
- Adaptateurs data (`src/lib/data/*.ts`)
- Hooks TanStack Query avec query keys cohérentes
- Gestion d'erreur centralisée

### Schéma prévu

```sql
-- Tables principales
owners, pets, events, weights, wellbeing_logs, issues, memories

-- RLS par propriétaire
auth.uid() = owner_id

-- Storage pour photos
bucket: memories (2MB max, JPG/PNG/WebP)
```

## 🧪 Tests & Qualité

### Tests unitaires (Vitest)
```bash
npm run test
```

Couverture des composants clés :
- Header : navigation sticky + drawer mobile
- KpiCarousel : indicateurs et scroll-snap
- PetCard : états compact/étendu + accordéon
- WellbeingWidget : gauge + actions NotConnectedError

### Lighthouse
Objectifs : **≥ 90** sur tous les critères (Performance, Accessibilité, Bonnes pratiques, SEO)

### Linting & Formatting
```bash
npm run lint      # ESLint + a11y rules
npm run typecheck # TypeScript strict
```

Pre-commit hooks via Husky :
- Lint & format du code modifié
- Vérification types
- Tests unitaires

## 🚀 Déploiement

### Build de production
```bash
npm run build
npm run preview  # Test local du build
```

### Hébergement recommandé
- **Vercel** : Déploiement automatique Git
- **Netlify** : Build et CDN optimisés
- **Supabase Hosting** : Intégration native

### Variables d'environnement
```bash
# .env.local (pour Supabase plus tard)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## 📚 Documentation

- [`ARCHITECTURE.md`](./ARCHITECTURE.md) : Architecture détaillée
- [`DESIGN-TOKENS.md`](./DESIGN-TOKENS.md) : Système de design
- [`MOTION.md`](./MOTION.md) : Guide des animations
- [`ACCESSIBILITY.md`](./ACCESSIBILITY.md) : Standards d'accessibilité
- [`UI-STATES.md`](./UI-STATES.md) : États des interfaces
- [`TODO-SUPABASE.md`](./TODO-SUPABASE.md) : Roadmap backend

## 🤝 Contribution

### Workflow de développement
1. Fork du projet
2. Branche feature : `git checkout -b feature/amazing-feature`
3. Commit : `git commit -m 'feat: add amazing feature'`
4. Push : `git push origin feature/amazing-feature`  
5. Pull Request

### Standards de code
- **TypeScript strict** : Pas de `any`, interfaces complètes
- **Composants focalisés** : ≤ 150 lignes, responsabilité unique
- **CSS utilitaires** : Privilégier Tailwind + tokens
- **Accessibilité** : Tests a11y systématiques

### Commits conventionnels
```
feat: nouvelle fonctionnalité
fix: correction de bug
docs: documentation
style: formatage
refactor: refactoring
test: ajout de tests
chore: tâches de maintenance
```

## 📄 Licence

[MIT License](./LICENSE) - Libre d'utilisation, modification et distribution.

---

**Paitzy** - *Prendre soin de ceux qui nous aiment inconditionnellement* 🐾❤️

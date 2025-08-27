
# Architecture Paitzy

Ce document décrit l'architecture technique et les choix de conception de l'application Paitzy.

## 🏗️ Vue d'ensemble

Paitzy suit une architecture **frontend-first** avec préparation pour intégration backend Supabase. L'application privilégie la performance, l'accessibilité et l'expérience utilisateur.

### Principes architecturaux

1. **Mobile-first responsive** : Design et développement optimisés mobile
2. **Accessibility-first** : WCAG 2.2 AA dès la conception
3. **Performance-first** : Lighthouse ≥ 90, Core Web Vitals optimisés
4. **Type-safe** : TypeScript strict, pas de `any`
5. **Component-driven** : Composants focalisés et réutilisables
6. **Motion respectful** : Animations respectant `prefers-reduced-motion`

## 📁 Structure des fichiers

```
src/
├── components/                 # Composants UI réutilisables
│   ├── layout/                # Composants de layout
│   │   └── Header.tsx         # Header sticky + navigation mobile
│   ├── kpi/                   # Indicateurs KPI
│   │   ├── KpiCard.tsx        # Carte KPI individuelle
│   │   └── KpiCarousel.tsx    # Carrousel mobile + grille desktop
│   ├── pet/                   # Composants animaux de compagnie
│   │   ├── PetAvatar.tsx      # Avatar avec fallback initiales
│   │   └── PetCardCompact.tsx # Carte compact/étendu accordéon
│   ├── wellbeing/             # Composants bien-être
│   │   └── WellbeingWidget.tsx # Widget gauge + CTAs
│   ├── memories/              # Composants souvenirs
│   │   └── MemoriesGrid.tsx   # Grille 2x2 avec placeholders
│   ├── timeline/              # Composants timeline/agenda
│   │   ├── TimelineTabs.tsx   # Onglets Aujourd'hui/Prochainement/Terminés
│   │   └── TimelineItem.tsx   # Item avec checkbox + actions
│   ├── common/                # Composants communs (non modifiables)
│   │   ├── Empty.tsx          # État vide avec CTA
│   │   ├── ErrorState.tsx     # Gestion d'erreurs
│   │   ├── Skeleton.tsx       # Composants skeleton
│   │   └── Section.tsx        # Wrapper section avec titre
│   └── ui/                    # Primitives shadcn/ui (non modifiables)
├── lib/                       # Logique métier et utilitaires
│   ├── design/                # Système de design
│   │   ├── tokens.css         # Variables CSS (couleurs, espacements, etc.)
│   │   └── neumorphism.css    # Utilitaires neumorphisme
│   ├── motion/                # Configuration animations
│   │   └── variants.ts        # Variants Framer Motion + reduced-motion
│   ├── data/                  # Couche données (stubs Supabase-ready)
│   │   ├── NotConnectedError.ts # Erreur personnalisée
│   │   ├── pets.ts            # Adaptateur animaux
│   │   ├── events.ts          # Adaptateur événements
│   │   ├── wellbeing.ts       # Adaptateur bien-être
│   │   ├── weights.ts         # Adaptateur pesées
│   │   ├── memories.ts        # Adaptateur souvenirs
│   │   └── issues.ts          # Adaptateur problèmes
│   ├── hooks/                 # Hooks TanStack Query (non modifiables)
│   │   ├── usePets.ts         # Hook liste animaux
│   │   ├── useEvents.ts       # Hook événements
│   │   └── useWellbeing.ts    # Hook bien-être
│   └── utils.ts               # Utilitaires génériques
├── pages/                     # Pages principales
│   ├── Index.tsx              # Page d'accueil (non modifiable)
│   ├── Dashboard.tsx          # Tableau de bord principal
│   └── NotFound.tsx           # Page 404 (non modifiable)
├── styles/                    # Styles globaux
│   └── globals.css            # CSS reset + utilitaires globaux
└── types/                     # Types TypeScript
    └── supabase.ts            # Types Supabase (préparatoire)
```

## 🧩 Composants clés

### Header (`src/components/layout/Header.tsx`)

**Responsabilités :**
- Navigation principale sticky avec shrink on scroll
- Menu hamburger → drawer mobile (shadcn Sheet)
- Actions rapides (Ajouter, Notifications, Profil)
- Skip-link d'accessibilité

**Fonctionnalités :**
- Détection de scroll pour réduction de hauteur (72px → 60px)
- Navigation clavier complète
- ARIA labels et landmarks appropriés
- Focus management dans le drawer mobile

### KPI Carousel (`src/components/kpi/KpiCarousel.tsx`)

**Responsabilités :**
- Affichage adaptatif : carrousel mobile / grille desktop
- Indicateurs de position synchronisés
- Navigation tactile et clavier

**Comportements :**
- Mobile : scroll-snap horizontal avec indicateurs
- Desktop : grille CSS 4 colonnes
- Synchronisation scroll ↔ indicateurs
- Support ARIA pour lecteurs d'écran

### Pet Cards (`src/components/pet/PetCardCompact.tsx`)

**Responsabilités :**
- Affichage compact avec accordéon pour détails
- Status pills (OK/Surveillance/Retard)
- Actions rapides (poids, RDV, soins)
- Avatar avec fallback initiales

**États :**
- **Compact** : Info essentielle + mini-KPIs
- **Étendu** : Actions rapides + historique récent
- Animation spring pour transitions accordéon

### Wellbeing Widget (`src/components/wellbeing/WellbeingWidget.tsx`)

**Responsabilités :**
- Gauge circulaire SVG (0-100)
- Indicateur de tendance (↑/→/↓)
- CTAs "Tout va bien" / "Signaler un souci"
- Gestion NotConnectedError

**Optimisations :**
- Gauge compacte (80px) optimisée mobile
- Pas de graphique 7 jours complexe
- Animation CSS pour progression du cercle

## 🎨 Système de design

### Tokens CSS (`src/lib/design/tokens.css`)

Structure hiérarchique des variables CSS :

```css
:root {
  /* Couleurs sémantiques */
  --bg: #0f1115;              /* Arrière-plan principal */
  --surface: #17191f;         /* Surfaces de cartes */
  --surface-2: #14171c;       /* Surfaces creusées */
  --text: #e9e9ed;            /* Texte principal */
  --text-muted: #a3a6b0;      /* Texte secondaire */
  
  /* Couleurs fonctionnelles */
  --brand: #8b6cff;           /* Lavande principal */
  --accent: #4cd4bd;          /* Menthe accent */
  --warning: #f7b36a;         /* Orange alertes */
  --danger: #ff6b6b;          /* Rouge erreurs */
  
  /* Géométrie */
  --radius-lg: 18px;          /* Rayons cartes */
  --radius-xl: 24px;          /* Rayons composants */
  
  /* Ombres neumorphiques */
  --shadow: 0 10px 22px rgba(0,0,0,.35);
  --inset-1: inset 2px 2px 4px rgba(0,0,0,.45);
}
```

### Utilitaires neumorphisme (`src/lib/design/neumorphism.css`)

Classes CSS spécialisées pour l'effet neumorphique sombre :

- **`.neumo-card`** : Cartes en relief avec ombres
- **`.neumo-inset`** : Surfaces creusées (inputs, avatars)
- **`.neumo-pressable`** : Éléments interactifs avec feedback tactile
- **`.neumo-chip`** : Pills et badges avec inset léger
- **`.status-pill`** : Indicateurs d'état avec codes couleur

## 🏗️ Couche données

### Adaptateurs (`src/lib/data/*.ts`)

Chaque domaine métier dispose d'un adaptateur :

```typescript
// Exemple : src/lib/data/pets.ts
export async function listPets(): Promise<Pet[]> {
  // Retourne [] tant que Supabase non connecté
  return [];
}

export async function createPet(pet: CreatePetInput): Promise<Pet> {
  // Lance NotConnectedError tant que Supabase non connecté
  throw new NotConnectedError('Cannot create pet - Supabase connection required');
}
```

### Hooks TanStack Query (`src/lib/hooks/*.ts`)

Hooks réactifs avec query keys cohérentes :

```typescript
// src/lib/hooks/usePets.ts
export function usePets() {
  return useQuery({
    queryKey: ['pets'],
    queryFn: listPets,
    retry: false, // Pas de retry tant que non connecté
  });
}
```

### Query Keys

Convention d'organisation :

```typescript
['pets']                          // Liste des animaux
['pet', id]                       // Animal spécifique
['events', { range: 'today' }]    // Événements avec filtres
['memories', petId]               // Souvenirs par animal
['wellbeing', petId]              // Bien-être par animal
['weights', petId]                // Pesées par animal
```

## 🎭 Gestion d'état

### TanStack Query
- **Cache réactif** pour les données serveur
- **Optimistic updates** (préparé pour mutations)
- **Background refetch** avec stale-while-revalidate
- **Error boundaries** avec retry configuré

### Zustand (léger)
- **UI state** : modales, drawer, toasts
- **Préférences utilisateur** : thème, langue
- **État éphémère** : sélections, formulaires

### State local (useState)
- **Accordéons** : pet cards expand/collapse
- **Carrousels** : active index
- **Formulaires** : champs et validation

## 📱 Responsive design

### Breakpoints Tailwind

```css
sm: 640px   /* Téléphone paysage */
md: 768px   /* Tablette portrait */
lg: 1024px  /* Tablette paysage / Desktop petit */
xl: 1280px  /* Desktop standard */
2xl: 1536px /* Desktop large */
```

### Layout mobile-first

**Mobile (< 1024px) :**
1. KPI carrousel horizontal (scroll-snap)
2. Compagnons empilés verticalement
3. Bien-être + Souvenirs empilés
4. Timeline pleine largeur

**Desktop (≥ 1024px) :**
1. KPI grille 4 colonnes
2. Layout 8/4 : Compagnons+Timeline / Sidebar
3. Bien-être + Souvenirs en colonne fixe

### Navigation mobile

- **Header mobile** : Logo + Actions + Hamburger
- **Drawer** : Navigation complète avec Sheet (Radix)
- **Focus trap** : Navigation clavier dans le drawer
- **Fermeture** : Tap overlay, Escape, navigation

## 🎬 Motion design

### Configuration (`src/lib/motion/variants.ts`)

Variants Framer Motion avec support `prefers-reduced-motion` :

```typescript
export const fadeInUp = {
  hidden: { opacity: 0, y: prefersReducedMotion() ? 0 : 8 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: prefersReducedMotion() ? 0.01 : 0.26 
    } 
  }
};
```

### Durées et timing

- **Interactions** : 0.06s (press, tap)
- **Transitions** : 0.15s (hover, focus)
- **Entrées** : 0.26s (fadeIn, slideIn)
- **Accordéons** : spring({ stiffness: 220, damping: 24 })

### Respecter les préférences

```typescript
const prefersReducedMotion = () => 
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

Désactivation automatique de toutes les animations non essentielles.

## ♿ Accessibilité

### Standards WCAG 2.2 AA

**Navigation clavier :**
- Tab order logique
- Focus visible (outline violet)
- Skip links ("Passer au contenu")
- Escape pour fermer modales/drawers

**Lecteurs d'écran :**
- Landmarks ARIA (`main`, `navigation`, `banner`)
- Labels explicites (`aria-label`, `aria-labelledby`)
- États dynamiques (`aria-expanded`, `aria-current`)
- Live regions (`aria-live="polite"`)

**Contrastes :**
- Texte principal : ≥ 4.5:1
- Texte secondaire : ≥ 4.5:1
- Éléments graphiques : ≥ 3:1
- Éléments interactifs : ≥ 3:1

**Zones tactiles :**
- Minimum 44×44px (mobile)
- Espacement suffisant entre éléments
- États hover/focus/active visibles

## 🚀 Performance

### Core Web Vitals

**Largest Contentful Paint (LCP) :** < 2.5s
- Images lazy-loaded avec `loading="lazy"`
- Fonts auto-hébergés (Inter)
- CSS critique inline

**First Input Delay (FID) :** < 100ms
- Code splitting par route
- Debouncing sur scroll handlers
- Passive event listeners

**Cumulative Layout Shift (CLS) :** < 0.1
- Dimensions explicites pour images
- Skeleton loading
- Header sticky sans reflow

### Optimisek 

**Bundle :**
- Tree-shaking Lucide icons
- Code splitting React.lazy
- Vite optimizations

**Images :**
- WebP avec fallback
- Aspect-ratio CSS
- Blur-up placeholder

**Réseau :**
- Preload fonts critiques
- Prefetch navigation probable
- Service Worker (PWA)

## 🧪 Tests

### Tests unitaires (Vitest)

**Composants clés :**
- Header : navigation + drawer mobile
- KpiCarousel : scroll-snap + indicateurs
- PetCard : accordéon + actions
- WellbeingWidget : NotConnectedError

**Patterns de test :**
```typescript
test('PetCard compact par défaut', () => {
  render(<PetCard pet={mockPet} />);
  expect(screen.getByText(mockPet.name)).toBeInTheDocument();
  expect(screen.queryByText('Actions rapides')).not.toBeInTheDocument();
});
```

### Tests d'accessibilité

**Axe-core integration :**
```typescript
test('Header accessible', async () => {
  const { container } = render(<Header />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Tests de performance

**Lighthouse CI :**
- Performance : ≥ 90
- Accessibilité : ≥ 95
- Bonnes pratiques : ≥ 90
- SEO : ≥ 90

## 🔌 Préparation Supabase

### Schema attendu

```sql
-- Users et ownership
CREATE TABLE owners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Animaux de compagnie
CREATE TABLE pets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES owners(id),
  name TEXT NOT NULL,
  species TEXT CHECK (species IN ('dog', 'cat', 'other')),
  breed TEXT,
  sex TEXT CHECK (sex IN ('male', 'female')),
  birthdate DATE,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Événements (RDV, soins)
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id UUID REFERENCES pets(id),
  type TEXT CHECK (type IN ('appointment', 'care', 'watch')),
  title TEXT NOT NULL,
  at TIMESTAMPTZ NOT NULL,
  done BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pesées
CREATE TABLE weights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id UUID REFERENCES pets(id),
  kg DECIMAL(5,2) NOT NULL,
  measured_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Logs bien-être
CREATE TABLE wellbeing_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id UUID REFERENCES pets(id),
  score INTEGER CHECK (score >= 0 AND score <= 100),
  note TEXT,
  logged_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Problèmes signalés
CREATE TABLE issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id UUID REFERENCES pets(id),
  severity TEXT CHECK (severity IN ('low', 'medium', 'high')),
  symptom TEXT NOT NULL,
  resolved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Souvenirs
CREATE TABLE memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id UUID REFERENCES pets(id),
  image_url TEXT NOT NULL,
  caption TEXT,
  taken_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### RLS (Row Level Security)

```sql
-- Chaque ressource appartient au propriétaire connecté
CREATE POLICY "owners_policy" ON pets
  USING (owner_id = (SELECT id FROM owners WHERE auth_id = auth.uid()));

CREATE POLICY "events_policy" ON events  
  USING (pet_id IN (SELECT id FROM pets WHERE owner_id = (SELECT id FROM owners WHERE auth_id = auth.uid())));

-- Politique similaire pour weights, wellbeing_logs, issues, memories
```

### Storage

```sql
-- Bucket pour les photos
CREATE BUCKET memories;

-- Politique d'accès
CREATE POLICY "memories_policy" ON storage.objects FOR ALL
  USING (bucket_id = 'memories' AND owner = auth.uid());
```

## 🚀 Déploiement

### Build de production

```bash
npm run build
```

**Optimisations Vite :**
- Minification Terser
- CSS extraction et purge
- Asset hashing
- Tree-shaking automatique

### Variables d'environnement

```bash
# .env.production
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_APP_URL=https://your-domain.com
```

### Hébergement recommandé

**Vercel (recommandé) :**
- Git integration automatique
- Edge Functions support
- Analytics intégrés
- Domain management

**Configuration `vercel.json` :**
```json
{
  "build": {
    "env": {
      "VITE_SUPABASE_URL": "@supabase-url",
      "VITE_SUPABASE_ANON_KEY": "@supabase-anon-key"
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

### PWA (Progressive Web App)

**Manifest (`public/manifest.webmanifest`) :**
```json
{
  "name": "Paitzy - Bien-être animal",
  "short_name": "Paitzy",
  "theme_color": "#8b6cff",
  "background_color": "#0f1115",
  "display": "standalone",
  "start_url": "/dashboard",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

**Service Worker (Workbox) :**
- Précache des assets critiques
- Runtime caching pour API
- Offline fallback page

---

Cette architecture garantit une base solide, extensible et maintenant pour l'évolution de Paitzy vers une application complète avec backend Supabase.

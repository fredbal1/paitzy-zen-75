
# Paitzy 🐾

Une application moderne de gestion pour animaux de compagnie avec un design clay/neumorphisme premium.

## 🚀 Démarrage rapide

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation

```bash
# Cloner le projet
git clone <votre-repo-url>
cd paitzy

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:8080`

## 📋 Scripts disponibles

```bash
npm run dev          # Serveur de développement
npm run build        # Build de production  
npm run preview      # Prévisualiser le build
npm run lint         # Linter le code
npm run type-check   # Vérification TypeScript
```

## 🏗️ Architecture

### Stack technique
- **React 18** + **TypeScript** - Framework et typage
- **Vite** - Build tool et dev server
- **Tailwind CSS** - Styling avec design system custom
- **Framer Motion** - Animations et micro-interactions
- **TanStack Query** - Gestion des données et cache
- **Zustand** - État global léger
- **Radix UI** + **shadcn/ui** - Composants accessibles

### Structure du projet

```
src/
├── components/           # Composants réutilisables
│   ├── common/          # Composants génériques (Empty, Error, Skeleton)
│   ├── kpi/             # Cartes KPI et carrousel
│   ├── pet/             # Composants liés aux animaux
│   ├── wellbeing/       # Widget de bien-être
│   ├── memories/        # Galerie de souvenirs
│   └── timeline/        # Timeline et agenda
├── lib/
│   ├── design/          # Design system (tokens, neumorphisme)
│   ├── motion/          # Variants d'animation Framer Motion
│   ├── data/            # Adaptateurs de données (stubs Supabase-ready)
│   ├── hooks/           # Hooks React Query personnalisés
│   └── utils/           # Utilitaires
├── pages/               # Pages de l'application
└── types/               # Types TypeScript
```

## 🎨 Design System

### Palette de couleurs (Clay/Neumorphisme)
- **Fond principal** : Crème chaud (`--bg`)
- **Surfaces** : Nuances de pêche/rose (`--surface`, `--surface-2`, `--surface-3`)  
- **Brand** : Lavande/violet (`--brand`, `--brand-600`, `--brand-700`)
- **Accent** : Menthe (`--accent`)
- **Status** : Vert, Orange, Rouge pour succès/attention/erreur

### Classes utilitaires neumorphes
- `.neumo-card` - Carte principale avec ombre douce
- `.neumo-inset` - Surface inset (enfoncée)
- `.neumo-button` - Bouton avec effet pressable
- `.neumo-chip` - Petit badge/pilule
- `.status-pill` - Indicateur de statut coloré

### Responsive
- **Mobile-first** avec breakpoints Tailwind
- Carrousel horizontal sur mobile, grille sur desktop
- Safe areas iOS/Android pris en charge

## 📊 Gestion des données

### États sans backend
L'application fonctionne **sans données mock** :
- **Lectures** → Retournent des tableaux vides `[]`
- **Écritures** → Lèvent `NotConnectedError`
- **États vides élégants** partout

### Hooks disponibles
```typescript
usePets()                    // Liste des animaux
useEvents(range)             // Événements par période  
useOverallWellbeing()        // Stats de bien-être générales
useCreateEvent()             // Créer un événement
useToggleEventDone()         // Basculer statut événement
useLogWellbeing()            // Logger bien-être
```

### Query Keys centralisés
- `['pets']`
- `['events', range]` 
- `['wellbeing', petId]`
- `['wellbeing', 'overall']`
- `['memories', petId]`

## ♿ Accessibilité

### Standards WCAG 2.2 AA
- Contrastes de couleurs suffisants
- Tailles de clic minimales (44px)
- Focus visible avec anneau violet brand
- Navigation clavier complète
- Labels ARIA appropriés

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  /* Animations désactivées */
}
```

## 🔌 Intégration Supabase

### État actuel
- **Stubs prêts** dans `lib/data/`
- **Types miroirs** dans `types/supabase.ts`
- **Hooks configurés** pour basculer facilement

### Prochaines étapes
1. Connecter le client Supabase
2. Implémenter les adaptateurs réels
3. Activer Storage pour les photos
4. Configurer RLS (Row Level Security)

Voir `TODO-SUPABASE.md` pour les détails complets.

## 🧪 Tests

```bash
npm run test             # Tests unitaires
npm run test:coverage    # Couverture de code
```

Tests principaux :
- Rendu des composants
- Accessibilité de base
- Gestion d'erreurs

## 📦 Build et déploiement

```bash
# Build optimisé
npm run build

# Prévisualiser
npm run preview
```

### Optimisations incluses
- Bundle splitting automatique
- Images lazy loading
- PWA ready (manifest inclus)
- Tree-shaking des icônes Lucide

## 🤝 Conventions de code

### TypeScript
- Interfaces exportées en PascalCase
- Props toujours typées avec interfaces
- JSDoc pour les fonctions publiques

### Composants React
- Un composant par fichier
- Props interface au-dessus du composant
- Variantes via design system

### Git
- Commits conventionnels (feat, fix, docs, etc.)
- Lint automatique en pre-commit (Husky)
- Branches feature/nom-de-la-feature

## 📄 Licence

MIT License - Voir le fichier LICENSE pour les détails.

---

**Fait avec ❤️ pour nos compagnons à quatre pattes**

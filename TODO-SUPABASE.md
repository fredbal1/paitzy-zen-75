
# TODO: Intégration Supabase 🗃️

Ce fichier décrit les étapes nécessaires pour connecter Paitzy à Supabase et activer toutes les fonctionnalités.

## 📋 Schéma de base de données

### Tables à créer

```sql
-- Table des propriétaires (liée à auth.users)
CREATE TABLE owners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Table des animaux de compagnie
CREATE TABLE pets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES owners(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    species TEXT CHECK (species IN ('dog', 'cat', 'other')),
    breed TEXT,
    sex TEXT CHECK (sex IN ('male', 'female')),
    birthdate DATE,
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Table des événements (RDV, soins, surveillance)
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pet_id UUID REFERENCES pets(id) ON DELETE CASCADE,
    type TEXT CHECK (type IN ('appointment', 'care', 'watch')),
    title TEXT NOT NULL,
    at TIMESTAMP NOT NULL,
    done BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Table des pesées
CREATE TABLE weights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pet_id UUID REFERENCES pets(id) ON DELETE CASCADE,
    kg NUMERIC(5,2) NOT NULL,
    measured_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Table des logs de bien-être
CREATE TABLE wellbeing_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pet_id UUID REFERENCES pets(id) ON DELETE CASCADE,
    score INTEGER CHECK (score BETWEEN 0 AND 100),
    note TEXT,
    logged_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Table des problèmes/anomalies
CREATE TABLE issues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pet_id UUID REFERENCES pets(id) ON DELETE CASCADE,
    severity TEXT CHECK (severity IN ('low', 'medium', 'high')),
    symptom TEXT NOT NULL,
    resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Table des souvenirs/photos
CREATE TABLE memories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pet_id UUID REFERENCES pets(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption TEXT,
    taken_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);
```

### Index pour les performances

```sql
-- Index sur les propriétaires par email
CREATE INDEX idx_owners_email ON owners(email);

-- Index sur les animaux par propriétaire
CREATE INDEX idx_pets_owner_id ON pets(owner_id);

-- Index sur les événements par animal et date
CREATE INDEX idx_events_pet_date ON events(pet_id, at);
CREATE INDEX idx_events_done ON events(done);

-- Index sur les pesées par animal et date
CREATE INDEX idx_weights_pet_date ON weights(pet_id, measured_at DESC);

-- Index sur les logs de bien-être
CREATE INDEX idx_wellbeing_pet_date ON wellbeing_logs(pet_id, logged_at DESC);

-- Index sur les problèmes non résolus
CREATE INDEX idx_issues_unresolved ON issues(pet_id, resolved) WHERE resolved = FALSE;

-- Index sur les souvenirs par animal
CREATE INDEX idx_memories_pet_date ON memories(pet_id, taken_at DESC);
```

## 🔐 Politiques RLS (Row Level Security)

Activer RLS sur toutes les tables et créer les politiques :

```sql
-- Activer RLS
ALTER TABLE owners ENABLE ROW LEVEL SECURITY;
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE weights ENABLE ROW LEVEL SECURITY;
ALTER TABLE wellbeing_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE memories ENABLE ROW LEVEL SECURITY;

-- Politiques pour owners
CREATE POLICY "Users can view own profile" ON owners
    FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own profile" ON owners
    FOR UPDATE USING (auth.uid()::text = id::text);

-- Politiques pour pets
CREATE POLICY "Users can view own pets" ON pets
    FOR SELECT USING (owner_id IN (
        SELECT id FROM owners WHERE auth.uid()::text = id::text
    ));

CREATE POLICY "Users can insert own pets" ON pets
    FOR INSERT WITH CHECK (owner_id IN (
        SELECT id FROM owners WHERE auth.uid()::text = id::text
    ));

CREATE POLICY "Users can update own pets" ON pets
    FOR UPDATE USING (owner_id IN (
        SELECT id FROM owners WHERE auth.uid()::text = id::text
    ));

CREATE POLICY "Users can delete own pets" ON pets
    FOR DELETE USING (owner_id IN (
        SELECT id FROM owners WHERE auth.uid()::text = id::text
    ));

-- Politiques similaires pour events, weights, wellbeing_logs, issues, memories
-- (via pet_id → pets.owner_id → auth.uid())
```

## 📁 Configuration Storage

### Bucket pour les photos

```sql
-- Créer le bucket memories
INSERT INTO storage.buckets (id, name, public) VALUES ('memories', 'memories', false);

-- Politique d'upload
CREATE POLICY "Users can upload own memories" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'memories' 
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- Politique de lecture
CREATE POLICY "Users can view own memories" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'memories' 
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- Politique de suppression
CREATE POLICY "Users can delete own memories" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'memories' 
        AND auth.uid()::text = (storage.foldername(name))[1]
    );
```

### Limites de fichiers
- **Taille max** : 2MB par image
- **Formats** : JPG, PNG, WebP uniquement
- **Organisation** : `/{user_id}/{pet_id}/{filename}`

## 🔧 Étapes d'intégration

### 1. Configuration environnement

```bash
# Créer .env.local
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 2. Installation client Supabase

```bash
npm install @supabase/supabase-js
```

### 3. Créer le client Supabase

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)
```

### 4. Implémenter les adaptateurs

Remplacer les stubs dans `lib/data/` :

```typescript
// Exemple pour pets.ts
export async function listPets(): Promise<Pet[]> {
  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data || []
}
```

### 5. Configurer l'authentification

```typescript
// src/lib/auth.ts
import { supabase } from './supabase'

export const auth = {
  signUp: (email: string, password: string) => 
    supabase.auth.signUp({ email, password }),
    
  signIn: (email: string, password: string) => 
    supabase.auth.signInWithPassword({ email, password }),
    
  signOut: () => supabase.auth.signOut(),
  
  getUser: () => supabase.auth.getUser(),
  
  onAuthStateChange: (callback) => 
    supabase.auth.onAuthStateChange(callback)
}
```

### 6. Middleware de données

```typescript
// src/lib/middleware/auth.ts
export async function requireAuth() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Authentication required')
  return user
}
```

### 7. Upload d'images

```typescript
// src/lib/upload.ts
export async function uploadMemory(
  petId: string, 
  file: File, 
  caption?: string
): Promise<Memory> {
  const user = await requireAuth()
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}.${fileExt}`
  const filePath = `${user.id}/${petId}/${fileName}`
  
  // Upload vers Storage
  const { error: uploadError } = await supabase.storage
    .from('memories')
    .upload(filePath, file)
  
  if (uploadError) throw uploadError
  
  // Créer l'enregistrement en DB
  const { data, error } = await supabase
    .from('memories')
    .insert({
      pet_id: petId,
      image_url: filePath,
      caption
    })
    .select()
    .single()
  
  if (error) throw error
  return data
}
```

## 🧪 Tests d'intégration

### Parcours de test complets

1. **Authentification**
   - Inscription nouvel utilisateur
   - Connexion/déconnexion
   - Récupération profil

2. **Gestion des animaux**
   - Ajouter un animal
   - Modifier les informations
   - Supprimer un animal

3. **Suivi quotidien**
   - Ajouter une pesée
   - Logger le bien-être (score + note)
   - Créer un événement (RDV)
   - Marquer un événement comme terminé

4. **Signalement de problèmes**
   - Signaler une anomalie
   - Marquer comme résolu

5. **Souvenirs**
   - Upload d'une photo
   - Ajout d'une légende
   - Suppression

### Tests automatisés

```typescript
// tests/integration/supabase.test.ts
describe('Supabase Integration', () => {
  test('should create and fetch pets', async () => {
    // Test complet du CRUD pets
  })
  
  test('should handle wellbeing logging', async () => {
    // Test logging bien-être
  })
  
  test('should upload and retrieve memories', async () => {
    // Test upload Storage
  })
})
```

## 📈 Optimisations à prévoir

### Performance
- **Pagination** sur les listes longues
- **Cache** TanStack Query avec `staleTime` approprié
- **Prefetch** des données liées (pets → events)
- **Lazy loading** des images dans les souvenirs

### UX
- **Optimistic updates** pour les actions rapides
- **Retry** automatique sur échec réseau
- **Offline support** avec mise en file d'attente

### Monitoring
- **Sentry** pour le suivi d'erreurs
- **Analytics** des parcours utilisateur
- **Performance** Web Vitals

## ✅ Checklist de validation

- [ ] Tables créées avec index
- [ ] RLS configuré et testé
- [ ] Storage bucket configuré
- [ ] Client Supabase intégré
- [ ] Authentification fonctionnelle
- [ ] CRUD complet sur toutes les entités
- [ ] Upload d'images opérationnel
- [ ] Tests d'intégration passants
- [ ] Performance validée (< 2.5s LCP)
- [ ] Accessibilité maintenue (WCAG AA)

## 🚀 Mise en production

### Variables d'environnement
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Build et déploiement
```bash
npm run build
npm run preview  # Test local du build
# Déployer sur votre hébergeur préféré
```

---

**Une fois Supabase connecté, Paitzy deviendra une application complète de gestion pour animaux de compagnie ! 🐾**

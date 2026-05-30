# CLAUDE.md — Maktaba Tour

Ce fichier guide Claude Code pour tout travail sur le projet Maktaba Tour.
Lire entièrement avant de toucher au code.

---

## Vue d'ensemble du projet

**Maktaba Tour** est une plateforme web francophone de découverte, recommandation et achat de livres jeunesse musulmans.
Slogan : "On fait le tour des bibliothèques pour toi."
Cible : mamans musulmanes francophones (France, Canada, Belgique, Suisse), 25–45 ans.
Instagram : à définir
Copyright : © 2026 Maktaba Tour • On fait le tour des bibliothèques pour toi.

---

## Projet de référence : Tilawa Tour

Maktaba Tour est développé par la même créatrice que **Tilawa Tour** (repo : `facynedraw-ux/tilawa-deploy`).
S'appuyer sur les mêmes patterns et conventions que Tilawa Tour partout où c'est possible :
- Stack statique HTML + Tailwind CDN + Vanilla JS
- Déploiement Cloudflare Pages via git push
- Auth Supabase OTP 6 chiffres
- Sync localStorage ↔ Supabase cloud
- Navigation bottom fixe
- PWA avec manifest.json

**Différences clés avec Tilawa Tour :**
- Pas de système de thèmes dupliqués (bloom/serenity) — une seule identité visuelle
- Base de données Supabase pour le catalogue livres (pas uniquement localStorage)
- Comptes utilisateurs réels avec rôles (user / admin)
- Catalogue externe (livres, auteurs, avis) géré côté serveur

---

## Stack technique

| Composant | Technologie |
|---|---|
| Frontend | HTML statique + Tailwind CSS CDN + Vanilla JS |
| Déploiement | Cloudflare Pages (git push → auto-deploy) |
| Base de données | Supabase (PostgreSQL) |
| Auth | Supabase Auth — OTP 6 chiffres par email |
| Stockage images | Supabase Storage |
| Emails | Resend (confirmations, notifications, refus) |
| Icons | Material Symbols Outlined (Google CDN) |
| Fonts | Google Fonts |
| PWA | manifest.json + apple-mobile-web-app meta tags |

**Jamais de bundler, jamais de framework JS, jamais de npm run build.**
Tous les fichiers sont servis statiquement depuis la racine du repo.

---

## Workflow git / déploiement

```
Éditer fichiers dans le repo local
→ git add <fichiers> && git commit && git push
→ Cloudflare Pages déploie automatiquement
```

Si erreur SSL git : `git config --global http.sslBackend schannel`

---

## Design System

### Palette Maktaba Tour
```css
--color-primary:     #C96B8A;   /* Rose poudré profond */
--color-secondary:   #9B7FA6;   /* Mauve doux */
--color-accent:      #F0A87A;   /* Abricot chaud */
--color-bg:          #FFF5F7;   /* Blanc rosé — fond principal */
--color-card:        #F5F0FA;   /* Lavande très clair — fond cartes */
--color-text:        #3D1F2D;   /* Prune foncé */
--color-text-muted:  #8A6A7A;   /* Mauve gris — texte secondaire */
--color-border:      #E8D5DC;   /* Bordure douce */
--color-success:     #5B8A5F;   /* Vert validation */
--color-white:       #FFFFFF;
```

### Typographie
- **Titres** : Playfair Display (Google Fonts) — serif élégant
- **Corps** : DM Sans (Google Fonts) — lisible, moderne, doux
- **Arabe** : Amiri, dir="rtl" (si affiché)

### Import Google Fonts
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&family=Amiri&display=swap" rel="stylesheet">
```

### Icons
```html
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
```

### Navigation bottom fixe
Présente sur toutes les pages utilisateur (sauf admin et pages auth) :
```
Accueil | Catalogue | Favoris | Mon compte
```
Safe-area iOS : `padding-bottom: max(1.25rem, env(safe-area-inset-bottom))`

### Composants UI récurrents
- **Carte livre** : cover image + titre + auteur + note étoiles + badge âge
- **Badge** : pill arrondi (âge, thème, langue, type édition)
- **Bouton primaire** : fond `--color-primary`, texte blanc, border-radius 12px
- **Bouton secondaire** : bordure `--color-primary`, fond transparent
- **Input** : bordure `--color-border`, focus ring `--color-primary`, border-radius 10px
- **Toast/notification** : apparaît en bas, disparaît après 3s

---

## Architecture des pages

### Pages publiques (sans connexion)
| Fichier | Route | Rôle |
|---|---|---|
| `index.html` | `/` | Home : hero + livres en vedette + derniers ajouts |
| `catalogue.html` | `/catalogue.html` | Liste complète avec filtres + recherche |
| `livre.html` | `/livre.html?slug=xxx` | Fiche livre détaillée + avis |
| `auteur.html` | `/auteur.html?slug=xxx` | Fiche auteur + ses livres |
| `soumettre.html` | `/soumettre.html` | Formulaire soumission auteur |
| `a-propos.html` | `/a-propos.html` | Histoire et mission du projet |

### Pages auth
| Fichier | Rôle |
|---|---|
| `login.html` | Auth Supabase OTP 6 chiffres (identique à Tilawa Tour) |
| `sync_check.html` | Guard : sync cloud → redirect (identique à Tilawa Tour) |

### Pages utilisateur connecté
| Fichier | Rôle |
|---|---|
| `compte.html` | Profil + favoris + liste de lecture + mes avis |

### Pages admin (rôle admin uniquement)
| Fichier | Rôle |
|---|---|
| `admin.html` | Dashboard stats |
| `admin-livres.html` | CRUD catalogue |
| `admin-soumissions.html` | Validation soumissions |
| `admin-avis.html` | Modération avis |
| `admin-utilisateurs.html` | Gestion comptes |

---

## Base de données Supabase

### Table : books
```sql
id           uuid PRIMARY KEY DEFAULT gen_random_uuid()
slug         text UNIQUE NOT NULL
title        text NOT NULL
author_id    uuid REFERENCES authors(id)
publisher    text
is_self_published boolean DEFAULT false
cover_url    text
interior_urls text[]        -- array d'URLs images intérieures
description  text
age_min      integer        -- ex: 3
age_max      integer        -- ex: 6
themes       text[]         -- ['ramadan','famille','prophetes']
language     text           -- 'fr' | 'fr-ar' | 'ar'
arabic_level text           -- 'none' | 'initiation' | 'intermediate'
purchase_url text           -- lien affilié Amazon ou direct
price        numeric
rating_avg   numeric        -- calculé, mis à jour à chaque avis
rating_count integer        -- calculé
status       text DEFAULT 'pending'  -- 'pending'|'approved'|'rejected'
submitted_by text           -- email auteur
created_at   timestamptz DEFAULT now()
updated_at   timestamptz DEFAULT now()
```

### Table : authors
```sql
id              uuid PRIMARY KEY DEFAULT gen_random_uuid()
slug            text UNIQUE NOT NULL
name            text NOT NULL
bio             text
photo_url       text
website         text
instagram       text
is_self_published boolean DEFAULT false
created_at      timestamptz DEFAULT now()
```

### Table : reviews
```sql
id           uuid PRIMARY KEY DEFAULT gen_random_uuid()
book_id      uuid REFERENCES books(id) ON DELETE CASCADE
user_id      uuid REFERENCES auth.users(id)
rating       integer CHECK (rating BETWEEN 1 AND 5)
title        text
body         text
child_age    integer
status       text DEFAULT 'pending'  -- 'pending'|'approved'|'rejected'
created_at   timestamptz DEFAULT now()
```

### Table : profiles
```sql
id           uuid PRIMARY KEY REFERENCES auth.users(id)
display_name text
avatar_url   text
role         text DEFAULT 'user'   -- 'user' | 'admin'
created_at   timestamptz DEFAULT now()
```

### Table : favorites
```sql
id        uuid PRIMARY KEY DEFAULT gen_random_uuid()
user_id   uuid REFERENCES auth.users(id)
book_id   uuid REFERENCES books(id)
created_at timestamptz DEFAULT now()
UNIQUE(user_id, book_id)
```

### Table : reading_list
```sql
id        uuid PRIMARY KEY DEFAULT gen_random_uuid()
user_id   uuid REFERENCES auth.users(id)
book_id   uuid REFERENCES books(id)
status    text   -- 'to_read' | 'reading' | 'read'
created_at timestamptz DEFAULT now()
UNIQUE(user_id, book_id)
```

### Table : submissions
```sql
id              uuid PRIMARY KEY DEFAULT gen_random_uuid()
title           text NOT NULL
author_name     text NOT NULL
author_email    text NOT NULL
publisher       text
is_self_published boolean
age_min         integer
age_max         integer
themes          text[]
language        text
purchase_url    text
description     text
cover_url       text
interior_urls   text[]
message         text
status          text DEFAULT 'pending'
admin_note      text
created_at      timestamptz DEFAULT now()
```

---

## Supabase Client

Fichier : `supabase-client.js` (à la racine, inclus dans toutes les pages)

```js
const SUPABASE_URL = 'https://XXXX.supabase.co';
const SUPABASE_ANON_KEY = 'XXXX';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Vérifier session active
async function getSession() {
  const { data: { session } } = await _supabase.auth.getSession();
  return session;
}

// Vérifier rôle admin
async function isAdmin() {
  const session = await getSession();
  if (!session) return false;
  const { data } = await _supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();
  return data?.role === 'admin';
}
```

---

## Auth — OTP 6 chiffres (identique Tilawa Tour)

```js
// Envoyer OTP
await _supabase.auth.signInWithOtp({ email: userEmail });

// Vérifier OTP
await _supabase.auth.verifyOtp({ email: userEmail, token: code, type: 'email' });
```

Template email Supabase : afficher uniquement `{{ .Token }}` (pas de lien magique).
OTP length dans Supabase Dashboard : 6 chiffres.

---

## Système de filtres catalogue

Filtres appliqués côté client sur les données chargées depuis Supabase :

```js
// Âge
const AGE_FILTERS = [
  { label: '0–3 ans', min: 0, max: 3 },
  { label: '3–6 ans', min: 3, max: 6 },
  { label: '6–9 ans', min: 6, max: 9 },
  { label: '9–12 ans', min: 9, max: 12 },
];

// Thèmes
const THEMES = ['ramadan','aid','prophetes','valeurs','famille','arabe','coran','nature','aventure','priere'];

// Langue
const LANGUES = ['fr','fr-ar','ar'];

// Niveau arabe
const ARABIC_LEVELS = ['none','initiation','intermediate'];

// Tri
const SORTS = ['rating','newest','title_az'];
```

---

## localStorage — clés Maktaba Tour

Données légères uniquement (pas le catalogue) :

| Clé | Type | Description |
|---|---|---|
| `maktaba_session` | JSON | Cache session Supabase |
| `maktaba_favorites` | JSON array | IDs livres favoris (cache local) |
| `maktaba_reading_list` | JSON array | {id, status} (cache local) |
| `maktaba_filters` | JSON | Filtres catalogue actifs |

---

## Modèle éditorial — Critères validation

### ✅ Accepté si :
- Contenu islamique authentique et sain
- Qualité d'illustration correcte
- Livre disponible à l'achat (Amazon, site auteur, boutique)
- En français ou bilingue français/arabe
- Ciblé enfants 0–12 ans

### ❌ Refusé si :
- Contenu théologiquement problématique
- Qualité visuelle insuffisante
- Livre introuvable ou épuisé
- Hors cible

### Process soumission :
1. Auteur soumet le formulaire `soumettre.html`
2. Insertion dans table `submissions` (status: pending)
3. Email automatique à l'admin via Resend
4. Admin valide dans `admin-soumissions.html`
5. Email auteur envoyé (accepté ou refus motivé)
6. Si accepté : création fiche dans `books` + `authors`

---

## Modèle économique

- **Affiliation Amazon** : paramètre `tag=maktabatour-21` ajouté aux liens Amazon
- **Liens directs auteurs** : sans affiliation, pour les auto-édités
- Afficher discrètement "lien affilié" sur les pages légalité

---

## Règles techniques critiques

Héritées de Tilawa Tour et adaptées :

- **Jamais de prompt()** → toujours des inputs inline
- **Jamais de toISOString()** pour les dates → `getFullYear/getMonth/getDate`
- **Jamais de données sensibles** dans le HTML côté client (clés Supabase = clé publique anon uniquement)
- **Guard admin** : vérifier `isAdmin()` en tête de chaque page admin → redirect si non
- **Guard utilisateur** : vérifier session en tête des pages compte → redirect login si non
- **Chargement données** : afficher skeleton/loading pendant les fetch Supabase
- **Erreurs Supabase** : toujours gérer les erreurs avec un message utilisateur clair
- **Images** : toujours attribut `alt` descriptif, `loading="lazy"` sur les images catalogue
- **Accessibilité** : boutons avec `aria-label`, inputs avec `label` associé
- **Mobile first** : toutes les pages doivent être parfaitement utilisables sur mobile
- `color-mix(in srgb, COLOR X%, transparent)` pour variations de couleur

---

## Structure de fichiers recommandée

```
/
├── index.html
├── catalogue.html
├── livre.html
├── auteur.html
├── soumettre.html
├── a-propos.html
├── login.html
├── sync_check.html
├── compte.html
├── admin.html
├── admin-livres.html
├── admin-soumissions.html
├── admin-avis.html
├── admin-utilisateurs.html
├── supabase-client.js
├── manifest.json
├── sw.js                    (service worker PWA)
├── Images/
│   └── logo.svg
└── assets/
    └── styles.css           (overrides Tailwind si nécessaire)
```

---

## PWA

`manifest.json` :
```json
{
  "name": "Maktaba Tour",
  "short_name": "Maktaba",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#FFF5F7",
  "theme_color": "#C96B8A",
  "icons": [
    { "src": "Images/logo.svg", "sizes": "any", "type": "image/svg+xml" }
  ]
}
```

---

## Checklist avant chaque push

- [ ] Page testée sur mobile (320px et 390px)
- [ ] Guard auth vérifié si page protégée
- [ ] Erreurs Supabase gérées
- [ ] Pas de console.error en prod
- [ ] Images avec alt + loading lazy
- [ ] Navigation bottom présente et fonctionnelle
- [ ] Footer présent : copyright + lien Instagram

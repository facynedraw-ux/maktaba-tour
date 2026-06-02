# Jumua Time — Architecture & Plan de développement

## Vision
Plateforme de référence francophone pour la découverte de livres jeunesse musulmans.
Modèle : curation éditoriale + communauté + affiliation.
Stack : React + Cloudflare (même base que Tilawa Tour)

---

## Palette & Identité visuelle
- **Primaire** : #1C3D2E (vert forêt profond)
- **Accent** : #C9A84C (or — cohérent avec Atayaa)
- **Fond** : #FAF7F2 (crème chaud)
- **Texte** : #1A1A1A
- **Secondaire** : #E8F4EC (vert très clair)
- **Typographie** : Titre → Playfair Display / Corps → DM Sans

---

## Architecture des pages

### Pages publiques
- `/` — Home : hero + livres en vedette + derniers ajouts + auteurs mis en avant
- `/catalogue` — Liste complète avec filtres
- `/livre/:slug` — Fiche livre détaillée
- `/auteur/:slug` — Fiche auteur
- `/soumettre` — Formulaire de soumission auteur
- `/a-propos` — Histoire du projet

### Pages utilisateur (compte)
- `/compte` — Profil + liste de lecture + favoris
- `/compte/avis` — Mes avis publiés

### Pages admin (accès restreint)
- `/admin` — Dashboard
- `/admin/livres` — Gestion catalogue
- `/admin/soumissions` — Validation soumissions
- `/admin/utilisateurs` — Gestion comptes
- `/admin/avis` — Modération avis

---

## Base de données

### Table : books
```
id (uuid)
slug (string, unique)
title (string)
author_id (uuid → authors)
publisher (string, nullable)
is_self_published (boolean)
cover_image_url (string)
interior_images (array of strings)
description (text)
age_min (integer) — ex: 3
age_max (integer) — ex: 6
themes (array) — ex: ["ramadan", "famille", "prophètes"]
language (enum) — fr / fr-ar / ar
arabic_level (enum) — none / initiation / intermediate
purchase_url (string) — lien affilié Amazon ou direct auteur
price (decimal, nullable)
status (enum) — pending / approved / rejected
submitted_by (string) — email auteur
created_at / updated_at
```

### Table : authors
```
id (uuid)
slug (string, unique)
name (string)
bio (text)
photo_url (string, nullable)
website (string, nullable)
instagram (string, nullable)
is_self_published (boolean)
created_at
```

### Table : reviews
```
id (uuid)
book_id (uuid → books)
user_id (uuid → users)
rating (integer 1-5)
title (string)
body (text)
age_of_child (integer, nullable)
status (enum) — pending / approved / rejected
created_at
```

### Table : users
```
id (uuid)
email (string, unique)
display_name (string)
avatar_url (string, nullable)
role (enum) — user / admin
created_at
```

### Table : favorites
```
id (uuid)
user_id (uuid → users)
book_id (uuid → books)
created_at
```

### Table : reading_lists
```
id (uuid)
user_id (uuid → users)
book_id (uuid → books)
status (enum) — to_read / reading / read
created_at
```

### Table : submissions
```
id (uuid)
title (string)
author_name (string)
author_email (string)
publisher (string, nullable)
is_self_published (boolean)
age_min (integer)
age_max (integer)
themes (array)
language (enum)
purchase_url (string)
description (text)
interior_images (array)
cover_image_url (string)
message (text, nullable) — message libre de l'auteur
status (enum) — pending / approved / rejected
admin_note (text, nullable)
created_at
```

---

## Système de filtres (catalogue)

- **Âge** : 0-3 / 3-6 / 6-9 / 9-12 ans
- **Thèmes** : Ramadan / Aïd / Prophètes / Valeurs / Famille / Arabe / Coran / Nature / Aventure
- **Langue** : Français / Bilingue FR-AR / Arabe
- **Niveau arabe** : Sans arabe / Initiation / Intermédiaire
- **Type** : Maison d'édition / Auto-édité
- **Tri** : Mieux notés / Derniers ajouts / Titre A-Z

---

## Modèle économique

### Phase 1 — Affiliation
- Lien Amazon affilié sur chaque livre disponible Amazon
- Lien direct auteur pour auto-édités (pas d'affiliation mais goodwill)
- Objectif : couvrir les frais d'hébergement

### Phase 2 — Auteur Premium (V2)
- Fiche auteur enrichie avec bannière
- Mise en avant dans le catalogue
- Badge "Auteur vérifié"
- 5-10€/mois

### Phase 3 — Utilisateur Premium (V2)
- Listes de lecture illimitées
- Recommandations personnalisées
- Alertes nouveautés par thème

---

## Critères de validation éditoriale

### ✅ Accepté si :
- Contenu islamique authentique et sain
- Qualité d'illustration acceptable
- Livre disponible à l'achat (Amazon, site auteur, boutique)
- En français ou bilingue français/arabe

### ❌ Refusé si :
- Contenu théologiquement problématique
- Qualité visuelle insuffisante (protéger la réputation)
- Livre introuvable ou épuisé sans réédition prévue
- Hors cible (pas jeunesse, pas lié à l'islam)

### Process :
Soumission → notification admin → vérification 48-72h → email auteur (accepté ou refus motivé)

---

## Plan de développement

### Sprint 1 — Semaines 1-2 : Fondations
- Setup projet React + Cloudflare
- Base de données (Cloudflare D1 ou Supabase)
- Authentification (admin uniquement)
- Page catalogue avec filtres (données mockées)
- Fiche livre statique

### Sprint 2 — Semaines 3-4 : Catalogue vivant
- Intégration vraie base de données
- CRUD livres côté admin
- Fiche auteur
- Recherche full-text
- Upload images (Cloudflare R2)

### Sprint 3 — Semaines 5-6 : Communauté
- Inscription / connexion utilisateurs
- Système de notes et avis
- Modération avis côté admin
- Favoris et liste de lecture

### Sprint 4 — Semaines 7-8 : Soumissions & finitions
- Formulaire de soumission auteurs
- Dashboard admin soumissions
- Emails automatiques (accepté/refusé)
- SEO de base (meta, og:image, sitemap)
- Tests sur mobile

### Sprint 5 — Semaine 9 : Contenu & lancement
- Intégration des 50-100 premiers livres
- Tests communauté (10-20 mamans)
- Corrections
- Lancement beta

---

## Stack technique recommandée

- **Frontend** : React + Vite + TailwindCSS
- **Déploiement** : Cloudflare Pages
- **Base de données** : Supabase (PostgreSQL) — plus adapté que D1 pour ce volume
- **Auth** : Supabase Auth
- **Images** : Cloudflare R2 ou Supabase Storage
- **Emails** : Resend (simple, gratuit jusqu'à 3000/mois)
- **Affiliation** : Amazon Partenaires + liens directs

---

## Métriques de succès à 6 mois

- 500 livres référencés
- 1 000 utilisateurs inscrits
- 50 avis publiés
- 100 auteurs référencés
- Premiers revenus affiliation > frais hébergement

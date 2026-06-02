---
name: Jumua Time
description: Le catalogue de référence des livres jeunesse islamiques en français
colors:
  rose-pivoine: "#C96B8A"
  mauve-ardoise: "#9B7FA6"
  abricot-chaud: "#F0A87A"
  prune-encre: "#3D1F2D"
  blanc-rose: "#FFF5F7"
  lavande-pale: "#F5F0FA"
  mauve-cendre: "#7A5A6A"
  rose-cendre: "#E8D5DC"
  vert-validation: "#5B8A5F"
  blanc-pur: "#FFFFFF"
  prune-nuit: "#3D1F2D"
typography:
  display:
    fontFamily: "'Playfair Display', Georgia, serif"
    fontSize: "clamp(2rem, 5vw + 1rem, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "normal"
  headline:
    fontFamily: "'Playfair Display', Georgia, serif"
    fontSize: "1.953rem"
    fontWeight: 700
    lineHeight: 1.2
  title:
    fontFamily: "'Playfair Display', Georgia, serif"
    fontSize: "1.563rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "'DM Sans', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'DM Sans', system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.08em"
rounded:
  pill: "20px"
  card: "16px"
  btn: "12px"
  input: "10px"
  sm: "8px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  section: "48px"
  page-max: "1024px"
components:
  button-primary:
    backgroundColor: "{colors.rose-pivoine}"
    textColor: "{colors.blanc-pur}"
    rounded: "{rounded.btn}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "#b55a78"
    textColor: "{colors.blanc-pur}"
    rounded: "{rounded.btn}"
    padding: "12px 24px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.rose-pivoine}"
    rounded: "{rounded.btn}"
    padding: "11px 24px"
  filter-pill:
    backgroundColor: "{colors.blanc-pur}"
    textColor: "{colors.mauve-cendre}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  filter-pill-active:
    backgroundColor: "{colors.rose-pivoine}"
    textColor: "{colors.blanc-pur}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  book-card:
    backgroundColor: "{colors.blanc-pur}"
    rounded: "{rounded.card}"
    padding: "12px"
  badge-theme:
    backgroundColor: "{colors.lavande-pale}"
    textColor: "{colors.mauve-ardoise}"
    rounded: "{rounded.pill}"
    padding: "3px 10px"
  input-field:
    backgroundColor: "{colors.blanc-pur}"
    textColor: "{colors.prune-encre}"
    rounded: "{rounded.input}"
    padding: "12px 16px 12px 44px"
---

# Design System: Jumua Time

## 1. Overview

**Creative North Star: "La Libraire de Confiance"**

Jumua Time se comporte comme une libraire indépendante qui connaît chaque livre de son fond, recommande avec expertise et chaleur, et ne vend jamais à la dure. Le système de design traduit cette posture : chaleureux sans être sucré, éditorial sans être froid, fiable sans être ennuyeux. Chaque décision visuelle — couleur retenue, serif élégant, espace généreux — sert la même intention : mettre la maman en confiance avant même qu'elle lise un titre.

La palette est dominée par du rose pivoine poudré, mauve ardoise, et abricot chaud, sur fond blanc légèrement rosé. Ces teintes évoquent un intérieur de librairie bien tenu : tissus doux, bois clair, lumière de l'après-midi. La couleur est présente mais jamais saturée au premier plan ; elle est le contexte, pas le message.

La typo Playfair Display pour les titres apporte la lisibilité éditoriale d'un catalogue imprimé. DM Sans, géométrique et aérée, assure la lisibilité mobile. Les deux forment un couple séculaire : le serif donne l'autorité, le sans-serif donne l'accessibilité.

**Ce système rejette explicitement :**
- Le marketplace froid (Amazon) : densité de grille, logique de conversion, aucun espace blanc
- Le site islamique lourd : ornements arabes génériques, palette sombre, interface austère
- Le SaaS blanc générique : palette gris/blanc, CTAs impersonnels, zéro chaleur
- Le blog maman trop pastel : tout rose, plat, sans hiérarchie typographique

**Key Characteristics:**
- Palette à 3 rôles : accent (rose pivoine), support (mauve ardoise + abricot), neutre (blancs rosés + prune)
- Typo éditoriale : Playfair Display pour l'autorité, DM Sans pour la lisibilité
- Rayon d'angle cohérent : pilules (20px) — cartes (16px) — boutons (12px) — inputs (10px)
- Élévation plate par défaut, ombre expressive au survol uniquement
- Mobile first : bottom nav fixe, carousels scroll-snap, touch targets 44px+

## 2. Colors: La Palette Librairie

Trois familles : accent chaud (rose, mauve, abricot), neutres rosés (fonds et bordures), encre foncée (texte). Jamais de gris pur ; chaque neutre contient une pointe de mauve ou de rose.

### Primary
- **Rose Pivoine Poudré** (`#C96B8A`): La couleur signature. Boutons primaires, liens actifs, bordures de focus, icônes d'action. Présente sur ≤15% de chaque écran. Son absence est aussi importante que sa présence.
- **Mauve Ardoise** (`#9B7FA6`): Accents secondaires — badges thème, textes d'auteur secondaires, éléments de navigation en état actif sur les pages annuaire.
- **Abricot Chaud** (`#F0A87A`): Étoiles de notation et highlights rares. Ne jamais utiliser en fond étendu ; son rôle est l'accentuation ponctuelle.

### Neutral
- **Blanc Rosé** (`#FFF5F7`): Fond de page principal. Légèrement teinté rose pour refuser la froideur du blanc pur.
- **Lavande Pâle** (`#F5F0FA`): Fond des cartes. Distingue les contenants du fond de page sans contraste agressif.
- **Rose Cendré** (`#E8D5DC`): Toutes les bordures et séparateurs. Doux, jamais dur.
- **Mauve Cendré** (`#7A5A6A`): Texte secondaire, liens nav, labels muted. Contraste 5.1:1 sur fond blanc rosé — WCAG AA respecté.
- **Prune Encre** (`#3D1F2D`): Texte principal, titres, headings. Contraste élevé sur tous les fonds clairs.
- **Vert Validation** (`#5B8A5F`): États de succès uniquement. Ne jamais utiliser comme accent décoratif.

### Named Rules
**La Règle du Murmure.** Le rose pivoine murmure, il ne crie pas. Au maximum 15% de surface par écran. Les erreurs les plus fréquentes : boutons rose en cascade, fond rose sur card, border + texte + icône tous en rose sur le même composant. Choisissez un seul vecteur par élément.

**La Règle du Neutre Teinté.** Aucun gris pur dans ce système. Chaque neutre penche vers le mauve ou le rose. `#888888` est interdit ; `#7A5A6A` est le minimum.

## 3. Typography: La Paire Éditoriale

**Display Font:** Playfair Display (avec fallback Georgia, serif)
**Body Font:** DM Sans (avec fallback system-ui, sans-serif)

**Caractère :** Playfair Display apporte l'autorité du titre de catalogue imprimé — serif élégant, italic expressif. DM Sans est géométrique mais doux, lisible à 13px sur mobile. Le contraste entre les deux est celui d'une couverture de livre et de sa fiche produit intérieure.

### Hierarchy
- **Display** (700, `clamp(2rem, 5vw + 1rem, 3.5rem)`, lh 1.15): H1 hero uniquement. Fluide entre 320px et 1024px. L'italic en rose pivoine sur le slogan est la seule variation de couleur autorisée dans les headings.
- **Headline** (700, 1.953rem / ~31px, lh 1.2): H2 sections principales (Livres en vedette, Auteurs à découvrir).
- **Title** (600, 1.563rem / ~25px, lh 1.3): H3, titres de fiches, sous-sections. Playfair Display semibold.
- **Body** (400, 1rem / 16px, lh 1.6): Tout le corps de texte. `max-width: 70ch` sur les blocs de prose. DM Sans regular.
- **Label** (500-600, 0.75–0.875rem / 12–14px, ls 0.05–0.08em en cas d'uppercase): Badges, pills, meta, breadcrumbs. DM Sans medium.

### Named Rules
**La Règle du Serif Réservé.** Playfair Display apparaît uniquement dans les headings (h1–h3), le logo header, et les pull quotes. Jamais en corps de texte, jamais dans les boutons, jamais dans les badges. DM Sans prend tout le reste.

**La Règle du Clamp Hero.** Le h1 est le seul élément avec une taille fluide (`clamp()`). Tous les autres headings utilisent des tailles fixes en rem avec au plus une variation breakpoint (md:).

## 4. Elevation

Ce système est **plat par défaut et expressif au survol**. Les surfaces au repos n'ont aucune ombre. L'ombre apparaît exclusivement comme réponse à l'état (hover, focus, élévation sémantique). Cette distinction est fonctionnelle : une ombre au repos implique une hiérarchie ; une ombre au hover implique une réaction.

### Shadow Vocabulary
- **Hover card** (`0 8px 24px rgba(201,107,138,0.12)`): Cartes livre, cartes auteur au survol. Teintée rose pivoine à 12% d'opacité — la couleur de l'ombre renforce l'identité de marque.
- **Hover book card** (`0 12px 32px rgba(201,107,138,0.15)`): Version légèrement plus prononcée pour les cartes livre pleine taille.
- **Frosted stat** (`backdrop-blur-sm` + `bg-white/80`): Réservé aux 3 cartes de statistiques flottantes dans le hero desktop. Glassmorphism délibéré et localisé — pas un pattern général.

### Named Rules
**La Règle du Plat-par-Défaut.** Si un élément n'est pas interactif ou en état élevé, il ne porte aucune ombre. Les cards ont une bordure (`#E8D5DC`) au repos, une ombre rose au survol. Cette progression est la règle ; l'exception doit être justifiée.

## 5. Components

### Buttons

Tactilement confiants, jamais agressifs.

- **Shape:** Gently rounded (12px radius) — plus doux qu'un carré, moins ambigu qu'une pilule.
- **Primary:** Fond `#C96B8A`, texte blanc, padding `12px 24px`, font DM Sans 600 15px. Hover : `#b55a78`, transition 0.2s.
- **Focus:** `outline: 2px solid #C96B8A; outline-offset: 2px` — visible pour l'accessibilité clavier.
- **Secondary:** Bordure 1.5px `#C96B8A`, fond transparent, texte `#C96B8A`. Hover : fond `#FFF5F7`.
- **Text link:** Pas de fond ni bordure, texte `#7A5A6A`, hover `#C96B8A`. Utilisé pour les actions secondaires dans le hero.

### Filter Pills / Chips

- **Style:** Bordure 1.5px `#E8D5DC`, fond blanc, texte `#7A5A6A`, radius 20px (pilule complète), padding `8px 16px`.
- **Active:** Fond `#C96B8A`, texte blanc, bordure `#C96B8A`. Transition all 0.15s.
- **Hover (inactif):** Bordure `#C96B8A`, texte `#C96B8A`.

### Cards

Contenant universel du catalogue.

- **Corner Style:** Gently rounded (16px — `rounded-2xl`)
- **Background:** Blanc pur pour les cartes livre ; Lavande Pâle (`#F5F0FA`) pour les cartes méta (auteurs, catégories).
- **Shadow Strategy:** Aucune ombre au repos. `0 8–12px rgba(rose)` au hover. (Voir Elevation)
- **Border:** `1px solid #E8D5DC` au repos. Disparaît visuellement au hover (l'ombre prend le relais).
- **Internal Padding:** `p-4` (16px) pour les cartes compactes ; `p-5`–`p-6` (20–24px) pour les cartes détail.
- **Image couverture:** `aspect-ratio: 3/4`, `object-fit: contain`, fond `#F5F0FA`. Ne jamais `object-fit: cover` sur les couvertures de livres — les proportions varient.

### Inputs / Fields

- **Style:** Fond blanc, bordure 1.5px `#E8D5DC`, radius 10–14px. Padding `12px 16px` (avec icône gauche : `12px 16px 12px 44px`).
- **Focus:** Bordure `#C96B8A`, transition 0.2s. Aucun outline supplémentaire.
- **Placeholder:** Couleur `#7A5A6A` (contraste 5.1:1 — WCAG AA).
- **Label sr-only:** Tous les inputs ont un `<label>` associé via `for`/`id`. Si non visible, classe `.sr-only` obligatoire.

### Navigation

- **Header desktop:** Sticky, fond blanc/90 avec backdrop-blur-sm, hauteur 64px. Logo (image + texte Playfair Display) à gauche, liens texte DM Sans 500 14px couleur `#7A5A6A`, hover `#C96B8A`.
- **Dropdown Annuaires:** Position absolute, fond blanc, bordure `#E8D5DC`, radius 12px, shadow légère. `aria-expanded` + `aria-haspopup="menu"` sur le bouton déclencheur.
- **Bottom nav mobile:** Fixe en bas, 5 colonnes égales, icônes Material Symbols + label 11px. `padding-bottom: max(1.25rem, env(safe-area-inset-bottom))` pour iOS safe area.

### Book Card (Signature Component)

La carte livre est la pièce centrale du catalogue — elle doit transmettre les critères de choix des mamans en 2 secondes.

- Couverture `3/4` aspect-ratio, `object-contain`, fond lavande pâle
- Titre en Playfair Display semibold 14px
- Auteur en DM Sans 400 12px couleur muted
- Étoiles en abricot chaud, count en gris, résumé tronqué
- Badges âge, thème, langue en pilule colorée
- Hover: `translateY(-4px)` + ombre rose — signale la clicabilité sans affordance statique

### Featured Testimonial (Signature Component)

Le témoignage vedette casse le pattern de 3 cartes identiques.

- Fond `#FFF0F4` (rose clair, non-blanc — distinct du fond page)
- Guillemet typographique Playfair Display 80px couleur `#E8B0C0` (light pivoine)
- Corps en Playfair Display italic 18px, couleur prune encre — pas muted, c'est la voix principale
- Les 2 témoignages secondaires sont en DM Sans 14px muted, cards lavande pâle — hierarchie claire

## 6. Do's and Don'ts

### Do:

- **Do** utiliser `#C96B8A` comme seule couleur d'action : boutons, links, focus rings, états actifs. Une couleur d'action, une seule.
- **Do** respecter la hiérarchie serif/sans-serif : Playfair Display pour les headings, DM Sans pour tout le reste sans exception.
- **Do** ajouter `aria-label` sur chaque bouton icône, `<label>` (visible ou `.sr-only`) sur chaque `<input>`.
- **Do** appliquer `aspect-ratio: 3/4` + `object-contain` + fond `#F5F0FA` sur toutes les couvertures de livres.
- **Do** utiliser `text-wrap: balance` sur h1–h3 et `text-wrap: pretty` sur les blocs de prose.
- **Do** conserver `prefers-reduced-motion` sur chaque animation : `animation: none !important; opacity: 1 !important;`
- **Do** limiter les hero actions à 1 CTA primaire + 1 lien texte secondaire. La surcharge du hero est la principale cause de rebond.

### Don't:

- **Don't** utiliser `#C96B8A` comme fond de section étendu. Le rose pivoine est une couleur d'accent, pas un fond. Exception unique : le bloc CTA "Rejoindre le catalogue" (`#C96B8A` sur fond sombre — usage délibéré).
- **Don't** créer des grilles de 3 cartes identiques. Si 3 témoignages/auteurs ont la même structure, taille et couleur, le design échoue. Différencier par hiérarchie (1 vedette + 2 secondaires).
- **Don't** placer un eyebrow `✦ ...` (uppercase tracké) sur chaque section. Un seul par page, dans la zone hero uniquement.
- **Don't** utiliser `object-fit: cover` sur les couvertures de livres — les proportions 3/4 sont rares et varient par titre ; `object-contain` sur fond lavande est obligatoire.
- **Don't** mélanger `text-muted` hard-codé (`#8A6A7A`) avec le token `mauve-cendre` (`#7A5A6A`). La valeur corrigée pour WCAG AA est `#7A5A6A` — ne pas revenir à l'ancienne.
- **Don't** reproduire les anti-références de la stratégie : marketplace froide type Amazon, ornementation islamique générique, palette gris/blanc SaaS, blog maman tout rose sans hiérarchie.
- **Don't** afficher plus de 2 CTAs primaires côte à côte. Un btn-primary + un btn-secondary maximum. Au-delà : remplacer par un lien texte.
- **Don't** utiliser de gradient text (`background-clip: text`). Interdit. Emphase via poids ou taille uniquement.
- **Don't** utiliser `z-index: 999` ou `9999`. Échelle sémantique : dropdown (50) → sticky (40) → modal-backdrop (200) → modal (300) → toast (400).

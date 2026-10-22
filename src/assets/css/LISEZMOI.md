# Système de design IDAaaS — notes d'intégration

## Où est quoi

| Fichier | Rôle |
|---|---|
| `main.css` | point d'entrée, fixe l'ordre des couches |
| `theme.css` | **toutes les valeurs** : couleurs, tailles, espacements, rayons |
| `base.css` | polices auto-hébergées, remise à zéro, accessibilité |
| `components.css` | boutons, champs, cartes, en-tête, pied de page |
| `accueil.css` | ce qui n'existe que sur la page d'accueil |

## Trois règles à ne pas enfreindre

**1. Aucune valeur en dur dans un composant.**
Tout passe par `theme.css`. Le site est réduit globalement par `--ui-scale: .7` ;
une valeur codée en dur échappe à cette réduction et casse le rendu. C'est l'erreur
la plus fréquente sur ce projet — marges d'en-tête, ombres de boutons, pas du
quadrillage y sont tous passés.

**2. Le CSS écrit à la main va dans `@layer`.**
Du CSS hors couche l'emporte sur *toutes* les couches, utilitaires Tailwind compris.
Un `h2 { margin: 0 }` laissé hors couche annulait silencieusement le centrage des
titres de section.

**3. Les `max-width` en `ch` se posent sur l'élément qui porte la police.**
`20ch` sur un conteneur ne vaut rien si le titre à l'intérieur a une autre taille :
les deux grandissent à des rythmes différents et le titre finit par déborder d'une
ligne en agrandissant la fenêtre.

## Les valeurs fluides

Forme : `clamp(min, base + pente·vw, max)`, interpolée entre 390 px et 1920 px.
Elles sont **calculées, pas estimées** — relevées sur les deux gabarits d'origine
(1920 px desktop / 390 px mobile) :

```
pente = (valeur@1920 − valeur@390) / (1920 − 390)
base  = valeur@390 − pente × 390
```

Les `max(…)` sont des planchers de lisibilité : la taille ne descend jamais
sous le seuil, même avec `--ui-scale` réduit.

## Deux points de rupture, pas plus

- **1000 px** — l'accordéon passe d'horizontal à vertical, le menu passe en burger.
- **820 / 560 px** — le pied de page passe en 2 × 2 puis réorganise ses zones.

Entre les deux, rien ne « saute » : l'en-tête rétrécit progressivement via
`--entete-*`, ce qui évite la bascule brutale en menu burger vers 1200 px.

⚠️ L'accordéon a **deux formes** qui ne partagent presque rien. En colonne, l'axe
principal du flex est la hauteur : sans `flex: 0 0 auto`, les cartes sont écrasées
à 2 px de haut par la base `flex: 1 1 0` de la version horizontale.

## Ce qui a été modifié hors de `src/`

- `vite.config.ts` — ajout de l'alias `@` → `src/`
- `tsconfig.json` — `paths` correspondant, et `"node"` dans `types`
- `package.json` — ajout de `@types/node` (dev uniquement, requis par l'alias)

## Contenu

Tout le texte de la page est dans `src/data/accueil.ts`, et nulle part ailleurs.
La forme de ce fichier est volontairement celle que devra prendre le modèle de
contenu Strapi : au branchement du CMS, on remplace l'import par un appel à
l'API et les composants ne bougent pas.

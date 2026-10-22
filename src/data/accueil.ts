/* ==========================================================================
   IDAaaS — contenu de la page d'accueil (FR)
   --------------------------------------------------------------------------
   Tout le texte de la page est ici, et nulle part ailleurs. Les composants
   ne contiennent que de la mise en forme.

   C'est volontaire : la forme de ce fichier est la forme que devra prendre
   le modèle de contenu Strapi. Quand on branchera le CMS, on remplacera
   l'import de ce fichier par un appel à l'API — les composants, eux, ne
   bougeront pas d'une ligne.
   ========================================================================== */

export interface LienNav { libelle: string; href: string }

export interface Promesse {
  num: string
  titre: string
  kicker: string
  texte: string
  lien: string
  /** teinte de la carte ouverte — voir .promise--* dans accueil.css */
  teinte: 'olive' | 'pink' | 'orange' | 'sand' | 'orange-deep'
  /** le seul mot qui change d'une carte à l'autre dans le code qui défile */
  endpoint: string
}

export interface Atout {
  icone: string
  titre: string
  texte: string
  chiffres: string
  teinte: 'olive' | 'pink' | 'orange'
}

export const navPrincipale: LienNav[] = [
  { libelle: 'Technologie', href: '/technologie' },
  { libelle: 'Solutions',   href: '/solutions' },
  { libelle: 'AdTech',      href: '/adtech' },
  { libelle: 'À propos',    href: '/a-propos' },
  { libelle: 'Contact',     href: '/contact' },
]

export const navPied = [
  {
    intitule: 'Produit',
    liens: [
      { libelle: 'Technologie', href: '/technologie' },
      { libelle: 'Solutions',   href: '/solutions' },
      { libelle: 'AdTech',      href: '/adtech' },
    ],
  },
  {
    intitule: 'Entreprise',
    liens: [
      { libelle: 'À propos', href: '/a-propos' },
      { libelle: 'Contact',  href: '/contact' },
    ],
  },
]

export const hero = {
  eyebrow: "Démocratiser l'IA",
  titreLigne1: "L'IA prédictive en flux :",
  titreLigne2: 'accessible, autonome, souveraine, frugale, toujours à jour.',
  champPlaceholder: 'Que peut faire IDAaaS pour moi ?',
  /** le champ se « tape » tout seul en boucle avec ces phrases */
  champPhrases: [
    'Que peut faire IDAaaS pour moi ?',
    "Optimiser mes enchères à l'instant T ?",
    "Détecter une fraude dès qu'elle apparaît ?",
    'Personnaliser sur événement, pas sur profil ?',
    'Scorer le risque sans stocker de données ?',
  ],
  cta: { libelle: 'Parlons-nous', href: '/contact' },
  /** les lignes qui montent par-dessus l'illustration */
  flux: [
    [{ t: 'POST ' }, { t: '/v1/predict', c: 'key' }],
    [{ t: '{ "event": "stream", "features": 42 }' }],
    [{ t: '// apprentissage en flux', c: 'note' }],
    [{ t: '200 OK · 3.8 ms' }],
    [{ t: '{ "score": 0.9137 · drift 0.00 }' }],
    [{ t: '0 donnée conservée', c: 'note' }],
  ],
  pastilles: [
    { modif: 'rgpd',       valeur: '100 %',      legende: 'RGPD & IA Act',    derive: 1 },
    { modif: 'gpu',        valeur: '0',          legende: 'GPU',              derive: 1.2 },
    { modif: 'predictive', valeur: 'Prédictive', legende: '',                 derive: 0.8 },
    { modif: 'data',       valeur: '0',          legende: 'donnée conservée', derive: 1 },
  ],
}

export const promesses = {
  eyebrow: 'Nos solutions',
  titreLigne1: 'Votre décision',
  titreLigne2: "a son moteur d'IA",
  cartes: <Promesse[]>[
    {
      num: '01', titre: 'Optimisation', teinte: 'olive', endpoint: 'optimize',
      kicker: 'Décision temps réel',
      texte: "Ajuster une enchère, un prix, une ressource à l'instant où la décision compte.",
      lien: '/solutions',
    },
    {
      num: '02', titre: 'Détection', teinte: 'pink', endpoint: 'detect',
      kicker: 'Surveillance en continu',
      texte: "Repérer une fraude, une anomalie, un risque au moment où il apparaît.",
      lien: '/solutions',
    },
    {
      num: '03', titre: 'Personnalisation', teinte: 'orange', endpoint: 'personalize',
      kicker: 'Sur événement',
      texte: 'Réagir à ce que fait un client en temps réel, pas à un profil figé.',
      lien: '/solutions',
    },
    {
      num: '04', titre: 'Scoring & risque', teinte: 'sand', endpoint: 'score',
      kicker: 'Sur flux',
      texte: 'Évaluer un crédit, un lead, un churn en continu, à mesure des signaux.',
      lien: '/solutions',
    },
    {
      num: '05', titre: 'Segmentation', teinte: 'orange-deep', endpoint: 'segment',
      kicker: 'Ciblage dynamique',
      texte: 'Ajuster un ciblage à la volée plutôt que de le recalculer par lots.',
      lien: '/solutions',
    },
  ],
}

export const piliers = {
  eyebrow: 'Ce qui nous différencie',
  titre: 'Ce que notre architecture change pour vous',
  cartes: <Atout[]>[
    {
      icone: 'icone-toujours-a-jour.b5ac1ba8.svg', teinte: 'olive',
      titre: 'Toujours à jour',
      texte: "Pas de staleness : vos décisions reflètent la réalité du moment, pas celle d'hier. Les modèles apprennent à chaque événement. Zéro drift, zéro réentraînement planifié.",
      chiffres: "Latence d'apprentissage < 1 milliseconde · architecture distribuée scalable au-delà de 100 K apprentissages par seconde",
    },
    {
      icone: 'icone-souverain.7195b7d5.svg', teinte: 'pink',
      titre: 'Souverain & frugal',
      texte: 'Vos données ne quittent jamais votre périmètre. Aucune donnée stockée. RGPD natif. Zéro GPU.',
      chiffres: '0 donnée persistée · déploiement dans votre cloud · optimisation logicielle poussée pour CPU',
    },
    {
      icone: 'icone-accessible.8db86f3e.svg', teinte: 'orange',
      titre: 'Accessible',
      texte: "Pas besoin d'être un grand groupe pour faire du ML. Intégration en 2 semaines, zéro data scientist, service managé.",
      chiffres: 'Opérationnel en 2 semaines · 0 équipe data science côté client · paiement à l’usage',
    },
  ],
}

export const bandeauCta = {
  titre: 'Des modèles entraînés pour vous',
  cta: { libelle: 'Discutons de votre besoin', href: '/contact' },
}

export const pied = {
  signature: 'Frugale par nature,\nsouveraine par architecture.',
  accroche: "Un cas d'usage en tête ? Testons-le. Obtenez vos premières prédictions en 2 semaines.",
  email: 'sales@idaaas.com',
  contact: '/contact',
  linkedin: 'https://www.linkedin.com/company/idaaas/home/',
  mentions: { libelle: 'Mentions légales', href: '/mentions-legales' },
  copyright: '© IDAaaS 2026 — Bordeaux',
}

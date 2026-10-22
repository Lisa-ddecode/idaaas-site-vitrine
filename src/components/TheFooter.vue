<script setup lang="ts">
/* Pied de page commun.
   La grille 4 colonnes (5.1 / 2.4 / 3.5 / 6.6) tient jusqu'à 820 px, puis
   passe en 2 × 2 : les proportions du design sont conservées le plus
   longtemps possible au lieu d'empiler quatre bandes. */
import { navPied, pied } from '@/data/accueil'
import logo from '@/assets/img/logo-idaaas.f75433f6.svg'
import linkedin from '@/assets/img/logo-linkedin.a435a572.svg'
</script>

<template>
  <footer class="ida-footer">
    <div class="ida-footer__grid">

      <div class="ida-footer__brand">
        <a href="/" aria-label="Accueil IDAaaS">
          <img :src="logo" alt="IDAaaS" width="654" height="292" loading="lazy">
        </a>
        <p style="white-space: pre-line">{{ pied.signature }}</p>
      </div>

      <nav
        v-for="colonne in navPied" :key="colonne.intitule"
        class="ida-footer__nav" :aria-label="colonne.intitule"
      >
        <a v-for="lien in colonne.liens" :key="lien.href" :href="lien.href">{{ lien.libelle }}</a>
      </nav>

      <div class="ida-footer__contact">
        <p class="ida-footer__pitch">{{ pied.accroche }}</p>
        <div class="ida-footer__mailrow">
          <a class="ida-footer__mail" :href="`mailto:${pied.email}`">{{ pied.email }}</a>
          <a class="ida-footer__send" :href="pied.contact" aria-label="Nous contacter">
            <!-- viewBox élargi de l'épaisseur du trait : posés sur 0, les traits
                 seraient rognés de moitié et deviendraient invisibles en petit. -->
            <svg viewBox="-2 -2 67.68 65.78" aria-hidden="true">
              <g fill="none" stroke="currentColor" stroke-width="3.2">
                <line x1="0" y1="0" x2="63.68" y2="0" />
                <line x1="63.68" y1="61.78" x2="63.68" y2="0" />
                <line x1="0" y1="61.78" x2="61.78" y2="0" />
              </g>
            </svg>
          </a>
        </div>
      </div>

    </div>

    <div class="ida-footer__bottom">
      <a
        class="ida-footer__social" :href="pied.linkedin"
        target="_blank" rel="noopener" aria-label="IDAaaS sur LinkedIn"
      >
        <img :src="linkedin" alt="LinkedIn" width="55" height="54" loading="lazy">
      </a>
      <p class="ida-footer__legal">
        <span>{{ pied.copyright }}</span>
        <a :href="pied.mentions.href">{{ pied.mentions.libelle }}</a>
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
/* Bandeau kaki de fin de page. Le titre tient sur une ligne au-dessus
   de 700 px — c'est le parti pris du design. */
import { bandeauCta } from '@/data/accueil'
</script>

<template>
  <section class="ida-section" aria-labelledby="titre-cta">
    <div class="cta">
      <h2 id="titre-cta">{{ bandeauCta.titre }}</h2>
      <p>
        <a class="ida-btn" :href="bandeauCta.cta.href">{{ bandeauCta.cta.libelle }}</a>
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
/* Coquille du site : lien d'évitement, en-tête, contenu, pied de page.
   .ida-shell borne la largeur au canevas d'origine (1920 px) et garantit
   que le pied ne colle pas au bas de la fenêtre. */
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
import HomeView from '@/views/HomeView.vue'
</script>

<template>
  <a class="ida-skip" href="#contenu">Aller au contenu</a>

  <div class="ida-shell">
    <TheHeader page-courante="/" />
    <main id="contenu">
      <HomeView />
    </main>
    <TheFooter />
  </div>
</template>

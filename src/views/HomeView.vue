<script setup lang="ts">
/* Page d'accueil — elle ne fait qu'assembler les blocs.
   Chaque bloc sait se mettre en forme ; le texte vient de @/data/accueil. */
import HeroSection from '@/components/home/HeroSection.vue'
import PromisesSection from '@/components/home/PromisesSection.vue'
import FeaturesSection from '@/components/home/FeaturesSection.vue'
import CtaBand from '@/components/home/CtaBand.vue'
</script>

<template>
  <HeroSection />
  <PromisesSection />
  <FeaturesSection />
  <CtaBand />
</template>

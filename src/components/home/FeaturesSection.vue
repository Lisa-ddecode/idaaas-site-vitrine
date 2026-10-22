<script setup lang="ts">
/* « Ce qui nous différencie » — trois cartes colorées.
   La grille est volontairement plus étroite que la section (86 %) : les
   cartes respirent et gardent de la marge avec le bord du site. */
import { piliers } from '@/data/accueil'

/* Vite doit connaître les images à la compilation : on construit la table
   des URL une fois, plutôt que d'assembler un chemin à la volée. */
const icones = import.meta.glob('@/assets/img/*.svg', { eager: true, import: 'default' }) as Record<string, string>
const icone = (fichier: string) =>
  icones[Object.keys(icones).find(k => k.endsWith(`/${fichier}`))!]
</script>

<template>
  <section class="ida-section" aria-labelledby="titre-piliers">
    <div class="section__head">
      <p class="ida-eyebrow">{{ piliers.eyebrow }}</p>
      <h2 id="titre-piliers">{{ piliers.titre }}</h2>
    </div>

    <div class="feature-grid feature-grid--3">
      <article
        v-for="carte in piliers.cartes" :key="carte.titre"
        class="feature" :class="`feature--${carte.teinte}`"
      >
        <img :src="icone(carte.icone)" alt="" width="256" height="256" loading="lazy">
        <h3>{{ carte.titre }}</h3>
        <p>{{ carte.texte }}</p>
        <p class="feature__stat">{{ carte.chiffres }}</p>
      </article>
    </div>
  </section>
</template>

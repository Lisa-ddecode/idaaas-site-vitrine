<script setup lang="ts">
/* Hero : titre à gauche, illustration à droite.
   La trame quadrillée est dessinée par .hero::before — ancrée en haut à
   droite de la fenêtre, elle passe DERRIÈRE l'en-tête et s'estompe vers la
   gauche et vers le bas. Voir accueil.css. */
import { ref } from 'vue'
import { hero } from '@/data/accueil'
import { useTyper } from '@/composables/useTyper'
import { useDrift } from '@/composables/useDrift'
import illustration from '@/assets/img/hero-flux.a6376441.svg'

const champ = ref<HTMLInputElement | null>(null)
const art = ref<HTMLElement | null>(null)

useTyper(champ, hero.champPhrases)
useDrift(art)
</script>

<template>
  <section class="hero ida-section" aria-labelledby="titre-hero">
    <div class="hero__body">

      <div class="hero__text">
        <p class="ida-eyebrow">{{ hero.eyebrow }}</p>
        <h1 class="hero__title" id="titre-hero">
          <span>{{ hero.titreLigne1 }}</span><br>
          {{ hero.titreLigne2 }}
        </h1>

        <form class="hero__ask" action="/contact" method="get" role="search">
          <label class="ida-sr" for="question">Votre question</label>
          <span class="ida-input">
            <input
              ref="champ" type="text" id="question" name="q"
              :placeholder="hero.champPlaceholder"
            >
          </span>
        </form>

        <p class="hero__cta">
          <a class="ida-btn ida-btn--flat" :href="hero.cta.href">{{ hero.cta.libelle }}</a>
        </p>
      </div>

      <div class="hero__figure">
        <div class="hero__art" ref="art">
          <img :src="illustration" alt="" width="607" height="582" fetchpriority="high">

          <!-- Flux de requêtes : les lignes sont superposées au même point,
               seule l'animation les écarte. Les délais vont de -10s à 0s. -->
          <div class="hero__stream" aria-hidden="true">
            <div v-for="(ligne, i) in hero.flux" :key="i" class="hero__stream-line">
              <span><span
                v-for="(frag, j) in ligne" :key="j"
                :class="frag.c ? `hero__stream-${frag.c}` : undefined"
              >{{ frag.t }}</span></span>
            </div>
          </div>

          <p
            v-for="p in hero.pastilles" :key="p.modif"
            class="hero__badge" :class="`hero__badge--${p.modif}`"
            :data-drift="p.derive"
          >
            <b>{{ p.valeur }}</b><small v-if="p.legende">{{ p.legende }}</small>
          </p>
        </div>
      </div>

    </div>
  </section>
</template>

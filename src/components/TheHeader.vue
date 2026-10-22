<script setup lang="ts">
/* En-tête commun à toutes les pages.
   Au-dessus de 1000 px : logo + barre de menu + CTA + langues sur une ligne.
   En dessous : bouton hamburger, le menu passe sous la ligne.
   Les dimensions (--entete-*) rétrécissent progressivement avec la fenêtre,
   pour éviter la bascule brutale en menu burger. */
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { navPrincipale } from '@/data/accueil'
import logo from '@/assets/img/logo-idaaas.f75433f6.svg'

const props = defineProps<{ pageCourante?: string }>()

const large = ref(true)
const menuOuvert = ref(false)
let mq: MediaQueryList | undefined

function sync() {
  large.value = mq!.matches
  if (large.value) menuOuvert.value = false
}

onMounted(() => {
  mq = window.matchMedia('(min-width: 1000px)')
  mq.addEventListener('change', sync)
  sync()
})
onBeforeUnmount(() => mq?.removeEventListener('change', sync))
</script>

<template>
  <header class="ida-header ida-section">
    <a class="ida-header__logo" href="/" aria-label="Accueil IDAaaS">
      <img :src="logo" alt="IDAaaS" width="654" height="292">
    </a>

    <button
      class="ida-burger" type="button"
      :aria-expanded="menuOuvert"
      aria-controls="nav-principal"
      :aria-label="menuOuvert ? 'Fermer le menu' : 'Ouvrir le menu'"
      @click="menuOuvert = !menuOuvert"
    >
      <span />
    </button>

    <nav
      class="ida-nav" id="nav-principal"
      aria-label="Navigation principale"
      :hidden="!large && !menuOuvert"
    >
      <a
        v-for="lien in navPrincipale" :key="lien.href"
        :href="lien.href"
        :aria-current="props.pageCourante === lien.href ? 'page' : undefined"
      >{{ lien.libelle }}</a>
    </nav>

    <a class="ida-btn ida-btn--flat ida-header__cta" href="/contact">Parlons-nous</a>

    <p class="ida-lang">
      <span aria-current="true">FR</span>
      <span class="ida-lang__sep" aria-hidden="true" />
      <a href="/en/" hreflang="en" lang="en">EN</a>
    </p>
  </header>
</template>

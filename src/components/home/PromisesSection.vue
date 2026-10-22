<script setup lang="ts">
/* Accordéon des promesses.
   Au-dessus de 1000 px : horizontal. La carte ouverte s'élargit (rapport
   892/203 relevé sur le design) et le titre des cartes repliées se lit à la
   verticale. En dessous : accordéon vertical classique avec bascule − / +.
   La carte s'ouvre au survol sur grand écran, au clic partout. */
import { ref } from 'vue'
import { promesses } from '@/data/accueil'

const ouverte = ref(0)

const large = () => window.matchMedia('(min-width: 1000px)').matches

function basculer(i: number) {
  // sur petit écran, un second clic referme ; sur grand écran, une carte
  // reste toujours ouverte — sinon l'accordéon se retrouve vide.
  if (ouverte.value === i && !large()) ouverte.value = -1
  else ouverte.value = i
}

function auSurvol(i: number) {
  if (large()) ouverte.value = i
}

function auClavier(e: KeyboardEvent, i: number) {
  const n = promesses.cartes.length
  let cible: number | null = null
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') cible = i + 1
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') cible = i - 1
  if (e.key === 'Home') cible = 0
  if (e.key === 'End') cible = n - 1
  if (cible === null || cible < 0 || cible >= n) return
  e.preventDefault()
  ouverte.value = cible
  const boutons = (e.currentTarget as HTMLElement)
    .closest('[data-promises]')!
    .querySelectorAll<HTMLButtonElement>('.promise__toggle')
  boutons[cible].focus()
}

/* Le flux de code qui défile : 8 lignes, répétées 8 fois.
   La piste est dupliquée puis translatée de -50 %, ce qui rend la boucle
   invisible. Seul l'endpoint change d'une carte à l'autre. */
function pisteCode(endpoint: string) {
  const motif = [
    [{ t: 'POST ' }, { t: '/v1/', c: 'path' }, { t: endpoint, c: 'val' }],
    [{ t: '{ ' }, { t: '"event"', c: 'key' }, { t: ': ' }, { t: '"stream"', c: 'val' }, { t: ',' }],
    [{ t: '  ' }, { t: '"features"', c: 'key' }, { t: ': ' }, { t: '42', c: 'num' }, { t: ' }' }],
    [{ t: '// apprentissage en flux', c: 'note' }],
    [{ t: '200 OK · ' }, { t: '3.8 ms', c: 'num' }],
    [{ t: '{ ' }, { t: '"score"', c: 'key' }, { t: ': ' }, { t: '0.9137', c: 'num' }, { t: ' }' }],
    [{ t: 'drift : ' }, { t: '0.00', c: 'num' }],
    [{ t: 'stream: learning ' }, { t: '▮', c: 'num' }],
  ]
  return Array.from({ length: 8 }, () => motif).flat()
}
</script>

<template>
  <section class="ida-section" aria-labelledby="titre-promesses">
    <div class="promises__head">
      <p class="ida-eyebrow">{{ promesses.eyebrow }}</p>
      <h2 id="titre-promesses">{{ promesses.titreLigne1 }}<br>{{ promesses.titreLigne2 }}</h2>
    </div>

    <div class="promises" data-promises>
      <article
        v-for="(carte, i) in promesses.cartes" :key="carte.num"
        class="promise" :class="`promise--${carte.teinte}`"
        :data-open="ouverte === i ? '' : undefined"
      >
        <h3 class="promise__title">
          <button
            class="promise__toggle" type="button"
            :aria-expanded="ouverte === i"
            :aria-controls="`promesse-${carte.num}`"
            @click="basculer(i)"
            @mouseenter="auSurvol(i)"
            @keydown="auClavier($event, i)"
          >
            <span class="promise__num">{{ carte.num }}</span>
            <span class="promise__label">{{ carte.titre }}</span>
          </button>
        </h3>

        <div class="promise__panel" :id="`promesse-${carte.num}`">
          <div>
            <p class="promise__kicker">{{ carte.kicker }}</p>
            <p class="promise__body">{{ carte.texte }}</p>
            <a class="promise__more" :href="carte.lien">
              En savoir plus<span class="ida-sr"> — {{ carte.titre }}</span>
            </a>
          </div>

          <div class="promise__code" aria-hidden="true">
            <div class="promise__code-track">
              <span v-for="(ligne, j) in pisteCode(carte.endpoint)" :key="j">
                <span
                  v-for="(frag, k) in ligne" :key="k"
                  :class="frag.c ? `tok-${frag.c}` : undefined"
                >{{ frag.t }}</span>
              </span>
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

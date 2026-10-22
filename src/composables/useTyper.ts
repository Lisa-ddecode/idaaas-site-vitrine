import { onBeforeUnmount, onMounted, type Ref } from 'vue'

/* Fait « taper » les phrases en boucle dans le placeholder d'un champ.
   S'arrête dès que la personne clique dans le champ — on ne lui écrit pas
   par-dessus. Désactivé si le système demande moins d'animations. */
export function useTyper(champ: Ref<HTMLInputElement | null>, phrases: string[]) {
  let timer: number | undefined

  onMounted(() => {
    const input = champ.value
    if (!input || !phrases.length) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let i = 0, pos = 0, mode: 'ecrit' | 'efface' = 'ecrit'

    const pas = () => {
      const phrase = phrases[i]
      if (mode === 'ecrit') {
        pos++
        input.placeholder = phrase.slice(0, pos) + (pos < phrase.length ? '|' : '')
        if (pos >= phrase.length) { mode = 'efface'; timer = window.setTimeout(pas, 1600); return }
        timer = window.setTimeout(pas, 30)
      } else {
        pos--
        input.placeholder = phrase.slice(0, pos) + '|'
        if (pos <= 0) {
          mode = 'ecrit'
          i = (i + 1) % phrases.length
          timer = window.setTimeout(pas, 220)
          return
        }
        timer = window.setTimeout(pas, 14)
      }
    }

    input.addEventListener('focus', () => { clearTimeout(timer); input.placeholder = '' })
    timer = window.setTimeout(pas, 600)
  })

  onBeforeUnmount(() => clearTimeout(timer))
}

import { onBeforeUnmount, onMounted, type Ref } from 'vue'

/* Les pastilles du hero s'écartent légèrement du pointeur.
   L'effet décroît avec la distance (nul au-delà de 420 px) et chaque
   pastille a son propre poids, pour que le groupe ne bouge pas d'un bloc. */
export function useDrift(zone: Ref<HTMLElement | null>) {
  let raf = 0, px = 0, py = 0, actif = false
  let elements: HTMLElement[] = []

  function appliquer() {
    raf = 0
    for (const el of elements) {
      if (!actif) {
        el.style.setProperty('--dx', '0px')
        el.style.setProperty('--dy', '0px')
        continue
      }
      const poids = parseFloat(el.dataset.drift ?? '1') || 1
      const dx = el.offsetLeft + el.offsetWidth / 2 - px
      const dy = el.offsetTop + el.offsetHeight / 2 - py
      const d = Math.hypot(dx, dy) || 1
      const f = Math.max(0, 1 - d / 420)
      const amp = 16 * poids * f * f
      el.style.setProperty('--dx', `${(dx / d * amp).toFixed(2)}px`)
      el.style.setProperty('--dy', `${(dy / d * amp).toFixed(2)}px`)
    }
  }

  const surMouvement = (e: PointerEvent) => {
    const box = zone.value!.getBoundingClientRect()
    px = e.clientX - box.left
    py = e.clientY - box.top
    actif = true
    if (!raf) raf = requestAnimationFrame(appliquer)
  }
  const surSortie = () => {
    actif = false
    if (!raf) raf = requestAnimationFrame(appliquer)
  }

  onMounted(() => {
    const el = zone.value
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    elements = Array.from(el.querySelectorAll<HTMLElement>('[data-drift]'))
    if (!elements.length) return
    el.addEventListener('pointermove', surMouvement, { passive: true })
    el.addEventListener('pointerleave', surSortie)
  })

  onBeforeUnmount(() => {
    zone.value?.removeEventListener('pointermove', surMouvement)
    zone.value?.removeEventListener('pointerleave', surSortie)
    if (raf) cancelAnimationFrame(raf)
  })
}

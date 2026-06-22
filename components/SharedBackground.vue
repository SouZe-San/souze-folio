<script setup lang="ts">
import { ref } from 'vue'
import gsap from 'gsap'

const container = ref<HTMLElement | null>(null)
const highlight = ref<HTMLElement | null>(null)

let visible = false
let current: HTMLElement | null = null
const PAD_X = 0 

// if ease not feels good
// const SPRING = makeSpring({ stiffness: 205, damping: 22, mass: 1 })

function boxIn(el: HTMLElement) {
  const c = container.value!.getBoundingClientRect()
  const r = el.getBoundingClientRect()
  return {
    x: r.left - c.left - PAD_X,
    y: r.top - c.top,
    width: r.width + PAD_X * 2,
    height: r.height,
  }
}

function moveTo(el: HTMLElement) {
  if (el === current) return 
  current = el
  const box = boxIn(el)

  if (!visible) {
    visible = true
    gsap.set(highlight.value, box) 
    gsap.to(highlight.value, {
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.25,
      ease: 'power2.out',
      overwrite: 'auto',
      startAt: { opacity: 0, filter: 'blur(6px)' },
    })
  } else {
    gsap.to(highlight.value, {
      ...box,
      duration: 0.5,
      ease: 'back.out(0.8)',
      overwrite: 'auto',
    })
  }
}

function onMove(e: PointerEvent) {
  const item = (e.target as HTMLElement).closest<HTMLElement>('[data-shb-item]')
  if (item && container.value?.contains(item)) moveTo(item)
}

function onLeave() {
  current = null
  visible = false
  gsap.to(highlight.value, {
    opacity: 0,
    filter: 'blur(6px)',
    duration: 0.25,
    ease: 'power2.in',
    overwrite: 'auto',
  })
}
</script>

<template>
  <div
    ref="container"
    class="relative flex w-full flex-col"
    @pointermove="onMove"
    @mouseleave="onLeave"
  >
    <div ref="highlight" class="shb-highlight" />
    <slot />
  </div>
</template>

<style scoped>
.shb-highlight {
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  opacity: 0;
  pointer-events: none;
  z-index: 5;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.06);
  will-change: transform, width, height;
}
</style>
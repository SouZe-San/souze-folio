<template>
  <div class="dialnav flex sm:hidden" :class="{ open }">
    <!-- invisible tap-catcher (no page dim — frost lives inside the dial) -->
    <div class="scrim" ref="scrimEl" @click="close" />

    <div
      class="dial"
      ref="dialEl"
      :style="{ height: DIAL_H + 'px' }"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
    >
      <!-- the dial body: all clipped to the circle -->
      <div class="disc" :style="discStyle" />

      <div class="wheel-clip">
        <div class="wheel" :style="wheelStyle">
          <div v-for="(it, i) in items" :key="it.label" class="item" :style="itemStyle(i)">
            <div
              class="item-inner"
              :class="{ active: i === activeIndex }"
              :style="i === activeIndex ? activeStyle : undefined"
            >
              <component :is="it.icon" class="ico" />
            </div>
          </div>
        </div>
      </div>

      <!-- marker just inside the top of the disc -->
      <span
        class="marker"
        :style="{ top: markerTop + 'px', background: active.color, boxShadow: `0 0 8px ${active.color}` }"
      />

      <!-- readout -->
      <div class="readout" :style="{ top: readoutTop + 'px' }">
        <span class="r-label" :style="{ color: active.color }">{{ active.label }}</span>
        <span class="r-hint" :style="hintStyle">{{ hint }}</span>
      </div>
    </div>

    <!-- the + FAB -->
    <button class="fab" ref="fabEl" @click="toggle" aria-label="Open navigation">
      <img :src="plus" alt="" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRotaryDial } from '~/composables/useRotaryDial'

// ── page icons (your existing components) ───────────────────────────────────
import Home from '~/components/icons/nav/home.vue'
import Project from '~/components/icons/nav/code-folder.vue'
import Skills from '~/components/icons/nav/code-dot.vue'
import Exp from '~/components/icons/nav/briefcase.vue'
import Cv from '~/components/icons/nav/cv.vue'
// ── social icons ────────────────────────────────────────────────────────────
import Github from '~/components/icons/socials/github.vue'
import Mail from '~/components/icons/socials/paper-plane.vue'
import LinkedIn from '~/components/icons/socials/linkedIn.vue'
import X from '~/components/icons/socials/x.vue'
import plus from '~/assets/icons/plus.svg'

const { $gsap } = useNuxtApp()

// ── items: pages + socials on ONE dial ──────────────────────────────────────
type DialItem = {
  label: string
  icon: unknown
  href: string
  type: 'route' | 'external'
  color: string
}
const items: DialItem[] = [
  { label: 'Email', icon: Mail, href: 'mailto:soumyajit.codemail@gmail.com', type: 'external', color: '#04ff96' },
  { label: 'LinkedIn', icon: LinkedIn, href: 'https://www.linkedin.com/in/soumyajit-mondal-3342b4284', type: 'external', color: '#4aa3ff' },
  { label: 'GitHub', icon: Github, href: 'https://github.com/Souze-San', type: 'external', color: '#ffffff' },
  { label: 'X', icon: X, href: 'https://x.com/soumya03jit?t=9SFCdlkBX7bev6_NJSzbmQ&s=09', type: 'external', color: '#ffffff' },
  { label: 'Home', icon: Home, href: '/', type: 'route', color: '#ffffff' }, // ← centered on open
  { label: 'Projects', icon: Project, href: '/projects', type: 'route', color: '#ffea05' },
  { label: 'Skills', icon: Skills, href: '/#skills', type: 'route', color: '#04ff96' },
  { label: 'Experience', icon: Exp, href: '/exp', type: 'route', color: '#A3FFFF' },
  { label: 'CV', icon: Cv, href: 'https://drive.google.com/drive/folders/1O-RC1VYK0zxeeU7YgJ7XE0uAPNlb7FKY?usp=sharing', type: 'external', color: '#ffffff' },
]

// ── geometry tunables ───────────────────────────────────────────────────────
const DIAL_H = 200 // visible height of the dial area (px)
const TOP_INSET = 30 // gap from dial top to the disc's top edge (px)
const DISC_PAD = 44 // how much bigger the disc is than the item arc (px)
const R_FACTOR = 1.3 // item-arc radius = dial width × this (bigger = gentler arc)
const STEP = 16 // degrees between items (MUST match the composable's step)
const ACTIVE_SCALE = 1.5 // how much the centered item grows

// ── the gesture engine ──────────────────────────────────────────────────────
const dial = useRotaryDial({
  count: items.length,
  step: STEP,
  sensitivity: 0.45, // flip to negative to reverse the spin direction
  momentumMs: 170,
  swipeUpPx: 46,
  onCommit: (i) => navigate(items[i]),
})
const { rotation, activeIndex, lift, commitProgress, onPointerDown, onPointerMove, onPointerUp, snapTo } = dial

const active = computed(() => items[activeIndex.value])

// ── measured circle (recomputed on resize) ──────────────────────────────────
const dialEl = ref<HTMLElement | null>(null)
const R = ref(0) 
const RD = ref(0)
const cx = ref(0)
const cy = ref(0)
function measure() {
  const el = dialEl.value
  if (!el) return
  const w = el.clientWidth
  cx.value = w / 2
  R.value = w * R_FACTOR
  RD.value = R.value + DISC_PAD
  cy.value = RD.value + TOP_INSET 
}

// derived positions
const iconTop = computed(() => cy.value - R.value) // y of the centred icon
const discTop = computed(() => cy.value - RD.value) // y of the disc's top edge
const markerTop = computed(() => discTop.value + 8)
const readoutTop = computed(() => iconTop.value + 26) // just under the icon

// ── styles ───────────────────────────────────────────────────────────────────
const discStyle = computed(() => ({
  width: 2 * RD.value + 'px',
  height: 2 * RD.value + 'px',
  left: cx.value - RD.value + 'px',
  top: cy.value - RD.value + 'px',
}))
const wheelStyle = computed(() => ({
  width: 2 * R.value + 'px',
  height: 2 * R.value + 'px',
  left: cx.value - R.value + 'px',
  top: cy.value - R.value + 'px',
  transform: `rotate(${rotation.value}deg)`,
}))
function itemStyle(i: number) {
  const a = (i - dial.C0) * dial.STEP // this item's angle from the top
  const rad = (a * Math.PI) / 180
  const x = R.value + R.value * Math.sin(rad)
  const y = R.value - R.value * Math.cos(rad)
  return { left: x + 'px', top: y + 'px', transform: `translate(-50%, -50%) rotate(${a}deg)` }
}
const activeStyle = computed(() => ({
  transform: `translateY(${-lift.value}px) scale(${ACTIVE_SCALE + commitProgress.value * 0.3})`,
  color: active.value.color,
  filter: `drop-shadow(0 0 ${8 + commitProgress.value * 16}px ${active.value.color})`,
}))

const hint = computed(() => (commitProgress.value >= 1 ? 'release to open' : 'swipe up to open'))
const hintStyle = computed(() => ({
  opacity: 0.45 + commitProgress.value * 0.55,
  color: commitProgress.value >= 1 ? active.value.color : undefined,
}))

// ── navigation ───────────────────────────────────────────────────────────────
function navigate(it: DialItem) {
  close()
  if (it.type === 'route') {
    navigateTo(it.href)
    return
  }
  if (it.href.startsWith('mailto:')) {
    window.location.href = it.href
    return
  }
  window.open(it.href, '_blank', 'noopener,noreferrer')
}

// ── open / close (from the + tap) ───────────────────────────────────────────
const open = ref(false)
const fabEl = ref<HTMLElement | null>(null)
const scrimEl = ref<HTMLElement | null>(null)
let tl: gsap.core.Timeline | null = null
let ro: ResizeObserver | null = null

onMounted(() => {
  measure()
  ro = new ResizeObserver(measure)
  if (dialEl.value) ro.observe(dialEl.value)
  $gsap.set(scrimEl.value, { autoAlpha: 0 })
  $gsap.set(dialEl.value, { autoAlpha: 0 })
  tl = $gsap.timeline({ paused: true })
  tl.to(scrimEl.value, { autoAlpha: 1, duration: 0.25 }, 0)
    .to(fabEl.value, { rotation: 45, duration: 0.3, ease: 'back.out(1.7)' }, 0)
    .to(dialEl.value, { autoAlpha: 1, duration: 0.35, ease: 'power2.out' }, 0.05)
})
onBeforeUnmount(() => {
  ro?.disconnect()
  tl?.kill()
})

function toggle() {
  open.value ? close() : openDial()
}
function openDial() {
  open.value = true
  snapTo(Math.round(dial.C0), false) // open centred on the middle item
  tl?.play()
}
function close() {
  if (!open.value) return
  open.value = false
  tl?.reverse()
}
</script>

<style scoped>
.dialnav {
  position: fixed;
  left: 50%;
  bottom: 2rem;
  transform: translateX(-50%);
  width: min(100vw, 460px);
  flex-direction: column;
  align-items: center;
  z-index: 40;
}

.scrim {
  position: fixed;
  inset: 0;
  z-index: 0;
  background: transparent; 
}

.dial {
  position: relative;
  width: 100%;
  pointer-events: none;
  touch-action: none; 
  user-select: none;
}
.dialnav.open .dial {
  pointer-events: auto;
}


.disc {
  position: absolute;
  border-radius: 50%;
  z-index: 0;
  pointer-events: none;
  backdrop-filter: blur(12px) saturate(1.1);
  -webkit-backdrop-filter: blur(12px) saturate(1.1);
  background: rgba(10, 10, 12, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: inset 0 0 70px rgba(0, 0, 0, 0.55);
  -webkit-mask-image: linear-gradient(to right, transparent, #000 16%, #000 84%, transparent);
  mask-image: linear-gradient(to right, transparent, #000 16%, #000 84%, transparent);
}

.wheel-clip {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(to right, transparent, #000 5%, #000 95%, transparent);
  mask-image: linear-gradient(to right, transparent, #000 5%, #000 95%, transparent);
}

.wheel {
  position: absolute;
  transform-origin: 50% 50%;
}

.item {
  position: absolute;
  width: 46px;
  height: 46px;
}
.item-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #8c8c8c;
  transition: color 0.2s ease;
}
.ico {
  width: 22px;
  height: 22px;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85));
}

.marker {
  position: absolute;
  left: 50%;
  width: 3px;
  height: 16px;
  border-radius: 2px;
  transform: translateX(-50%);
  z-index: 3;
}

.readout {
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  z-index: 3;
  pointer-events: none;
}
.r-label {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.7);
}
.r-hint {
  font-size: 0.58rem;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.4);
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
}

.fab {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.5rem;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 2px solid #dbdbdb32;
  backdrop-filter: blur(4px);
  background-color: rgba(68, 68, 68, 0.08);
  padding: 8px;
  z-index: 5;
}
</style>
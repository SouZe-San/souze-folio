<template>
  <section
    class="h-screen relative select-none"
    id="skills"
    @mousemove="scaleGrow"
    @mouseleave="scaleNormal"
  >
    <!-- clip shape used by .maskBody  -->
    <svg class="reveal-defs" aria-hidden="true">
      <defs>
        <clipPath id="revealClip" clipPathUnits="userSpaceOnUse">
          <rect
            ref="blob"
            x="-200"
            y="-200"
            width="300"
            height="300"
            rx="200"
            transform="scale(0)"
          />
        </clipPath>
      </defs>
    </svg>

    <!-- mask Content (revealed inside the lens) -->
    <div
      v-if="isFine"
      class="h-full w-full flex flex-col justify-center items-center absolute maskBody"
      ref="maskBody"
    >
      <div class="w-full text-center text-3xl text-black/60">
        <FloatSection />
      </div>
    </div>

    <!-- Main Content -->
    <div class="h-full w-full flex flex-col justify-center items-center gap-16">
      <div class="w-full text-center">
        <h1
          class="inline font-cinzel-bold sm:text-6xl text-[40px] max-sm:mt-4 relative"
        >
          <span
            class="absolute sm:-top-7 -top-5 opacity-60 text-white/20 left-[50%] -translate-x-[50%]"
            style="letter-spacing: 10px"
          >
            Techs
          </span>
          What I use
        </h1>
      </div>
      <p
        class="md:w-[70%] text-center text-3xl sm:text-2xl text-[1.15rem] max-sm:px-4 text-white/40"
        v-if="isFine"
      >
        Honestly - the projects say it
        <span class="font-changa">louder</span> than I could<span
          class="emoji"
          aria-hidden="true"
          >🔨</span
        >. Real problems, shipped solutions, and at least one
        <span class="font-changa">debugging</span> session I&#39;d rather
        forget. But that's where the good stuff lives.
        <span class="text-white/40 underline cursor-pointer decoration-white/20"
          >Poke around</span
        >
        — you&#39;ll get a better read on what I actually do.
      </p>
      <p
        class="md:w-[70%] text-center text-3xl sm:text-2xl text-[1.15rem] max-sm:px-4 text-white/50"
        v-if="!isFine"
      >
        The projects make a better case than I can<span
          class="emoji"
          aria-hidden="true"
          >🔨</span
        >. Real builds, real problems — some genuinely fun to solve, some
        not.<span class="code-tag flash isolate font-roboto-condensed"
          >~_~</span
        >
        Worth a look.
      </p>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import FloatSection from "./floatSection/FloatSection.vue";

const { setHover } = useHover();
const { cursorPosition } = useCursorPosition();

const maskBody = ref<HTMLElement | null>(null);
const blob = ref<SVGRectElement | null>(null);
const isOver = ref(false);
const isVisible = ref(false);
const isFine = ref(false);
let rafId: number | null = null;

// ── tunables ───────────────────────────────────────────────────────────────

const BASE = 300; // resting diameter (px)
const FOLLOW_TAU = 0.03; //0.45 before this,  SMALLER = lens traces the cursor faster ()
const DEADZONE = 6; // speed below this = no stretch (stays a circle)
const MAX_SPEED = 80; // speed that maps to full stretch
const MAX_STRETCH = 0.8; // max elongation
const SQUASH = 0.2; // how much it thins while stretching
const VEL_TAU = 0.07; // speed smoothing time constant
const APPEAR_TAU = 0.09; // lens fade in/out time constant

// ── smoothing state ──────────────────────────────────────────────────────────
const pos = { x: -99999, y: 0 }; // follower point (position)
const cur = { x: 0, y: 0 }; // last cursor sample (for speed)
let vel = 0; // smoothed cursor speed (normalised px/frame)
let rev = 0; // 0 hidden → 1 shown
let lastAngle = 0;
let lastT = 0; // last frame timestamp (for dt)
let initd = false;
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

let rectL = 0;
let rectT = 0;
let rectDirty = true;
function refreshRect() {
  const r = maskBody.value?.getBoundingClientRect();
  if (r) {
    rectL = r.left;
    rectT = r.top;
  }
  rectDirty = false;
}
const markRectDirty = () => (rectDirty = true);

function originMouseEnter() {
  setHover(true, "none");
}
function originMouseLeave() {
  setHover(false);
}
function scaleGrow() {
  originMouseEnter();
  isOver.value = true;
}
function scaleNormal() {
  isOver.value = false;
  originMouseLeave();
}

function frame() {
  if (!maskBody.value || !blob.value || !isVisible.value) {
    rafId = null;
    return;
  }

  const now = performance.now();
  const { x, y } = cursorPosition.value;
  if (rectDirty) refreshRect();
  const tx = x - rectL;
  const ty = y - rectT;

  // init on first frame (no startup jump / no false speed spike)
  if (!initd) {
    pos.x = tx;
    pos.y = ty;
    cur.x = tx;
    cur.y = ty;
    lastT = now;
    initd = true;
  }

  // dt in seconds — floored so a stalled frame can't divide-by-zero, capped so
  // a tab-switch can't teleport the lens
  const dt = Math.min(Math.max((now - lastT) / 1000, 1 / 240), 0.05);
  lastT = now;

  // cursor speed, NORMALISED to px-per-60Hz-frame so the stretch feels the same
  // regardless of refresh rate
  const dx = tx - cur.x;
  const dy = ty - cur.y;
  const inst = Math.hypot(dx, dy);
  const speed = inst / dt / 60;
  cur.x = tx;
  cur.y = ty;
  vel += (speed - vel) * (1 - Math.exp(-dt / VEL_TAU));

  // ease the follower toward the cursor — time-constant based, so FOLLOW_TAU is
  // the single "how fast does it trace" dial, frame-rate independent
  const f = 1 - Math.exp(-dt / FOLLOW_TAU);
  pos.x += (tx - pos.x) * f;
  pos.y += (ty - pos.y) * f;

  // stretch ramps from DEADZONE → MAX_SPEED, so normal moves stay ~circular
  const t = clamp((vel - DEADZONE) / (MAX_SPEED - DEADZONE), 0, 1);
  const stretch = t * MAX_STRETCH;
  const len = BASE * (1 + stretch);
  const thick = BASE * (1 - stretch * SQUASH);
  if (speed > DEADZONE) lastAngle = (Math.atan2(dy, dx) * 180) / Math.PI;

  // fade the lens in/out smoothly with hover
  rev += ((isOver.value ? 1 : 0) - rev) * (1 - Math.exp(-dt / APPEAR_TAU));

  const r = blob.value;
  r.setAttribute("width", String(len));
  r.setAttribute("height", String(thick));
  r.setAttribute("x", String(-len / 2));
  r.setAttribute("y", String(-thick / 2));
  r.setAttribute("rx", String(thick / 2)); // semicircle ends → stadium when stretched
  r.setAttribute(
    "transform",
    `translate(${pos.x.toFixed(1)} ${pos.y.toFixed(1)}) rotate(${lastAngle.toFixed(1)}) scale(${Math.max(rev, 0).toFixed(3)})`,
  );

  rafId = window.requestAnimationFrame(frame);
}

function start() {
  if (isFine.value && isVisible.value && rafId == null)
    rafId = window.requestAnimationFrame(frame);
}

// ── lens wiring (only ever set up when a real cursor is present) ─────────────
let io: IntersectionObserver | null = null;
let ro: ResizeObserver | null = null;

function enableLens() {
  nextTick(() => {
    const el = maskBody.value;
    if (!el) return;
    rectDirty = true;
    io = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          isVisible.value = entry?.isIntersecting;
          if (entry?.isIntersecting) start();
        }
      },
      { threshold: 0 },
    );
    io.observe(el);
    ro = new ResizeObserver(markRectDirty);
    ro.observe(el);
    window.addEventListener("scroll", markRectDirty, { passive: true });
    window.addEventListener("resize", markRectDirty);
  });
}
function disableLens() {
  io?.disconnect();
  io = null;
  ro?.disconnect();
  ro = null;
  window.removeEventListener("scroll", markRectDirty);
  window.removeEventListener("resize", markRectDirty);
  if (rafId != null) {
    window.cancelAnimationFrame(rafId);
    rafId = null;
  }
  isVisible.value = false;
  initd = false;
}

let mq: MediaQueryList | null = null;
const onPointerKind = (e: MediaQueryListEvent | MediaQueryList) => {
  isFine.value = e.matches;
  e.matches ? enableLens() : disableLens();
};

onMounted(() => {
  mq = window.matchMedia("(hover: hover) and (pointer: fine)");
  isFine.value = mq.matches;
  mq.addEventListener("change", onPointerKind);
  if (isFine.value) enableLens();
});
onUnmounted(() => {
  mq?.removeEventListener("change", onPointerKind);
  disableLens();
});
</script>

<style scoped>
.reveal-defs {
  position: absolute;
  width: 0;
  height: 0;
}

.maskBody {
  clip-path: url(#revealClip);
  -webkit-clip-path: url(#revealClip);
  pointer-events: none;
  background:
    url("/noisy-2.png") repeat,
    rgb(70, 70, 70);
  color: black;
  z-index: 1;
}
</style>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import TechPill from "./TechPill.vue";

export interface TechItem {
  label: string;
  icon?: string;
  color?: string;
}

const props = withDefaults(
  defineProps<{
    items: TechItem[];
    gravity?: number; // 0 = float in place, 1 = strong fall
    bounce?: number; // 0–1
    repel?: boolean;
    repelStrength?: number; // overall multiplier on the push
    repelRadius?: number; // how close the cursor must be (px)
    repelNear?: number; // push from proximity alone (0 = only react to shaking)
    repelShake?: number; // push that scales with cursor speed (the "shake" force)
    idle?: number; // gentle drift so they keep floating (0 = dead still)
    height?: string;
  }>(),
  {
    gravity: 0,
    bounce: 0.3,
    repel: true,
    repelStrength: 1,
    repelRadius: 140,
    repelNear: 9000,
    repelShake: 9,
    idle: 1,
    height: "70vh",
  },
);

const root = ref<HTMLElement | null>(null);
const pills = ref<InstanceType<typeof TechPill>[]>([]);
const ready = ref(false);

interface Part {
  el: HTMLElement;
  w: number;
  h: number;
  mass: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  wander: number; // current drift direction (radians)
  homeX: number; // resting anchor — soft tether keeps them aloft & spread
  homeY: number;
  bob: number; // phase for the vertical bob
}

let cleanup = () => {};
onUnmounted(() => cleanup());

onMounted(async () => {
  if (!root.value || props.items.length === 0) return;
  if (document.fonts?.ready) await document.fonts.ready;

  const container = root.value;
  let W = container.clientWidth;
  let H = container.clientHeight;
  const G = 1200; // gravity

  // ── build particles from the measured pills ─────────────────────────────
  // spawn spread across the MIDDLE so the field reads full, not piled on the floor
  const parts: Part[] = pills.value.map((p: any) => {
    const el = p.$el as HTMLElement;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const x = gsap.utils.random(w, W - w);
    const y = gsap.utils.random(H * 0.18, H * 0.82);
    el.style.transform = `translate(${x - w / 2}px, ${y - h / 2}px)`;
    return {
      el,
      w,
      h,
      mass: w * h,
      x,
      y,
      vx: 0,
      vy: 0,
      wander: Math.random() * Math.PI * 2,
      homeX: x,
      homeY: y,
      bob: Math.random() * Math.PI * 2,
    };
  });

  // ── pointer state (repel + grab/throw) ──────────────────────────────────
  let mx = -1e4;
  let my = -1e4;
  let pmx = -1e4; // previous cursor sample → lets us measure shake speed
  let pmy = -1e4;
  let inside = false;
  let dragged: Part | null = null;
  const grab = { x: 0, y: 0 };

  const toLocal = (e: PointerEvent) => {
    const r = container.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  const onPointerMove = (e: PointerEvent) => {
    const p = toLocal(e);
    mx = p.x;
    my = p.y;
    inside = true;
  };
  const onPointerLeave = () => {
    inside = false;
    pmx = mx;
    pmy = my;
  };
  const onPointerDown = (e: PointerEvent) => {
    const p = toLocal(e);
    // topmost pill under the cursor
    for (let i = parts.length - 1; i >= 0; i--) {
      const q = parts[i];
      if (Math.abs(p.x - q.x) <= q.w / 2 && Math.abs(p.y - q.y) <= q.h / 2) {
        dragged = q;
        grab.x = p.x - q.x;
        grab.y = p.y - q.y;
        q.el.style.zIndex = "10";
        q.el.style.cursor = "grabbing";
        container.setPointerCapture?.(e.pointerId);
        break;
      }
    }
  };
  const onPointerUp = () => {
    if (dragged) {
      dragged.el.style.zIndex = "";
      dragged.el.style.cursor = "";
    }
    dragged = null;
  };

  container.addEventListener("pointermove", onPointerMove);
  container.addEventListener("pointerleave", onPointerLeave);
  container.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointerup", onPointerUp);

  // ── AABB collision between two upright pills ─────────────────────────────
  const resolve = (p: Part, q: Part) => {
    const dx = p.x - q.x;
    const ox = (p.w + q.w) / 2 - Math.abs(dx);
    if (ox <= 0) return;
    const dy = p.y - q.y;
    const oy = (p.h + q.h) / 2 - Math.abs(dy);
    if (oy <= 0) return;

    const ip = p === dragged ? 0 : 1 / p.mass;
    const iq = q === dragged ? 0 : 1 / q.mass;
    const isum = ip + iq;
    if (isum === 0) return;

    if (ox < oy) {
      const s = dx < 0 ? -1 : 1; // separation normal (x)
      p.x += s * ox * (ip / isum);
      q.x -= s * ox * (iq / isum);
      const vn = (p.vx - q.vx) * s;
      if (vn < 0) {
        const j = (-(1 + props.bounce) * vn) / isum;
        p.vx += j * ip * s;
        q.vx -= j * iq * s;
      }
    } else {
      const s = dy < 0 ? -1 : 1; // separation normal (y)
      p.y += s * oy * (ip / isum);
      q.y -= s * oy * (iq / isum);
      const vn = (p.vy - q.vy) * s;
      if (vn < 0) {
        const j = (-(1 + props.bounce) * vn) / isum;
        p.vy += j * ip * s;
        q.vy -= j * iq * s;
      }
    }
  };

  // ── the loop (driven by GSAP's ticker) ──────────────────────────────────
  const tick = (_t: number, deltaMs: number) => {
    const dt = Math.min(deltaMs, 32) / 1000;
    // lighter drag than before so a zero-g float doesn't freeze to a halt
    const damp = 1 - Math.min(1, 0.6 * dt);

    for (const p of parts) {
      if (p === dragged) continue;
      p.vy += props.gravity * G * dt; // gravity (0 by default → floats)

      if (props.idle > 0) {
        // meandering horizontal drift
        p.wander += (Math.random() - 0.5) * 3 * dt;
        p.vx += Math.cos(p.wander) * 22 * props.idle * dt;
        p.vy += Math.sin(p.wander) * 12 * props.idle * dt;
        // weightless vertical bob
        p.bob += dt * 0.9;
        p.vy += Math.sin(p.bob) * 16 * props.idle * dt;
      }

      // soft tether to the home spot — this is what keeps them floating in the
      // middle (anti-sink) and spread out instead of drifting into a corner
      p.vx += (p.homeX - p.x) * 1.4 * dt;
      p.vy += (p.homeY - p.y) * 1.8 * dt;

      p.vx *= damp; // air drag
      p.vy *= damp;
    }

    // cursor repulsion — proximity push + a shake (speed) push
    if (props.repel && inside) {
      // cursor speed in px/s, clamped so a re-entry jump can't explode
      const cspeed = Math.min(Math.hypot(mx - pmx, my - pmy) / dt, 4000);
      pmx = mx;
      pmy = my;

      const R = props.repelRadius;
      for (const p of parts) {
        if (p === dragged) continue;
        const dx = p.x - mx;
        const dy = p.y - my;
        const d = Math.hypot(dx, dy);
        if (d < R && d > 0.01) {
          const closeness = 1 - d / R; // 0 at the edge → 1 at the center
          // proximity push is squared → only really bites when you're CLOSE.
          // shake push scales with cursor speed → a fast swipe flings them.
          const push =
            props.repelNear * closeness * closeness +
            props.repelShake * cspeed * closeness;
          const f = props.repelStrength * push * dt;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
      }
    }

    // dragged pill chases the cursor; its velocity becomes the throw
    if (dragged) {
      const nx = mx - grab.x;
      const ny = my - grab.y;
      dragged.vx = gsap.utils.clamp(-3000, 3000, (nx - dragged.x) / dt);
      dragged.vy = gsap.utils.clamp(-3000, 3000, (ny - dragged.y) / dt);
      dragged.x = nx;
      dragged.y = ny;
    }

    // integrate
    for (const p of parts) {
      if (p === dragged) continue;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
    }

    // walls
    for (const p of parts) {
      const hw = p.w / 2;
      const hh = p.h / 2;
      if (p.x < hw) {
        p.x = hw;
        p.vx = -p.vx * props.bounce;
      } else if (p.x > W - hw) {
        p.x = W - hw;
        p.vx = -p.vx * props.bounce;
      }
      if (p.y < hh) {
        p.y = hh;
        p.vy = -p.vy * props.bounce;
      } else if (p.y > H - hh) {
        p.y = H - hh;
        p.vy = -p.vy * props.bounce;
      }
    }

    // collisions — a couple of passes settle stacks better
    for (let it = 0; it < 2; it++) {
      for (let a = 0; a < parts.length; a++) {
        for (let b = a + 1; b < parts.length; b++) resolve(parts[a], parts[b]);
      }
    }

    // render
    for (const p of parts)
      p.el.style.transform = `translate(${p.x - p.w / 2}px, ${p.y - p.h / 2}px)`;
  };

  // ── only tick while the field is on-screen AND the tab is visible ─────────
  let running = false;
  let onScreen = false;

  const startTicker = () => {
    if (running || !onScreen || document.hidden) return;
    gsap.ticker.add(tick);
    running = true;
  };
  const stopTicker = () => {
    if (!running) return;
    gsap.ticker.remove(tick);
    running = false;
  };

  const io = new IntersectionObserver(
    ([entry]) => {
      onScreen = entry.isIntersecting;
      onScreen ? startTicker() : stopTicker();
    },
    { threshold: 0 },
  );
  io.observe(container);

  const onVisibility = () => (document.hidden ? stopTicker() : startTicker());
  document.addEventListener("visibilitychange", onVisibility);

  ready.value = true;

  // gsap.ticker.add(tick)
  // ready.value = true

  const ro = new ResizeObserver(() => {
    W = container.clientWidth;
    H = container.clientHeight;
    for (const p of parts) {
      p.x = gsap.utils.clamp(p.w / 2, W - p.w / 2, p.x);
      p.y = gsap.utils.clamp(p.h / 2, H - p.h / 2, p.y);
      p.homeX = gsap.utils.clamp(p.w / 2, W - p.w / 2, p.homeX);
      p.homeY = gsap.utils.clamp(p.h / 2, H - p.h / 2, p.homeY);
    }
  });
  ro.observe(container);

  cleanup = () => {
    // gsap.ticker.remove(tick)
    stopTicker();
    io.disconnect();
    ro.disconnect();
    document.removeEventListener("visibilitychange", onVisibility);
    container.removeEventListener("pointermove", onPointerMove);
    container.removeEventListener("pointerleave", onPointerLeave);
    container.removeEventListener("pointerdown", onPointerDown);
    window.removeEventListener("pointerup", onPointerUp);
  };
});
</script>

<template>
  <div ref="root" class="field px-8" :class="{ ready }" :style="{ height }">
    <TechPill
      v-for="(it, i) in items"
      :key="i"
      ref="pills"
      :label="it.label"
      :icon="it.icon"
      :color="it.color"
    />
  </div>
</template>

<style scoped>
.field {
  position: relative;
  width: 100%;
  overflow: hidden;
  touch-action: pan-y;
  /* this layer MUST stay interactive — never wrap it in pointer-events:none */
  pointer-events: auto;
  opacity: 0;
  transition: opacity 0.35s ease;
}
.field.ready {
  opacity: 1;
}
</style>

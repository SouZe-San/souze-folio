import { ref, computed } from "vue";

export interface RotaryDialOptions {
  /** number of items on the dial */
  count: number;
  /** degrees between adjacent items (must match the component's STEP) */
  step?: number;
  /** degrees of rotation per px of horizontal drag (flip sign to reverse) */
  sensitivity?: number;
  /** how far a flick is projected, in ms of its release velocity */
  momentumMs?: number;
  /** overscroll softness past the two ends, 0 (hard wall) – 1 (loose) */
  rubber?: number;
  /** upward distance (px) needed to commit the centred item */
  swipeUpPx?: number;
  /** 0–1 width fraction near the centre where an up-swipe counts as a commit */
  centerZone?: number;
  /** px of movement before the gesture locks into rotate-vs-commit */
  deadzone?: number;
  /** fired when a centred item is committed (swiped up past the threshold) */
  onCommit?: (index: number) => void;
}

/**
 * Headless camera-style dial. Owns rotation, momentum/snap, rubber-band ends,
 * and the gesture split (horizontal drag = browse, upward swipe in the centre
 * = commit). Returns reactive state + pointer handlers; rendering is the
 * component's job.
 */
export function useRotaryDial(opts: RotaryDialOptions) {
  const { $gsap } = useNuxtApp();

  const STEP = opts.step ?? 16;
  const SENS = opts.sensitivity ?? 0.45;
  const MOMENTUM = opts.momentumMs ?? 170;
  const RUBBER = opts.rubber ?? 0.35;
  const SWIPE_UP = opts.swipeUpPx ?? 46;
  const ZONE = opts.centerZone ?? 0.6;
  const DEAD = opts.deadzone ?? 6;
  const C0 = (opts.count - 1) / 2; // index that sits under the marker at rotation 0

  const MIN_ROT = -(opts.count - 1 - C0) * STEP; // last item centred
  const MAX_ROT = C0 * STEP; // first item centred

  // ── reactive state ─────────────────────────────────────────────────────────
  const rotation = ref(0); // current wheel angle (deg)
  const dragging = ref(false);
  const lift = ref(0); // px the centred item is pulled up during a commit swipe
  const commitProgress = computed(() => Math.min(lift.value / SWIPE_UP, 1));

  const clampRot = (r: number) => Math.max(MIN_ROT, Math.min(MAX_ROT, r));
  const idxFromRot = (r: number) =>
    Math.max(0, Math.min(opts.count - 1, Math.round(C0 - r / STEP)));
  const rotForIndex = (i: number) => (C0 - i) * STEP;

  const activeIndex = computed(() => idxFromRot(rotation.value));

  // ── gesture bookkeeping ────────────────────────────────────────────────────
  let mode: "idle" | "rotate" | "commit" = "idle";
  let sx = 0;
  let sy = 0;
  let lx = 0;
  let ly = 0;
  let lt = 0;
  let vel = 0; // smoothed angular velocity (deg/ms)
  let pid = -1;
  let width = 0;
  let tween: gsap.core.Tween | null = null;

  const local = (e: PointerEvent, el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  function onPointerDown(e: PointerEvent) {
    const el = e.currentTarget as HTMLElement;
    tween?.kill();
    width = el.clientWidth;
    pid = e.pointerId;
    el.setPointerCapture?.(pid);
    const p = local(e, el);
    sx = lx = p.x;
    sy = ly = p.y;
    lt = performance.now();
    vel = 0;
    mode = "idle";
    lift.value = 0;
    dragging.value = true;
  }

  function onPointerMove(e: PointerEvent) {
    if (!dragging.value) return;
    const el = e.currentTarget as HTMLElement;
    const p = local(e, el);
    const dx = p.x - lx;
    const dy = p.y - ly;
    const now = performance.now();
    const dt = Math.max(now - lt, 1);

    // once we've cleared the deadzone, decide what kind of gesture this is —
    // an upward move that starts in the centre zone is a commit, anything else
    // is a rotation. Locked for the rest of the gesture so it can't flip.
    if (mode === "idle") {
      const tdx = p.x - sx;
      const tdy = p.y - sy;
      if (Math.hypot(tdx, tdy) >= DEAD) {
        const upward = tdy < 0 && Math.abs(tdy) > Math.abs(tdx);
        const inZone = Math.abs(sx - width / 2) <= (width * ZONE) / 2;
        mode = upward && inZone ? "commit" : "rotate";
      }
    }

    if (mode === "rotate") {
      let next = rotation.value + dx * SENS;
      if (next > MAX_ROT) next = MAX_ROT + (next - MAX_ROT) * RUBBER;
      else if (next < MIN_ROT) next = MIN_ROT + (next - MIN_ROT) * RUBBER;
      rotation.value = next;
      vel = vel * 0.6 + ((dx * SENS) / dt) * 0.4; // smoothed deg/ms
    } else if (mode === "commit") {
      lift.value = Math.max(0, sy - p.y); // pull the centred item upward
    }

    lx = p.x;
    ly = p.y;
    lt = now;
  }

  function settle() {
    // project the flick, snap to the nearest item, ease into place
    const predicted = clampRot(rotation.value + vel * MOMENTUM);
    const target = rotForIndex(idxFromRot(predicted));
    const proxy = { v: rotation.value };
    tween = $gsap.to(proxy, {
      v: target,
      duration: 0.55,
      ease: "power3.out",
      onUpdate: () => {rotation.value = proxy.v},
    });
  }

  function releaseCommit() {
    const fire = lift.value >= SWIPE_UP;
    const proxy = { v: lift.value };
    $gsap.to(proxy, {
      v: 0,
      duration: 0.28,
      ease: "power2.out",
      onUpdate: () => {lift.value = proxy.v},
    });
    if (fire) opts.onCommit?.(activeIndex.value);
  }

  function onPointerUp(e: PointerEvent) {
    if (!dragging.value) return;
    dragging.value = false;
    (e.currentTarget as HTMLElement).releasePointerCapture?.(pid);
    if (mode === "commit") releaseCommit();
    else settle(); // also covers a tap (vel ≈ 0 → snaps to current, never navigates)
    mode = "idle";
  }

  /** jump/animate the dial so item `i` is centred (used on open) */
  function snapTo(i: number, animate = true) {
    tween?.kill();
    const target = rotForIndex(Math.max(0, Math.min(opts.count - 1, i)));
    if (!animate) {
      rotation.value = target;
      return;
    }
    const proxy = { v: rotation.value };
    tween = $gsap.to(proxy, {
      v: target,
      duration: 0.5,
      ease: "power3.out",
      onUpdate: () => {rotation.value = proxy.v},
    });
  }

  return {
    // state
    rotation,
    activeIndex,
    dragging,
    lift,
    commitProgress,
    // pointer handlers — bind these on the dial surface
    onPointerDown,
    onPointerMove,
    onPointerUp,
    // helpers + constants the layout needs
    snapTo,
    idxFromRot,
    rotForIndex,
    STEP,
    C0,
    MIN_ROT,
    MAX_ROT,
  };
}

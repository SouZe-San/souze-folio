// composables/useEmojiFx.ts
//
// One physics-driven particle engine, reskinned per emoji.
// Core: a true projectile integrator (x = vx·t, y = vy·t + ½·g·t²) driven by
// GSAP's ticker via a proxy tween, so every fleck of paint / spark / bug obeys
// real gravity. Everything else (splat, drip, crawl, glitch, shockwave) is
// composed on top.

type Vec = { x: number; y: number };

const PALETTE = ["#ffea05", "#9f05ff", "#04ff96", "#ff6d05", "#ffffff"];
const LAYER_ID = "emoji-fx-layer";

export function useEmojiFx() {
  const { $gsap: gsap } = useNuxtApp();

  const reduce =
    import.meta.client &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // guards so click bursts don't stack and hover sprays don't spam
  const busy = new Set<HTMLElement>();
  const consumed = new Set<HTMLElement>(); // one-shot effects (bug → butterfly)
  const lastFire = new WeakMap<HTMLElement, number>();
  const throttle = (el: HTMLElement, ms: number) => {
    const now = performance.now();
    if (now - (lastFire.get(el) ?? 0) < ms) return false;
    lastFire.set(el, now);
    return true;
  };

  // ── full-screen, click-through overlay (single instance) ───────────────
  let layer: HTMLElement | null = null;
  function getLayer() {
    if (layer && layer.isConnected) return layer;
    layer = document.getElementById(LAYER_ID);
    if (!layer) {
      layer = document.createElement("div");
      layer.id = LAYER_ID;
      Object.assign(layer.style, {
        position: "fixed",
        inset: "0",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: "9999",
        contain: "strict",
      });
      document.body.appendChild(layer);
    }
    return layer;
  }

  function particle(styles: Partial<CSSStyleDeclaration>) {
    const p = document.createElement("div");
    Object.assign(p.style, {
      position: "absolute",
      top: "0",
      left: "0",
      willChange: "transform, opacity",
      ...styles,
    });
    getLayer().appendChild(p);
    return p;
  }

  const center = (el: HTMLElement): Vec => {
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  };
  const inner = (el: HTMLElement) =>
    el.querySelector(".emoji-inner") as HTMLElement | null;

  // ── PHYSICS CORE: ballistic flight ─────────────────────────────────────
  // Launches `el` from (x,y) with velocity (vx,vy) under constant gravity.
  function ballistic(
    el: HTMLElement,
    o: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      gravity: number;
      duration: number;
      onLand?: () => void;
    },
  ) {
    gsap.set(el, { x: o.x, y: o.y, xPercent: -50, yPercent: -50 });
    const s = { t: 0 };
    return gsap.to(s, {
      t: o.duration,
      duration: o.duration,
      ease: "none",
      onUpdate() {
        const t = s.t;
        gsap.set(el, {
          x: o.x + o.vx * t,
          y: o.y + o.vy * t + 0.5 * o.gravity * t * t, // ½·g·t²
        });
      },
      onComplete: o.onLand,
    });
  }

  const rad = (deg: number) => (deg * Math.PI) / 180;
  // Catmull-Rom → cubic bezier, closed, for an organic lumpy outline
  function smoothClosedPath(p: Vec[]): string {
    const n = p.length;
    let d = `M ${p[0].x.toFixed(1)} ${p[0].y.toFixed(1)} `;
    for (let i = 0; i < n; i++) {
      const p0 = p[(i - 1 + n) % n];
      const p1 = p[i];
      const p2 = p[(i + 1) % n];
      const p3 = p[(i + 2) % n];
      const c1x = p1.x + (p2.x - p0.x) / 6;
      const c1y = p1.y + (p2.y - p0.y) / 6;
      const c2x = p2.x - (p3.x - p1.x) / 6;
      const c2y = p2.y - (p3.y - p1.y) / 6;
      d += `C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)} `;
    }
    return d + "Z";
  }

  // a unique paint-splat: spiky core (some long "fingers") + flung droplets
  function splatSvg(color: string): string {
    const cx = 50;
    const cy = 50;
    const spikes = Math.round(gsap.utils.random(9, 13));
    const pts: Vec[] = [];
    for (let i = 0; i < spikes; i++) {
      const ang = (i / spikes) * Math.PI * 2;
      const r =
        Math.random() < 0.35
          ? gsap.utils.random(34, 44)
          : gsap.utils.random(18, 28);
      pts.push({ x: cx + Math.cos(ang) * r, y: cy + Math.sin(ang) * r });
    }
    let dots = "";
    const dn = Math.round(gsap.utils.random(3, 6));
    for (let i = 0; i < dn; i++) {
      const ang = gsap.utils.random(0, Math.PI * 2);
      const dist = gsap.utils.random(34, 48);
      dots += `<circle cx="${(cx + Math.cos(ang) * dist).toFixed(1)}" cy="${(cy + Math.sin(ang) * dist).toFixed(1)}" r="${gsap.utils.random(2, 6).toFixed(1)}"/>`;
    }
    return `<svg viewBox="0 0 100 100" width="100%" height="100%" fill="${color}" style="display:block;overflow:visible"><path d="${smoothClosedPath(pts)}"/>${dots}</svg>`;
  }
  const pulse = (el: HTMLElement) =>
    gsap.fromTo(
      el,
      { scale: 1 },
      { scale: 0.8, duration: 0.09, yoyo: true, repeat: 1, ease: "power2.out" },
    );

  // ════════════════════════════════════════════════════════════════════
  // 🎨  PAINT
  // ════════════════════════════════════════════════════════════════════

  // hover: tilt + a few dots flicked off the brush
  function paintFlick(el: HTMLElement) {
    if (reduce || !throttle(el, 350)) return;
    const g = inner(el);
    if (g)
      gsap.to(g, {
        rotate: gsap.utils.random(-12, 12),
        duration: 0.18,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut",
      });

    const { x, y } = center(el);
    for (let i = 0; i < 4; i++) {
      const a = rad(gsap.utils.random(-140, -40));
      const sp = gsap.utils.random(120, 240);
      const size = gsap.utils.random(4, 7);
      const dur = gsap.utils.random(0.4, 0.6);
      const p = particle({
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: gsap.utils.random(PALETTE),
      });
      ballistic(p, {
        x,
        y,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp,
        gravity: 700,
        duration: dur,
      });
      gsap.to(p, {
        opacity: 0,
        duration: dur,
        ease: "power1.in",
        onComplete: () => p.remove(),
      });
    }
  }

  // click: paint-BOMB — 6–8 big splats burst across the middle of the screen,
  // glue, then sag + fade. Reads like a balloon bursting over the whole page.
  function paintSplat(el: HTMLElement) {
    if (busy.has(el)) return;
    busy.add(el);
    const g = inner(el);
    if (g) pulse(g);

    if (reduce) {
      gsap.delayedCall(0.3, () => busy.delete(el));
      return;
    }

    // 2–3 random colours per throw (skip white); each splat picks from the set
    const pool = PALETTE.filter((c) => c !== "#ffffff");
    const colors = gsap.utils
      .shuffle([...pool])
      .slice(0, Math.round(gsap.utils.random(2, 3)));
    const pick = () => gsap.utils.random(colors);
    const W = window.innerWidth;
    const H = window.innerHeight;
    const cx = W / 2;
    const cy = H / 2;

    // wide colour wash over the middle (blends the first two colours)
    const bloom = particle({
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      mixBlendMode: "screen",
      background: `radial-gradient(circle, ${colors[0]}55, ${colors[1] ?? colors[0]}1f, transparent 70%)`,
    });
    gsap.set(bloom, { x: cx, y: cy, xPercent: -50, yPercent: -50 });
    gsap.fromTo(
      bloom,
      { scale: 6, opacity: 0.5 },
      {
        scale: 130,
        opacity: 0,
        duration: 1.1,
        ease: "power2.out",
        onComplete: () => bloom.remove(),
      },
    );

    // 6–8 big splats spread across the central field — the core is biggest
    const count = Math.round(gsap.utils.random(6, 8));
    for (let i = 0; i < count; i++) {
      const core = i === 0;
      const x = core
        ? cx + gsap.utils.random(-50, 50)
        : cx + gsap.utils.random(-W * 0.36, W * 0.36);
      const y = core
        ? cy + gsap.utils.random(-40, 40)
        : cy + gsap.utils.random(-H * 0.32, H * 0.32);
      const size = core
        ? gsap.utils.random(320, 480)
        : gsap.utils.random(190, 360);
      bigSplat(x, y, size, pick(), i * gsap.utils.random(0.03, 0.07)); // tiny stagger = spreads outward
    }

    // fine spray flung across the field
    for (let i = 0; i < 16; i++) {
      const a = rad(gsap.utils.random(0, 360));
      const sp = gsap.utils.random(300, 760);
      const size = gsap.utils.random(5, 14);
      const d = particle({
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "46% 54% 50% 50% / 55% 45% 55% 45%",
        background: pick(),
      });
      ballistic(d, {
        x: cx,
        y: cy,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp,
        gravity: 1300,
        duration: gsap.utils.random(0.5, 0.9),
      });
      gsap.to(d, {
        opacity: 0,
        duration: gsap.utils.random(0.5, 1.0),
        ease: "power1.in",
        onComplete: () => d.remove(),
      });
    }

    gsap.delayedCall(3, () => busy.delete(el));
  }

  // a single splat that bursts open, holds (glued), then slides slightly down + fades
  function bigSplat(
    x: number,
    y: number,
    size: number,
    color: string,
    delay: number,
  ) {
    const splat = particle({ width: `${size}px`, height: `${size}px` });
    splat.innerHTML = splatSvg(color);
    gsap.set(splat, {
      x,
      y,
      xPercent: -50,
      yPercent: -50,
      scale: 0.15,
      opacity: 0,
      rotate: gsap.utils.random(-20, 20),
    });
    gsap
      .timeline({ delay, onComplete: () => splat.remove() })
      // IMPACT — bursts open with overshoot, spreads wide
      .to(splat, {
        opacity: 1,
        scaleX: 1.08,
        scaleY: 0.92,
        duration: 0.16,
        ease: "back.out(2.4)",
      })
      .to(splat, { scaleX: 1, scaleY: 1, duration: 0.18, ease: "power2.out" }) // settle = glued
      // GLUE hold, then slight sag down + fade
      .to(
        splat,
        {
          y: `+=${gsap.utils.random(14, 34)}`,
          scaleY: 1.06,
          opacity: 0,
          duration: gsap.utils.random(1.1, 1.7),
          ease: "power1.in",
        },
        `+=${gsap.utils.random(0.4, 0.8)}`,
      );
  }

  // ════════════════════════════════════════════════════════════════════
  // 🐛  BUG
  // ════════════════════════════════════════════════════════════════════

  // hover: nervous skitter + leg jitter
  function bugSkitter(el: HTMLElement) {
    const g = inner(el);
    if (!g) return;
    gsap.killTweensOf(g);
    gsap
      .timeline()
      .to(g, { x: -3, rotate: -12, duration: 0.06, ease: "power1.inOut" })
      .to(g, { x: 3, rotate: 10, duration: 0.08, ease: "power1.inOut" })
      .to(g, { x: -2, rotate: -6, duration: 0.07 })
      .to(g, { x: 2, y: -2, rotate: 6, duration: 0.07 })
      .to(g, { x: 0, y: 0, rotate: 0, duration: 0.12, ease: "power2.out" });
  }

  // click: infestation → debugged. bugs scatter, then glitch out.
  // click: the page "bugs out" (RGB-split + scanlines + tear), then snaps back PATCHED
  function bugDebug(el: HTMLElement) {
    if (busy.has(el) || consumed.has(el)) return; // one-shot: bug leaves for good
    busy.add(el);
    consumed.add(el);
    const g = inner(el);
    if (g) pulse(g);

    const text = document.querySelector(".contentBody") as HTMLElement | null;
    const section =
      (document.querySelector(".aboutSection") as HTMLElement) || document.body;
    if (!text) {
      busy.delete(el);
      return;
    }
    const r = section.getBoundingClientRect();
    const box = {
      left: `${r.left}px`,
      top: `${r.top}px`,
      width: `${r.width}px`,
      height: `${r.height}px`,
    };

    if (reduce) {
      gsap.fromTo(
        text,
        { x: -4 },
        { x: 0, duration: 0.25, ease: "power2.out", clearProps: "x" },
      );
      showPatched(el);
      const g2 = inner(el);
      if (g2) gsap.to(g2, { autoAlpha: 0, duration: 0.2 });
      el.style.pointerEvents = "none";
      gsap.to(el, {
        width: 0,
        maxWidth: 0,
        marginLeft: 0,
        marginRight: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onStart: () => {el.style.overflow = "hidden"},
      });
      gsap.delayedCall(0.4, () => busy.delete(el));
      return;
    }

    // scanline overlay + a few horizontal "tear" bars across the section
    const scan = particle({
      ...box,
      background:
        "repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 3px)",
      mixBlendMode: "overlay",
      opacity: "0",
    });
    const tears = Array.from({ length: 3 }, () =>
      particle({
        ...box,
        height: `${gsap.utils.random(8, 22)}px`,
        background: "rgba(255,255,255,0.10)",
        mixBlendMode: "screen",
        opacity: "0",
      }),
    );

    const tl = gsap.timeline({
      onComplete: () => {
        scan.remove();
        tears.forEach((t) => t.remove());
        gsap.set(text, { clearProps: "x,skewX,textShadow,filter" });
        busy.delete(el);
      },
    });

    // GLITCH — discrete jitter frames (RGB split via red/cyan text-shadow)
    const frames = 9;
    for (let i = 0; i < frames; i++) {
      const dx = gsap.utils.random(-7, 7);
      tl.set(text, {
        x: dx,
        skewX: gsap.utils.random(-5, 5),
        textShadow: `${dx}px 0 #ff003c, ${-dx}px 0 #00e5ff`,
        filter: i % 2 ? "contrast(1.3) saturate(1.4)" : "none",
      });
      tl.set(scan, { opacity: gsap.utils.random(0.25, 0.6) });
      tears.forEach((t) =>
        tl.set(
          t,
          {
            y: gsap.utils.random(-r.height / 2, r.height / 2),
            scaleX: gsap.utils.random(0.85, 1.15),
            opacity: i % 2 ? 0.7 : 0,
          },
          "<",
        ),
      );
      tl.to({}, { duration: gsap.utils.random(0.04, 0.08) }); // hold the frame
    }

    // SNAP back to clean
    tl.set(text, { x: 0, skewX: 0, textShadow: "none", filter: "none" });
    tl.set([scan, ...tears], { opacity: 0 });

    // green "patched" confirmation wash + tag
    const flash = particle({
      ...box,
      background:
        "radial-gradient(circle at center, rgba(4,255,150,0.16), transparent 60%)",
      mixBlendMode: "screen",
    });
    tl.fromTo(
      flash,
      { opacity: 0.9 },
      {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => flash.remove(),
      },
    );
    tl.add(() => showPatched(el), "<");
    tl.add(() => metamorphose(el), "+=0.12"); // bug → butterfly → flies away
  }

  function showPatched(el: HTMLElement) {
    const { x, y } = center(el);
    const tag = particle({
      padding: "2px 8px",
      borderRadius: "6px",
      background: "#04ff96",
      color: "#06281b",
      fontSize: "12px",
      fontWeight: "700",
      whiteSpace: "nowrap",
      fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    });
    tag.textContent = "✓ patched";
    gsap.set(tag, {
      x,
      y: y - 14,
      xPercent: -50,
      yPercent: -50,
      scale: 0.6,
      opacity: 0,
    });
    gsap
      .timeline({ onComplete: () => tag.remove() })
      .to(tag, {
        scale: 1,
        opacity: 1,
        y: y - 28,
        duration: 0.25,
        ease: "back.out(2)",
      })
      .to(
        tag,
        { opacity: 0, y: y - 44, duration: 0.5, ease: "power2.in" },
        "+=0.45",
      );
  }

  // a monarch-ish butterfly with two wing groups (.wl / .wr) that fold on the body line
  function butterflySvg(): string {
    const W1 = "#ff8a2a";
    const W2 = "#ff6d05";
    const E = "#1b1b1b";
    const S = "#fff1d6";
    return `<svg viewBox="0 0 100 100" width="100%" height="100%" style="display:block;overflow:visible">
      <g class="wl">
        <path d="M50 40 C 40 24, 16 22, 14 38 C 12 50, 30 52, 49 49 Z" fill="${W1}" stroke="${E}" stroke-width="1.4"/>
        <path d="M49 51 C 30 54, 20 64, 28 74 C 34 80, 46 72, 50 60 Z" fill="${W2}" stroke="${E}" stroke-width="1.4"/>
        <circle cx="26" cy="34" r="2.4" fill="${S}"/><circle cx="34" cy="66" r="2" fill="${S}"/>
      </g>
      <g class="wr">
        <path d="M50 40 C 60 24, 84 22, 86 38 C 88 50, 70 52, 51 49 Z" fill="${W1}" stroke="${E}" stroke-width="1.4"/>
        <path d="M51 51 C 70 54, 80 64, 72 74 C 66 80, 54 72, 50 60 Z" fill="${W2}" stroke="${E}" stroke-width="1.4"/>
        <circle cx="74" cy="34" r="2.4" fill="${S}"/><circle cx="66" cy="66" r="2" fill="${S}"/>
      </g>
      <ellipse cx="50" cy="50" rx="2.6" ry="15" fill="${E}"/>
      <circle cx="50" cy="33" r="3.2" fill="${E}"/>
      <path d="M50 31 C 47 24, 45 22, 42 20" stroke="${E}" stroke-width="1.3" fill="none" stroke-linecap="round"/>
      <path d="M50 31 C 53 24, 55 22, 58 20" stroke="${E}" stroke-width="1.3" fill="none" stroke-linecap="round"/>
      <circle cx="42" cy="20" r="1.4" fill="${E}"/><circle cx="58" cy="20" r="1.4" fill="${E}"/>
    </svg>`;
  }

  // bug → butterfly: emerge at the bug, flap, flutter off-screen, leave the spot blank
  function metamorphose(el: HTMLElement) {
    const { x, y } = center(el);
    const g = inner(el);

    // collapse the bug out of the text so the spot closes up
    if (g)
      gsap.to(g, {
        autoAlpha: 0,
        scale: 0.4,
        duration: 0.18,
        ease: "power2.in",
      });
    el.style.overflow = "hidden";
    el.style.pointerEvents = "none";
    gsap.to(el, {
      width: 0,
      maxWidth: 0,
      marginLeft: 0,
      marginRight: 0,
      duration: 0.5,
      ease: "power2.inOut",
    });

    // spawn butterfly at the bug's spot
    const bf = particle({ width: "46px", height: "46px" });
    bf.innerHTML = butterflySvg();
    gsap.set(bf, {
      x,
      y,
      xPercent: -50,
      yPercent: -50,
      scale: 0.2,
      opacity: 0,
      rotate: gsap.utils.random(-10, 10),
    });

    // wings flap (fold on the body axis, x=50 in viewBox units)
    const wings = bf.querySelectorAll(".wl, .wr");
    const flap = gsap.to(wings, {
      scaleX: 0.18,
      svgOrigin: "50 50",
      duration: 0.14,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    // emerge, then flutter off-screen on a wavy rising path
    const W = window.innerWidth;
    const side = Math.random() < 0.5 ? -1 : 1;
    const targetX = x + side * gsap.utils.random(W * 0.3, W * 0.6);
    const targetY = -120; // above the top edge
    const dur = gsap.utils.random(1.9, 2.5);
    const waves = gsap.utils.random(3, 5);
    const amp = gsap.utils.random(18, 40);

    gsap.to(bf, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)" });

    const s = { t: 0 };
    gsap.to(s, {
      t: 1,
      duration: dur,
      ease: "power1.in", // speeds up as it escapes
      delay: 0.18,
      onUpdate() {
        const e = s.t;
        gsap.set(bf, {
          x: x + (targetX - x) * e + Math.sin(e * Math.PI * waves) * amp, // side-to-side flutter
          y: y + (targetY - y) * e,
          rotate: Math.sin(e * Math.PI * waves) * 12, // sway with the flutter
        });
      },
      onComplete() {
        flap.kill();
        bf.remove();
      },
    });
    gsap.to(bf, { opacity: 0, duration: 0.5, delay: 0.18 + dur - 0.5 });
  }

  // ════════════════════════════════════════════════════════════════════
  // 🔨  HAMMER  (hover handled in CSS; this is the click impact)
  // ════════════════════════════════════════════════════════════════════

  function hammerImpact(el: HTMLElement) {
    if (busy.has(el)) return;
    busy.add(el);
    const g = inner(el);
    if (!g) {
      busy.delete(el);
      return;
    }
    const word = el.previousElementSibling as HTMLElement | null;

    gsap.killTweensOf(g);
    gsap.set(g, { transformOrigin: "25% 80%" });
    gsap
      .timeline({
        onComplete: () => {
          gsap.set(g, { transformOrigin: "50% 80%" });
          busy.delete(el);
        },
      })
      .to(g, { rotate: 80, duration: 0.12, ease: "power2.out" }) // wind up
      .to(g, { rotate: 40, duration: 0.09, ease: "power3.in" }) // SWING (accelerating)
      .add(() => impactBurst(el, word)) // CONTACT
      .to(g, { rotate: 0, duration: 0.55, ease: "elastic.out(1, 0.4)" }); // recoil
  }

  function impactBurst(el: HTMLElement, word: HTMLElement | null) {
    const { x, y } = center(el);
    const hitY = y + el.offsetHeight * 0.35;

    // letters jolt down + spring back
    if (word) {
      gsap
        .timeline()
        .to(word, { y: 7, duration: 0.07, ease: "power2.in" })
        .to(word, { y: 0, duration: 0.6, ease: "elastic.out(1, 0.35)" });
    }
    // tiny screen-shake on the content
    shake(".container", 7, 0.35);

    if (reduce) return;

    // shockwave ring
    const ring = particle({
      width: "14px",
      height: "14px",
      borderRadius: "50%",
      border: "2px solid rgba(255,255,255,0.9)",
    });
    gsap.set(ring, { x, y: hitY, xPercent: -50, yPercent: -50 });
    gsap.fromTo(
      ring,
      { scale: 0.2, opacity: 0.9 },
      {
        scale: 14,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => ring.remove(),
      },
    );

    // sparks fly up + out under heavy gravity
    for (let i = 0; i < 10; i++) {
      const a = rad(gsap.utils.random(-160, -20));
      const sp = gsap.utils.random(300, 600);
      const dur = gsap.utils.random(0.35, 0.6);
      const spark = particle({
        width: `${gsap.utils.random(2, 3)}px`,
        height: `${gsap.utils.random(8, 16)}px`,
        borderRadius: "2px",
        background: gsap.utils.random(["#fff", "#ffea05", "#ffd27a"]),
      });
      gsap.set(spark, { rotate: (a * 180) / Math.PI + 90 });
      ballistic(spark, {
        x,
        y: hitY,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp,
        gravity: 1600,
        duration: dur,
      });
      gsap.to(spark, {
        opacity: 0,
        duration: dur,
        ease: "power1.in",
        onComplete: () => spark.remove(),
      });
    }
  }

  function shake(target: string, intensity: number, duration: number) {
    const t = (gsap.utils.toArray(target)[0] as HTMLElement) || null;
    if (!t) return;
    const steps = 8;
    const tl = gsap.timeline();
    for (let i = 0; i < steps; i++) {
      tl.to(t, {
        x: gsap.utils.random(-intensity, intensity),
        y: gsap.utils.random(-intensity, intensity),
        duration: duration / steps,
        ease: "power1.inOut",
      });
    }
    tl.to(t, { x: 0, y: 0, duration: duration / steps, ease: "power2.out" });
  }

  return { paintFlick, paintSplat, bugSkitter, bugDebug, hammerImpact };
}

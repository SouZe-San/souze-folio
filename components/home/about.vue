<template>
  <section class="h-screen flex justify-center items-center aboutSection">
    <div class="container md:max-w-7xl space-y-16 max-sm:px-4">
      <!-- ! Heading -->
      <div class="heading flex justify-end">
        <div class="inline-block relative text-center content_title">
          <span
            class="headSpan absolute md:text-3xl sm:text-[.9rem] text-[.7rem] font-cinzel-bold sm:-top-1 opacity-60 text-white/20 left-[50%] -translate-x-[50%]"
            style="letter-spacing: 10px"
            >Who I&#39;m
          </span>

          <h1
            class="md:text-6xl sm:text-4xl text-[2rem] font-cinzel-bold text-white/80 headText overflow-hidden"
            @mousemove="scaleGrow"
            @mouseleave="scaleNormal"
            style="padding-top: 12px"
          >
            What I&#39;m up to
          </h1>

          <span class="line"></span>
        </div>
      </div>

      <!-- Body Text -->
      <div class="relative text-center sm:text-left px-6 sm:px-16">
        <div class="contentBody text md:text-3xl text-white/70">
          Hey There! I&#39;m Soumyajit — or
          <NuxtLink
            to="https://github.com/SouZe-San"
            id="owner"
            class="text-white font-changa tracking-wide sm:text-[32px] relative under-hover"
            target="_blank"
            @mousemove="scaleSmallGrow"
            @mouseleave="scaleNormal"
          >
            Souze-san </NuxtLink
          >, if you've run into me on the internet
          <span class="code-tag font-roboto-condensed">~_~</span>. I've got a
          thing for
          <span class="sm:text-[32px] font-changa text-white"
            >wired ideas and clean design</span
          ><span class="emoji" data-emoji data-fx="paint" aria-hidden="true"
            ><span class="emoji-inner">🎨</span></span
          >. A full-stack dev who&#39;s about more than just writing code:
          solving real problems<span
            class="emoji"
            data-emoji
            data-fx="bug"
            aria-hidden="true"
            ><span class="emoji-inner">🐛</span></span
          >
          and making digital experiences that actually matter. Front-end polish
          or back-end logic, I just like
          <span class="sm:text-[32px] font-changa text-white">building</span
          ><span class="emoji" data-emoji data-fx="hammer" aria-hidden="true"
            ><span class="emoji-inner">🔨</span></span
          >
          stuff that works, scales, and sparks curiosity.<NuxtLink
            to="/projects"
            id="owner"
            class="sm:text-[32px] relative ml-2"
            target="_blank"
            ><span class="code-tag font-roboto-condensed"
              >&lt;/&gt;</span
            ></NuxtLink
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const { $gsap, $SplitText } = useNuxtApp();

const { setHover } = useHover();
const fx = useEmojiFx();

function scaleGrow() {
  setHover(true);
}
function scaleSmallGrow() {
  setHover(true, "small");
}

function scaleNormal() {
  setHover(false);
}

const teardown: Array<() => void> = [];
onUnmounted(() => teardown.forEach((fn) => fn()));

// -------
onMounted(() => {
  if (!document.querySelector(".aboutSection")) return;
  const headTriggerTl = $gsap.timeline({
    scrollTrigger: {
      trigger: ".aboutSection",
      start: "top center",
      end: "top center+=100",
      scrub: false,
      toggleActions: "play none reverse reverse",
    },
  });

  headTriggerTl.fromTo(
    ".line",
    {
  
      scaleX: 0,
    },
    {

      scaleX: 1,
      ease: "power3.out",
     
    },
  );
  const headSplitText = $SplitText.create(".headText", {
    type: "chars",
    onSplit(self) {
      headTriggerTl.fromTo(
        self.chars,
        {
          y: 100,
        },
        {
          y: 0,
          duration: 0.3,
          ease: "power2.out",
          stagger: 0.03,
        },
      );
    },
  });

  headTriggerTl.fromTo(
    ".headSpan",
    {
      y: 50,
      alpha: 0,
    },
    {
      y: 0,
      alpha: 1,
      ease: "power3.out",
    },
  );
  teardown.push(() => {
    headSplitText.revert();
    headTriggerTl.scrollTrigger?.kill();
    headTriggerTl.kill();
  });

  // ── paragraph container fade  ──
  const textFade = $gsap.fromTo(
    ".text",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
      onStart: () => {
        $gsap.set(".text", { willChange: "opacity" });
      },
      onComplete: () => {
        $gsap.set(".text", { willChange: "auto" });
      },
      scrollTrigger: {
        trigger: ".aboutSection",
        start: "top center-=50",
        end: "top center+=100",

        toggleActions: "play none reverse reverse",
      },
    },
  );
  teardown.push(() => {
    textFade.scrollTrigger?.kill();
    textFade.kill();
  });

  // ── emoji grow-in: transform + opacity only (no reflow, no clip on the FX pop) ──
  const revealEmojis = () => {
    $gsap.utils.toArray<HTMLElement>(".emoji").forEach((el) => {
      $gsap.fromTo(
        el,
        {width: 0, scale: 0, autoAlpha: 0, y: 10, rotate: -20 },
        {width: "auto",
          scale: 1,
          autoAlpha: 1,
          y: 0,
          rotate: 0,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: el,
            start: "center 70%",
            end: "center 55%",
            scrub: 1,
          },
        },
      );
    });
  };

  // ── body reveal, split by capability (auto-reverts when the query flips) ──
  const mm = $gsap.matchMedia();

  // DESKTOP / real cursor — per-CHARACTER scrub + hover FX
  mm.add(
    "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    () => {
      const st = $SplitText.create(".text", {
        type: "chars,words",
        autoSplit: true,
        ignore: "[data-emoji]",
        onSplit(self) {
          return $gsap.fromTo(
            self.chars,
            { autoAlpha: 0.2 },
            {
              autoAlpha: 1,
              ease: "power4.inOut",
              stagger: 0.05,
              scrollTrigger: {
                trigger: ".aboutSection",
                start: "center-=200 center+=100",
                end: "center+=100 center+=70",
                scrub: 1,
              },
            },
          );
        },
      });
      revealEmojis();

      // hover micro-FX — desktop only (avoids the touch double-fire with click)
      const offs: Array<() => void> = [];
      $gsap.utils.toArray<HTMLElement>(".emoji").forEach((el) => {
        const kind = el.dataset.fx;
        const enter = () => {
          if (kind === "paint") fx.paintFlick(el);
          else if (kind === "bug") fx.bugSkitter(el);
        };
        el.addEventListener("pointerenter", enter);
        offs.push(() => el.removeEventListener("pointerenter", enter));
      });

      return () => {
        st.revert();
        offs.forEach((f) => f());
      };
    },
  );

  // MOBILE / touch — per-LINE scrub (keeps the scroll-reveal, ~30× fewer targets)
  mm.add(
    "(pointer: coarse) and (prefers-reduced-motion: no-preference)",
    () => {
      const st = $SplitText.create(".text", {
        type: "lines",
        autoSplit: true,
        ignore: "[data-emoji]",
        onSplit(self) {
          return $gsap.fromTo(
            self.lines,
            { autoAlpha: 0.25, },
            {
              autoAlpha: 1,
                ease: "power4.inOut",
              stagger: 0.05,
              scrollTrigger: {
                trigger: ".aboutSection",
                start: "center-=200 center+=100",
                end: "center+=120 center+=60",
                scrub: true,
              },
            },
          );
        },
      });
      revealEmojis();
      return () => st.revert();
    },
  );

  // REDUCED MOTION — no scrub, everything at rest
  mm.add("(prefers-reduced-motion: reduce)", () => {
    $gsap.set(".text", { autoAlpha: 1 });
    $gsap.set(".emoji", { autoAlpha: 1, scale: 1, clearProps: "transform" });
  });

  teardown.push(() => mm.revert());

  // ── click FX — every device (the primary interaction) ────────────────────
  $gsap.utils.toArray<HTMLElement>(".emoji").forEach((el) => {
    const kind = el.dataset.fx;
    const click = () => {
      if (kind === "paint") fx.paintSplat(el);
      else if (kind === "bug") fx.bugDebug(el);
      else if (kind === "hammer") fx.hammerImpact(el);
    };
    el.addEventListener("click", click);
    teardown.push(() => el.removeEventListener("click", click));
  });
});
</script>

<style scoped>
.line {
  position: absolute;
  bottom: 4px;
  left: 0;
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.828);
  transform-origin: left center;
}

.contentBody,
.fakeContent {
  line-height: 1.5;
  letter-spacing: 1px;
  word-wrap: break-word;
}

.under-hover {
  position: relative;
  &::after {
    content: "";
    position: absolute;
    bottom: 10px;
    left: 0;
    height: 1px;
    width: 0%;
    background: rgb(255, 255, 255);
    transition: width 0.3s ease-in-out;
  }

  &:hover {
    &::after {
      width: 100%;
    }
  }
}

.name-alt {
  letter-spacing: 3px;
}

.emoji {
  display: inline-block;

  font-size: 0.85em;
  /* margin: 0 0.12em; */
  vertical-align: 0.3em;
  /* will-change: width, transform, opacity; */
  pointer-events: auto;
  cursor: pointer;
  user-select: none;
}

.emoji-inner {
  display: inline-block;
  cursor: pointer;
  transform-origin: 50% 80%;
}

@media (hover: hover) {
  .emoji[data-fx="hammer"]:hover .emoji-inner {
    animation: emoji-pop 0.55s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
}
@keyframes emoji-pop {
  0% {
    transform: rotate(0) scale(1);
  }
  30% {
    transform: rotate(60deg) scale(1.35);
  }
  60% {
    transform: rotate(12deg) scale(1);
  }
  100% {
    transform: rotate(0) scale(1);
  }
}


@media (width <= 640px) {
  .aboutSection {
    height: 80svh;
  }
}
</style>

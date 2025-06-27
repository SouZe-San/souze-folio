<template>
  <section class="h-screen flex justify-center items-center aboutSection">
    <div class="container space-y-16">
      <div class="heading flex justify-end">
        <div class="inline-block relative text-center content_title">
          <span
            class="headSpan absolute md:text-3xl font-cinzel-bold sm:-top-1 opacity-60 text-white/20 left-[50%] -translate-x-[50%]"
            style="letter-spacing: 10px"
            >What I&#39;m
          </span>

          <h1
            class="md:text-6xl font-cinzel-bold text-white/80 headText overflow-hidden"
            @mousemove="scaleGrow"
            @mouseleave="scaleNormal"
            style="padding-top: 12px"
          >
            What I&#39;m up to
          </h1>

          <span class="line"></span>
        </div>
      </div>

      <div class="relative"
      @mouseenter="cursorHidden"
      @mouseleave="scaleNormal" 
      >
        <div class="contentBody text md:text-3xl text-white/70">
          <span class="sm:text-4xl text-white" style="letter-spacing: 0"> Hey There! </span>
          I&#39;am
          <span
            id="owner"
            class="text-white font-changa sm:text-[32px] relative"
            >Soumyajit Mondal </span
          >, a Computer Science Graduate from India with a passion for clean code and wired Design.
          Now, i Build as a
          <span
            class="sm:text-[32px] font-changa text-white"
          >
            Full-stack Developer
          </span>
          who Loves turing ideas into interactive, scalable digital experience. Whether it&#39;s
          front-end magic or back-end logic, I enjoy crafting thing that solve
          <span
            class="sm:text-[32px] font-changa text-white"
          >
            real problem
          </span>
          and spark curiosity. Always exploring, always building - One line of code at a time.
        </div>

        <!-- Hidden Content -->
        <div class="fakeContent absolute md:text-3xl top-0 text-black/80" 
        ref="maskBody"
         @mousemove="clipGrow"
          @mouseleave="clipHidden"
        >
          <span class="sm:text-4xl text-black" style="letter-spacing: 0"> Hey there! </span> My self
          <span
            class="text-black font-changa sm:text-[32px] under-hover"
            style="letter-spacing: 2px; font-weight: 500;"
            >Souze-san</span
          >, a CS graduate from India with a passion for Wired Things ~_~. A full-stack developer
          who&#39;s all about more than just writing code. It&#39;s about solving  <span
            class="text-black font-changa sm:text-[32px] under-hover"
            style="letter-spacing: 2px"
            >real-world</span>
          problems and creating digital experiences that matter. Whether it&#39;s designing smooth front-ends or <span
            class="text-black font-changa sm:text-[32px] under-hover"
            style="letter-spacing: 2px"
            >debugging</span> back-end logic, I&#39;m passionate about building things that
          work, scale, and spark curiosity.
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";

const { setHover } = useHover();
const { cursorPosition } = useCursorPosition();

const size = ref(0);
const maskBody = ref();
const rafId = ref<number | null>(null);
const isOver = ref(false);

const updateMousePosition = (e: MouseEvent) => {
  console.log(isOver.value)
  size.value = computed(() => (isOver.value ? 200 : 0)).value;
};

function scaleGrow() {
  setHover(true);
}
function cursorHidden() {
  setHover(true, "none");
}

function scaleNormal() {
  setHover(false);
  size.value = 0
}

function clipGrow() {
  isOver.value = true;
}
function clipHidden() {
  isOver.value = false;
}


// Mask Animation
const moveMask = (x: number, y: number, size: number) => {
  if (!maskBody.value) return;

  gsap.set(maskBody.value, {
    maskPosition: `${x - size / 2}px ${y - size / 2}px`,
    ease: "back.out",
  });
  gsap.set(maskBody.value, {
    maskSize: size,
    ease:"power3.inOut"
  });

};


const animate = () => {
  if (!maskBody.value) return;
  const { x, y } = cursorPosition.value;
  const { x:boxX,y: boxY } = maskBody.value.getBoundingClientRect();

  moveMask(x-boxX, y - boxY, size.value);

  rafId.value = window?.requestAnimationFrame(animate);
};


watchEffect((onCleanup) => {
  animate();
  maskBody.value?.addEventListener("mousemove", updateMousePosition);

  onCleanup(() => {
    maskBody.value?.removeEventListener("mousemove", updateMousePosition);
    window?.cancelAnimationFrame(rafId.value!);
  });
});

onMounted(() => {
  if(!document.getElementsByClassName('aboutSection')) return
  const triggerTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".aboutSection",
      start: "top center",
      end: "top center+=100",
      scrub: false,
      toggleActions: "play none reverse reverse",
    },
  });

  triggerTl.fromTo(
    ".line",
    {
      width: 0,
    },
    {
      width: "100%",
      ease: "power3.out",
    }
  );
  SplitText.create(".headText", {
    type: "chars",
    onSplit(self) {
      return triggerTl.fromTo(
        self.chars,
        {
          y: 100,
        },
        {
          y: 0,
          duration: 0.3,
          ease: "power2.out",
          stagger: 0.03,
        }
      );
    },
  });

  triggerTl.fromTo(
    ".headSpan",
    {
      y: 50,
      alpha: 0,
    },
    {
      y: 0,
      alpha: 1,
      ease: "power3.out",
    }
  );

  gsap.fromTo(
    ".text",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".aboutSection",
        start: "top center-=50",
        end: "top center+=100",

        toggleActions: "play none reverse reverse",
      },
    }
  );

  SplitText.create(".text", {
    type: "chars,words",
    autoSplit: true,
    onSplit(self) {
      return gsap.fromTo(
        self.chars,
        {
          autoAlpha: 0.2,
        },
        {
          autoAlpha: 1,
          ease: "power4.inOut",
          stagger: 0.05,
          scrollTrigger: {
            trigger: ".aboutSection",
            start: "center-=200 center+=100",
            end: "center+=100 center+=70",
            scrub: true,
          },
        }
      );
    },
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
}

.contentBody,
.fakeContent {
  line-height: 1.5;
  letter-spacing: 1px;
  word-wrap: break-word;
}

.fakeContent{
  background: #ffffff;
  padding: 5px 0;
 mask-image: url("/public/assets/mask.svg");
  mask-repeat: no-repeat;
  mask-size: 0px;
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
    background: rgb(0, 0, 0);
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
</style>

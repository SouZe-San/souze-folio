<template>
  <section
    class="h-screen relative"
    id="skills"

  >
    <!-- mask Content -->
    <div
      class="h-full w-full flex flex-col justify-center items-center absolute maskBody"
      ref="maskBody"
    >
      <div class="w-full text-center">
        <h1
          class="inline font-cinzel-bold sm:text-6xl text-[40px] max-sm:mt-4 relative"
          @mousemove="scaleGrow"
          @mouseleave="scaleNormal"
        >
          <span
            class="absolute sm:-top-7 -top-5 opacity-60 text-white/20 left-[50%] -translate-x-[50%]"
            style="letter-spacing: 10px"
          >
            Stacks
          </span>
          Techno logia
        </h1>
      </div>
      <div class="md:w-[70%] text-center text-3xl text-black/60" @mousemove="scaleGrow" @mouseleave="scaleNormal">
        <img :src="img" alt="This is"/>
      </div>
    </div>
    <!-- Main Content -->
    <div class="h-full w-full flex flex-col justify-center items-center gap-16">
      <div class="w-full text-center">
        <h1 class="inline font-cinzel-bold sm:text-6xl text-[40px] max-sm:mt-4 relative">
          <span
            class="absolute sm:-top-7 -top-5 opacity-60 text-white/20 left-[50%] -translate-x-[50%]"
            style="letter-spacing: 10px"
          >
            Techs
          </span>
          What I use
        </h1>
      </div>
      <p class="md:w-[70%] text-center text-3xl text-white/60">
        I believe - <span class="text-white font-semibold">M<span class="font-changa">y</span> work speaks <span class="font-changa">louder</span> than words</span>. To really understand my <span class="font-changa capitalize">skills</span>, feel free to check out the <span class="text-white/80 underline cursor-pointer"><span class="font-changa uppercase">p</span>r<span class="font-changa">o</span>jec<span class="font-changa">ts</span></span> I&#39;ve worked on — they&#39;ll give you a better idea of what I&#39;m capable of
      </p>
    </div>
  </section>
</template>

<script lang="ts" setup>
const { $gsap } = useNuxtApp();
import img from '~/assets/images/background/techs.webp'

const { setHover } = useHover();
const { cursorPosition } = useCursorPosition();

const maskBody = ref();
const isOver = ref(false);
const size = ref(32);
const rafId = ref<number | null>(null);

function originMouseEnter() {
  setHover(true, "none");
}

function originMouseLeave() {
  setHover(false);
}
function scaleGrow() {
  originMouseEnter()
  isOver.value = true;
}

function scaleNormal() {
  originMouseLeave()
  isOver.value = false;
}

const updateMousePosition = (e: MouseEvent) => {
  size.value = computed(() => (isOver.value ? 300 : 32)).value;
};

const moveCircle = (x: number, y: number, size: number) => {
  if (!maskBody.value) return;

  $gsap.set(maskBody.value, {
    maskPosition: `${x - size / 2}px ${y - size / 2}px`,
    ease: "back.out",
  });
  $gsap.set(maskBody.value, {
    maskSize: size,
    ease:"power3.inOut"
  });

};

const animate = () => {
  if (!maskBody.value) return;
  const { x, y } = cursorPosition.value;
  const { y: boxY } = maskBody.value.getBoundingClientRect();

  moveCircle(x, y - boxY, size.value);

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
</script>

<style scoped>
.maskBody {
  mask-image: url("/public/assets/mask.svg");
  mask-repeat: no-repeat;
  mask-size: 32px;
  background:url('/assets/images/background/noisy-2.png') repeat,rgb(70, 70, 70);
  /* background-size: cover; */
  color: black;
  z-index: 1;
  
  /** By Using this transition become smooth But some unWanted Happens*/
  /* transition: mask-size .5s;  */
}
</style>

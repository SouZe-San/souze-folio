<template>
  <header class="flex items-center justify-between p-4 select-none" ref="headerRef">
    <div class="logo">
      <div class="font-changa text-xl flex gap-2 items-center">
        <div class="w-10 rounded-full overflow-hidden flex-shrink-0">
          <NuxtImg
            :src="profile"
            alt="profile"
            width="40"
            height="40"
            fetchpriority="high"
          />
        </div>

        <img
          alt="Souze"
          :src="nameLogo"
          width="160"
          height="32"
          fetchpriority="high"
          class="sm:w-40 w-36"
        />
      </div>
    </div>

    <div
      class="flex items-center justify-center gap-2"
      @mouseenter="scaleUp"
      @mouseleave="() => setHover(false)"
    >
      <span class="relative flex size-3 mr-4 sm:mr-0">
        <span
          class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-75"
        ></span>
        <span
          class="relative inline-flex size-3 rounded-full bg-green-500"
        ></span>
      </span>
      <span class="text-xl leading-3 sm:block hidden font-changa">
        Open to work
      </span>
    </div>
  </header>
</template>

<script lang="ts" setup>
import nameLogo from "~/assets/icons/logo/name.svg";
const profile = "/assets/profile.jpeg";
const { setHover } = useHover();
const headerRef = ref<HTMLElement>();

function scaleUp() {
  setHover(true, "small");
}

const BREAKPOINT_SM = 640; // mobile - sm
const SCROLL_THRESHOLD = 670; // px at which header shrinks

// ── Scroll handler ──────────────────────────────────────────────
let isNarrow = false;
let rafPending = false;

function widthChange() {
  // rAF gate
  if (rafPending) return;
  rafPending = true;

  requestAnimationFrame(() => {
    rafPending = false;

    if (!headerRef.value || window.innerWidth <= BREAKPOINT_SM) return;

    const shouldBeNarrow = window.scrollY > SCROLL_THRESHOLD;

    // Skip the DOM write when state hasn't changed
    if (shouldBeNarrow === isNarrow) return;
    isNarrow = shouldBeNarrow;

    headerRef.value.style.width = shouldBeNarrow ? "40vw" : "80vw";
  });
}

const onResize = () => {
  isNarrow = false;
  widthChange();
};

onMounted(() => {
  window.addEventListener("scroll", widthChange, { passive: true });
  window.addEventListener("resize", onResize, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", widthChange);
  window.removeEventListener("resize", onResize);
});
</script>

<style scoped>
header {
  width: 80vw;
  height: 48px;
  position: fixed;
  top: 40px;
  left: 50%;
  z-index: 200;
  transform: translateX(-50%);
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(10px);
  /* background-color: rgba(85, 85, 85, 0.16); */
  border-radius: 1rem;
  border: 1px solid #ffffff1c;
  box-shadow: 0px 4px 8px 1px rgba(0, 0, 0, 0.4117647059);
  transition: width 0.4s ease-in-out;
  will-change: width;
}

@media (width <= 640px) {
  header {
    width: 90vw;
    height: 50px;
  }
}
</style>

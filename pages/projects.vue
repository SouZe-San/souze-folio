<template>
  <main>
    <NavPageHeader />
    <div class="back_white_blob_top"></div>
    <div class="back_white_blob_down"></div>

    <section class="w-full h-full flex flex-col sm:pt-24 items-center">
      <div class="w-full text-center mb-20">
        <h1
          class="inline font-cinzel-bold sm:text-6xl text-[40px] max-sm:mt-4 relative"
          @mousemove="scaleGrow"
          @mouseleave="scaleNormal"
        >
          <span
            class="absolute sm:-top-7 -top-5 opacity-60 text-white/20 left-[50%] -translate-x-[50%]"
            style="letter-spacing: 10px"
          >
            Works
          </span>
          My Works
        </h1>
      </div>

      <div class="relative w-full mb-20">
        <SharedBackground>
          <ProjectsItemRow
            v-for="(project, index) in AllProjects"
            :key="index.toString()"
            data-shb-item
            v-bind="project"
          />
        </SharedBackground>
      </div>

      <div
        class="sm:mb-12 flex justify-center items-center w-full font-changa"
      >
        <button
          class="group relative text-lg border border-transparent hover:border-dashed hover:border-white/10 hidden sm:flex"
        >
          <span> Explore more in GITHUB </span>
          <IconsArrow class="w-4" />

          <!-- corner  -->
          <span
            className="absolute top-0 left-0 w-1 h-1 border-t border-l border-border group-hover:border-[#c6ff93] group-hover:-top-1 group-hover:-left-1
            transition-all"
          ></span>
          <span
            className="absolute top-0 right-0 w-1 h-1 border-t border-r border-border group-hover:border-[#c6ff93] group-hover:-top-1 group-hover:-right-1 transition-all"
          ></span>
          <span
            className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-border group-hover:border-[#c6ff93] group-hover:-bottom-1 group-hover:-left-1 transition-all"
          ></span>
          <span
            className="absolute bottom-0  right-0 w-1 h-1 border-b border-r border-border group-hover:border-[#c6ff93] group-hover:-bottom-1 group-hover:-right-1 transition-all"
          ></span>
        </button>
      </div>
    </section>
  </main>
      <img
  src="/assets/gif/miku01.gif"
  alt=""
  aria-hidden="true"
  draggable="false"
  class="corner-buddy "
  v-if="isFine"
/>
</template>

<script lang="ts" setup>
import { AllProjects } from "~/config/projectsData";

useHead({
  title: "Souze-San || Projects",
  meta: [{ name: "description", content: "Some selected projects" }],
});

const { setHover } = useHover();
function scaleGrow() {
  setHover(true);
}

function scaleNormal() {
  setHover(false);
}

const isFine = ref(false);
let mq: MediaQueryList | null = null;
const onPointerKind = (e: MediaQueryListEvent | MediaQueryList) => {
  isFine.value = e.matches;
 
};

onMounted(() => {
  mq = window.matchMedia("(width >= 1280px)");
  isFine.value = mq.matches;
  mq.addEventListener("change", onPointerKind);
 
});
onUnmounted(() => {
  mq?.removeEventListener("change", onPointerKind);

});
</script>

<style scoped>
button {

  border-radius: 6px;
  padding: 6px 24px;
  gap: 10px;
  font-weight: 400;
  opacity: 0.5;
  background: repeating-linear-gradient(
    119deg,
    color-mix(in srgb, #ededec 24%, transparent) 0px,
    color-mix(in srgb, #ededec 24%, transparent) 1px,
    transparent 1px,
    transparent 5px
  );
  color: #e5f3fe;
  box-shadow:
    0 7px 6px -1px #00000073,
    0 3px 63px -3px #0000002b;
}

.corner-buddy {
  position: fixed;
  right: 0;
  bottom: 0;
  width: 200px;
  height: auto;
  z-index: 10;         
  pointer-events: none;  
  user-select: none;
  filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.45)) opacity(.34);
  animation: buddy-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
 
}
</style>

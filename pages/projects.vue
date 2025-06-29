<template>
  <main>
    <NavPageHeader />
    <div class="back_white_blob_top"></div>
    <div class="back_white_blob_down"></div>

    <section class="w-full h-full flex flex-col sm:gap-24 items-center">
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

      <div class="relative w-full sm:mb-30 mb-16">
        <ProjectsItemRow
          v-for="(project, index) in AllProjects"
          :key="index.toString()"
          v-bind="project"
        />
      </div>

      <div class="sm:mb-12 mb-30 flex justify-center items-center w-full font-changa">
        <button>
          View More of Them
          <IconsArrow class="w-4" />
        </button>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { AllProjects } from "~/components/projects/projectsData";

const { setHover } = useHover();
function scaleGrow() {
  setHover(true);
}

function scaleNormal() {
  setHover(false);
}
</script>

<style scoped>
button {
  border: 1px solid #cfcfcf87;
  margin-top: 1rem;
  font-size: 24px;
  border-radius: 30px;
  padding: 5px 24px;
  display: flex;
  gap: 10px;
  font-weight: 400;
  background: url("/public/noiseTex.webp") repeat, #eeeeee13;
  background-size: 200px;
  backdrop-filter: blur(1rem);
  color: #d8a5e6;
  box-shadow: 0 7px 6px -1px #00000073, 0 3px 63px -3px #ffffff2b;
}
</style>

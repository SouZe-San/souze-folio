<template>
  <div
    class="w-full mb-4 group row-item"
    @mouseenter="(e) => manageMouseEnter(e)"
    @mouseleave="(e) => manageMouseLeave(e)"
  >
  <div class="py-4 px-32 inside">
    <div class="flex w-full gap-1 justify-between items-end">
      <div
        class="flex items-center  lg:text-[8rem] md:text-5xl text-md font-semibold item-head"
        @mousemove="scaleUp"
        @mouseleave="scaleNormal"
      >
        <h1 class="part-1"><span class="font-cinzel-bold">I</span>mage</h1>
        <div class="img">
          <img :src="img" alt="bg-img" />
        </div>
        <h1 class="part-2">
          <span class="font-cinzel-regular">Morph</span>
        </h1>
      </div>
      <div class="flex gap-3" @mousemove="scaleMidUp" @mouseleave="scaleNormal">
        <IconsSocialsGithubLink class="w-10" />
        <NuxtLink to="https://github.com" class="flex items-center gap-1">
          <IconsArrow
            class="w-7 ml-3 text-white opacity-60 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
        /></NuxtLink>
      </div>
    </div>

    <div class="flex flex-col gap-2 mt-2">
      <p class="md:text-lg text-sm description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, obcaecati.
      </p>
      <div class="flex justify-between items-center gap-8 md:gap-14">
        <div
          class="flex gap-2 overflow-x-scroll no-scrollbar"
          @mousemove="scaleMidUp"
          @mouseleave="scaleNormal"
        >
          <span
            v-for="(tech, index) in techStack"
            class="mt-1 badge capitalize border border-white/40 rounded-xl w-auto blur-bg"
            :key="index.toString()"
          >
            <img
              :src="techIcons[tech]"
              :alt="`${tech} logo used in title`"
              class="w-5 object-contain"
              loading="lazy"
            />

            {{ tech }}
          </span>
        </div>
        <div class="text-xl">
          <span class="font-cinzel-bold"> June,</span><span class="font-cinzel-regular"> 2025</span>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type TechIconType, techIcons } from "~/assets/images/logos";
const { setHover } = useHover();
const {$gsap} = useNuxtApp()

function scaleUp() {
  setHover(true, "big");
}
function scaleMidUp() {
  setHover(true, "small");
}

function scaleNormal() {
  setHover(false);
}

const techStack: TechIconType[] = [
  "next",
  "redux",
  "node",
  "express",
  "prisma",
  "postgres",
  "docker",
];

import img from "~/assets/images/projects/002.png";

const manageMouseEnter = (e: MouseEvent) => {
  $gsap.to(e.target, { top: "-6vw",background:'linear-gradient(45deg,rgba(54, 54, 54, 1) 0%, rgba(31, 30, 30, 1) 34%, rgba(31, 28, 28, 0.97) 63%, rgba(59, 55, 55, 1) 94%)', duration: 0.3, ease: "power2.inOut" });
};

const manageMouseLeave = (e: MouseEvent) => {
  $gsap.to(e.target, { top: "0",background:'#151515', duration: 0.3, delay: 0.1});
};
</script>

<style scoped>
.row-item {
  position: relative;
  margin-bottom: -6vw;
  background:#151515 ;
 
  border-top: 1px solid rgba(200, 199, 199, 0.52);
}
.inside{
  background: url("/assets/images/background/noisy-2.png");
}
.description {
  line-height: 1;
  letter-spacing: 1px;
  word-spacing: 2px;
  /* font-size: 18px; */
}

.blur-bg {
  background: url(/assets/images/background/noisy-2.png), #eeeeee13;
  backdrop-filter: blur(1rem);
}

.badge {
  display: flex;
  gap: 5px;
  padding: 4px 25px;
  border: 2px solid #d1d1d157;
  border-radius: 25px;
  letter-spacing: 2px;
}

.item-head {
  --webkit-box-direction: 100%;
  .img {
    width: 15rem;
    background: #000;
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    overflow: hidden;
    flex: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &:hover {
    .img {
      flex: 1;
    }
  }
}
</style>

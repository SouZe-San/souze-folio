<template>
  <div
    class="w-full mb-4 group row-item"
    @mouseenter="(e) => manageMouseEnter(e)"
    @mouseleave="(e) => manageMouseLeave(e)"
  >
    <div class="py-4 md:px-32 px-4 inside">
      <div class="flex w-full gap-1 justify-between items-end">
        <div
          class="flex items-center 2xl:text-[8rem] lg:text-[6.5rem] md:text-5xl text-[2rem] font-semibold item-head"
          @mousemove="scaleUp"
          @mouseleave="scaleNormal"
        >
          <h1 class="part-1"><span class="font-cinzel-bold">{{ title.first.charAt(0) }}</span>{{ title.first.slice(1) }}</h1>
          <div class="img">
            <img :src="imagUrl" alt="bg-img" />
          </div>
          <h1 class="part-2">
            <span class="font-cinzel-regular">{{ title.last }}</span>
          </h1>
        </div>
        <div class="flex flex-col justify-between sm:h-[6rem] h-[5rem]" :class="(title.first.length + title.last.length) >8 && 'max-sm:-translate-x-1/2'">
          <div class="project-type font-changa uppercase">{{ projectType }}</div>
          <div class="flex gap-3 max-sm:justify-end" @mousemove="scaleMidUp" @mouseleave="scaleNormal">
            <NuxtLink :to="gitUrl" target="_blank" class="flex items-center gap-1 link">
            <IconsSocialsGithubLink class="sm:w-10 w-6" />
            </NuxtLink>
            <NuxtLink v-if="liveUrl" :to="liveUrl" target="_blank" class="flex items-center gap-1 link">
              <IconsArrow
                class="sm:w-7 w-4 ml-3 text-white opacity-60 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
            /></NuxtLink>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-2 mt-2">
        <p class="md:text-lg text-sm description">
         {{ description }}
        </p>
        <div class="flex justify-between items-center gap-8 md:gap-14">
          <div
            class="flex gap-2 overflow-x-scroll no-scrollbar tech-stack-section"
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
                class="sm:w-5 w-3 aspect-square object-contain"
                loading="lazy"
              />

              {{ techName[tech] }}
            </span>
          </div>
          <div class="sm:text-xl text-[16px]">
            <span class="font-cinzel-bold"> {{ date.month }},</span
            ><span class="font-cinzel-regular"> {{ date.year }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { techIcons } from "~/assets/images/logos";
import type { Project } from "./projectsData";

const { setHover } = useHover();
const { $gsap } = useNuxtApp();
let matchMedia:gsap.MatchMedia;
onMounted(()=>{
  matchMedia = $gsap.matchMedia()
})
function scaleUp() {
  if(window.innerWidth >640){
setHover(true, "big");
  }
}
function scaleMidUp() {
  setHover(true, "small");
}

function scaleNormal() {
  setHover(false);
}


defineProps<Project>()
const techName = {
  bun :"Bun",
  cssAnimation: "Css Animation",
  deno:"Deno",
  docker : "Docker",
  express :"express Js",
  fresh :"Fresh Js",
  gsap :"GSAP",
  hono :"Hono Js",
  postgres : "PostgresSql",
  prisma:"Prisma ",
  redux :"Redux",
  scss :"scss",
  supabase :"supabase",
  stability:"Stability AI",
  next : "Next Js",
  reactJS : "ReactJs",
  node : "Node",
  mongoDB : "MongoDb",
  sanity :"sanity",
  threeJs :"Three.js",
  tailwind : "Tailwind CSS",
  ts :"TypeScript",
  vue :"Vue Js",
};

const manageMouseEnter = (e: MouseEvent) => {
  console.log(matchMedia)
  matchMedia.add("(min-width: 641px)" ,()=>{

    $gsap.to(e.target, {
      top: "-6rem",
      background:
        "linear-gradient(45deg,rgba(54, 54, 54, 1) 0%, rgba(31, 30, 30, 1) 34%, rgba(31, 28, 28, 0.97) 63%, rgba(59, 55, 55, 1) 94%)",
      duration: 0.4,
      ease: "power2.inOut",
    });
  }
  )

};

const manageMouseLeave = (e: MouseEvent) => {
  matchMedia.add("(min-width: 641px)" ,()=>{
    $gsap.to(e.target, { top: "0", background: "#151515", duration: 0.3, delay: 0.1 });
  })

};
</script>

<style scoped>
.row-item {
  position: relative;
  margin-bottom: -6rem;
  background: #151515;

  border-top: 1px solid rgba(200, 199, 199, 0.52);
}
.inside {
  background: url("/assets/images/background/noisy-2.png");
}
.description {
  line-height: 1;
  letter-spacing: 1px;
  word-spacing: 2px;

}

.blur-bg {
  background: url("/public/noiseTex.webp"), #eeeeee13;
  background-size: 180px;
 
  backdrop-filter: blur(1rem);
}

.badge {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 20px;
  border: 2px solid #d1d1d157;
  border-radius: 25px;
  letter-spacing: 2px;
  flex-shrink: 0;
  color: #f4f4f4d4;
}
.project-type {
  font-size: 14px;
  opacity: 0.5;
  letter-spacing: 4px;
  border: 2px solid #dfdfdf4f;
  padding: 0px 6px;
}

.tech-stack-section{
   -ms-overflow-style: none; 
    scrollbar-width: none; 
    -webkit-overflow-scrolling: touch; 
  

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

a.link {
  position: relative;
  &::after {
    content: "";
    position: absolute;
    bottom: -3px;
    left: 5px;
    width: 0%;
    height: 2px;
    background: white;
    transition: width 0.4s ease-in-out;
  }

  &:hover {
    &::after {
      width: 100%;
    }
  }
}


@media (width <= 640px) {
  .row-item{
     margin-bottom: 0;
  }
  .item-head {

  .img {
    width: 8rem;
  }}
  .project-type {
  font-size: 12px;}

  .badge{
    font-size: 12px;
    letter-spacing: 0.4px;
    padding: 3px 15px;
    gap: 4px;
  }
  .description {
  line-height: 1.4;
  word-spacing: 0;
}
}
</style>

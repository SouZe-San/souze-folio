<template>
  <div class="w-full group row-item">
    <div class="py-4 px-4 sm:px-8 xl:px-72 inside">
      <div class="flex w-full gap-1 justify-between items-end">
        <div
          class="flex items-center 2xl:text-[4rem] lg:text-[3.5rem] md:text-5xl text-[2rem] font-semibold item-head"
        >
          <h1 class="part-1">
            <span class="font-cinzel-bold">{{ title.first.charAt(0) }}</span
            >{{ title.first.slice(1) }}
          </h1>
          <div class="img">
            <NuxtImg :src="imagUrl" alt="bg-img" loading="lazy" width="640" />
          </div>
          <h1 class="part-2">
            <span class="font-cinzel-regular">{{ title.last }}</span>
          </h1>
        </div>
        <div class="flex flex-col justify-between sm:h-[6rem] h-[5rem]">
          <div class="project-type font-changa uppercase">
            <span>{{ projectType }}</span>
          </div>
          <div
            class="flex gap-3 justify-end"
            @mouseenter="scaleMidUp"
            @mouseleave="scaleNormal"
          >
            <NuxtLink
              :to="gitUrl"
              target="_blank"
              aria-label="View source on GitHub"
              class="flex items-center gap-1 link"
            >
              <IconsSocialsGithubLink class="sm:w-10 w-6" />
            </NuxtLink>
            <NuxtLink
              v-if="liveUrl"
              :to="liveUrl"
              target="_blank"
              aria-label="Open live site"
              class="flex items-center gap-1 link"
            >
              <IconsArrow
                class="sm:w-7 w-4 ml-3 text-white opacity-60 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
            /></NuxtLink>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-2 mt-2">
        <p class="md:text-base text-sm description">
          {{ description }}
        </p>
        <div
          class="flex justify-between items-center gap-8 md:gap-14 max-md:opacity-75"
        >
          <div
            class="flex gap-2 overflow-x-scroll no-scrollbar tech-stack-section"
            @mouseenter="scaleMidUp"
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
                class="sm:w-4.5 w-3 aspect-square object-contain"
                loading="lazy"
              />

              {{ techName[tech] }}
            </span>
          </div>
          <div class="sm:text-xl text-[16px] hidden sm:block">
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
import { techName, type Project } from "../../config/projectsData";

const { setHover } = useHover();

function scaleMidUp() {
  setHover(true, "small");
}

function scaleNormal() {
  setHover(false);
}

defineProps<Project>();
</script>

<style scoped>
.row-item {
  position: relative;

  background: #151515;
  content-visibility: auto;
  contain-intrinsic-size: auto 220px;
}
.inside {
  background: url("/noisy-2.png");
}
.description {
  line-height: 1;
  letter-spacing: 1px;
  word-spacing: 2px;
  color: rgba(214, 214, 214, 0.614);
}

.blur-bg {
  background: url("/noiseTex.webp"), #eeeeee13;
  background-size: 180px;
}

.badge {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 20px;

  border: 2px solid #d1d1d138;
  border-radius: 8px;
  letter-spacing: 2px;
  flex-shrink: 0;
  color: #f4f4f4d4;
  font-size: 12px;

  img {
    filter: brightness(0.8);
  }
}
.project-type {
  font-size: 14px;
  opacity: 0.5;
  letter-spacing: 4px;
  border: 2px solid #dfdfdf4f;
  padding: 0px 6px;
  background: repeating-linear-gradient(
    119deg,
    color-mix(in srgb, #ededec 24%, transparent) 0px,
    color-mix(in srgb, #ededec 24%, transparent) 1px,
    transparent 1px,
    transparent 5px
  );
}

.tech-stack-section {
  -ms-overflow-style: none;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}

.item-head {
  .img {
    width: 0;
    transition: width 0.7s cubic-bezier(0.075, 0.82, 0.165, 1);
    overflow: visible;

    position: relative;
    align-self: stretch;
    img {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 1.7em;
      transform: translateY(-50%);
      object-fit: contain;
    }
  }

  &:hover {
    .img {
      width: 3.5em;
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
  .item-head {
    .img {
      display: none;
    }
  }
  .project-type {
    font-size: 12px;
  }

  .badge {
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

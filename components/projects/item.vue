<template>
  <div class="md:w-[85vw] md:h-[90vh] main-div mb-8 relative border-none">
    <div class="image-div bg-black/80">
      <div class="description blur-bg absolute left-0 w-[20%]">
        This is a CTF game page, created for a CTF GAME that was hosted in our college. Player come
        with their team and win the challenges with their team play and knowledge.
      </div>
      <!-- <img
        :src="img"
        alt="bg"
        class="absolute top-0 left-0"
        style="width: 100%; height: 100%; filter: blur(5px); z-index: -1"
      /> -->
      <img :src="img" alt="project-img" />
    </div>

    <div class="top-middle absolute top-0 left-1/2 -translate-x-1/2 text-5xl pt-2 font-bold">
      <span class="font-cinzel-bold">N</span>eo-<span class="font-cinzel-regular">CTF</span>
    </div>
    <div class="top-left absolute top-0 left-4">SOme Bullshit</div>
    <div class="top-right absolute top-4 right-4 text-3xl font-cinzel-bold">
      <span class="font-cinzel-bold"> June,</span><span class="font-cinzel-regular"> 2025</span>
    </div>
    <div class="bottom-left absolute bottom-4 left-3 flex gap-3 items-center">
      <div class="badge blur-bg">
        <img :src="react" alt="icon" class="w-4" />
        React
      </div>
      <div class="badge blur-bg">
        <img :src="tail" alt="icon" class="w-4" />
        Tailwind
      </div>
      <div class="badge blur-bg">
        <img :src="scss" alt="icon" class="w-4" />
        Scss
      </div>
      <div class="badge blur-bg">
        <img :src="node" alt="icon" class="w-4" />
        Node
      </div>
    </div>
    <div class="bottom-right space-x-8 pr-10">
      <button class="rounded-full bg-white text-black">
        <span class="font-semibold"> Git<span class="font-changa">hub</span> </span>
        <IconsSocialsGithubLink class="w-16 self-center" />
      </button>
      <button class="rounded-full bg-white text-black">
        <span class="font-semibold"> Try<span class="font-changa">Link</span> </span>
        <IconsArrow class="w-8 self-center mr-4" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import img from "~/assets/images/projects/002.png";
import react from "~/public/assets/logos/logo-react.svg";
import tail from "~/public/assets/logos/logo-tailwindcss.svg";
import scss from "~/public/assets/logos/logo-sass.svg";
import node from "~/public/assets/logos/logo-nodejs.svg";
</script>

<style scoped>
.main-div {
  padding: 0;
  box-sizing: border-box;
}

.image-div {
  overflow: hidden;
  display: flex;
  justify-content: flex-end;
  padding-top: 5rem;
  border-bottom-right-radius: 30px;
  background: linear-gradient(30deg,#4e4e4e8a,#1b16164d,aliceblue);
  border: none;
  width: 100%;
  height: 100%;
  -webkit-mask: url("/public/assets/masks/top-right.svg") center / contain no-repeat,
    url("/public/assets/masks/top-left.svg") center / contain no-repeat,
    url("/public/assets/masks/bottom-left.svg") center / contain no-repeat,
    linear-gradient(#000000 0 0);

  mask: url("/public/assets/masks/top-right.svg") center / contain no-repeat,
    url("/public/assets/masks/top-left.svg") center / contain no-repeat,
    url("/public/assets/masks/bottom-left.svg") center / contain no-repeat,
    linear-gradient(#000000 0 0);
  mask-size: 15rem, 15rem, 50vw;
  mask-position: top right, top left, bottom left;
  mask-composite: exclude;

  img {
    height: 80%;
    width: 75%;
    margin-right: 10px;
    border-radius: 10px;
  }
}

.bottom-right {
  position: absolute;
  bottom: 2%;
  right: 0;

  button {
    padding: 0 1rem;
    font-size: 1.7rem;
    width: 14rem;
    aspect-ratio: 9/2.4;
    display: inline-flex;
    align-items: flex-end;
    justify-content: flex-end;
  }
}
.description {
  padding: 1rem;
  top: 7rem;
  left: 20px;
  line-height: 1.4;
  letter-spacing: 1px;
  word-spacing: 2px;
  font-size: 18px;
  border-radius: 14px;
  box-shadow: -2px 3px 13px -3px #00000085;
}

.blur-bg {
  background: url(/assets/images/background/noisy-2.png), #eeeeee13;
  backdrop-filter: blur(1rem);
}

.badge {
  display: flex;
  gap: 5px;
  padding: 4px 20px;
  border: 2px solid #d1d1d157;
  border-radius: 25px;
  letter-spacing: 2px;
}
</style>

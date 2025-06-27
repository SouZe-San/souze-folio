<template>
  <main>
    <!-- <div class="reveler"></div> -->
    <section class="heroSection relative overflow-hidden bgBlur">
      <img :src="grid" alt="Logo" class="grid" />
      <div class="back_white_blob_top"></div>
      <div class="back_white_blob_down"></div>

      <div
        class="flex flex-col items-center justify-center max-sm:justify-start max-sm:pt-16 h-full"
      >
        <div
          class="name-main text-center relative"
          @mousemove="scaleGrow"
          @mouseleave="scaleNormal"
        >
          <span class="absolute -top-[5%] -left-4"> Hii, I&#39;m </span>
          <h1 class="text-[48px] md:text-8xl font-bold font-cinzel-bold text-white -translate-4">
            <span>S</span>oumayjit
          </h1>

          <h1 class="text-[48px] md:text-8xl font-bold font-cinzel-bold text-white">Mondal</h1>
        </div>

        <h3 class="text-end text-white/70">
          Full-stack <span class="font-changa capitalize text-white">developer</span>, love to
          explore, build <span class="font-changa text-white"> wired </span>things and solving
          problems.
        </h3>
      </div>
    </section>
    <HomeAbout />
    <HomeSkills />
    <HomeContact />
  </main>
</template>

<script setup>
import grid from "~/assets/images/background/grid.svg";
const { setHover } = useHover();
function scaleGrow() {
  setHover(true);
}

function scaleNormal() {
  setHover(false);
}
</script>
<style scoped>
main {
  background: url("/assets/images/background/noisy-2.png") center center fixed,
    linear-gradient(327.21deg, #141414 3.65%, rgba(26, 26, 26, 0) 40.32%),
    linear-gradient(245.93deg, rgba(36, 35, 36, 0.27) 0%, rgba(235, 235, 235, 0) 36.63%),
    linear-gradient(147.6deg, rgba(0, 0, 0, 0) 29.79%, rgba(0, 0, 0, 0.03) 85.72%), #141414;
  width: 100vw;
  min-height: 100vh;
}

@media (width <= 640px) {
  main {
    min-height: 100svh;
  }
}
.grid {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  mask-image: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0) 0%,
    rgb(0, 0, 0) 3%,
    rgb(0, 0, 0) 97%,
    rgba(0, 0, 0, 0) 100%
  );
  z-index: -10;
  opacity: 0.3;
}

.heroSection {
  padding-top: calc(var(--nav-height));
  width: 100vw;
  height: 100vh;
  background: url("/_nuxt/assets/images/background/noisy-2.png") center center fixed,
    linear-gradient(327.21deg, #141414 3.65%, rgba(26, 26, 26, 0) 40.32%),
    linear-gradient(245.93deg, rgba(36, 35, 36, 0.27) 0%, rgba(235, 235, 235, 0) 36.63%),
    linear-gradient(147.6deg, rgba(0, 0, 0, 0) 29.79%, rgba(0, 0, 0, 0.03) 85.72%), #141414;
}

.bgBlur {
  backdrop-filter: blur(1rem);
}
.back_white_blob_top {
  width: 34vw;
  top: 0;
  left: 50%;
  transform: translate(-50%, 50%);
  position: absolute;
  z-index: -3;
  box-shadow: 0px 0 14rem 10rem rgba(149, 147, 147, 0.31);
  border-radius: 8% 52% 0% 100%/0% 0% 91% 100%;
}
.back_white_blob_down {
  width: 10vw;
  position: absolute;
  z-index: -3;
  bottom: 22%;
  left: -6%;
  box-shadow: 0px 0 10rem 3rem rgba(177, 237, 247, 0.49);
}

.name-main {
  h1 {
    line-height: 1;
    span {
      font-size: 12rem;
    }
    &:nth-child(2) {
      translate: -15% 0;
    }
    &:last-child {
      translate: 15% 0;
    }
  }
}

h3 {
  width: 65%;
  font-size: 18px;
}

@media (width <= 640px) {
  .heroSection {
    height: 100svh;
  }
  .name-main {
    h1 {
      line-height: 1;
      font-size: 40px;
      span {
        font-size: 8rem;
      }
      &:last-child {
        translate: 25% 0;
      }
    }
  }
  h3 {
    font-size: 15px;
  }
}
</style>

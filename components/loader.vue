<template>
  <div class="loader" ref="loader">
    <div class="count-wrapper">
      <div class="count">
        <div class="digit"><h1>9</h1></div>
        <div class="digit"><h1>8</h1></div>
        <div class="digit"><h1>6</h1></div>
        <div class="digit"><h1>4</h1></div>
        <div class="digit"><h1>2</h1></div>
        <div class="digit"><h1>0</h1></div>
      </div>
    </div>
    <div class="count-wrapper">
      <div class="count">
        <div class="digit"><h1>9</h1></div>
        <div class="digit"><h1>8</h1></div>
        <div class="digit"><h1>9</h1></div>
        <div class="digit"><h1>4</h1></div>
        <div class="digit"><h1>5</h1></div>
        <div class="digit"><h1>0</h1></div>
      </div>
    </div>

    <div class="revealer revealer-1">
      <svg
        width="344"
        height="344"
        viewBox="0 0 344 344"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-7.51836e-06 172L97.6202 169.159C136.649 168.022 168.022 136.649 169.158 97.6202L172 2.29992e-05L174.841 97.6202C175.978 136.649 207.351 168.022 246.38 169.159L344 172L246.38 174.841C207.351 175.978 175.978 207.351 174.841 246.38L172 344L169.159 246.38C168.022 207.351 136.649 175.978 97.6202 174.842L-7.51836e-06 172Z"
          fill="white"
        />
      </svg>
    </div>
    <div class="revealer revealer-2">
      <svg
        width="344"
        height="344"
        viewBox="0 0 344 344"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-7.51836e-06 172L97.6202 169.159C136.649 168.022 168.022 136.649 169.158 97.6202L172 2.29992e-05L174.841 97.6202C175.978 136.649 207.351 168.022 246.38 169.159L344 172L246.38 174.841C207.351 175.978 175.978 207.351 174.841 246.38L172 344L169.159 246.38C168.022 207.351 136.649 175.978 97.6202 174.842L-7.51836e-06 172Z"
          fill="red"
        />
      </svg>
    </div>
    <div class="revealer revealer-3">
      <svg
        width="344"
        height="344"
        viewBox="0 0 344 344"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-7.51836e-06 172L97.6202 169.159C136.649 168.022 168.022 136.649 169.158 97.6202L172 2.29992e-05L174.841 97.6202C175.978 136.649 207.351 168.022 246.38 169.159L344 172L246.38 174.841C207.351 175.978 175.978 207.351 174.841 246.38L172 344L169.159 246.38C168.022 207.351 136.649 175.978 97.6202 174.842L-7.51836e-06 172Z"
          fill="#171717"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { $gsap } = useNuxtApp();
const loader = ref();

onMounted(() => {
  if (!window) return;

  document.body.style.overflow = "hidden";

  const matchMedia = $gsap.matchMedia();

  const windowWidth = window.innerWidth;
  const wrapperWidth = 160;
  const finalPosition = windowWidth - wrapperWidth;
  const stepDistance = finalPosition / 6;
  const tl = $gsap.timeline();

  tl.to(".count", {
    x: -900,
    duration: 0.85,
    delay: 0.5,
    ease: "power4.inOut",
  });
  matchMedia.add(
    {
      isDesktop: `(min-width: ${640 + 1}px)`,
      isMobile: `(max-width: ${640}px)`,
    },
    (context) => {
      //@ts-ignore
      let { isDesktop, isMobile } = context.conditions;
      const newStep = isDesktop ? stepDistance : 16;
      for (let i = 0; i < 6; i++) {
        const xPosition = -900 + i * 180;

        tl.to(".count", {
          x: xPosition,
          duration: 0.85,
          ease: "power4.inOut",
          onStart: () => {
            $gsap.to(".count-wrapper", {
              x: newStep * i,
              duration: 0.85,
              ease: "power4.inOut",
            });
          },
        });
      }
    }
  );

  $gsap.set(".revealer svg", { scale: 0 });
  const delays = [6, 6.5, 7];
  $gsap.utils.toArray(".revealer svg").forEach((el, i) => {
    if (!el) return;
    $gsap.to(el, {
      scale: 45,
      duration: 1.5,
      ease: "power4.inOut",
      delay: delays[i],
      onComplete: () => {
        if (i === delays.length - 1) {
          document.body.style.overflow = "unset";
          $gsap.set(loader.value, {
            alpha: 0,
            duration: 0.4,
            ease: "power3.inOut",
            onComplete: () => {
              loader.value.remove();
            },
          });
        }
      },
    });
  });

  $gsap.from(".name-main h1", {
    scale: 0,
    duration: 1,
    ease: "power3.inOut",
    delay: 8,
  });
});
</script>

<style scoped>
.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
  color: #fff;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  z-index: 900;
}
.count-wrapper {
  position: relative;
  width: 160px;
  height: 360px;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
  will-change: transform;
}
.count {
  position: relative;
  width: 1080px;
  height: inherit;
  display: flex;
  transform: translateX(-1080px);
  will-change: transform;
}
.digit {
  position: relative;
  width: inherit;
  height: inherit;

  h1 {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: max-content;
    font-size: 360px;
    font-weight: lighter;
    line-height: 1;
    font-family: "Roboto Condensed", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
    font-weight: 200;
  }
}

.revealer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

<template>
  <main>
    <NavPageHeader />
    <NavSideNav />
    <div class="back_white_blob_top"></div>
    <div class="back_white_blob_down"></div>
    <section class="w-full h-full flex flex-col sm:pt-24 items-center">
      <div class="w-full text-center mb-20">

        <h1 class="inline font-cinzel-bold sm:text-6xl text-[40px] max-sm:mt-4 relative">
          <span class="absolute sm:-top-7 -top-5 opacity-60 text-white/20 left-[50%] -translate-x-[50%]"
            style="letter-spacing: 10px;">
            Experience
          </span>
          My Earn
        </h1>
      </div>

      <div class="md:w-[60%] w-full px-4 mb-12">
        <h2 class="mt-6 font-bold text-2xl font-cinzel-regular text-white/70 mb-4">
          <span class="underline underline-offset-4">
            Unlocked
          </span> 🔓
        </h2>
        <div class=" w-full flex justify-between items-center">
          <div class=" sm:text-xl text-sm flex flex-col sm:flex-row max-sm:gap-3 gap-5">
            <div>
              <span style="font-weight: 700;">
                Unified Mentors
  
              </span>
              <span class="font-light italic bg-muted rounded-md text-xs font-changa opacity-75"
                style="font-style: italic;">
                #intern
              </span>

            </div>
            <div>
              <span class="font-light badge">
                <code>
              Full-Stack</code>
              </span>
            </div>
          </div>
          <span class="font-medium sm:text-[1rem] text-sm max-w-28 md:max-w-full text-[#b0b0b0ab]">
            Jan 2025 - Jun 2025
          </span>
        </div>
        <div class=" w-full flex justify-between items-center mt-2">
         <div class=" sm:text-xl text-sm flex flex-col sm:flex-row max-sm:gap-3 gap-5">
            <div>
            <span style="font-weight: 700;">
              Math Coders</span>
            <span class="font-light italic bg-muted rounded-md text-xs font-changa opacity-75"
              style="font-style: italic;">
              #intern
            </span>
            </div>
            <div>
            <span class="font-light  bg-muted  rounded-md text-sm badge">
              <code>
            Developer</code>
            </span>
            <span class="font-light bg-muted  rounded-md text-sm badge">
              <code>
            AI-Instructor</code>
            </span></div>
          </div>
          <span class="font-medium sm:text-[1rem] text-sm max-w-28 md:max-w-full text-[#b0b0b0ab]">
            Jun 2024 - Aug 2024
          </span>
        </div>
      </div>
      <div class="md:w-[60%] w-full flex justify-center text-xl mt-8 text-white/40 font-medium uppercase">
        <h1>
          Under Development !! 🎢
        </h1>
      </div>

    </section>

    <img
  src="/assets/gif/dance01.gif"
  alt=""
  aria-hidden="true"
  draggable="false"
  class="corner-buddy "
  style="--buddy-left: unset; --buddy-right:1rem;"
  v-if="isFine"
/>
    <img
  src="/assets/gif/dance02.gif"
  alt=""
  aria-hidden="true"
  draggable="false"
  class="corner-buddy "
style="--buddy-left: unset; --buddy-right:15rem;"
v-if="isFine"
/>
    <img
  src="/assets/gif/miku02.gif"
  alt=""
  aria-hidden="true"
  draggable="false"
  class="corner-buddy "
style="--buddy-left: 0; --buddy-right:unset"
v-if="isFine"
/>
  </main>
</template>

<script lang="ts" setup>
useHead({
  title: 'Souze-San ||Experience',
  meta: [
    { name: 'description', content: 'Recent Experience and Relevant works positions' }
  ],
})

const isFine = ref(false);
let mq: MediaQueryList | null = null;
const onPointerKind = (e: MediaQueryListEvent | MediaQueryList) => {
  isFine.value = e.matches;
 
};

onMounted(() => {
  mq = window.matchMedia("(hover: hover) and (pointer: fine)");
  isFine.value = mq.matches;
  mq.addEventListener("change", onPointerKind);
 
});
onUnmounted(() => {
  mq?.removeEventListener("change", onPointerKind);

});
</script>

<style scoped>
.badge {
  border: 1px solid #46464687;
  border-radius: 30px;
  padding: 5px 15px;
  color: #dfdfdfc7;
  background: url("/noiseTex.webp") repeat, #333333d3;
  background-size: 200px;
  backdrop-filter: blur(1rem);
  opacity: .7;
  margin-right:.5rem;
  font-size: 12px;
}

.corner-buddy {
  position: fixed;
  left: var(--buddy-left);
  right: var(--buddy-right);
  bottom: 0;
  width: 200px;
  height: auto;
  z-index: 10;            
  pointer-events: none;   
  user-select: none;
  filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.45)) opacity(.34);
  animation: buddy-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
 
}


@keyframes buddy-in {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (width <= 640px) {
  .badge{
    font-size: 10px;
  }
  .corner-buddy { display :none; }
}

@media (prefers-reduced-motion: reduce) {
  .corner-buddy { display: none; }
}
</style>
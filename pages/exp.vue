<template>
  <main>
    <NavPageHeader />
    <NavSideNav />
    <div class="back_white_blob_top"></div>
    <div class="back_white_blob_down"></div>
    <section class="w-full h-full flex flex-col items-center">
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
          <div class=" sm:text-xl text-sm flex flex-col sm:flex-row max-sm:gap-3">
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
         <div class=" sm:text-xl text-sm flex flex-col sm:flex-row max-sm:gap-3">
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
  </main>
</template>

<script lang="ts" setup>
useHead({
  title: 'Souze-San ||Experience',
  meta: [
    { name: 'description', content: 'Recent Experience and Relevant works positions' }
  ],
})
</script>

<style scoped>
.badge {
  border: 1px solid #46464687;
  border-radius: 30px;
  padding: 5px 15px;
  color: #dfdfdfc7;
  background: url("/public/noiseTex.webp") repeat, #333333d3;
  background-size: 200px;
  backdrop-filter: blur(1rem);
  opacity: .7;
  margin-right:.5rem;
  font-size: 12px;
}

@media (width <= 640px) {
  .badge{
    font-size: 10px;
  }
}
</style>
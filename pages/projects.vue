<template>
  <NuxtLayout>
  <section class="w-full h-full">
    <div class="w-full text-center">

      <h1 class="inline font-cinzel-bold sm:text-6xl text-[40px] max-sm:mt-4 relative"  @mousemove="scaleGrow"
          @mouseleave="scaleNormal">
        <span class="absolute sm:-top-7 -top-5 opacity-60 text-white/20 left-[50%] -translate-x-[50%]" style="letter-spacing: 10px;">
  Works
        </span>
  My Works
    </h1>
    </div>
      
  </section>
  </NuxtLayout>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'page-layout',
})

const { setHover } = useHover();


function scaleGrow(){
  setHover(true)
}

function scaleNormal(){
setHover(false)
}
</script>

<style>

</style>
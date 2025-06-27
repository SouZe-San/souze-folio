<template>
  <section class="w-full h-full flex flex-col items-center">
    <div class="w-full text-center mb-20">

      <h1 class="inline font-cinzel-bold sm:text-6xl text-[40px] max-sm:mt-4 relative" 
       @mousemove="scaleGrow"
          @mouseleave="scaleNormal">
        <span class="absolute sm:-top-7 -top-5 opacity-60 text-white/20 left-[50%] -translate-x-[50%]" style="letter-spacing: 10px;">
  Works
        </span>
  My Works
    </h1>
    </div>
      
    <!-- <ProjectsItem/> -->

    <div class="relative w-full mt-24">
      <ProjectsItemRow/>
      <ProjectsItemRow/>
      <ProjectsItemRow/>
      <ProjectsItemRow/>
    </div>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'page-layout',
})

const { setHover } = useHover();


function scaleGrow(){
  setHover(true)
}
function scaleMidGrow(){
  setHover(true)
}

function scaleNormal(){
setHover(false)
}
</script>

<style>

</style>
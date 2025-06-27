<template>
  <NuxtLayout >
  
        <NuxtPage />
 
  </NuxtLayout>
</template>
<script setup lang="ts">
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { CustomEase } from "gsap/CustomEase";


onBeforeMount(() => {
  gsap.registerPlugin(SplitText, ScrollSmoother, ScrollTrigger, CustomEase);
  
});
</script>

<style >

</style>

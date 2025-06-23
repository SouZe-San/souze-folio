<template>
  <div>
   <NuxtPage/>
  </div>
</template>
<script setup>
import { gsap } from "gsap";
import {SplitText} from 'gsap/SplitText'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {ScrollSmoother} from 'gsap/ScrollSmoother'
onBeforeMount(() => {
  gsap.registerPlugin(SplitText,ScrollSmoother,ScrollTrigger)

})
</script>
<template>
  <main class="relative">
    <NavPageHeader/>
     <div class="back_white_blob_top"></div>
      <div class="back_white_blob_down"></div>
  <NavSideMobileNav/>
    <NavSideNav/>
    <slot />
  </main>
</template>

<script lang="ts" setup>
import { NavSideNav, NavPageHeader } from '#components';

</script>

<style scoped>
main{
  background: url('/_nuxt/assets/images/background/noisy-2.png') center center fixed, #141414;
  min-height: 100vh;
}
.back_white_blob_top {
    width: 34vw;
    top: 0;
    left: 50%;
    transform: translate(-50%, 50%);
    position: absolute;
    z-index: 1;
    box-shadow: 0px 0 14rem 10rem rgba(149, 147, 147, 0.31);
    border-radius: 8% 52% 0% 100%/0% 0% 91% 100%;
}
.back_white_blob_down {
   width: 10vw;
  position: absolute;
  z-index: 1;
  bottom: 22%;
  left: -6%;
  box-shadow: 0px 0 10rem 3rem rgba(177, 237, 247, 0.49);
}
@media (width <= 640px) {
  main {
    min-height: 100svh;
  }
}
</style>
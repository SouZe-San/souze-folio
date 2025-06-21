<template>
  <section>
    <NavTopNav/>
    <NavSideNav/>
    <NavSocialNav/>
    <NavSideMobileNav/>
    <main>
      <slot />
    </main>
  </section>
</template>

<script lang="ts" setup>
import { NavTopNav, NavSideNav,NavSocialNav } from '#components';


</script>

<style scoped>
main{
    background: url('/_nuxt/assets/images/background/noisy-2.png') center center fixed, linear-gradient(327.21deg, #141414 3.65%, rgba(26, 26, 26, 0) 40.32%), linear-gradient(245.93deg, rgba(36, 35, 36, 0.27) 0%, rgba(235, 235, 235, 0) 36.63%), linear-gradient(147.6deg, rgba(0, 0, 0, 0) 29.79%, rgba(0, 0, 0, 0.03) 85.72%), #141414;
    width: 100vw;
  min-height: 100vh;
}

@media (width <= 640px) {
  main {
    min-height: 100svh;
  }
}
</style>
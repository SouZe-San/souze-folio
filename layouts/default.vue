<template>
  <section>
    <NavTopNav/>
    <NavSideNav/>
    <main>
      <slot />
    </main>
  </section>
</template>

<script lang="ts" setup>
import { NavTopNav, NavSideNav } from '#components';


</script>

<style>

</style>
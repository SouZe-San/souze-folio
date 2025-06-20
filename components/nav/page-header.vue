<template>
  <header class="flex items-center justify-between p-4 ">
    <div class="logo">

      <span class="font-changa text-xl">
        <img alt="Souze" :src="logo" />
      </span>

    </div>

    <div class="flex items-center justify-center gap-2 badge">
      <span class="relative flex size-3 mr-4 sm:mr-0">
        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-75"></span>
        <span class="relative inline-flex size-3 rounded-full bg-green-500"></span>
      </span>
      <span class="text-xl leading-3 hidden sm:block font-changa">
        Open to work
      </span>
    </div>

  </header>
</template>

<script lang="ts" setup>
import logo from '~/assets/icons/logo/name.svg'


</script>

<style scoped>
header {
  padding: 1.5rem 3rem;
}

/* .badge {
  padding: 9px 21px;
  border: 1px solid #ffffff54;
  border-radius: 15px;
   backdrop-filter: blur(2px);
  background-color: rgba(174, 174, 174, 0.02);
   box-shadow: 2px 4px 6px 1px rgba(0, 0, 0, 0.234);
  background-blend-mode: overlay;
} */
</style>
<template>
  <header class="flex items-center sm:justify-between justify-start gap-3 p-4 ">
    <div class="logo flex items-center gap-2">
  <div class="w-10 rounded-full overflow-hidden sm:hidden">
              <img :src="profile" alt="profile" />
            </div>
      <span class="font-changa text-xl">
        <img alt="Souze" :src="logo" class="max-sm:w-36">
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
import profile from '~/public/assets/profile.jpeg'

</script>

<style scoped>
header {
  padding: 1.5rem 3rem;
}

@media (width <= 640px) {
  header{
    padding: 1.5rem 1rem;
  }
}
</style>
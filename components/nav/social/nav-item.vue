<template>
  <NuxtLink :href="item.href" target="_blank" class="nav-item relative aspect-square rounded-xl bg-[#ffffff0a] flex items-center justify-center overflow-hidden border border-[#ffffff11]">
    <div :class="['nav-item-icon p-3 text-[#ffffff83]', item?.hoverClass]">
   
      <component :is="item!.icon" class="h-5 w-5" />
    </div>
    <div class="nav-item-label absolute opacity-0 -z-10">{{ item?.label }}</div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { NuxtLink } from '#components';
import type { DefineComponent} from 'vue';
defineProps<{
  item: {
    label: string;
    icon: DefineComponent<{}, {}, any>;
    href: string;
    hoverClass?: string;
  };
}>();
</script>

<style>

</style>
<template>
  <a :href="item?.href" target="_blank" class="nav-item relative aspect-square rounded-xl bg-neutral-800 flex items-center justify-center overflow-hidden">
    <div :class="['nav-item-icon p-3 text-[#D5D5D5]', item?.hoverClass]">
   
      <component :is="item!.icon" class="h-5 w-5" />
    </div>
    <div class="nav-item-label absolute opacity-0 -z-10">{{ item?.label }}</div>
    
  </a>
</template>

<script lang="ts" setup>
import type { DefineComponent} from 'vue';
defineProps<{
  item?: {
    label: string;
    icon: DefineComponent<{}, {}, any>;
    href: string;
    hoverClass?: string;
  };
}>();
</script>

<style>

</style>
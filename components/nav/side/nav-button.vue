<template>
  <NuxtLink :to="item.href" class="aspect-square rounded-xl nav-link flex items-center justify-center  group transition-all ease-in-out ">
     <button :class="['p-3 relative text-[#D5D5D5]', item?.hoverClass] ">
   
      <component :is="item!.icon" class="h-5 w-5 group-hover:scale-140 transition-all ease-in-out" />
      <p

          class="px-[15px] py-[4px] whitespace-pre rounded-md border bg-neutral-800 border-white/10 text-white absolute left-0 top-0  w-fit text-xs label"

          :style="labelCss[item.label.toLocaleLowerCase() as keyof typeof labelCss]"
        >
          {{ item.label }}
        </p>
    </button>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { NuxtLink } from '#components';
import { type DefineComponent } from 'vue'
interface Props {
  item: {
    label: string,
    icon: DefineComponent<{}, {}, any>,
    href: string,
   hoverClass?: string;
  }
}

defineProps<Props>()


const labelCss = {
  "home":"translate: -4.5rem -0.2rem;",
  "projects" : "translate: -5rem 0rem;",
  "experience" :"translate: -1.5rem -2rem;",
  "skills" :"translate: 3rem 0rem;",
  "cv" :"translate: 3.2rem -.3rem;",

}

</script>

<style scoped>
.nav-link{
  background: linear-gradient(45deg,rgba(108, 108, 108, 0.04) 10%, rgba(255, 255, 255, 0.09) 84%);
  backdrop-filter: blur(2px);
  border-radius: 30px;
}
.label{
  background: linear-gradient(45deg,rgba(76, 76, 76, 0.04) 10%, rgba(162, 162, 162, 0.172) 84%);
  backdrop-filter: blur(2px);

}
</style>
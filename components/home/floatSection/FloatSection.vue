<script setup lang="ts">
import PhysicsField, { type TechItem } from './PhysicsField.vue'

// logos via the simple-icons CDN (no dependency) — swap for your own SVG
// components if you prefer. `https://cdn.simpleicons.org/<slug>/<hex?>`
const i = (slug: string, hex?: string) => `https://cdn.simpleicons.org/${slug}${hex ? `/${hex}` : ''}`

const items: TechItem[] = [
  { label: 'Three.js', icon: i('threedotjs', '000000') },
  { label: 'GSAP', icon: i('gsap', '0AE448') },
  { label: 'git', icon: i('git', 'F05032') },
  { label: 'Python', icon: i('python', '3776AB') },
  { label: 'Docker', icon: i('docker', '2496ED') },
  { label: 'Nuxt', icon: i('nuxt', '00DC82') },
  { label: 'TypeScript', icon: i('typescript', '3178C6') },
  { label: 'JavaScript', icon: i('javascript', 'F7DF1E') },
  { label: 'React', icon: i('react', '61DAFB') },
  { label: 'Vue', icon: i('vuedotjs', '4FC08D') },
  { label: 'Node', icon: i('nodedotjs', '5FA04E') },
  { label: 'Tailwind', icon: i('tailwindcss', '06B6D4') },
  { label: 'Sass', icon: i('sass', 'CC6699') },
  { label: 'Figma', icon: i('figma', 'black') },
  { label: 'MongoDB', icon: i('mongodb', '47A248') },
  { label: 'PostgreSQL', icon: i('postgresql', '4169E1') },
  { label: 'Deno', icon: i('deno', '000000') },
  { label: 'Bun', icon: i('bun', 'c2b0a1') },
  { label: 'Redux', icon: i('redux', '764ABC') },
  { label: 'Framer Motion', icon: i('framer', '0055FF') },
]
</script>

<template>
  <div class="h-full w-full flex flex-col justify-center items-center relative">
     <div class="w-full text-center absolute ">
        <h1
          class="inline font-cinzel-bold mt-12 sm:text-6xl text-[40px] max-sm:mt-4 relative "
        >
          <span
            class="absolute sm:-top-7 -top-5 opacity-60 text-white/50 left-[50%] -translate-x-[50%]"
            style="letter-spacing: 10px"
          >
            Stacks </span
          >Building Tools
        </h1>
      </div>
    <PhysicsField :items="items" :gravity="0.0" :bounce="0.4" :repelShake="0" :repelNear="1000" :repelRadius="85"   />
  </div>
</template>

<style>


</style>

<template>
  <div class="fixed z-40 bottom-12 left-1/2 -translate-x-1/2 sm:hidden">
    <button class="text-4xl nav-menu-btn" ref="mainButtonRef" @click="toggleNav">
      <img :src="plus" alt="+">
    </button>
    <NavSideNavButton  v-for="(item, index) in navLink"
        :key="index.toString()"
        :item="item"
        style="transform: translateX(-50%) scale(0);"
          class="nav_button absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gray-700 hover:bg-gray-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center font-semibold text-sm hover:scale-110 z-200"
        />
      </div>
    </template>

<script lang="ts" setup>
import plus from '~/assets/icons/plus.svg'
import { ref, onMounted } from 'vue';

import Cv from '~/components/icons/nav/cv.vue';
import Exp from '~/components/icons/nav/exp.vue';
import Home from '~/components/icons/nav/home.vue';
import Project from '~/components/icons/nav/project.vue';
import Skills from '~/components/icons/nav/skills.vue';

const navLink = [
  {
    icon: Cv,
    label: "CV",
    href: "/",
    hoverClass:"hover:text-[#ff6d05]"
  },
  {
    icon: Skills,
    label: "Skills",
    href: "/",
    hoverClass:"hover:text-[#04ff96]"
  },
  {
    icon: Exp,
    label: "Experience",
    href: "/",
    hoverClass:"hover:text-[#9f05ff]"
  },
  {
    icon: Project,
    label: "Projects",
    href: "/projects",
    hoverClass:"hover:text-[#ffea05]"
  },
  {
    icon: Home,
    label: "Home",
    href: "/",
    hoverClass:"hover:text-[white]"
  }
];


import { gsap } from 'gsap'
const isOpen = ref<boolean>(false)
const mainButtonRef = ref<HTMLButtonElement | null>(null);
let targets: unknown[] ;
let tl: gsap.core.Timeline;

onMounted(()=>{
 
  if(!mainButtonRef.value) return
  targets = gsap.utils.toArray(".nav_button");
  
  if(targets){
    gsap.set(targets, {
        scale: 0,
        opacity: 0,
        rotation: 0,
      });
  }

  tl = gsap.timeline({paused:true});
  
  // Rotate main button
  tl.to(mainButtonRef.value, {
    rotation: 45,
    duration: 0.3,
    ease: "back.out(1.7)"
  });
  // Animate nav items appearing in semi-circle above the main button

  targets.forEach((item, index) => {
      if (item && index < navLink.length) {
        // Semi-circle calculation: spread items from 0° to 180° (full semi-circle)
        const totalItems = navLink.length;
        const angle = (index * 180) / (totalItems - 1); // 0° to 180°
        const radius = 100; // Increased radius for better spacing
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = -Math.sin((angle * Math.PI) / 180) * radius; // negative to go upward

        tl.to(item, {
          x: x,
          y: y,
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(1.7)",
        }, index * 0.1);
      }
  });
})

  // };
  const toggleNav = () => {
    if (!isOpen.value) {
     
      tl.play()
    } else {
      
      tl.reverse()
    }
    isOpen.value = !isOpen.value;
  };

</script>

<style scoped>

.nav-menu-btn{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.5rem;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 2px solid #dbdbdb32;
   backdrop-filter: blur(4px);
  background-blend-mode: overlay;
  background-color: rgba(68, 68, 68, 0.08);
 padding: 8px;
}

</style>
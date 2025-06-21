<template>
  <div class="nav-container side-nav-container sm:flex hidden">
     <nav
      class="flex flex-col gap-4 hover:gap-6 transition-all ease-in-out items-end rounded-2xl"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    >
      <NavSideDockIcon
        v-for="(item, index) in navLink"
        :key="index.toString()"
        :item="item"
        :mouse-x="mouseX"
      />
    </nav>
  </div>
</template>

<script lang="ts" setup>

import { NavSideDockIcon } from '#components';



import { ref } from 'vue';
import Cv from '~/components/icons/nav/cv.vue';
import Exp from '~/components/icons/nav/exp.vue';
import Home from '~/components/icons/nav/home.vue';
import Project from '~/components/icons/nav/project.vue';
import Skills from '~/components/icons/nav/skills.vue';

// / Desktop mouse tracking
const mouseX = ref(Infinity)


const handleMouseMove = (e: MouseEvent) => {
  mouseX.value = e.pageY
}

const handleMouseLeave = () => {
  mouseX.value = Infinity
}

const navLink = [
  {
    icon: Home,
    label: "Home",
    href: "/",
    hoverClass:"hover:text-[white]"
  },
  {
    icon: Project,
    label: "Projects",
    href: "/projects",
    hoverClass:"hover:text-[#ffea05]"
  },
  {
    icon: Exp,
    label: "Experience",
    href: "/",
    hoverClass:"hover:text-[#9f05ff]"
  },
  {
    icon: Skills,
    label: "Skills",
    href: "/",
    hoverClass:"hover:text-[#04ff96]"
  },
  {
    icon: Cv,
    label: "CV",
    href: "/",
    hoverClass:"hover:text-[#ff6d05]"
  },
];
</script>

<style scoped>
.side-nav-container {
  background-color: rgba(68, 68, 68, 0.08);
  box-shadow: 2px 4px 6px 1px rgba(0, 0, 0, 0.4117647059);
}

.nav-list {
  transform-style: preserve-3d;
  transform: perspective(1000px);
  &:hover{
    gap:1.2rem
  }

  .nav-button {
    cursor: pointer;
    display: block;
    width: 3.4rem;
    aspect-ratio: 1;
    border-radius: 5px;
    background: rgba(142, 142, 142, 0.27);
    transition: transform 0.2s ease-in-out, width 0.3s ease-in-out;
    position: relative;
    transform: translateZ(0);

    &:hover {
      transform: translateZ(60px) translateX(10px) scale(1.1);
      width: 4.5rem;
    }

    &:hover + * {
      transform: translateZ(20px) translateX(5px) scale(1.02);
      width: 4rem;
    }

    &:has(+ *:hover) {
      transform: translateZ(20px) scale(1.02) translateX(5px);
      width: 4rem;
    }

    &:hover + * + * {
      transform: translateZ(30px) rotateX(20deg);
    }

    &:has(+ * + *:hover) {
      transform: translateZ(30px) rotateX(-20deg);
    }
  }
}
</style>

<template>
  <div class="side-nav-container">
     <div
      ref="dockDesktop"
      class="flex flex-col gap-4 hover:gap-6 transition-all ease-in-out items-end rounded-2xl px-4 pb-3"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    >
      <DockIcon
        v-for="(item, index) in navLink"
        :key="index.toString()"
        :item="item"
        :mouse-x="mouseX"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import DockIcon from "./DockIcon.vue";

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
    icon: "H",
    label: "Home",
    href: "/",
  },
  {
    icon: "P",
    label: "Projects",
    href: "/projects",
  },
  {
    icon: "E",
    label: "Experience",
    href: "/exp",
  },
  {
    icon: "S",
    label: "Skills",
    href: "/sex",
  },
  {
    icon: "Cv",
    label: "CV",
    href: "/c",
  },
];
</script>

<style>
.side-nav-container {
  width: 5rem;
  position: fixed;
  top: 50%;
  left: 10px;
  z-index: 200;
  transform: translateY(-50%);
  padding: 1rem 0rem;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(4px);
  background-blend-mode: overlay;
  background-color: rgba(68, 68, 68, 0.08);
  border-radius: 1rem;
  border: 1px solid #ffffff12;
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

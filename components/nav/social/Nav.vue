<template>
  <div
    class="nav-container social-nav-container hidden sm:flex"
    @mousemove="scaleGrow"
    @mouseleave="scaleNormal"
  >
    <nav class="flex flex-col items-center justify-center gap-4">
      <nav-item
        v-for="(item, index) in socialNav"
        :key="index.toString()"
        :item="item"
      />
    </nav>
  </div>
</template>

<script lang="ts" setup>
import navItem from "./nav-item.vue";

import Github from "~/components/icons/socials/github.vue";
import Mail from "~/components/icons/socials/paper-plane.vue";
import LinkedIn from "~/components/icons/socials/linkedIn.vue";
import X from "~/components/icons/socials/x.vue";

const socialNav = [
  {
    label: "GitHub",
    icon: Github,
    href: "https://github.com/souze-san",
    hoverClass:
      "hover:invert hover:bg-[#1F1F1F] hover:text-white hover:scale-110 transition-all ease-in-out duration-300",
  },
  {
    label: "Mail",
    icon: Mail,
    href: "mailto:soumyajit.codemail@gmail.com",
    hoverClass:
      "hover:invert hover:bg-[#1F1F1F] hover:text-white  hover:scale-110  transition-all ease-in-out duration-300",
  },
  {
    label: "LinkedIn",
    icon: LinkedIn,
    href: "https://www.linkedin.com/in/soumyajit-mondal-3342b4284",
    hoverClass:
      "hover:invert hover:text-white hover:bg-[#1F1F1F] hover:scale-110 transition-all ease-in-out duration-300",
  },
  {
    label: "X",
    icon: X,
    href: "https://x.com/soumya03jit?t=9SFCdlkBX7bev6_NJSzbmQ&s=09",
    hoverClass:
      "hover:invert hover:text-white hover:bg-[#1F1F1F] hover:scale-110 transition-all ease-in-out duration-300",
  },
];

const { setHover } = useHover();

function scaleGrow() {
  setHover(true, "none");
}

function scaleNormal() {
  setHover(false);
}
</script>

<style scoped>
.social-nav-container {
  width: unset;
  position: fixed;
  top: unset;
  bottom: 10%;
  left: unset;
  right: 10px;
  transform: translateY(0%);
  padding: 1rem 10px;
  backdrop-filter: blur(2px);
  background-color: rgba(11, 13, 18, 0.281);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow:
    0 40px 100px rgba(0, 0, 0, 0.7),
    inset 0 1px 0 rgba(255, 255, 255, 0.055);
  background-blend-mode: unset;
}

@media (width <= 640px) {
  .social-nav-container {
    bottom: 5%;
    z-index: 1;
  }
}
</style>

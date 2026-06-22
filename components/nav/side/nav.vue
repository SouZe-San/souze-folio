<template>
  <div
    class="side-nav-container hidden sm:flex"
    @mouseenter="scaleGrow"
    @mouseleave="scaleNormal"
  >
    <Dock orientation="vertical">
      <DockIcon
        v-for="(item, index) in navLink"
        :key="index.toString()"
        :to="item.href"
        :tooltip="item.label"
        :target="item.label === 'CV' ? '_blank' : '_self'"
      >
        <component :is="item.icon" class="w-10 aspect-square" />
      </DockIcon>
    </Dock>
  </div>
</template>

<script lang="ts" setup>

import Cv from "~/components/icons/nav/cv.vue";
import Exp from "~/components/icons/nav/briefcase.vue";
import Home from "~/components/icons/nav/home.vue";
import Project from "~/components/icons/nav/code-folder.vue";
import Skills from "~/components/icons/nav/code-dot.vue";

import Dock from "~/components/nav/side/dock/Dock.vue";
import DockIcon from "~/components/nav/side/dock/DockIcon.vue";

const { setHover } = useHover();

function scaleGrow() {
  setHover(true, "none");
}

function scaleNormal() {
  setHover(false);
}

const navLink = [
  {
    icon: Home,
    label: "Home",
    href: "/",
    hoverClass: "hover:text-[white]",
  },

  {
    icon: Exp,
    label: "Experience",
    href: "/exp",
    hoverClass: "hover:text-[#9f05ff]",
  },
    {
    icon: Project,
    label: "Projects",
    href: "/projects",
    hoverClass: "hover:text-[#ffea05]",
  },
  {
    icon: Skills,
    label: "Skills",
    href: "/#skills",
    hoverClass: "hover:text-[#04ff96]",
  },
  {
    icon: Cv,
    label: "CV",
    href: "https://drive.google.com/drive/folders/1O-RC1VYK0zxeeU7YgJ7XE0uAPNlb7FKY?usp=sharing",
    hoverClass: "hover:text-[#ff6d05]",
  },
];
</script>

<style scoped>
.side-nav-container {
  position: fixed;
  top: 50%;
  left: 10px;
  z-index: 200;
  transform: translateY(-50%);
}
</style>

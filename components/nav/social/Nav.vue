<template>
  <div class="nav-container social-nav-container">
 
      <nav class="flex flex-col items-center justify-center gap-4 ">
        <nav-item
          v-for="(item, index) in socialNav"
          :key="index.toString()"
          :item="item"
        />
      </nav>
    </div>

</template>

<script lang="ts" setup>
import Github from '~/components/icons/socials/github.vue';
import navItem from './nav-item.vue';


import X from '~/components/icons/socials/x.vue';
import Mail from '~/components/icons/socials/mail.vue';
import LinkedIn from '~/components/icons/socials/linkedIn.vue';


const socialNav = [
  {
    label: "GitHub",
    icon: Github,
    href:"https://github.com/souze-san",
    hoverClass: "hover:invert hover:bg-[#1F1F1F] hover:scale-110 transition-all ease-in-out duration-300",
  },
  {
    label: "Mail",
    icon: Mail,
    href:"mailto:soumyajit.codemail@gmail.com",
    hoverClass: "hover:text-[#9626ff] hover:bg-[#1F1F1F]  hover:scale-110  transition-all ease-in-out duration-300",
  },
  {
    label: "LinkedIn",
    icon: LinkedIn,
    href:"https://github.com/souze-san",
    hoverClass: "hover:text-[#00d9ff] hover:bg-[#1F1F1F] hover:scale-110 transition-all ease-in-out duration-300",
  },
  {
    label: "X",
    icon: X,
    href:"https://github.com/souze-san",
    hoverClass: "hover:invert hover:bg-[#1F1F1F] hover:scale-110 transition-all ease-in-out duration-300",
  },
  ]
  
</script>

<style scoped>
.social-nav-container {
  width: unset;
  position: fixed;
  top:unset;
  bottom: 10%;
  left: unset;
  right: 10px;
  transform: translateY(0%);
 padding: 1rem 10px;
 backdrop-filter: blur(2px);
  background-color: rgba(174, 174, 174, 0.02);
  border-radius: 1rem;
  border: 1px solid #dbdbdb0a;
  box-shadow: 2px 4px 6px 1px rgba(0, 0, 0, 0.4117647059);
  background-blend-mode: unset;
}
</style>
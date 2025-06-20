<template>
  <header class="flex items-center justify-between p-4 ">
      <div class="logo">
       
          <span class="font-changa text-xl flex gap-2 items-center">
            <div class="w-10 rounded-full overflow-hidden">
              <img :src="profile" alt="profile" />
            </div>
         <!-- Souze-San.dev -->
          <img alt="Souze" :src="nameLogo" class="w-40" />
          </span>
        
      </div>

 <div class="flex items-center justify-center gap-2">
          <span class="relative flex size-3 mr-4 sm:mr-0">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-75"></span>
            <span class="relative inline-flex size-3 rounded-full bg-green-500"></span>
          </span>
          <span class="text-xl leading-3 hidden sm:block font-changa">
            Open to work
          </span>
        </div> 
  
  </header>
</template>

<script lang="ts" setup>
import nameLogo from '~/assets/icons/logo/name.svg';
import profile from '~/public/assets/profile.jpeg'
</script>

<style scoped>
header {
  width: 80vw;
  height: 48px;
  position: fixed;
  top: 40px;
  left: 50%;
  z-index: 200;
  transform: translateX(-50%);
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(32px);
  background-blend-mode: overlay;
  background-color: rgba(85, 85, 85, 0.246);
  border-radius: 1rem;
  border: 1px solid #ffffff1c;

  box-shadow: 2px 4px 6px 1px rgba(0, 0, 0, 0.4117647059);
}
</style>
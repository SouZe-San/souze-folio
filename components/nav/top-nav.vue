<template>
  <header class="flex items-center justify-between p-4 ">
      <div class="logo">
       
          <span>
         Souze-San.dev
          </span>
        
      </div>

 <div class="flex items-center justify-center gap-2 mt-10">
          <span class="relative flex size-3 mr-4 sm:mr-0">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-75"></span>
            <span class="relative inline-flex size-3 rounded-full bg-green-500"></span>
          </span>
          <span class="text-heading-text-color text-[0.6rem] md:text-[0.8rem] leading-3 hidden sm:block">
            Open to work
          </span>
        </div> 
  
  </header>
</template>

<script lang="ts" setup>

</script>

<style>
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
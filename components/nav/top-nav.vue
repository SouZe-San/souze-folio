<template>
  <header class="flex items-center justify-between p-4 " ref="headerRef">
      <div class="logo">
       
          <span class="font-changa text-xl flex gap-2 items-center">
            <div class="w-10 rounded-full overflow-hidden">
              <img :src="profile" alt="profile" />
            </div>
        
          <img alt="Souze" :src="nameLogo" class="sm:w-40 w-36" />
          </span>
        
      </div>

 <div class="flex items-center justify-center gap-2" @mouseenter="scaleUp" @mousemove="scaleUp" @mouseleave="()=>setHover(false)">
          <span class="relative flex size-3 mr-4 sm:mr-0">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-75"></span>
            <span class="relative inline-flex size-3 rounded-full bg-green-500"></span>
          </span>
          <span class="text-xl leading-3 sm:block hidden font-changa">
            Open to work
          </span>
        </div> 
  
  </header>
</template>

<script lang="ts" setup>
import nameLogo from '~/assets/icons/logo/name.svg';
import profile from '~/public/assets/profile.jpeg'
const {setHover} = useHover()
const headerRef = ref<HTMLElement>()

function scaleUp(){
setHover(true,"small")
}

const widthChange = ()=>{
  if(!headerRef.value || window.innerWidth <= 640) return

   if(window.scrollY > 670){
   headerRef.value.style.width = '40vw'
  }
  else{
     headerRef.value.style.width = '80vw'
  }
}
watchEffect((onCleanup)=>{
 if(window){
 window.addEventListener('scroll',widthChange)
   onCleanup(() => {
     window.removeEventListener("scroll", widthChange);
    
   });
 }

})

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
  transition: width .4s ease-in-out;
}

@media (width <= 640px) {
  header {
  width: 90vw;
  height: 50px;}
}
</style>
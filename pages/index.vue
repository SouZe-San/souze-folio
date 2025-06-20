<template>
  <NuxtLayout>

    <section class="heroSection relative  overflow-hidden  bgBlur">
     <img :src="grid" alt="Logo" class="grid"  />    
 <div class="back_white_blob_top"></div>
      <div class="back_white_blob_down"></div>

      <div class="flex flex-col items-center justify-center h-full gap-4">
      
        <div class="name-main wi-full text-center relative">

          <span class="absolute -top-[10%] -left-4">
            Hii, I&#39;am
          </span>
            <h1 class="text-[48px] md:text-8xl font-bold font-cinzel-bold text-white -translate-4"><span >S</span>oumayjit</h1>
          
        <h1 class="text-[48px] md:text-8xl font-bold font-cinzel-bold text-white">Mondal</h1>
        </div>

      
          <h3 class="text-end">
            

full-stack developer from India, love to explore, build things and solving problems.
          </h3>
       
        </div>

   </section>
  </NuxtLayout>
</template>

<script setup>
import grid from  '~/assets/images/background/grid.svg'
</script>
<style scoped>
.grid {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  mask-image: linear-gradient(90deg,rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 3%, rgb(0, 0, 0) 97%, rgba(0, 0, 0, 0) 100%);
   z-index: -10;
  opacity: .3;
}

.heroSection {
    padding-top: calc(var(--nav-height));
    width: 100vw;
    height: 100vh;
        background: url('/_nuxt/assets/images/background/noisy-2.png') center center fixed, linear-gradient(327.21deg, #141414 3.65%, rgba(26, 26, 26, 0) 40.32%), linear-gradient(245.93deg, rgba(36, 35, 36, 0.27) 0%, rgba(235, 235, 235, 0) 36.63%), linear-gradient(147.6deg, rgba(0, 0, 0, 0) 29.79%, rgba(0, 0, 0, 0.03) 85.72%), #141414;
  
}



.bgBlur {
  backdrop-filter: blur(1rem);
}
.back_white_blob_top {
    width: 34vw;
    top: 0;
    left: 50%;
    transform: translate(-50%, 50%);
    position: absolute;
    z-index: -3;
    box-shadow: 0px 0 14rem 10rem rgba(149, 147, 147, 0.31);
    border-radius: 8% 52% 0% 100%/0% 0% 91% 100%;
}
.back_white_blob_down {
   width: 10vw;
  position: absolute;
  z-index: -3;
  bottom: 22%;
  left: -6%;
  box-shadow: 0px 0 10rem 3rem rgba(177, 237, 247, 0.49);
}


.name-main{
  h1{
    line-height: 1;
    span{
      font-size: 12rem;
    }
  &:nth-child(2){
    translate: -15% 0;
  }&:last-child{
    translate: 15% 0;
  }
  }
}

h3{
  width: 75%;
  font-size: 18px;
}
</style>
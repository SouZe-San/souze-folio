<template>
  <footer className="contactSection relative">
    <div class="borderBox flex flex-col gap-2 justify-center items-center" ref="borderBody">
      <h1 class="lg:text-7xl md:text-5xl text-4xl anime-text">
       
         <span class="font-cinzel-bold">G</span>et <span class="font-changa">In</span> <span class="font-cinzel-bold">T</span>ouch
      </h1>
      <p class="md:text-lg anime-text">
        Unlocking potential through collaboration and shared expertise. Feel free to reach out ~o_ o~ 
      </p>
      <button class="btn flex items-center gap-3 anime-text">
              <code>
          <a href="mailto:soumyajit.codemail@gmail.com">soumyajit.codemail@gmail.com</a>
     </code>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy-icon lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
      </button>
    </div>
  </footer>
</template>

<script lang="ts" setup>

const { setHover } = useHover();
const { $gsap } = useNuxtApp()


onMounted(()=>{
  const media = $gsap.matchMedia()

  media.add({
      isDesktop: `(min-width: ${640+1}px)`,
      isMobile: `(max-width: ${640}px)`
  }, (context) => {
  
  //@ts-ignore
let {isDesktop,isMobile} = context.conditions
$gsap.fromTo('.borderBox',{
  width:'100%',
  height:'100%',
  borderRadius:0,
  borderColor:'#cfcfcf00'
},{
   width:'70%',
  height: isDesktop ?'75%':'65%',
  borderRadius:15,
  borderColor:'#cccccc47',
  scrollTrigger: {
    trigger: ".contactSection",
    start: "top center",
    end: "center center+=50",
    scrub: true,
    toggleActions: "play none reverse reverse",
  },
  onComplete:()=>{
    $gsap.fromTo('.anime-text',{
      y:100,autoAlpha:0
    },{
      y:0,
      autoAlpha:1,
      duration:1,
      ease:'power2.inOut'
    })
  },
  onReverseComplete:()=>{
    $gsap.to('.anime-text',{
        y:100,autoAlpha:0
    })
  }
})
})

})

</script>

<style scoped>
footer {
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
 
}
.borderBox{
  border: 2px solid transparent;
  width: 100%;
  height: 100%;
}
button{
  border:1px solid #cfcfcf87;
  margin-top: 1rem;
  font-family: 'q';
  font-size: 20px;
  border-radius: 15px;
  padding: 5px 24px;

   background: url("/public/noiseTex.webp") repeat, #eeeeee13;
   background-size: 100px;
   /* background: url(/assets/images/background/noisy-2.png), #eeeeee13; */
  backdrop-filter: blur(1rem);
}
.anime-text{
  opacity: 0;
}


@media (width <= 640px) {
  footer{
    height: 90svh;
  }
 button{
  font-size: 12px;
 
  padding: 5px 15px;
  svg{
   width: 14px;
  }
 }
 p{
  padding: 1rem;
  text-align: center;
  line-height: 1.2;
  word-spacing: 5px;
 }
}
</style>

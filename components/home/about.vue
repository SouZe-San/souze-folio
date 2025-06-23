<template>
  <section class="h-screen flex justify-center items-center aboutSection">
    <div class="container space-y-16">
      <div class="heading flex justify-end">
        <div class="inline-block relative text-center content_title">
          <span
            class="headSpan absolute md:text-3xl font-cinzel-bold sm:-top-1 opacity-60 text-white/20 left-[50%] -translate-x-[50%]"
            style="letter-spacing: 10px"
            >What I&#39;m
          </span>

          <h1
            class="md:text-6xl font-cinzel-bold text-white/80 headText overflow-hidden"
            @mousemove="scaleGrow"
            @mouseleave="scaleNormal"
            style="padding-top: 12px"
          >
            What I&#39;m up to
          </h1>

          <span class="line"></span>
        </div>
      </div>

      <div class="md:text-3xl text-white/70 contentBody text">
        <span class="sm:text-4xl text-white" style="letter-spacing: 0"> Hey There! </span>
        I&#39;am
        <div
          id="owner"
          class="text-white font-changa sm:text-[32px] relative overflow-hidden inline-block"
          @mousemove="nameHover"
          @mouseleave="scaleNormal"
          ><span class="name-original">Soumyajit Mondal</span>
          <span class="name-alt absolute flex top-0 left-0">Souze-san</span></div>, a Computer Science Graduate from India with a passion for clean code and wired Design.
        Now, i Build as a
        <span class="sm:text-[32px] font-changa text-white" 
        @mousemove="smallScaleGrow"  @mouseleave="scaleNormal"
        > Full-stack Developer </span>
        who Loves turing ideas into interactive, scalable digital experience. Whether it&#39;s
        front-end magic or back-end logic, I enjoy crafting thing that solve
        <span class="sm:text-[32px] font-changa text-white" 
        @mousemove="smallScaleGrow"  @mouseleave="scaleNormal"
        > real problem </span> and spark
        curiosity. Always exploring, always building - One line of code at a time.
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { SplitText } from "gsap/SplitText";

const { setHover } = useHover();
import gsap from "gsap";

let hoverTimeline :gsap.core.Timeline

function scaleGrow() {
  setHover(true);
}
function smallScaleGrow() {
  setHover(true, "small");
}
function nameHover() {
  setHover(true, "small");
  hoverTimeline.play()
}

function scaleNormal() {
  setHover(false);
  hoverTimeline.reverse()
}

onMounted(() => {
  const originalSplit = SplitText.create(".name-original", { type: "chars" });
  const altSplit = SplitText.create(".name-alt", { type: "chars" });

   hoverTimeline = gsap.timeline({paused:true})

  const triggerTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".aboutSection",
      start: "top center",
      end: "top center+=100",
      scrub: false,
      toggleActions: "play none reverse reverse",
    },
  });

  triggerTl.fromTo(
    ".line",
    {
      width: 0,
    },
    {
      width: "100%",
      ease: "power3.out",
    }
  );
  SplitText.create(".headText", {
    type: "chars",
    onSplit(self) {
      return triggerTl.fromTo(
        self.chars,
        {
          y: 100,
         
        },
        {
          y: 0,
          duration: 0.3,
          ease: "power2.out",
          stagger: 0.03,
        }
      );
    },
  });

  triggerTl.fromTo(
    ".headSpan",
    {
      y: 50,
      alpha: 0,
    },
    {
      y: 0,
      alpha: 1,
      ease: "power3.out",
    }
  );

  gsap.fromTo(
    ".text",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".aboutSection",
        start: "top center",
        end: "top center+=100",

        toggleActions: "play none reverse reverse",
      },
    }
  );

  let content = SplitText.create(".text", {
    type: "chars,words",
    autoSplit: true,
    onSplit(self) {
      return gsap.fromTo(
        self.chars,
        {
          autoAlpha: 0.2,
        },
        {
          autoAlpha: 1,
          ease: "power4.inOut",
          stagger: 0.05,
          scrollTrigger: {
            trigger: ".aboutSection",
            start: "center-=150 center",
            end: "center+=100 center+=50",
            scrub: true,
            //  toggleActions: "play none none reverse",
          },
        }
      );
    },
  });


//   hover animations 

    hoverTimeline.fromTo(originalSplit.chars,{
      y:0,
   autoAlpha:1
    } ,{
      y: -40,
     autoAlpha:.5,
      duration: 0.3,
      ease: "power2.out",
      stagger: 0.05
    }, 0)
    .fromTo(altSplit.chars, 
      {
        y: 40,
        autoAlpha: 0
      },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.3,
        ease: "power2.out",
        stagger: 0.05
      },
    0);



});
</script>

<style scoped>
.line {
  position: absolute;
  bottom: 4px;
  left: 0;
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.828);
}

.contentBody {
  line-height: 1.5;
  letter-spacing: 1px;
  word-wrap: break-word;
}

#owner {
 line-height: .97;
  &::after {
    content: "";
    position: absolute;
    bottom:0;
    left: 0;
    height: 1px;
    width: 0%;
    background: whitesmoke;
    transition: width 0.5s ease-in-out;
  }

  &:hover {
    &::after {
      width: 70%;
    }
  }
}

.name-alt{
   letter-spacing: 3px;
}
</style>

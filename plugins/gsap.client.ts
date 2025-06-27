import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { CustomEase } from "gsap/CustomEase";

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(SplitText, ScrollSmoother, ScrollTrigger, CustomEase);

  return { provide: { gsap, ScrollTrigger, CustomEase, SplitText } };
});

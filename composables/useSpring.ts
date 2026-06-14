import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
gsap.registerPlugin(CustomEase);
export const useSpring = ({ stiffness, damping, mass = 1, restDelta = 0.01 }:{stiffness:number; damping:number; mass :number; restDelta :number}) => {
  const w0 = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));

  // step response, progress 0 -> 1 (matches Framer: zero initial velocity)
  const progress =
    zeta < 1
      ? (t:number) => {
          const wd = w0 * Math.sqrt(1 - zeta * zeta); // damped frequency
          return (
            1 -
            Math.exp(-zeta * w0 * t) *
              (Math.cos(wd * t) + ((zeta * w0) / wd) * Math.sin(wd * t))
          );
        }
      : (t:number) => 1 - Math.exp(-w0 * t) * (1 + w0 * t); // critically/over-damped

  // how long until it settles within restDelta of the target
  let t = 0;
  const step = 1 / 120;
  while (t < 6 && Math.abs(1 - progress(t)) > restDelta) t += step;
  const duration = +t.toFixed(3);

  // bake the curve into a CustomEase path (y may exceed 1 = the overshoot)
  const samples = Math.max(40, Math.round(duration * 120));
  let d = "M0,0";
  for (let i = 1; i <= samples; i++) {
    const p = i / samples;
    const y = i === samples ? 1 : progress(p * duration);
    d += ` L${p.toFixed(4)},${y.toFixed(4)}`;
  }

  return { ease: CustomEase.create("framerSpring", d), duration };
};

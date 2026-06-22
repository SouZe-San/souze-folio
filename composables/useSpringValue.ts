import { ref, onUnmounted, type Ref } from 'vue'
import gsap from 'gsap'


export interface SpringOptions {
  mass?: number
  stiffness?: number
  damping?: number
  /** distance from target (in value units) below which we consider it settled */
  restDelta?: number
  /** velocity (units/sec) below which we consider it settled */
  restSpeed?: number
}

export interface SpringValue {
  /** reactive current value */
  value: Ref<number>
  /** retarget — the value will spring toward `next` */
  set: (next: number) => void
  /** snap instantly to `next` (no animation), e.g. for init/reset */
  jump: (next: number) => void
}


export function useSpringValue(initial: number, options: SpringOptions = {}): SpringValue {
  const {
    mass = 0.1,
    stiffness = 200,
    damping = 15,
    restDelta = 0.0005,
    restSpeed = 0.01,
  } = options

  const value = ref(initial)
  let current = initial
  let target = initial
  let velocity = 0
  let running = false

  const MAX_SUBSTEP = 1 / 240 // s — small enough for stiff springs

  const tick = (_time: number, deltaMs: number) => {
    // Clamp dt so tab-switches / long frames can't explode the integrator.
    const dt = Math.min(deltaMs, 64) / 1000
    const steps = Math.max(1, Math.ceil(dt / MAX_SUBSTEP))
    const sdt = dt / steps

    for (let i = 0; i < steps; i++) {
      const springForce = -stiffness * (current - target)
      const dampingForce = -damping * velocity
      const accel = (springForce + dampingForce) / mass
      velocity += accel * sdt        // symplectic: velocity first…
      current += velocity * sdt      // …then position
    }

    value.value = current

    if (Math.abs(velocity) < restSpeed && Math.abs(current - target) < restDelta) {
      current = target
      velocity = 0
      value.value = current
      stop()
    }
  }

  function start() {
    if (running) return
    running = true
    gsap.ticker.add(tick)
  }

  function stop() {
    if (!running) return
    running = false
    gsap.ticker.remove(tick)
  }

  function set(next: number) {
    if (next === target && !running) return
    target = next
    start()
  }

  function jump(next: number) {
    target = next
    current = next
    velocity = 0
    value.value = next
    stop()
  }

  onUnmounted(stop)

  return { value, set, jump }
}

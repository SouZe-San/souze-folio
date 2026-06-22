<template>
  <ClientOnly>
    <div class="cursor" ref="cursor"></div>
  </ClientOnly>
</template>

<script lang="ts" setup>
const { $gsap } = useNuxtApp();
import { ref, onMounted } from "vue";

const mouse = ref({ x: 50, y: 50 });
const delayedMouse = ref({ x: 0, y: 0 });
const cursor = ref();
const rafId = ref<number | null>(null);

const { isHover, scaleType } = useHover();
const size = ref(32);

const { setPosition } = useCursorPosition();

const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

const varSize = {
  big: 224,
  small: 80,
  none: 0,
};
const updateMousePosition = (e: MouseEvent) => {
  mouse.value = { x: e.clientX, y: e.clientY };
  // size.value = computed(() =>
  //   isHover.value ? varSize[scaleType.value] : 32,
  // ).value;
  size.value = isHover.value ? varSize[scaleType.value] : 32;
};

const moveCircle = (x: number, y: number, size: number) => {
  if (!cursor.value) return;
  $gsap.set(cursor.value, {
    x,
    y,
    xPercent: -50,
    yPercent: -50,
    width: size,
  });
};
const animate = () => {
  const { x, y } = delayedMouse.value;

  //  using GSAP Utils Fun
  // delayedMouse.value = {
  //   x: computed(() => $gsap.utils.interpolate(x, mouse.value.x, 0.075)).value,
  //   y: computed(() => $gsap.utils.interpolate(y, mouse.value.y, 0.075)).value,
  // };

  delayedMouse.value = {
    x: $gsap.utils.interpolate(x, mouse.value.x, 0.075),
    y: $gsap.utils.interpolate(y, mouse.value.y, 0.075),
  };

  // Using own func
  // delayedMouse.value = {
  //   x: computed(() => lerp(x, mouse.value.x, 0.075)).value,
  //   y: computed(() => lerp(y, mouse.value.y, 0.075)).value,
  // };

  setPosition(delayedMouse.value.x, delayedMouse.value.y);
  moveCircle(delayedMouse.value.x, delayedMouse.value.y, size.value);

  rafId.value = window.requestAnimationFrame(animate);
};

watchEffect((onCleanup) => {
  animate();
  window.addEventListener("mousemove", updateMousePosition);

  onCleanup(() => {
    window.removeEventListener("mousemove", updateMousePosition);
    window.cancelAnimationFrame(rafId.value!);
  });
});

onMounted(() => {
  mouse.value = {
    x: 50,
    y: 50,
  };
});
</script>

<style scoped>
.cursor {
  position: fixed;
  width: 32px;
  aspect-ratio: 1;
  background: white;
  border-radius: 50%;
  z-index: 500;
  transform-origin: center center;
  mix-blend-mode: difference;
  transition: width 0.3s;
  pointer-events: none;
    will-change: transform;
}
/* CSS */
@media (hover: none) and (pointer: coarse) { .cursor { display: none; } }
</style>

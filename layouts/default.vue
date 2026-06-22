<template>
  <section>
    <Loader />
    <NavMobileDialNav />
    <Cursor />
    <div ref="curtain" class="curtain"></div>

    <slot />
  </section>
</template>

<script lang="ts" setup>

const curtain = ref(null);
const { $gsap, $CustomEase } = useNuxtApp();
onMounted(() => {
  $gsap.set(curtain.value, { scaleY: 0 });
  $CustomEase.create("hop", ".9, 0, .1, 1");
});

// Handle page transitions
const router = useRouter();

router.beforeEach((to, from) => {
  return new Promise((resolve) => {
    if (from.name && to.name !== from.name) {
      $gsap.to(curtain.value, {
        scaleY: 1,
        duration: 0.4,
        ease: "hop",
        onComplete: () => {
          resolve();
        },
      });
    } else {
      resolve();
    }
  });
});

router.afterEach(() => {
  $gsap.to(curtain.value, {
    scaleY: 0,
    duration: 1.25,
    ease: "hop",
    delay: 1,
  });
});
</script>

<style scoped></style>

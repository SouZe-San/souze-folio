<template>
  <section>
    <NavTopNav />
    <NavSideNav />
    <NavSocialNav />
    <NavSideMobileNav />
    <Cursor />
  <div ref="revealer" class="revealer"></div>

    <slot />
  </section>
</template>

<script lang="ts" setup>

const revealer = ref(null)
const { $gsap, $CustomEase } = useNuxtApp();
onMounted(() => {
  // Initialize revealer to be hidden
  $gsap.set(revealer.value, { scaleY: 0 })
  $CustomEase.create("hop", '.9, 0, .1, 1')
})

// Handle page transitions
const router = useRouter()

router.beforeEach((to, from) => {
  return new Promise((resolve) => {
    if (from.name && to.name !== from.name) {
      // Start transition - show revealer
      $gsap.to(revealer.value, {
        scaleY: 1,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          resolve()
        }
      })
    } else {
      resolve()
    }
  })
})

router.afterEach(() => {
  // End transition - hide revealer
  $gsap.to(revealer.value, {
    scaleY: 0,
    duration: 1.25,
    ease: "hop",
    delay: 1
  })
})

</script>

<style scoped></style>

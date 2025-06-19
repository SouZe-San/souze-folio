<template>
  <NuxtLink
    :to="item.href"
    class="hover:space-y-1 hover:translate-x-2.5 transition-all duration-300 ease-in-out "
  >
    <div
      ref="iconContainer"
      class="aspect-square rounded-2xl bg-neutral-800 flex items-center justify-center relative cursor-pointer transition-transform duration-300 ease-out "
      :style="containerStyle"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <!-- Tooltip -->
      <div
        v-if="hovered"
        ref="tooltip"
        class="px-2 py-0.5 whitespace-pre rounded-md border bg-neutral-800 border-neutral-900 text-white absolute left-8 translate-x-4  w-fit text-xs label"
      >
        {{ item.label }}
      </div>
      
      <!-- Icon -->
      <div
        ref="iconWrapper"
        class="flex items-center justify-center transition-transform duration-300 ease-out"
        :style="iconStyle"
      >
    
        {{ item.icon }}
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'


interface Props {
  item: {
    label: string,
    icon: string,
    href: string,
   
  }
  mouseX: number
}

const props = defineProps<Props>()

const iconContainer = ref<HTMLElement>()
const iconWrapper = ref<HTMLElement>()
const tooltip = ref<HTMLElement>()
const hovered = ref(false)

const containerScale = ref(1)
const translateValue = ref(0)
const iconScale = ref(1)

// Computed styles for smooth scaling
const containerStyle = computed(() => ({
  transform: `scale(${containerScale.value}) translateX(${translateValue.value }px)`,
  width: '40px',
  height: '40px'
}))

const iconStyle = computed(() => ({
  transform: `scale(${iconScale.value})`,
  width: '20px',
  height: '20px'
}))

const calculateDistance = () => {
  if (!iconContainer.value) return Infinity
  
  const bounds = iconContainer.value.getBoundingClientRect()
  return props.mouseX - bounds.y - bounds.height / 2
}

const updateScale = () => {
  if (!iconContainer.value) return
  
  const distance = calculateDistance()
  const absDistance = Math.abs(distance)
  
  // Calculate scale based on distance
  if (absDistance <= 80) {
    // Map distance to scale (closer = bigger)
    const normalizedDistance = absDistance / 80
    const newScale = 2 - normalizedDistance // 2 at center, 1 at edges
    containerScale.value = newScale
    iconScale.value = newScale
    translateValue.value = newScale * 8 // Adjust translation based on distance
  } else {
    translateValue.value = 0 // Adjust translation based on distance
    containerScale.value = 1
    iconScale.value = 1
  }
}

import { gsap } from 'gsap'

const handleMouseEnter = () => {
  hovered.value = true
  
  if (tooltip.value) {
    gsap.fromTo(tooltip.value,
      {
       opacity: 0,
        x: 0
      },
      {
        opacity: 1,
        x: 30,
        duration: 0.2,
        ease: "power2.out"
      }
    )
  }
}
const handleMouseLeave = () => {
  if (tooltip.value) {
    gsap.to(tooltip.value, {
      opacity: 0,
      x: 0,
      duration: 0.15,
      ease: "power2.in",
      onComplete: () => {
        hovered.value = false
      }
    })
  } else {
    hovered.value = false
  }
}


// Watch for mouse position changes
watch(() => props.mouseX, () => {
  updateScale()
}, { immediate: true })

onMounted(() => {
  // Initialize scales
  containerScale.value = 1
  iconScale.value = 1
})
</script>
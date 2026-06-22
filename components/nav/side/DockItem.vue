<template>
  <NuxtLink
    :to="item.href"
    :class="['hover:space-y-2 hover:translate-x-2.5 transition-all duration-300 ease-in-out text-[#C0C0C0]',item.hoverClass]"
    :target="item.label === 'CV' ? '_blank' :'_self'"
  >
    <div
      ref="iconContainer"
      class="aspect-square rounded-xl bg-neutral-800 flex items-center justify-center relative cursor-pointer transition-transform duration-300 ease-out "
      :style="containerStyle"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <!-- Tooltip -->
      <div
        v-if="hovered"
        ref="tooltip"
        class="px-2 py-0.5 whitespace-pre rounded-md border bg-neutral-800 border-white/10 text-white absolute left-8 translate-x-4  w-fit text-xs label"
      >
        {{ item.label }}
      </div>
      
      <!-- Icon -->
      <div
        ref="iconWrapper"
        class="flex items-center justify-center transition-transform duration-300 ease-out aspect-square"
        :style="iconStyle"
      >
    
        <component :is="item.icon" class="w-10 aspect-square transition-colors ease-in-out" />
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed, type DefineComponent } from 'vue'


interface Props {
  item: {
    label: string,
    icon: DefineComponent<{}, {}, any>,
    href: string,
   hoverClass?: string;
  }
  mouseX: number
}

const props = defineProps<Props>()

const iconContainer = ref<HTMLElement>()
const tooltip = ref<HTMLElement>()
const hovered = ref(false)

const { $gsap } = useNuxtApp()

const containerScale = ref(1)
const translateValue = ref(0)
const iconScale = ref(1)
const paddingValue = ref(0)

// Computed styles for smooth scaling
const containerStyle = computed(() => ({
  transform: `scale(${containerScale.value}) translateX(${translateValue.value }px)`,
  width: '45px',
  
}))

const iconStyle = computed(() => ({
  transform: `scale(${iconScale.value})`,
  width: '25px',
  padding: `${paddingValue.value}px`,
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
  

  if (absDistance <= 80) {
    
    const normalizedDistance = absDistance / 80
    const newScale = 2 - normalizedDistance 
    containerScale.value = newScale
    iconScale.value = newScale -.4 ;
    translateValue.value = newScale * 8
    paddingValue.value = ((newScale - 1) / (2 - 1)) * (4 - 0) + 0 
  } else {
    translateValue.value = 0 
    containerScale.value = 1
    iconScale.value = 1
  }
}


const handleMouseEnter = () => {
  hovered.value = true
  
  if (tooltip.value) {
    $gsap.fromTo(tooltip.value,
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
    $gsap.to(tooltip.value, {
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
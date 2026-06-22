<script setup lang="ts">
import { ref, inject, computed, watch, onMounted } from "vue";
import { useSpringValue } from "~/composables/useSpringValue";
import { DockKey } from "~/config/dock";

const props = defineProps<{
  tooltip?: string;
  to?: string | Record<string, any>;
  target?: string;
}>();

const dock = inject(DockKey);
if (!dock) throw new Error("<DockIcon> must be used inside <Dock>");
const { mousePos, orientation, config, showTooltip } = dock;
const { baseSize, magnification, maxLift, effectRadius, spring } = config;

const el = ref<HTMLElement | null>(null);
const hovered = ref(false);
const pressed = ref(false);

const { value: factor, set: setFactor } = useSpringValue(0, spring);

const size = computed(() => baseSize + (magnification - baseSize) * factor.value);
const liftMag = computed(() => maxLift * factor.value);

const transform = computed(() => {
  const s = pressed.value ? 0.9 : 1;
  return orientation.value === "vertical"
    ? `translateX(${liftMag.value}px) scale(${s})`
    : `translateY(${-liftMag.value}px) scale(${s})`;
});

const tooltipOffset = computed(() => size.value + liftMag.value + 10);
const anchorStyle = computed(() =>
  orientation.value === "vertical"
    ? { left: `${tooltipOffset.value}px`, top: "50%", transform: "translateY(-50%)" }
    : { bottom: `${tooltipOffset.value}px`, left: "50%", transform: "translateX(-50%)" },
);

const linkProps = computed(() =>
  props.to
    ? {
        to: props.to,
        target: props.target,
        rel: props.target === "_blank" ? "noopener noreferrer" : undefined,
      }
    : {},
);

function recompute(pos: number) {
  if (!el.value || pos === Infinity) {
    setFactor(0);
    return;
  }
  const rect = el.value.getBoundingClientRect();
  const center =
    orientation.value === "vertical"
      ? rect.y + rect.height / 2
      : rect.x + rect.width / 2;
  const dist = pos - center;
  const f = Math.max(0, 1 - Math.abs(dist) / effectRadius);
  setFactor(f);
}

watch(mousePos, recompute);
onMounted(() => recompute(mousePos.value));
</script>

<template>
  <div class="dock-item" :class="`is-${orientation}`">
    <div class="dock-tooltip-anchor" :class="`is-${orientation}`" :style="anchorStyle">
      <Transition name="tip">
        <div v-if="hovered && showTooltip && tooltip" class="dock-tooltip bg-neutral-800">
          {{ tooltip }}
          <span class="dock-tooltip-arrow border-r-neutral-800" :class="`is-${orientation}`" />
        </div>
      </Transition>
    </div>

    <div
      ref="el"
      class="dock-icon"
      :class="`is-${orientation}`"
      :style="{ width: `${size}px`, height: `${size}px`, transform }"
      @pointerenter="hovered = true"
      @pointerleave="hovered = false; pressed = false"
      @pointerdown="pressed = true"
      @pointerup="pressed = false"
    >
      <!-- inner FILLS the spring box so the button scales with the magnify -->
      <NuxtLink :to="linkProps.to" class="dock-icon-inner">
        <slot />
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.dock-item {
  position: relative;
  display: flex;
}
.dock-item.is-vertical {
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.dock-icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: width, height, transform;
  .dock-icon-inner{
    transition: background-color .3s ease-in-out, color .3s ease-in;
  }
}
.dock-icon.is-vertical {
  transform-origin: left center;
}
.dock-icon:hover .dock-icon-inner {
  /* background: rgba(255, 255, 255, 0.07);
  color: rgba(255, 255, 255, 0.78); */
    background: rgba(233, 233, 233, 0.898);
  color: #141414;

}

.dock-icon-inner {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 22%;
  border-radius: 24%;
  color: rgba(255, 255, 255, 0.513);
  background: rgba(255, 255, 255, 0.038);
  border: 1px solid rgba(255, 255, 255, 0.065);
  text-decoration: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 0.3s ease-in-out, color 0.3s ease;
}

.dock-tooltip-anchor {
  position: absolute;
  z-index: 50;
  pointer-events: none;
}

.dock-tooltip {
  position: relative;
  padding: 6px 12px;
  background: #1c1c1e;
  color: rgba(255, 255, 255, 0.75);
  border-radius: 8px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
  white-space: nowrap;
  border: 0.5px solid rgba(255, 255, 255, 0.09);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
}

.dock-tooltip-arrow {
  position: absolute;
  width: 0;
  height: 0;
}
.dock-tooltip-arrow.is-vertical {
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-right: 5px solid rgba(255, 255, 255, 0.09);
}

.tip-enter-active,
.tip-leave-active {
  transition: opacity 0.18s ease;
}
.tip-enter-from,
.tip-leave-to {
  opacity: 0;
}
</style>
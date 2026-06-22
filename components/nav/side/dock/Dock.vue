<script setup lang="ts">
import { ref, provide, computed, toRef } from "vue";
import {
  MACOS_DOCK,
  DockKey,
  type DockConfig,
  type Orientation,
} from "~/config/dock";

const props = withDefaults(
  defineProps<{
    config?: DockConfig;
    orientation?: Orientation;
    showTooltip?: boolean;
  }>(),
  {
    config: () => MACOS_DOCK,
    orientation: "vertical",
    showTooltip: true,
  },
);

const mousePos = ref(Infinity);

provide(DockKey, {
  mousePos,
  orientation: toRef(props, "orientation"),
  config: props.config,
  showTooltip: toRef(props, "showTooltip"),
});

const bgThickness = computed(() => props.config.baseSize + 24);
const bgStyle = computed(() =>
  props.orientation === "vertical"
    ? { width: `${bgThickness.value}px` }
    : { height: `${bgThickness.value}px` },
);

function onMove(e: PointerEvent) {
  mousePos.value = props.orientation === "vertical" ? e.clientY : e.clientX;
}
function onLeave() {
  mousePos.value = Infinity;
}
</script>

<template>
  <div
    class="dock-stage"
    :class="`is-${orientation}`"
    :style="{ '--dock-thickness': `${bgThickness}px` }"
    @pointermove="onMove"
    @pointerleave="onLeave"
  >
    <div class="dock-track" :style="{ gap: `${config.gap}px` }">
      <div class="dock-bg" :style="bgStyle" />
      <slot />
    </div>
  </div>
</template>

<style scoped>
.dock-stage {
  position: relative;
  display: flex;
}
.dock-stage.is-vertical {
  height: 100%;
  align-items: center;
  justify-content: flex-start;
  width: var(--dock-thickness);
  overflow: visible;
  padding: 10px;
}

.dock-track {
  position: relative;
  display: flex;
  z-index: 10;
}

.is-vertical .dock-track {
  flex-direction: column;
  align-items: flex-start;
  padding: 12px;
  flex: none;
  width: var(--dock-thickness);
  overflow: visible;
}

.dock-bg {
  position: absolute;
  z-index: -1;
  border-radius: 1rem;
  background: rgba(11, 13, 18, 0.281);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.07);
  background-blend-mode: overlay;
  box-shadow:
    0 40px 100px rgba(0, 0, 0, 0.7),
    inset 0 1px 0 rgba(255, 255, 255, 0.055);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 14px;
  gap: 10px;
}

.is-vertical .dock-bg {
  top: 0;
  bottom: 0;
  left: 0;
}
</style>

<script setup lang="ts">
defineProps<{
  label: string
  icon?: string
  /** optional label color */
  color?: string
}>()
</script>

<template>
  <div class="pill">
    <img v-if="icon" :src="icon" class="pill-icon" :alt="label" draggable="false" />
    <span class="pill-label" :style="color ? { color } : undefined">{{ label }}</span>
  </div>
</template>

<style scoped>
.pill {
  /* PhysicsField positions this via transform; absolute keeps it out of flow */
  position: absolute;
  top: 0;
  left: 0;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 16px;
  background: #fff;
  border-radius: 999px;
  box-shadow:
    0 6px 18px rgba(0, 0, 0, 0.14),
    inset 0 0 0 1px rgba(0, 0, 0, 0.04);
  font: 600 15px/1 'Inter', system-ui, -apple-system, sans-serif;
  color: #1a1a1a;
  white-space: nowrap;
  user-select: none;
  cursor: grab;
  will-change: transform;
}
.pill:active {
  cursor: grabbing;
}
.pill-icon {
  /* fixed size so the pill never reflows when the logo loads */
  width: 20px;
  height: 20px;
  object-fit: contain;
  pointer-events: none;
}
.pill-label {
  pointer-events: none;
}
</style>

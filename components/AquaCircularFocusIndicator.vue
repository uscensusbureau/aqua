<template>
  <div class="aqua-circular-focus-indicator">
    <div class="offset" :style="`left: ${offsetX}; top: ${offsetY}`">
      <div class="dot" :class="{ active }" :style="`width: ${size}; height: ${size};`"></div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AquaCircularFocusIndicator',
  props: {
    active: Boolean,
    offsetX: String,
    offsetY: String,
    size: String
  }
}
</script>

<style lang="scss">
@use '../aqua-vars.module.scss' as *;

.aqua-circular-focus-indicator {
  position: absolute;
  top: 0;
  left: 0;
  transition: all 150ms ease-in-out;
  .offset {
    position: absolute;
    transform: translate(-50%, -50%);
    .dot {
      background-color: $aqua-color-gray-300;
      border-radius: 50%;
      transition: all 250ms ease-in-out;
      &.active {
        background-color: $aqua-color-azul-500;
      }
    }
  }
}
</style>

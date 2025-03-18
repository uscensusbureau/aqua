<template>
  <AquaLayout
    vertical
    align="center"
    justify="start"
    class="aqua-navbar"
    :class="[{ light }, spacingClasses]"
    :style="{ 'background-color': color }"
  >
    <AquaLayout class="hLayout" horizontal align="center" justify="center">
      <slot></slot>
    </AquaLayout>
    <AquaLayout class="hLayout" horizontal align="stretch" justify="start">
      <!-- NOTE: THIS IS USING THE DEPRECATED SYNTAX FOR NAMED SLOTS AS EDDE IS NOT YET ON VUE 3 -->
      <slot name="extended"></slot>
    </AquaLayout>
  </AquaLayout>
</template>

<script lang="ts">
import { Spacing } from '../mixins/Spacing.js'

interface AquaNavbarData {
  spacingClasses: Array<string>
}

export default {
  name: 'AquaNavbar',
  mixins: [Spacing],
  props: {
    color: {
      type: String,
      default: '#112e51'
    },
    light: Boolean
  },
  data() {
    return {
      spacingClasses: []
    } as AquaNavbarData
  },
  mounted() {
    this.SetSpacingClasses()
  }
}
</script>

<style lang="scss">
.aqua-navbar {
  .hLayout {
    width: 100%;
    margin-top: $aqua-spacing2;
  }
  &.light {
    background-color: transparent;
    border-top: toRem(1) solid $aqua-color-white;
    border-bottom: toRem(1) solid $aqua-color-white;
  }
}
</style>

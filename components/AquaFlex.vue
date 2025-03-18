<template>
  <div class="aqua-flex" :class="[spacingClasses]" :style="{ flex: flexValue }">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Spacing } from '../mixins/Spacing.js'

interface AquaFlexData {
  spacingClasses: Array<string>
  breakpointClasses: Array<string>
}

export default {
  name: 'AquaFlex',
  mixins: [Spacing],
  props: {
    flex: String
  },
  data() {
    return {
      spacingClasses: [],
      breakpointClasses: []
    } as AquaFlexData
  },
  computed: {
    flexValue() {
      return `${this.flex} ${this.flex} auto`
    }
  },
  mounted() {
    this.SetSpacingClasses()

    // Convert any breakpoint attributes to classes
    const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl']
    const attrs = Object.keys(this.$attrs)
    attrs.forEach((attr) => {
      if (breakpoints.includes(attr.slice(0, 2))) {
        this.$el.classList.add(attr)
      }
    })
  }
}
</script>

<style lang="scss">
.aqua-flex {
  flex: 1 1 auto;
  min-height: 0;
  min-width: 0;
  position: relative;
  &[center-content] {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

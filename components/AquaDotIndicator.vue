<template>
  <AquaLayout
    justify="center"
    align="center"
    class="aqua-dot-indicator"
    :style="`
    background-color: ${backgroundColor};
    color: ${textColor};
    min-height: ${sizeAsNumber / 16}rem;
    `"
  >
    {{ text }}
  </AquaLayout>
</template>

<script lang="ts">
import colors from '@aqua/styles/design-system/colors.module.scss'

export default {
  name: 'AquaDotIndicator',
  props: {
    text: {
      type: [String, Number],
      default: '0'
    },
    size: {
      type: [String, Number],
      default: '14'
    },
    backgroundColor: {
      type: String,
      default: colors.aquaColorGray800
    },
    textColor: {
      type: String,
      default: colors.aquaColorWhite
    }
  },
  computed: {
    sizeAsNumber(): number {
      return parseInt(this.size as string) as number
    }
  }
}
</script>

<style lang="scss">
.aqua-dot-indicator {
  text-align: center;
  min-height: toRem(15);
  min-width: toRem(15);
  padding: 0 $aqua-spacing1;
  border-radius: toRem(9);
  z-index: 1;
}
</style>

<template>
  <div
    class="aqua-icon"
    :style="`
    -webkit-mask-image: url(${iconPath});
    mask-image: url(${iconPath});
    background-color: ${computedTint};
    width: ${sizeAsNumber / 16}rem;
    height: ${sizeAsNumber / 16}rem;
    min-width: ${sizeAsNumber / 16}rem;
    min-height: ${sizeAsNumber / 16}rem;
    max-height: ${sizeAsNumber / 16}rem;
    transition: all ${tintTransitionTime}ms ease;
    `"
    :class="[spacingClasses]"
  ></div>
</template>

<script lang="ts">
import { Spacing } from '../mixins/Spacing.js'

interface AquaIconData {
  spacingClasses: Array<string>
}

export default {
  name: 'AquaIcon',
  mixins: [Spacing],
  props: {
    icon: {
      type: String,
      default: 'fallback'
    },
    externalIcon: [String, Object],
    size: {
      type: [String, Number],
      default: '32'
    },
    tint: {
      type: String,
      default: 'black'
    },
    tintMap: Object,
    state: String,
    tintTransitionTime: {
      type: String,
      default: '500'
    }
  },
  data() {
    return {
      spacingClasses: []
    } as AquaIconData
  },
  computed: {
    iconPath(): string | Record<string, any> {
      if (this.externalIcon) {
        return this.externalIcon
      }
      return new URL(`/aqua/images/icons/${this.icon.toLowerCase()}.svg`, import.meta.url).href
    },
    computedTint(): string {
      if (!!this.state && !!this.tintMap) {
        return this.tintMap[this.state]
      } else {
        return this.tint
      }
    },
    sizeAsNumber() {
      return parseInt(this.size as string) as number
    }
  },
  mounted() {
    this.SetSpacingClasses()
  }
}
</script>

<style lang="scss">
@use '../aqua-vars.module.scss' as *;

.aqua-icon {
  display: inline-block;
  height: toRem(50);
  width: toRem(50);
  max-height: toRem(50);
  -webkit-mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  mask-size: contain;
  mask-repeat: no-repeat;
}
</style>

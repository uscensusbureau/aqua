<template>
  <div
    v-if="size"
    role="progressbar"
    class="aqua-progress-circular"
    :class="[spacingClasses]"
    :style="{ height: size / 16 + 'rem', width: size / 16 + 'rem', color }"
  >
    <svg ref="svg" xmlns="http://www.w3.org/2000/svg">
      <circle ref="circle" class="aqua-progress-circular_overlay" />
    </svg>
  </div>
</template>

<script lang="ts">
import { Spacing } from '../mixins/Spacing.js'

interface AquaProgressCircularData {
  spacingClasses: Array<string>
  radius: number
}

export default {
  name: 'AquaProgressCircular',
  mixins: [Spacing],
  props: {
    size: Number,
    width: Number,
    indeterminate: Boolean,
    value: {
      type: [Number, String],
      default: 0
    },
    color: {
      type: String,
      default: '#e7eaed'
    }
  },
  data: () =>
    ({
      radius: 20,
      spacingClasses: []
    } as AquaProgressCircularData),
  computed: {
    calculatedSize() {
      return Number(this.size)
    },
    circumference() {
      return 2 * Math.PI * this.radius
    },
    normalizedValue() {
      if (this.valueAsNumber < 0) {
        return 0
      }
      if (this.valueAsNumber > 100) {
        return 100
      }
      return parseFloat(this.value as string)
    },
    strokeDashArray() {
      return Math.round(this.circumference * 1000) / 1000
    },
    strokeDashOffset() {
      return ((100 - this.normalizedValue) / 100) * this.circumference + 'px'
    },
    strokeWidth() {
      if (this.size && this.viewBoxSize)
        return (Number(this.width) / +this.size) * this.viewBoxSize * 2
      return 0
    },
    viewBoxSize() {
      if (this.size) return this.radius / (1 - Number(this.width) / +this.size)
      return 0
    },
    valueAsNumber() {
      return parseInt(this.value as string) as number
    }
  },
  mounted() {
    this.SetSpacingClasses()
    if (this.viewBoxSize && this.radius) {
      const circle = this.$refs.circle as SVGCircleElement
      const svg = this.$refs.svg as SVGElement

      circle.setAttribute('fill', 'transparent')
      circle.setAttribute('cx', (2 * this.viewBoxSize).toString())
      circle.setAttribute('cy', (2 * this.viewBoxSize).toString())
      circle.setAttribute('r', this.radius.toString())
      circle.setAttribute('stroke-width', this.strokeWidth.toString())
      circle.setAttribute('stroke-dasharray', this.strokeDashArray.toString())
      circle.setAttribute('stroke-dashoffset', this.strokeDashOffset.toString())

      svg.setAttribute(
        'viewBox',
        `${this.viewBoxSize} ${this.viewBoxSize} ${2 * this.viewBoxSize} ${2 * this.viewBoxSize}`
      )
    }
  }
}
</script>

<style lang="scss">
@use '../aqua-vars.module.scss' as *;

@keyframes progress-circular-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0px;
  }
  50% {
    stroke-dasharray: 100, 200;
    stroke-dashoffset: toRem(-15);
  }
  100% {
    stroke-dasharray: 100, 200;
    stroke-dashoffset: toRem(-125);
  }
}

@keyframes progress-circular-rotate {
  100% {
    transform: rotate(360deg);
  }
}

.aqua-progress-circular {
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  svg {
    width: 100%;
    height: 100%;
    margin: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 0;
    animation: progress-circular-rotate 1.4s linear infinite;
    transform-origin: center center;
    border: toRem(1) solid transparent;
  }
  .aqua-progress-circular_overlay {
    stroke: currentColor;
    z-index: 2;
    transition: all 0.6s ease-in-out;
    stroke-linecap: round;
    stroke-dasharray: 80, 200;
    stroke-dashoffset: 0px;
    animation: progress-circular-dash 1.4s ease-in-out infinite;
  }
}
</style>

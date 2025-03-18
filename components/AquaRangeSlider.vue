<template>
  <AquaLayout
    horizontal
    justify="center"
    align="center"
    class="AquaRangeSlider"
    :class="spacingClasses"
  >
    <slot name="prepend"></slot>
    <div ref="track" class="slider-track">
      <div class="fill" :style="{ left: thumbPositionStyleLower, width: fillWidth }"></div>
      <AquaLayout
        vertical
        align="center"
        justify="center"
        class="slider-thumb-wrapper"
        :style="{ left: thumbPositionStyleLower }"
        tabindex="-1"
      >
        <div
          ref="thumbLower"
          class="slider-thumb lower"
          tabindex="0"
          role="slider"
          aria-valuemin="0"
          aria-valuemax="100"
          :aria-valuenow="valueInternalLower"
          aria-readonly="false"
          aria-orientation="horizontal"
          aria-label="Lower range slider. Drag to the right to change the value."
        >
          <AquaCircularFocusIndicator
            class="focus-indicator"
            tabindex="-1"
            :active="true"
            :offset-x="`${7 / 16}rem`"
            :offset-y="`${7 / 16}rem`"
            :size="draggingLower ? `${40 / 16}rem` : `${30 / 16}rem`"
          ></AquaCircularFocusIndicator>
        </div>
        <div class="label lower">
          <slot name="lowerLabel" :lowerLabel="valueInternalLower">X</slot>
        </div>
      </AquaLayout>
      <AquaLayout
        vertical
        align="center"
        justify="center"
        class="slider-thumb-wrapper"
        :style="{ left: thumbPositionStyleUpper }"
        tabindex="-1"
      >
        <div
          ref="thumbUpper"
          class="slider-thumb upper"
          tabindex="0"
          role="slider"
          aria-valuemin="0"
          aria-valuemax="100"
          :aria-valuenow="valueInternalUpper"
          aria-readonly="false"
          aria-orientation="horizontal"
          aria-label="Upper range slider. Drag to the left to change the value."
        >
          <AquaCircularFocusIndicator
            class="focus-indicator"
            tabindex="-1"
            :active="true"
            :offset-x="`${7 / 16}rem`"
            :offset-y="`${7 / 16}rem`"
            :size="draggingUpper ? `${40 / 16}rem` : `${30 / 16}rem`"
          ></AquaCircularFocusIndicator>
        </div>
        <div class="label upper">
          <slot name="upperLabel" :upperLabel="valueInternalUpper">X</slot>
        </div>
      </AquaLayout>
    </div>
    <slot name="append"></slot>
  </AquaLayout>
</template>

<script lang="ts">
import { Spacing } from '../mixins/Spacing.js'

interface AquaRangeSliderData {
  valueInternalLower: number
  valueInternalUpper: number
  draggingLower: boolean
  draggingUpper: boolean
  spacingClasses: Array<string>
}

export default {
  name: 'AquaRangeSlider',
  mixins: [Spacing],
  props: {
    lower: Number,
    upper: Number
  },
  emits: ['update:lower', 'update:upper', 'dragDone'],
  data: function () {
    return {
      valueInternalLower: 0,
      valueInternalUpper: 100,
      draggingLower: false,
      draggingUpper: false,
      spacingClasses: []
    } as AquaRangeSliderData
  },
  computed: {
    thumbPositionStyleLower() {
      return `${this.valueInternalLower}%`
    },
    thumbPositionStyleUpper() {
      return `${this.valueInternalUpper}%`
    },
    fillWidth() {
      return `${this.valueInternalUpper - this.valueInternalLower}%`
    }
  },
  watch: {
    lower: {
      handler(newValue) {
        if (newValue !== undefined && this.valueInternalLower !== newValue) {
          this.valueInternalLower = newValue
        }
      },
      immediate: true
    },
    upper: {
      handler(newValue) {
        if (newValue !== undefined && this.valueInternalUpper !== newValue) {
          this.valueInternalUpper = newValue
        }
      },
      immediate: true
    },
    valueInternalLower(newValue) {
      if (this.lower !== newValue) {
        this.$emit('update:lower', this.valueInternalLower) // for v-model support
      }
    },
    valueInternalUpper(newValue) {
      if (this.upper !== newValue) {
        this.$emit('update:upper', this.valueInternalUpper) // for v-model support
      }
    }
  },
  mounted() {
    this.SetSpacingClasses()
    ;(this.$refs.thumbLower as HTMLElement).addEventListener('mousedown', this.onMouseDownLower)
    ;(this.$refs.thumbUpper as HTMLElement).addEventListener('mousedown', this.onMouseDownUpper)
    ;(this.$refs.thumbLower as HTMLElement).addEventListener('touchstart', this.onTouchStartLower)
    ;(this.$refs.thumbUpper as HTMLElement).addEventListener('touchstart', this.onTouchStartUpper)
  },
  beforeUnmount() {
    ;(this.$refs.thumbLower as HTMLElement).removeEventListener('mousedown', this.onMouseDownLower)
    ;(this.$refs.thumbUpper as HTMLElement).removeEventListener('mousedown', this.onMouseDownUpper)
    ;(this.$refs.thumbLower as HTMLElement).removeEventListener(
      'touchstart',
      this.onTouchStartLower
    )
    ;(this.$refs.thumbUpper as HTMLElement).removeEventListener(
      'touchstart',
      this.onTouchStartUpper
    )
  },
  methods: {
    getElementOffset(el: HTMLElement) {
      const rect = el.getBoundingClientRect()
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    },
    onMouseDownLower(event: MouseEvent) {
      this.draggingLower = true
      document.addEventListener('mousemove', this.onMouseMove)
      document.addEventListener('mouseup', this.onMouseUp)
    },
    onMouseDownUpper(event: MouseEvent) {
      this.draggingUpper = true
      document.addEventListener('mousemove', this.onMouseMove)
      document.addEventListener('mouseup', this.onMouseUp)
    },
    onMouseUp() {
      document.removeEventListener('mousemove', this.onMouseMove)
      document.removeEventListener('mouseup', this.onMouseUp)
      if (!this.draggingLower && !this.draggingUpper) return
      this.draggingLower = false
      this.draggingUpper = false
      this.$emit('dragDone')
    },
    onMouseMove(event: MouseEvent) {
      const GAP = 2

      const componentLeft = this.getElementOffset(this.$refs.track as HTMLElement).left
      const componentWidth = (this.$refs.track as HTMLElement).getBoundingClientRect().width
      const x = event.clientX - componentLeft
      if (this.draggingLower) {
        this.valueInternalLower = Math.max(Math.min((x / componentWidth) * 100, 100), 0)
        if (this.valueInternalLower >= this.valueInternalUpper - GAP) {
          this.valueInternalLower = this.valueInternalUpper - GAP
        }
      } else if (this.draggingUpper) {
        this.valueInternalUpper = Math.max(Math.min((x / componentWidth) * 100, 100), 0)
        if (this.valueInternalUpper <= this.valueInternalLower + GAP) {
          this.valueInternalUpper = this.valueInternalLower + GAP
        }
      }
    },
    onTouchStartLower(event: TouchEvent) {
      this.draggingLower = true
      document.addEventListener('touchmove', this.onTouchMove)
      document.addEventListener('touchend', this.onTouchEnd)
    },
    onTouchStartUpper(event: TouchEvent) {
      this.draggingUpper = true
      document.addEventListener('touchmove', this.onTouchMove)
      document.addEventListener('touchend', this.onTouchEnd)
    },
    onTouchEnd() {
      document.removeEventListener('touchmove', this.onTouchMove)
      document.removeEventListener('touchend', this.onTouchEnd)
      if (!this.draggingLower && !this.draggingUpper) return
      this.draggingLower = false
      this.draggingUpper = false
      this.$emit('dragDone')
    },
    onTouchMove(event: TouchEvent) {
      const GAP = 2

      const componentLeft = this.getElementOffset(this.$refs.track as HTMLElement).left
      const componentWidth = (this.$refs.track as HTMLElement).getBoundingClientRect().width
      const x = event.touches[0].clientX - componentLeft
      if (this.draggingLower) {
        this.valueInternalLower = Math.max(Math.min((x / componentWidth) * 100, 100), 0)
        if (this.valueInternalLower >= this.valueInternalUpper - GAP) {
          this.valueInternalLower = this.valueInternalUpper - GAP
        }
      } else if (this.draggingUpper) {
        this.valueInternalUpper = Math.max(Math.min((x / componentWidth) * 100, 100), 0)
        if (this.valueInternalUpper <= this.valueInternalLower + GAP) {
          this.valueInternalUpper = this.valueInternalLower + GAP
        }
      }
    }
  }
}
</script>

<style lang="scss">
.AquaRangeSlider {
  padding-top: $aqua-spacing4;
  cursor: pointer;
  position: relative;
  user-select: none;
  .slider-track {
    position: relative;
    height: toRem(2);
    width: 100%;
    background-color: $aqua-color-steel-400;
    border-radius: toRem(2);
    .fill {
      background-color: $aqua-color-vivid-blue;
      position: absolute;
      top: toRem(-1);
      height: toRem(4);
    }
    .slider-thumb-wrapper {
      position: absolute;
      top: toRem(-6);
      left: 0;
      .slider-thumb {
        position: absolute;
        outline: none;
        top: 0;
        left: toRem(-6);
        width: toRem(14);
        height: toRem(14);
        border-radius: 50%;
        background-color: $aqua-color-primary-900;
        transition: background-color 250ms;
        &:hover {
          background-color: $aqua-color-black;
        }
        &:focus {
          outline: none;
        }
        .focus-indicator {
          opacity: 0;
          transform: scale(0);
          user-select: none;
          -webkit-user-drag: none;
        }
        &:hover .focus-indicator,
        &:focus .focus-indicator {
          opacity: 0.5;
          transform: scale(1);
        }
        &:focus:not(:focus-visible) .focus-indicator {
          // Browsers missing support for focus-visible will ignore this block
          opacity: 0;
          transform: scale(0);
        }
      }
      .label {
        position: absolute;
        white-space: nowrap;
        bottom: toRem(0);

        &.lower {
          right: toRem(-4);
        }

        &.upper {
          left: toRem(-4);
        }
      }
    }
  }
}
</style>

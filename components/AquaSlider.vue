<template>
  <AquaLayout
    horizontal
    justify="center"
    align="center"
    class="AquaSlider"
    :class="spacingClasses"
    @keydown.left="onKeyDecrease"
    @keydown.down="onKeyDecrease"
    @keydown.right="onKeyIncrease"
    @keydown.up="onKeyIncrease"
  >
    <slot name="prepend"></slot>
    <div ref="track" class="slider-track">
      <div class="slider-thumb-wrapper" :style="{ left: thumbPositionStyle }" tabindex="-1">
        <div
          ref="thumb"
          class="slider-thumb"
          tabindex="0"
          role="slider"
          aria-valuemin="0"
          aria-valuemax="100"
          :aria-valuenow="valueInternal"
          aria-readonly="false"
          aria-orientation="horizontal"
        >
          <AquaCircularFocusIndicator
            class="focus-indicator"
            tabindex="-1"
            :active="true"
            :offset-x="`${9 / 16}rem`"
            :offset-y="`${9 / 16}rem`"
            :size="dragging ? `${60 / 16}rem` : `${40 / 16}rem`"
          ></AquaCircularFocusIndicator>
        </div>
      </div>
    </div>
    <slot name="append"></slot>
  </AquaLayout>
</template>

<script lang="ts">
import { Spacing } from '../mixins/Spacing.js'

interface AquaSliderData {
  valueInternal: number
  dragging: boolean
  dragXPos: number
  spacingClasses: Array<string>
}

export default {
  name: 'AquaSlider',
  mixins: [Spacing],
  props: {
    modelValue: Number
  },
  emits: ['update:modelValue'],
  data: function () {
    return {
      valueInternal: 0,
      dragging: false,
      dragXPos: 0,
      spacingClasses: []
    } as AquaSliderData
  },
  computed: {
    thumbPositionStyle() {
      return `${this.valueInternal}%`
    }
  },
  watch: {
    modelValue(newValue) {
      this.valueInternal = newValue
    },
    valueInternal() {
      this.$emit('update:modelValue', this.valueInternal) // for v-model support
    }
  },
  mounted() {
    this.SetSpacingClasses()

    if (this.modelValue) this.valueInternal = this.modelValue
    ;(this.$refs.thumb as HTMLElement).addEventListener('mousedown', (event: MouseEvent) =>
      this.onMouseDown(event)
    )
    this.$el.addEventListener('mouseup', (event: MouseEvent) => this.onMouseUp())
    document.addEventListener('mouseup', (event: MouseEvent) => this.onDocumentMouseUp())
    document.addEventListener('mousemove', (event: MouseEvent) => this.onMouseMove(event))
  },
  beforeUnmount() {
    ;(this.$refs.thumb as HTMLElement).removeEventListener('mousedown', (event: MouseEvent) =>
      this.onMouseDown(event)
    )
    this.$el.removeEventListener('mouseup', (event: MouseEvent) => this.onMouseUp())
    document.removeEventListener('mouseup', (event: MouseEvent) => this.onDocumentMouseUp())
    document.removeEventListener('mousemove', (event: MouseEvent) => this.onMouseMove(event))
  },
  methods: {
    getElementOffset(el: HTMLElement) {
      const rect = el.getBoundingClientRect()
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    },
    onMouseDown(event: MouseEvent) {
      this.dragXPos = event.clientX
      this.dragging = true
    },
    onMouseUp() {
      this.dragging = false
    },
    onDocumentMouseUp() {
      if (this.dragging) {
        this.onMouseUp()
      }
    },
    onMouseMove(event: MouseEvent) {
      if (this.dragging) {
        const componentLeft = this.getElementOffset(this.$refs.track as HTMLElement).left
        const componentWidth = (this.$refs.track as HTMLElement).getBoundingClientRect().width

        const x = event.clientX - componentLeft
        this.valueInternal = Math.max(Math.min((x / componentWidth) * 100, 100), 0)
      }
    },
    onKeyDecrease() {
      --this.valueInternal
      this.valueInternal = Math.max(Math.min(this.valueInternal, 100), 0)
    },
    onKeyIncrease() {
      ++this.valueInternal
      this.valueInternal = Math.max(Math.min(this.valueInternal, 100), 0)
    }
  }
}
</script>

<style lang="scss">
.AquaSlider {
  cursor: pointer;
  position: relative;
  .slider-track {
    position: relative;
    height: toRem(3);
    width: 100%;
    background-color: $aqua-color-steel-400;
    border-radius: toRem(2);
    .slider-thumb-wrapper {
      position: absolute;
      top: toRem(-8);
      left: 0;
      .slider-thumb {
        position: absolute;
        outline: none;
        top: 0;
        left: toRem(-8);
        width: toRem(18);
        height: toRem(18);
        border-radius: 50%;
        background-color: $aqua-color-vivid-blue;
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
    }
  }
}
</style>

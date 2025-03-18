<template>
  <div
    class="AquaToggle"
    :class="[{ disabled }, spacingClasses]"
    :tabindex="disabled ? -1 : 0"
    role="switch"
    :aria-checked="valueInternal ? 'true' : 'false'"
    @keydown.space.enter.prevent="onEnter"
  >
    <div
      ref="liveregion"
      class="liveregion"
      role="status"
      aria-live="assertive"
      aria-atomic="true"
      aria-relevant="text"
    ></div>
    <div class="wrapper">
      <div v-if="labelPosition === 'left'" class="toggle-label">
        {{ label }}
      </div>
      <div class="switch" :class="{ on: valueInternal }">
        <AquaCircularFocusIndicator
          class="focus-indicator"
          :style="{ left: sliderXPos }"
          :active="valueInternal"
          :offset-x="`${7 / 16}rem`"
          :offset-y="`${7 / 16}rem`"
          :size="`${30 / 16}rem`"
        ></AquaCircularFocusIndicator>
        <div ref="slider" class="slider" :style="{ left: sliderXPos }"></div>
      </div>
      <div v-if="labelPosition !== 'left'" class="toggle-label">
        {{ label }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Spacing } from '../mixins/Spacing.js'

export default {
  name: 'AquaToggle',
  mixins: [Spacing],
  props: {
    modelValue: Boolean,
    label: String,
    labelPosition: String,
    disabled: Boolean
  },
  emits: ['update:modelValue', 'change'],
  data() {
    return {
      valueInternal: false,
      sliderXPos: '0',
      dragging: false,
      wasDragged: false,
      dragXPos: 0,
      ON_X_POS: 10,
      spacingClasses: []
    }
  },
  watch: {
    modelValue(newValue) {
      this.valueInternal = newValue
    },
    valueInternal() {
      this.sliderXPos = this.valueInternal ? this.ON_X_POS / 16 + 'rem' : '0'
      ;(this.$refs.liveregion as HTMLDivElement).innerText = `${this.label}. toggle switch. ${
        this.valueInternal ? 'on' : 'off'
      }`
      this.$emit('update:modelValue', this.valueInternal) // for v-model support
      this.$nextTick(() => {
        this.$emit('change')
      })
    }
  },
  mounted() {
    this.SetSpacingClasses()

    this.valueInternal = this.modelValue
    ;(this.$refs.slider as HTMLDivElement).addEventListener('mousedown', (event) =>
      this.onMouseDown(event)
    )
    this.$el.addEventListener('mouseup', (event: MouseEvent) => this.onMouseUp())
    document.addEventListener('mouseup', (event: MouseEvent) => this.onDocumentMouseUp(event))
    document.addEventListener('mousemove', (event: MouseEvent) => this.onMouseMove(event))
  },
  beforeUnmount() {
    ;(this.$refs.slider as HTMLDivElement).removeEventListener('mousedown', (event) =>
      this.onMouseDown(event)
    )
    this.$el.removeEventListener('mouseup', (event: MouseEvent) => this.onMouseUp())
    document.removeEventListener('mouseup', (event: MouseEvent) => this.onDocumentMouseUp(event))
    document.removeEventListener('mousemove', (event: MouseEvent) => this.onMouseMove(event))
  },
  methods: {
    getElementOffset(el: HTMLElement) {
      const rect = el.getBoundingClientRect()
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    },
    onEnter() {
      if (this.disabled) {
        return
      }
      this.valueInternal = !this.valueInternal
    },
    onMouseDown(event: MouseEvent) {
      if (this.disabled) {
        return
      }
      const x = parseInt(this.sliderXPos)
      this.dragXPos = event.clientX + x
      this.wasDragged = false
      this.dragging = true
    },
    onMouseUp() {
      if (this.disabled) {
        return
      }
      if (this.wasDragged) {
        // was dragged - decide if it's on or off
        let x = parseInt(this.sliderXPos)
        if (x < this.ON_X_POS / 2) {
          x = 0
          this.valueInternal = false
        } else {
          x = this.ON_X_POS
          this.valueInternal = true
        }
        this.sliderXPos = x / 16 + 'rem'
      } else {
        // wasn't dragged - treat it as a click event
        this.valueInternal = !this.valueInternal
      }
      this.dragging = false
      this.wasDragged = false
    },
    onDocumentMouseUp(event: MouseEvent) {
      if (this.disabled) {
        return
      }
      if (this.dragging) {
        this.onMouseUp()
      }
    },
    onMouseMove(event: MouseEvent) {
      if (this.disabled) {
        return
      }
      if (this.dragging) {
        this.wasDragged = true

        const componentLeft = this.getElementOffset(this.$el).left

        // compute x pos - 7 to offset to middle of slider
        let x = event.clientX - componentLeft - 7

        // keep in-bounds
        if (x < 0) {
          x = 0
        } else if (x > this.ON_X_POS) {
          x = this.ON_X_POS
        }

        this.sliderXPos = x / 16 + 'rem'
      }
    }
  }
}
</script>

<style scoped lang="scss">
@use '../aqua-vars.module.scss' as *;

$switch-width: toRem(24);
$switch-height: toRem(14);
$border-radius: toRem(7); // $switch-height/2

.AquaToggle {
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  cursor: pointer;
  &:focus {
    outline: none !important;
  }
  &.disabled {
    cursor: inherit;
    pointer-events: none;
    .wrapper {
      .switch {
        background-color: $aqua-color-gray-500;
        &.on {
          background-color: $aqua-color-gray-500;
          .slider {
            border: toRem(1) solid $aqua-color-gray-500;
          }
        }
      }
      .toggle-label {
        color: $aqua-color-gray-600;
      }
    }
  }
  .liveregion {
    opacity: 0;
    position: absolute;
    pointer-events: none;
  }
  .focus-indicator {
    opacity: 0;
    transform: scale(0);
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
  .wrapper {
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    .switch {
      position: relative;
      display: inline-block;
      width: $switch-width;
      min-width: $switch-width;
      height: $switch-height;
      border-radius: $border-radius;
      background-color: $aqua-color-steel-300;
      transition: all 500ms;
      &.on {
        background-color: $aqua-color-vivid-blue;
        .slider {
          border: toRem(1) solid $aqua-color-vivid-blue;
        }
      }
      .slider {
        position: absolute;
        top: 0;
        left: 0;
        width: $switch-height;
        height: $switch-height;
        border-radius: $border-radius;
        background-color: $aqua-color-white;
        border: toRem(1) solid $aqua-color-steel-300;
        transition: all 100ms;
      }
    }
    .toggle-label {
      display: inline-block;
      margin-left: $aqua-spacing2;
      margin-right: $aqua-spacing2;
      color: inherit;
      font-weight: bold;
    }
  }
}
</style>

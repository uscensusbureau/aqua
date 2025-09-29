<template>
  <AquaLayout
    class="aqua-text-input"
    :class="[
      spacingClasses,
      {
        inputFocused
      }
    ]"
    horizontal
    align="start"
    justify="end"
    @click="focusInput"
    @focus="focusInput"
  >
    <div v-if="label && label.trim().length" class="aqua-text-input_label">
      {{ label }}
    </div>
    <AquaFlex
      flex="1"
      tag="form"
      onsubmit="return false"
      class="aqua-text-input_content"
      ref="content"
      :class="{
        outlined,
        autoGrow,
        'input-focused': inputFocused
      }"
    >
      <textarea
        ref="input"
        class="textarea"
        :class="{ autoGrow }"
        :style="{ height: autoGrow || resizeable ? calculatedHeight + 'px' : 'auto' }"
        spellCheck="false"
        :rows="rowsToDisplay"
        :maxlength="maxlength"
        :placeholder="hasText ? '' : placeholder"
        :aria-label="ariaLabel"
        tabindex="0"
        @focus="inputFocusEvent"
        @blur="inputBlurEvent"
        @input="onChange($event)"
        @keydown.enter="onEnter($event)"
        @paste="onPaste($event)"
      ></textarea>
      <!-- hidden textarea used for measuring the height for autoGrow -->
      <textarea
        ref="measure"
        class="measure"
        :class="{ autoGrow }"
        spellCheck="false"
        :rows="rowsToDisplay"
        :maxlength="maxlength"
      ></textarea>
    </AquaFlex>

    <AquaFlex flex="0">
      <AquaLayout
        vertical
        justify="center"
        align="center"
        :style="{ opacity: hasText ? '1' : '0' }"
        class="icons"
      >
        <AquaFlex
          v-if="clearable"
          flex="0"
          class="icon-close"
          :tabindex="hasText ? '0' : '-1'"
          aria-label="Clear Text"
          @click="onClear"
          @keydown.enter="onClear"
        >
          <AquaIcon
            icon="close"
            :size="16"
            :tint="colors.aquaColorPrimary900"
            tint-transition-time="250"
          ></AquaIcon>
        </AquaFlex>
        <AquaFlex class="append-slot"><slot name="append"></slot></AquaFlex>
      </AquaLayout>
    </AquaFlex>
    <div
      v-if="resizeable && !autoGrow"
      class="resizer"
      ref="resizer"
      @mousedown="onResizeMouseDown"
      @touchstart="onResizeTouchStart"
    >
      <AquaIcon icon="resize" size="20" :tint="colors.aquaColorPrimary400"></AquaIcon>
    </div>
  </AquaLayout>
</template>

<script lang="ts">
import colors from '@aqua/styles/design-system/colors.module.scss'

import { Spacing } from '../mixins/Spacing.js'

interface AquaTextInputData {
  inputFocused: boolean
  calculatedHeight: number
  calculatedRows: number
  spacingClasses: Array<string>
  resizing: boolean
  resizeLastPosX: number
  resizeLastPosY: number
}

export default {
  name: 'AquaTextArea',
  mixins: [Spacing],
  props: {
    ariaLabel: String,
    modelValue: String,
    label: String,
    placeholder: String,
    maxlength: Number,
    outlined: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    rows: {
      type: Number,
      default: 4
    },
    preventNewlines: {
      type: Boolean,
      default: true
    },
    autoGrow: {
      type: Boolean,
      default: false
    },
    resizeable: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'enter', 'clear', 'focus', 'blur'],
  data() {
    return {
      colors,
      inputFocused: false,
      calculatedHeight: 50,
      calculatedRows: this.rows,
      spacingClasses: [],
      resizing: false,
      resizeLastPosX: 0,
      resizeLastPosY: 0
    } as AquaTextInputData
  },
  computed: {
    hasText() {
      return this.modelValue?.trim().length
    },
    rowsToDisplay() {
      return Math.min(this.rows, this.calculatedRows)
    }
  },
  watch: {
    modelValue(newValue) {
      ;(this.$refs.input as HTMLTextAreaElement).value = newValue
      this.calculateHeight()
    }
  },
  mounted() {
    this.SetSpacingClasses()
    if (this.modelValue) (this.$refs.input as HTMLTextAreaElement).value = this.modelValue
    this.calculateHeight()
    // For resizer support
    document.addEventListener('mousemove', this.onResizeMouseMove)
    document.addEventListener('mouseup', this.onResizeMouseUp)
    document.addEventListener('touchmove', this.onResizeTouchMove)
    document.addEventListener('touchend', this.onResizeTouchEnd)
  },
  beforeUnmount() {
    document.removeEventListener('mousemove', this.onResizeMouseMove)
    document.removeEventListener('mouseup', this.onResizeMouseUp)
    document.removeEventListener('touchmove', this.onResizeTouchMove)
    document.removeEventListener('touchend', this.onResizeTouchEnd)
  },
  methods: {
    calculateHeight() {
      if (!this.autoGrow) return

      this.$nextTick(() => {
        const style = getComputedStyle(this.$refs.input as HTMLTextAreaElement)
        const padding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom)
        const height = (this.$refs.measure as HTMLTextAreaElement).scrollHeight
        const lineHeight = parseFloat(style.lineHeight)
        const minHeight = Math.min(this.rows * lineHeight + padding, parseFloat(style.height))
        const newHeight = Math.max(height ?? 0, minHeight)

        this.calculatedRows = Math.floor((newHeight - padding) / lineHeight)

        this.calculatedHeight = newHeight
      })
    },
    onChange(event: Event) {
      const target = event.target
      const targetValue = target ? (target as HTMLTextAreaElement).value : null
      this.onValueUpdated()
      this.calculateHeight()
      this.$emit('update:modelValue', targetValue)
    },
    onEnter(event: Event) {
      if (this.preventNewlines) {
        event.preventDefault()
      }
      const target = event.target
      const targetValue = target ? (target as HTMLTextAreaElement).value : null
      this.$emit('update:modelValue', targetValue)
      this.$emit('enter')
      this.onValueUpdated()
      this.calculateHeight()
    },
    onPaste(event: ClipboardEvent) {
      if (this.preventNewlines && event.clipboardData) {
        const text = event.clipboardData
          .getData('text')
          .trim()
          .replaceAll('\r', '')
          .replaceAll('\n', ' ')
        ;(this.$refs.input as HTMLTextAreaElement).value = text
        this.$emit('update:modelValue', text)
        this.onValueUpdated()
        this.calculateHeight()
        event.preventDefault()
      }
    },
    focusInput() {
      ;(this.$refs.input as HTMLTextAreaElement).focus()
    },
    onClear() {
      ;(this.$refs.input as HTMLTextAreaElement).value = ''
      ;(this.$refs.input as HTMLTextAreaElement).focus()
      this.onValueUpdated()
      this.calculateHeight()
      this.$emit('update:modelValue', '')
      this.$emit('clear')
    },
    inputFocusEvent() {
      this.inputFocused = true
      this.$emit('focus')
    },
    inputBlurEvent() {
      this.inputFocused = false
      this.$emit('blur')
    },
    onValueUpdated() {
      ;(this.$refs.measure as HTMLTextAreaElement).value = (
        this.$refs.input as HTMLTextAreaElement
      ).value
    },
    onResizeMouseDown() {
      if (!this.resizing) {
        this.resizing = true
      }
    },
    onResizeMouseMove(event: MouseEvent) {
      if (this.autoGrow) return
      if (this.resizing) {
        const offsetX = event.movementX
        const offsetY = event.movementY

        const elRect = this.$el.getBoundingClientRect()

        let newWidth = elRect.width + offsetX
        let newHeight = elRect.height + offsetY

        if (newWidth < 50) {
          newWidth = 50
        }
        if (newHeight < 50) {
          newHeight = 50
        }

        this.$el.style.width = newWidth + 'px'
        this.$el.style.height = newHeight + 'px'

        this.calculatedHeight = newHeight - 8
      }
    },
    onResizeMouseUp() {
      if (this.autoGrow) return
      if (this.resizing) {
        this.resizing = false
      }
    },
    onResizeTouchStart(event: TouchEvent) {
      if (this.autoGrow) return
      if (!this.resizing) {
        this.resizing = true
        this.resizeLastPosX = event.touches[0].screenX
        this.resizeLastPosY = event.touches[0].screenY
      }
    },
    onResizeTouchMove(event: TouchEvent) {
      if (this.autoGrow) return
      if (this.resizing) {
        const diffX = event.touches[0].screenX - this.resizeLastPosX
        const diffY = event.touches[0].screenY - this.resizeLastPosY

        const elRect = this.$el.getBoundingClientRect()

        let newWidth = elRect.width + diffX
        let newHeight = elRect.height + diffY

        if (newWidth < 50) {
          newWidth = 50
        }
        if (newHeight < 50) {
          newHeight = 50
        }

        this.$el.style.width = newWidth + 'px'
        this.$el.style.height = newHeight + 'px'

        this.resizeLastPosX = event.touches[0].screenX
        this.resizeLastPosY = event.touches[0].screenY

        this.calculatedHeight = newHeight - 8
      }
    },
    onResizeTouchEnd() {
      if (this.autoGrow) return
      if (this.resizing) {
        this.resizing = false
      }
    }
  }
}
</script>

<style lang="scss">
::placeholder,
::-webkit-input-placeholder,
::-moz-placeholder,
:-ms-input-placeholder,
:-moz-placeholder {
  color: $aqua-color-gray-600;
  opacity: 1;
}
</style>

<style scoped lang="scss">
.aqua-text-input {
  width: 100%;
  max-width: 100%;
  border-radius: toRem(4);
  border: toRem(1) solid $aqua-color-gray-700;
  &.inputFocused,
  &:active,
  &:hover,
  &:focus {
    border: toRem(1) solid $aqua-color-vivid-blue;
  }
  .aqua-text-input_content {
    width: 100%;
    max-width: 100%;
  }
  .textarea {
    position: relative;
  }
  .measure,
  .textarea {
    width: 100%;
    max-width: 100%;
    white-space: pre-wrap;
    padding-right: 0.6rem;
    margin: $aqua-spacing1;
    overflow-y: auto;
    border: none;
    outline: none;
    font: inherit;
    font-size: toRem(16);
    line-height: toRem(16);
    color: inherit;
    background-color: transparent;
    border: none;
    outline: none;
    resize: none;
    &.autoGrow {
      overflow: hidden;
    }
    &:active,
    &:focus {
      border: none;
      outline: none;
    }
  }
  .measure {
    visibility: hidden;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
  }
  .icons {
    transition: opacity 500ms;
    margin-left: toRem(4);
  }
  .append-slot,
  .icon-close {
    cursor: pointer;
    display: flex;
    position: relative;
    font-size: toRem(18);
    color: $aqua-color-primary-900;
    padding: toRem(4);
    margin-top: toRem(7);
    margin-bottom: toRem(2);
  }
  .append-slot {
    cursor: default;
  }
  .aqua-text-input_label {
    color: $aqua-color-gray-400;
    font-size: toRem(14);
    font-weight: 500;
    margin-bottom: toRem(8);
    &.outlined {
      margin-bottom: toRem(4);
    }
  }
  .resizer {
    position: absolute;
    right: toRem(-2);
    bottom: toRem(-4);
    cursor: nwse-resize;
  }
}
</style>

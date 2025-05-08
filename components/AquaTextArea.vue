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
        :style="{ height: autoGrow ? calculatedHeight + 'px' : 'auto' }"
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
    }
  },
  emits: ['update:modelValue', 'enter', 'clear', 'focus', 'blur'],
  data() {
    return {
      colors,
      inputFocused: false,
      calculatedHeight: 0,
      calculatedRows: this.rows,
      spacingClasses: []
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
    resize: none;
    white-space: pre-wrap;
    padding-right: 0.6rem;
    margin: 0.4rem;
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
}
</style>

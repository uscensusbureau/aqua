<template>
  <AquaLayout
    class="aqua-text-input"
    :class="[
      spacingClasses,
      {
        mobile,
        componentHovered: hovered,
        inputFocused,
        secondary
      }
    ]"
    vertical
    align="start"
    justify="end"
    @click="focusInput"
    @focus="focusInput"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div v-if="label && label.trim().length" class="aqua-text-input_label">
      {{ label }}
    </div>
    <AquaFlex
      flex="1"
      class="aqua-text-input_content"
      :class="{
        outlined,
        simple,
        mobile,
        numeric,
        'input-focused': inputFocused
      }"
      @click="focusInput"
      @focus="focusInput"
    >
      <AquaLayout tag="form" horizontal align="center" justify="center" onsubmit="return false">
        <AquaFlex flex="1">
          <input
            ref="input"
            :class="{ 'justify-right': justifyRight }"
            :type="numeric ? 'number' : 'text'"
            :min="min"
            :max="max"
            :maxlength="maxLength"
            :placeholder="hasText ? '' : placeholder"
            :aria-label="ariaLabel"
            tabindex="0"
            :readonly="readonly"
            @focus="inputFocusEvent"
            @blur="inputBlurEvent"
            @input="onChange($event)"
            @keydown.enter="onEnter"
          />
        </AquaFlex>

        <AquaFlex flex="0"><slot name="append"></slot></AquaFlex>

        <AquaFlex v-if="clearable" flex="0">
          <div
            :style="{ opacity: hasText ? '1' : '0' }"
            :tabindex="hasText ? '0' : '-1'"
            class="close"
            aria-label="Clear Text"
            @click="onClear"
            @keydown.enter="onClear"
          >
            <AquaIcon
              icon="close"
              :size="12"
              :tint="colors.aquaColorPrimary900"
              tint-transition-time="250"
            ></AquaIcon>
          </div>
        </AquaFlex>

        <AquaLayout
          v-if="searchingText && numberMatches !== undefined && currentSearchIndex !== undefined"
          class="searchMatches"
          horizontal
          align="center"
          justify="end"
        >
          {{ numberMatches > 0 ? currentSearchIndex + 1 : 0 }} / {{ numberMatches }}

          <AquaFlex class="divider" flex="0"> | </AquaFlex>

          <AquaFlex flex="0">
            <div
              class="chevron"
              :style="{ opacity: hasText ? '1' : '0' }"
              :tabindex="hasText ? '0' : '-1'"
              aria-label="Next search match"
              @click="onPreviousSearchMatch"
              @keydown.enter="onPreviousSearchMatch"
            >
              <AquaIcon
                icon="chevron-up"
                :size="14"
                :tint="colors.aquaColorPrimary900"
                tint-transition-time="250"
              ></AquaIcon>
            </div>
          </AquaFlex>

          <AquaFlex flex="0">
            <div
              class="chevron"
              :style="{ opacity: hasText ? '1' : '0' }"
              :tabindex="hasText ? '0' : '-1'"
              aria-label="Previous search match"
              @click="onNextSearchMatch"
              @keydown.enter="onNextSearchMatch"
            >
              <AquaIcon
                icon="chevron-down"
                :size="14"
                :tint="colors.aquaColorPrimary900"
                tint-transition-time="250"
              ></AquaIcon>
            </div>
          </AquaFlex>

          <AquaFlex v-if="clearable" class="aqua-activator" flex="0">
            <div
              :style="{ opacity: hasText ? '1' : '0' }"
              :tabindex="hasText ? '0' : '-1'"
              class="close aqua-activator"
              aria-label="Clear Text"
              @click="onClear"
              @keydown.enter="onClear"
            >
              <AquaIcon
                class="aqua-activator"
                icon="close"
                :size="12"
                :tint="colors.aquaColorPrimary900"
                tint-transition-time="250"
              ></AquaIcon>
            </div>
          </AquaFlex>
        </AquaLayout>

        <AquaFlex flex="0">
          <div v-if="search">
            <AquaIcon
              class="search"
              :class="[{ componentHovered: hovered, inputFocused }]"
              icon="search"
              :size="secondary ? '14' : '16'"
              :tint="colors.aquaColorGray800"
            ></AquaIcon>
          </div>
        </AquaFlex>
      </AquaLayout>
    </AquaFlex>
  </AquaLayout>
</template>

<script lang="ts">
import colors from '@aqua/styles/design-system/colors.module.scss'

import { Spacing } from '../mixins/Spacing.js'

interface AquaTextInputData {
  inputFocused: boolean
  spacingClasses: Array<string>
  hovered: boolean
}

export default {
  name: 'AquaTextInput',
  mixins: [Spacing],
  props: {
    ariaLabel: String,
    currentSearchIndex: Number,
    modelValue: String,
    numberMatches: Number,
    label: String,
    placeholder: String,
    outlined: Boolean,
    simple: Boolean,
    search: Boolean,
    readonly: Boolean,
    secondary: Boolean,
    searchingText: Boolean,
    clearable: {
      type: Boolean,
      default: true
    },
    navbar: {
      type: Boolean,
      default: false
    },
    mobile: {
      type: Boolean,
      default: false
    },
    justifyRight: {
      type: Boolean,
      default: false
    },
    numeric: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: 100
    },
    min: {
      type: Number,
      default: 0
    },
    maxLength: {
      type: Number,
      default: 524288 // the default value for the <input> HTML element
    }
  },
  emits: ['update:modelValue', 'enter', 'clear', 'focus', 'blur', 'previous', 'next'],
  data() {
    return {
      inputFocused: false,
      spacingClasses: [],
      hovered: false
    } as AquaTextInputData
  },
  computed: {
    hasText() {
      return this.modelValue?.trim().length
    },
    colors() {
      return colors
    }
  },
  watch: {
    modelValue(newValue) {
      ;(this.$refs.input as HTMLInputElement).value = newValue
    }
  },
  mounted() {
    this.SetSpacingClasses()
    if (this.modelValue) (this.$refs.input as HTMLInputElement).value = this.modelValue
  },
  methods: {
    onChange(event: Event) {
      const target = event.target
      const targetValue = target ? (target as HTMLInputElement).value : null
      this.$emit('update:modelValue', targetValue)
    },
    onEnter() {
      this.$emit('enter')
    },
    focusInput() {
      ;(this.$refs.input as HTMLInputElement).focus()
    },
    onClear() {
      ;(this.$refs.input as HTMLInputElement).value = ''
      ;(this.$refs.input as HTMLInputElement).focus()
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
    onMouseEnter() {
      this.hovered = true
    },
    onMouseLeave() {
      this.hovered = false
    },
    onPreviousSearchMatch() {
      this.$emit('previous')
    },
    onNextSearchMatch() {
      this.$emit('next')
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

<style lang="scss" scoped>
.aqua-text-input {
  &.secondary {
    border: toRem(1) solid $aqua-color-gray-400 !important;
    box-shadow: none;
    border-radius: toRem(15) !important;

    &:not(.inputFocused).componentHovered {
      border: toRem(1) solid rgba($aqua-color-vivid-blue, 0.5) !important;
    }
    &.inputFocused {
      border: toRem(1) solid rgba($aqua-color-gray-500, 0.5) !important;
    }
    &.componentHovered.inputFocused {
      border: toRem(1) solid $aqua-color-gray-400 !important;
      color: $aqua-color-gray-800;
    }
    .search {
      margin-right: toRem(10);
      &.inputFocused {
        background-color: $aqua-color-vivid-blue !important;
      }
    }
    .close {
      margin-left: toRem(4);
      margin-right: toRem(1);
    }
    .divider {
      margin-left: toRem(4);
      margin-right: toRem(4);
    }
    .searchMatches {
      font-size: toRem(12);
    }
    input {
      &:not(.simple) {
        font-size: toRem(12);
      }
    }
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
  .aqua-text-input_content {
    display: inline-flex;
    position: relative;
    cursor: text;
    width: 100%;
    &:not(.outlined):not(.simple) {
      padding-bottom: toRem(8);
    }
    transition: border 500ms;
    &:not(.simple) {
      border-bottom: toRem(1) solid $aqua-color-gray-700;
    }
    &.outlined {
      padding: toRem(14);
      border-radius: toRem(4);
      border: toRem(1) solid $aqua-color-gray-700;
      &.input-focused,
      &:active,
      &:hover,
      &:focus {
        border: toRem(1) solid $aqua-color-vivid-blue;
      }
    }
    &.numeric {
      border: toRem(1) solid $aqua-color-gray-300;
      padding: $aqua-spacing2;
      border-radius: 0;
    }
    &:not(.outlined):not(.simple) {
      &.input-focused,
      &:active,
      &:hover,
      &:focus {
        border-bottom: toRem(1) solid $aqua-color-vivid-blue;
      }
    }
    input {
      flex: 1 1 auto;
      width: 100%;
      max-width: 100%;
      appearance: none;
      -webkit-appearance: none;
      border: none;
      outline: none;
      font: inherit;
      font-size: toRem(16);
      color: inherit;
      background-color: transparent;
      &.justify-right {
        text-align: right;
      }
    }
    .chevron,
    .search,
    .close {
      cursor: pointer;
      display: flex;
      transition: opacity 500ms;
    }
    .search {
      font-size: toRem(18);
      color: $aqua-color-steel-700;
      margin-left: toRem(8);
      margin-right: toRem(1);
      pointer-events: none;
      position: relative;
    }
    .close {
      position: relative;
      font-size: toRem(18);
      color: $aqua-color-primary-900;
      padding: toRem(4);
    }
    &.mobile {
      padding-bottom: $aqua-spacing1;
      border-bottom: toRem(1) solid rgba($aqua-color-black, 0.4);
      .close:before {
        content: '';
        position: absolute;
        width: toRem(20);
        height: toRem(20);
        left: 0;
        top: 0;
        background-color: rgba($aqua-color-white, 0.2);
        border-radius: 50%;
      }
    }
  }
}
</style>

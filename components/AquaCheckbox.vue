<template>
  <AquaLayout
    horizontal
    inline
    align="center"
    justify="start"
    class="aqua-checkbox"
    :class="[{ disabled }, spacingClasses]"
    :tabindex="disabled ? '-1' : '0'"
    :aria-label="label"
    role="checkbox"
    :aria-checked="valueInternal"
    :aria-disabled="disabled"
    @click="onClick"
    @keydown.space.enter.stop.prevent="onClick"
  >
    <AquaFlex flex="0" class="checkOuter">
      <AquaCircularFocusIndicator
        class="focus-indicator"
        :active="valueInternal"
        :offset-x="`${9 / 16}rem`"
        :offset-y="`${9 / 16}rem`"
        :size="`${31 / 16}rem`"
      ></AquaCircularFocusIndicator>
      <div class="check" :class="{ checked: valueInternal }">
        <input :aria-label="ariaLabel" ref="checkbox" type="checkbox" tabindex="-1" />
        <AquaIcon class="checkIcon" icon="check" :tint="colors.aquaColorWhite" size="22"></AquaIcon>
      </div>
    </AquaFlex>

    <AquaFlex flex="1">
      <div :aria-label="ariaLabel" class="checkbox-label">{{ label }}</div>
    </AquaFlex>
  </AquaLayout>
</template>

<script lang="ts">
import colors from '@aqua/styles/design-system/colors.module.scss'

import { Spacing } from '../mixins/Spacing.js'

interface AquaCheckboxData {
  valueInternal: boolean
  spacingClasses: Array<string>
}

export default {
  name: 'AquaCheckbox',
  mixins: [Spacing],
  props: {
    label: String,
    ariaLabel: String,
    modelValue: Boolean,
    checked: Boolean,
    disabled: Boolean
  },
  emits: ['update:modelValue'],
  data: () =>
    ({
      valueInternal: false,
      spacingClasses: []
    } as AquaCheckboxData),
  computed: {
    colors() {
      return colors
    }
  },
  watch: {
    modelValue(newValue) {
      this.valueInternal = newValue
    },
    valueInternal(newValue) {
      ;(this.$refs.checkbox as HTMLInputElement).checked = newValue
    },
    checked(newValue) {
      this.valueInternal = newValue
    }
  },
  mounted() {
    this.SetSpacingClasses()

    this.valueInternal = this.modelValue
    if (this.checked === true) {
      this.valueInternal = true
    }
    ;(this.$refs.checkbox as HTMLInputElement).checked = this.valueInternal
  },
  methods: {
    onClick() {
      if (!this.disabled) {
        this.valueInternal = !this.valueInternal
        this.$emit('update:modelValue', this.valueInternal)
      }
    },
    // This is for use by AquaCheckboxGroup only
    getChecked(): boolean {
      return this.valueInternal
    }
  }
}
</script>

<style lang="scss">
@use '../aqua-vars.module.scss' as *;

.aqua-checkbox {
  position: relative;
  cursor: pointer;
  &:focus {
    outline: none !important;
  }
  &.disabled {
    opacity: 0.5;
    pointer-events: none;

    .check {
      background-color: $aqua-color-gray-200;
      border: toRem(1) solid $aqua-color-gray-500;

      &.checked {
        background-color: $aqua-color-gray-500;
        border: toRem(1) solid $aqua-color-gray-500;
      }
    }
  }
  .checkOuter {
    position: relative;
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
  .check {
    width: toRem(17);
    height: toRem(17);
    border: toRem(1) solid $aqua-color-steel-400;
    background-color: $aqua-color-white;
    position: relative;
    border-radius: toRem(2);
    transition: all 250ms;
    .checkIcon {
      position: absolute;
      left: toRem(-3);
      top: toRem(-4);
      transform: scale(0);
    }
    &.checked {
      background-color: $aqua-color-vivid-blue;
      border: toRem(1) solid $aqua-color-vivid-blue;
      .checkIcon {
        transform: scale(1);
      }
    }
    input {
      position: absolute;
      pointer-events: none;
      width: 100%;
      height: 100%;
      opacity: 0;
      padding: 0;
      margin: 0;
      left: 0;
      top: 0;
    }
  }
  .checkbox-label {
    text-align: left;
    margin-left: $aqua-spacing2;
    user-select: none;
  }
}
</style>

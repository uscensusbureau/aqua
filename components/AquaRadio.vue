<template>
  <AquaLayout
    horizontal
    align="start"
    justify="start"
    class="aqua-radio pa-1"
    :class="[{ disabled, 'aqua-radio_checked': checkedInternal }, spacingClasses]"
    :tabindex="disabled ? '-1' : '0'"
    @click="onClick"
    @keydown.enter="onClick"
  >
    <AquaFlex flex="0" class="checkOuter aqua-fullheight">
      <AquaLayout justify="center" align="center" class="check-layout aqua-fullheight">
        <AquaCircularFocusIndicator
          class="focus-indicator"
          :active="checkedInternal"
          :offset-x="`${9 / 16}rem`"
          :offset-y="`${9 / 16}rem`"
          :size="`${31 / 16}rem`"
        ></AquaCircularFocusIndicator>
        <AquaLayout
          justify="center"
          align="center"
          class="check aqua-fullheight aqua-fullwidth"
          :class="{ checked: checkedInternal }"
        >
          <input ref="radio" type="radio" tabindex="-1" />
        </AquaLayout>
      </AquaLayout>
    </AquaFlex>
    <AquaFlex flex="1">
      <div class="radio-label">{{ label }}</div>
    </AquaFlex>
  </AquaLayout>
</template>

<script lang="ts">
import { Spacing } from '../mixins/Spacing.js'

interface AquaRadioData {
  spacingClasses: Array<string>
  checkedInternal: boolean
}

export default {
  name: 'AquaRadio',
  mixins: [Spacing],
  props: {
    label: String,
    value: [Number, String, Object],
    checked: Boolean,
    disabled: Boolean
  },
  data: () =>
    ({
      checkedInternal: false,
      spacingClasses: []
    } as AquaRadioData),
  watch: {
    checkedInternal(newValue) {
      ;(this.$refs.radio as HTMLInputElement).checked = newValue
    },
    checked(newValue) {
      this.checkedInternal = newValue
    }
  },
  mounted() {
    this.SetSpacingClasses()

    if (this.checked === true) {
      this.checkedInternal = true
    }
  },
  methods: {
    onClick() {
      this.checkedInternal = true
      const event = new Event('input')
      this.$el.dispatchEvent(event)
    },
    // PUBLIC (used by AquaRadioGroup)
    setChecked(value: boolean) {
      this.checkedInternal = value
    },
    getChecked() {
      return this.checkedInternal
    },
    getDisabled() {
      return this.disabled
    }
  }
}
</script>

<style lang="scss">
@use '../aqua-vars.module.scss' as *;

.aqua-radio {
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
    background-color: $aqua-color-white;
    border: toRem(1) solid $aqua-color-steel-400;
    position: relative;
    border-radius: 50%;
    transition: all 250ms;
    &:after {
      position: absolute;
      content: '';
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: $aqua-color-vivid-blue;
      border: toRem(3) solid $aqua-color-white;
      transform: scale(0);
      transition: all 250ms;
    }
    &.checked {
      border: toRem(1) solid $aqua-color-vivid-blue;
      &:after {
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
  .radio-label {
    text-align: left;
    margin-left: $aqua-spacing2;
  }
  .check,
  .check-layout {
    width: toRem(17);
    height: toRem(17);
  }
}
</style>

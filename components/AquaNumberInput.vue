<template>
  <div class="AquaNumberInput" :class="{ error: errorInternal, editing, highlight }">
    <input
      ref="input"
      title=""
      :type="editing ? 'number' : 'text'"
      align="right"
      :value="displayValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="onInputChanged"
      @keydown.enter="onEnter"
      @focus="onFocusInput"
      @blur="onBlurInput"
      @mouseenter="onMouseIn"
      @mouseleave="onMouseOut"
    />
    <AquaLayout horizontal align="center" justify="center" class="error-icon">
      <AquaFlex flex="1">
        <AquaIcon icon="error-circle-alt" tint="#d54309" size="17"></AquaIcon>
      </AquaFlex>
    </AquaLayout>
  </div>
</template>

<script lang="ts">
import { aquaFormatValue } from '../service/filter.js'

interface AquaNumberInputData {
  valueInternal: string
  errorInternal: boolean
  lastGoodValue: string
  editing: boolean
}

export default {
  name: 'AquaNumberInput',
  props: {
    modelValue: String,
    format: {
      type: String,
      default: 'number'
    },
    precision: Number,
    disabled: Boolean,
    placeholder: String,
    error: Boolean,
    highlight: Boolean,
    validator: Function
  },
  emits: [
    'update:modelValue',
    'editStart',
    'editEnd',
    'mousein',
    'mouseout',
    'error',
    'valid',
    'enter'
  ],
  data() {
    return {
      valueInternal: this.modelValue,
      errorInternal: this.error,
      lastGoodValue: this.modelValue,
      editing: false
    } as AquaNumberInputData
  },
  computed: {
    displayValue() {
      if (this.valueInternal && this.valueInternal.length) {
        return this.editing ? this.valueInternal : aquaFormatValue(this.valueInternal, this.format)
      } else {
        return ''
      }
    }
  },
  watch: {
    modelValue() {
      if (this.modelValue) this.valueInternal = this.modelValue
    },
    error() {
      this.errorInternal = this.error
    }
  },
  mounted() {
    if (this.modelValue) {
      this.valueInternal = this.modelValue
      this.lastGoodValue = this.modelValue
    }
    this.errorInternal = this.error
  },
  methods: {
    getValue() {
      return this.valueInternal
    },
    roundToPrecision(number: string) {
      if (this.precision) {
        const n = Math.pow(10, this.precision)
        return Math.round(parseInt(number) * n) / n
      }
      return number
    },
    onInputChanged() {
      this.valueInternal = (this.$refs.input as HTMLInputElement).value
      if (this.validator && this.valueInternal && this.valueInternal.length) {
        this.errorInternal = !this.validator(this.valueInternal, this)
      } else {
        this.errorInternal = false
      }
      if (this.errorInternal) {
        this.$emit('error')
      } else {
        this.$emit('valid')
      }
      this.$emit('update:modelValue', this.valueInternal)
    },
    onEnter() {
      // Don't accept invalid input
      if (!this.errorInternal) {
        this.$emit('enter')
      }
    },
    onFocusInput() {
      this.editing = true
      // Start of editing - save current value as last known good value
      this.lastGoodValue = this.valueInternal
      this.$emit('editStart')
    },
    onBlurInput() {
      if (this.errorInternal) {
        // If control blurs while input is invalid, restore previously good value
        this.valueInternal = this.roundToPrecision(this.lastGoodValue).toString()
        this.lastGoodValue = this.valueInternal
        this.errorInternal = false
      } else {
        this.valueInternal = this.roundToPrecision(this.valueInternal).toString()
      }
      this.editing = false
      this.$emit('update:modelValue', this.valueInternal)
      this.$emit('editEnd', this.valueInternal)
    },
    onMouseIn() {
      this.$emit('mousein')
    },
    onMouseOut() {
      this.$emit('mouseout')
    }
  }
}
</script>

<style lang="scss">
@use '../aqua-vars.module.scss' as *;

.AquaNumberInput {
  position: relative;
  input {
    width: 100%;
    flex: 1 1 auto;
    cursor: pointer;
    transition: color 500ms, background-color 500ms, box-shadow 500ms;
    border: toRem(1) solid rgba(0, 0, 0, 0.2);
    border-radius: 0;
    padding: $aqua-spacing2;
    &.error {
      background-color: #d54309;
      color: $aqua-color-white;
    }
    &:hover,
    &:focus,
    &.highlight {
      box-shadow: 0 0 toRem(1) toRem(1) $aqua-color-azul-500,
        0 0 toRem(1) toRem(1) $aqua-color-azul-500;
      outline: none;
    }
    &:disabled {
      background-color: $aqua-color-gray-200;
      &:hover,
      &:focus,
      &.highlight {
        box-shadow: none;
        cursor: not-allowed;
      }
    }
  }
  .error-icon {
    display: none;
  }
  &.editing {
    input {
      cursor: text;
    }
  }
  &.highlight {
    input {
      box-shadow: 0 0 toRem(1) toRem(1) $aqua-color-azul-500,
        0 0 toRem(1) toRem(1) $aqua-color-azul-500;
      outline: none;
    }
  }
  &.error {
    input {
      padding-right: $aqua-spacing8;
      box-shadow: 0 0 toRem(1) toRem(1) #d54309, 0 0 toRem(1) toRem(1) #d54309;
      outline: none;
    }
    .error-icon {
      display: flex;
      position: absolute;
      right: $aqua-spacing2;
      top: $aqua-spacing1;
      bottom: 0;
    }
  }
}
</style>

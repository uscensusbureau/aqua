<template>
  <AquaLayout
    horizontal
    class="aqua-simple-searchbar"
    align="stretch"
    justify="center"
    tabindex="0"
  >
    <AquaLayout
      horizontal
      align="center"
      justify="center"
      class="aqua-searchbar_input-layout"
      :class="{ focused }"
    >
      <slot name="prependSlot"></slot>
      <AquaTextInput
        ref="input"
        v-model="valueInternal"
        class="input-component"
        simple
        :placeholder="placeholder"
        role="combobox"
        @update:model-value="onChange"
        @focus="focused = true"
        @blur="focused = false"
      ></AquaTextInput>
      <slot ref="appendSlot" name="appendSlot"></slot>
    </AquaLayout>
  </AquaLayout>
</template>

<script lang="ts">
import { Spacing } from '../mixins/Spacing.js'

interface AquaSimpleSearchbarData {
  valueInternal: string
  focused: boolean
  spacingClasses: Array<string>
}

export default {
  name: 'AquaSimpleSearchbar',
  mixins: [Spacing],
  props: {
    modelValue: String,
    placeholder: String
  },
  emits: ['update:modelValue'],
  data() {
    return {
      valueInternal: '',
      focused: false,
      spacingClasses: []
    } as AquaSimpleSearchbarData
  },
  methods: {
    onChange(value: string) {
      this.valueInternal = value
      this.$emit('update:modelValue', value)
    }
  }
}
</script>

<style lang="scss">
@use '../aqua-vars.module.scss' as *;

.aqua-simple-searchbar {
  flex: 0 0 auto;
  position: relative;
  &:focus {
    outline: none;
  }
  .aqua-searchbar_input-layout {
    padding: $aqua-spacing2;
    padding-bottom: $aqua-spacing2;
    padding-left: 0;
    border-bottom: 2px solid $aqua-color-gray-700;
    transition: border-bottom 250ms ease-in-out;
    &.focused {
      border-bottom: 2px solid $aqua-color-vivid-blue;
    }
  }
}
</style>

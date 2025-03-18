<template>
  <AquaLayout
    class="aqua-file-input"
    :class="[spacingClasses]"
    horizontal
    align="start"
    justify="start"
  >
    <AquaFlex flex="1" class="aqua-file-input_content">
      <AquaLayout tag="form" vertical align="start" justify="start" onsubmit="return false">
        <label
          for="file-picker"
          class="aqua-file-input_label"
          tabindex="0"
          @keydown.enter.stop.prevent="onEnter"
        >
          <slot name="label">{{ label }}</slot>
        </label>
        <input
          ref="filePicker"
          id="file-picker"
          name="file-picker"
          type="file"
          :multiple="multiple"
          :aria-label="ariaLabel"
          :accept="accept"
          :value="modelValue"
          @input="onChange($event)"
          @click="onClick"
        />
        <slot name="append"></slot>
      </AquaLayout>
    </AquaFlex>
  </AquaLayout>
</template>

<script lang="ts">
import { Spacing } from '../mixins/Spacing.js'

interface AquaFileInputData {
  spacingClasses: Array<string>
  valueInternal: string | undefined
}

export default {
  name: 'AquaFileInput',
  mixins: [Spacing],
  props: {
    ariaLabel: String,
    accept: String,
    label: String,
    files: FileList,
    modelValue: String,
    multiple: Boolean
  },
  emits: ['update:files', 'update:modelValue', 'click'],
  data() {
    return {
      spacingClasses: [],
      valueInternal: ''
    } as AquaFileInputData
  },
  watch: {
    modelValue(newValue) {
      this.valueInternal = newValue
    }
  },
  mounted() {
    this.SetSpacingClasses()
    this.valueInternal = this.modelValue
  },
  methods: {
    onChange(event: Event) {
      const target = event.target
      const targetElement = target ? (target as HTMLInputElement) : null
      if (targetElement) {
        this.valueInternal = targetElement.value

        this.$emit('update:files', targetElement.files)
        this.$emit('update:modelValue', this.valueInternal)
      }
    },
    onClick() {
      this.$emit('click')
    },
    onEnter() {
      ;(this.$refs.filePicker as HTMLLabelElement).click()
    }
  }
}
</script>

<style lang="scss">
.aqua-file-input {
  .aqua-file-input_label {
    color: $aqua-color-gray-800;
    font-size: toRem(14);
    font-weight: 500;
    margin-right: $aqua-spacing2;
  }
}
</style>

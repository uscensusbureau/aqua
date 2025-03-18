<template>
  <AquaLayout
    vertical
    inline
    justify="start"
    align="start"
    class="aqua-checkbox-group"
    role="radiogroup"
    :class="[spacingClasses]"
    @click="onClick"
    @keydown.enter="onClick"
  >
    <slot></slot>
  </AquaLayout>
</template>

<script lang="ts">
import type { ComponentOptionsWithObjectProps } from 'vue'
import { Spacing } from '../mixins/Spacing.js'

interface AquaCheckboxGroupData {
  items: Array<ComponentOptionsWithObjectProps>
  lastClickedCheckboxIndex: number
  spacingClasses: Array<string>
}

export default {
  name: 'AquaCheckboxGroup',
  mixins: [Spacing],
  props: {
    componentKey: Number
  },
  emits: ['update:modelValue', 'rangeSelected'],
  data: () =>
    ({
      items: [],
      lastClickedCheckboxIndex: -1,
      spacingClasses: []
    } as AquaCheckboxGroupData),
  watch: {
    // allow checkbox group to support changing lists
    async componentKey() {
      await this.$nextTick()
      this.items = []
      this.virtualizeCheckboxes()
    }
  },
  mounted() {
    this.SetSpacingClasses()

    // Register all children (they should all be aqua-checkbox components) and set initially selected item based on the v-model
    this.$nextTick(() => {
      this.virtualizeCheckboxes()
    })
  },
  beforeUnmount() {
    // Unregister
    const radios = this.$el.querySelectorAll('.aqua-checkbox')
    for (const radio of radios) {
      // hack to remove all event listeners from the checkbox
      radio.replaceWith(radio.cloneNode(true))
    }
  },
  methods: {
    virtualizeCheckboxes() {
      const checkboxes = this.$el.querySelectorAll('.aqua-checkbox')
      for (const checkbox of checkboxes) {
        const checkboxComponent = checkbox.__vue__
        this.items.push(checkboxComponent)
      }
    },
    fineCheckboxIndexFromComponent(checkboxComponent: ComponentOptionsWithObjectProps) {
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i]
        if (item === checkboxComponent) {
          return i
        }
      }
      return -1 // should never happen
    },
    onClick(event: PointerEvent | MouseEvent | KeyboardEvent) {
      let checkbox
      if ((event.target as Element).classList.contains('aqua-checkbox')) {
        checkbox = event.target
      } else {
        checkbox = (event.target as Element).closest('.aqua-checkbox')
      }
      const checkboxComponent = checkbox ? checkbox.__vue__ : null
      if (checkboxComponent) {
        if (event.shiftKey && this.lastClickedCheckboxIndex >= 0) {
          // Range selection
          const currentIndex = this.fineCheckboxIndexFromComponent(checkboxComponent)
          if (currentIndex >= 0) {
            let startIndex, endIndex
            if (currentIndex > this.lastClickedCheckboxIndex) {
              startIndex = this.lastClickedCheckboxIndex
              endIndex = currentIndex
            } else {
              startIndex = currentIndex
              endIndex = this.lastClickedCheckboxIndex
            }
            const range = endIndex - startIndex
            if (range > 1) {
              // Emit the rangeSelected event
              const valueToSet = this.items[this.lastClickedCheckboxIndex].getChecked()
              this.$emit('rangeSelected', {
                startIndex: startIndex,
                endIndex: endIndex,
                value: valueToSet
              })
            }
          }
        }
        // Take note of the last clicked checkbox
        this.lastClickedCheckboxIndex = this.fineCheckboxIndexFromComponent(checkboxComponent)
      }
    }
  }
}
</script>

<template>
  <AquaLayout
    vertical
    inline
    justify="start"
    align="start"
    class="aqua-radio-group"
    role="radiogroup"
    :class="[spacingClasses]"
    @keydown.down.stop.prevent="onArrowDown"
    @keydown.up.stop.prevent="onArrowUp"
  >
    <slot></slot>
  </AquaLayout>
</template>

<script lang="ts">
import type { ComponentOptionsWithObjectProps } from 'vue'
import { Spacing } from '../mixins/Spacing.js'

type ValueType = number | string | Record<string, any> | null

interface AquaRadioGroupData {
  previousValue: ValueType
  items: Array<ComponentOptionsWithObjectProps>
  spacingClasses: Array<string>
}

export default {
  name: 'AquaRadioGroup',
  mixins: [Spacing],
  props: {
    modelValue: [Number, String, Object],
    componentKey: Number
  },
  emits: ['update:modelValue'],
  data: () =>
    ({
      previousValue: null,
      items: [],
      spacingClasses: []
    } as AquaRadioGroupData),
  watch: {
    modelValue: {
      handler(newValue) {
        this.onItemSelected(newValue)
      },
      deep: true
    },
    // allow radio group to support changing lists
    async componentKey() {
      await this.$nextTick()
      this.items = []
      this.virtualizeRadios()
    }
  },
  mounted() {
    this.SetSpacingClasses()

    // Register all children (they should all be aqua-radio components) and set initially selected item based on the v-model
    this.virtualizeRadios()
  },
  beforeUnmount() {
    // Unregister
    const radios = this.$el.querySelectorAll('.aqua-radio')
    for (const radio of radios) {
      // hack to remove all event listeners from the radio
      radio.replaceWith(radio.cloneNode(true))
    }
  },
  methods: {
    virtualizeRadios() {
      const radios = this.$el.querySelectorAll('.aqua-radio')
      for (const radio of radios) {
        const radioComponent = radio.__vue__
        this.items.push(radioComponent)
        const value = radioComponent.value
        radio.addEventListener('input', (event: InputEvent) => {
          this.onItemSelected(value)
        })
        if (String(value) === String(this.modelValue)) {
          this.onItemSelected(value)
        }
      }
    },
    onItemSelected(value: ValueType) {
      if (value === this.previousValue) return
      this.previousValue = value
      // Select/Unselect all items in the group
      this.items.forEach((item) => {
        item.setChecked(item.value === value)
      })
      // Update for our v-model
      this.$emit('update:modelValue', value)
    },
    onArrowDown() {
      let index = this.getCheckedItemIndex()
      index = this.getNextEnabledItemIndex(index)
      this.setCheckedItemByIndex(index)
    },
    onArrowUp() {
      let index = this.getCheckedItemIndex()
      index = this.getPrevEnabledItemIndex(index)
      this.setCheckedItemByIndex(index)
    },
    getCheckedItemIndex() {
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i]
        if (item.getChecked()) {
          return i
        }
      }
      return -1 // should never happen
    },
    setCheckedItemByIndex(index: number) {
      if (index < 0) {
        index = this.items.length - 1
      }
      if (index >= this.items.length) {
        index = 0
      }
      this.items[index].$el.click()
    },
    getNextEnabledItemIndex(currentIndex: number) {
      // TODO: check for all items disabled case
      ++currentIndex
      if (currentIndex >= this.items.length) {
        currentIndex = 0
      }
      while (this.items[currentIndex].getDisabled()) {
        ++currentIndex
        if (currentIndex >= this.items.length) {
          currentIndex = 0
        }
      }
      return currentIndex
    },
    getPrevEnabledItemIndex(currentIndex: number) {
      // TODO: check for all items disabled case
      --currentIndex
      if (currentIndex < 0) {
        currentIndex = this.items.length - 1
      }
      while (this.items[currentIndex].getDisabled()) {
        --currentIndex
        if (currentIndex < 0) {
          currentIndex = this.items.length - 1
        }
      }
      return currentIndex
    }
  }
}
</script>

<template>
  <AquaLayout vertical class="aqua-tabs" :class="[{ header }, spacingClasses]">
    <AquaLayout horizontal justify="start" class="aqua-tabs_tabs">
      <slot></slot>
    </AquaLayout>
    <div ref="underlineArea" class="aqua-tabs_underline-area">
      <div ref="underline" :class="{ header }" class="aqua-tabs_underline"></div>
      <div v-if="!header" class="aqua-tabs_hr"></div>
    </div>
  </AquaLayout>
</template>

<script lang="ts">
import { Spacing } from '../mixins/Spacing.js'

type ValueType = number | string | Record<string, any>

interface AquaTabsData {
  items: Array<any>
  spacingClasses: Array<string>
  resizeObserver: ResizeObserver | null
}

export default {
  name: 'AquaTabs',
  mixins: [Spacing],
  props: {
    modelValue: [Number, String, Object],
    header: Boolean
  },
  emits: ['update:modelValue'],
  data: () =>
    ({
      items: [],
      spacingClasses: [],
      resizeObserver: null
    } as AquaTabsData),
  watch: {
    modelValue: {
      handler(newValue) {
        this.onItemSelected(newValue)
      },
      deep: true
    }
  },
  mounted() {
    this.SetSpacingClasses()

    this.resizeObserver = new ResizeObserver(() => {
      this.virtualizeTabs()
    })
    // Observe the element for resize
    if (this.$el) {
      this.resizeObserver.observe(this.$el.querySelector('.aqua-tabs_tabs'))
    }
  },
  beforeUnmount() {
    const tabs = this.$el.querySelectorAll('.aqua-tab')
    for (let i = 0; i < tabs.length; i++) {
      const tab = tabs[i]
      tab.removeEventListener('click', (event: MouseEvent) => this.onClickChildTab(event))
    }
  },
  methods: {
    virtualizeTabs() {
      // Unregister any previous tabs
      if (this.items.length) {
        for (const item of this.items) {
          item.$el.removeEventListener('click', (event: MouseEvent) => this.onClickChildTab(event))
        }
      }
      this.items = []

      // Register all slot children and set initially selected item based on the v-model
      const tabs = this.$el.querySelectorAll('.aqua-tab')
      for (let i = 0; i < tabs.length; i++) {
        const tab = tabs[i]
        const component = tab.__vue__
        if (component) {
          this.items.push(component)
          if (this.modelValue && component.value === this.modelValue) {
            this.onItemSelected(this.modelValue)
          }
          component.setHeader(this.header)

          // Watch for child tabs being clicked
          tab.addEventListener('click', (event: MouseEvent) => this.onClickChildTab(event))
        }
      }
      this.$nextTick(() => {
        this.underlineSelected()
      })
    },
    onResize() {
      this.underlineSelected()
    },
    onClickChildTab(event: MouseEvent) {
      const target = event.target
      const targetElement = target ? (target as HTMLElement) : null
      if (targetElement) {
        const tab = (targetElement as any).__vue__
        this.onItemSelected(tab.$props.value)
      }
    },
    onItemSelected(value: ValueType) {
      // Select/Unselect all items in the group
      this.items.forEach((item) => {
        item.setSelected(item.$props.value === value)
      })
      // Update underline
      setTimeout(() => {
        this.underlineSelected()
      }, 100)
      // Update for our v-model
      this.$emit('update:modelValue', value)
    },
    underlineSelected() {
      if (!this.$refs.underline || !this.$refs.underlineArea) return
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i]
        if (item.$props.value === this.modelValue) {
          const itemWidth = item.$el.getBoundingClientRect().width
          const itemLeft = item.$el.getBoundingClientRect().left
          const parentLeft = (this.$refs.underlineArea as HTMLElement).getBoundingClientRect().left
          const offsetLeft = itemLeft - parentLeft
          ;(this.$refs.underline as HTMLElement).style.left = offsetLeft + 'px'
          ;(this.$refs.underline as HTMLElement).style.width = itemWidth + 'px'
          ;(this.$refs.underline as HTMLElement).style.visibility = 'visible'
          return
        }
      }
      // Not found - hide the underline since nothing is selected
      ;(this.$refs.underline as HTMLElement).style.visibility = 'hidden'
    }
  }
}
</script>

<style lang="scss">
@use '../aqua-vars.module.scss' as *;

.aqua-tabs {
  .aqua-tabs_tabs {
    max-width: fit-content;
  }
  .aqua-tabs_underline-area {
    position: relative;
    .aqua-tabs_underline {
      position: absolute;
      left: 0;
      width: 0;
      top: toRem(-3);
      height: toRem(3);
      background-color: $aqua-color-coral-500;
      transition: left 250ms, width 250ms;
      &.header {
        height: toRem(4);
        top: toRem(-4);
      }
    }
    .aqua-tabs_hr {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: toRem(1);
      border-bottom: toRem(1) solid $aqua-color-steel-300;
    }
  }
  &.header {
    height: toRem(34);
  }
}
</style>

<template>
  <div
    class="aqua-menu-item px-3 py-2"
    :class="[{ selected, highlighted, active, wrap, disabled }, spacingClasses]"
    role="option"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Spacing } from '../mixins/Spacing.js'

interface AquaMenuItemData {
  highlighted: boolean
  spacingClasses: Array<string>
}

export default {
  name: 'AquaMenuItem',
  mixins: [Spacing],
  props: {
    selected: Boolean,
    active: Boolean,
    disabled: Boolean,
    wrap: Boolean
  },
  data: () =>
    ({
      highlighted: false,
      spacingClasses: []
    } as AquaMenuItemData),
  mounted() {
    this.SetSpacingClasses()
  },
  methods: {
    setHighlighted(value: boolean) {
      this.highlighted = value
    }
  }
}
</script>

<style lang="scss">
@use '../aqua-vars.module.scss' as *;

.aqua-menu-item {
  position: relative;
  cursor: pointer;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    background-color: $aqua-color-gray-100;
  }
  &.selected {
    background-color: $aqua-color-vivid-blue-active;
  }
  &.disabled {
    pointer-events: none;
    color: $aqua-color-gray-400;
  }
  &:focus {
    background-color: $aqua-color-primary-50;
  }
  [subItemHighlight] {
    outline: toRem(2) solid $aqua-color-azul-500;
  }
  &.highlighted {
    background-color: $aqua-color-primary-50;
  }
  &.active {
    background-color: $aqua-color-primary-50;
  }
  &:not(.wrap) {
    white-space: nowrap;
  }
}
</style>

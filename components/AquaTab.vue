<template>
  <RouterLink
    v-if="link"
    :to="to"
    class="aqua-tab"
    :class="[{ selected, disabled, header }, spacingClasses]"
    :tabindex="disabled ? '-1' : '0'"
    @click="$emit('click', $event)"
    >{{ label }}</RouterLink
  >
  <div
    v-else
    class="aqua-tab"
    :class="[{ selected, disabled, header }, spacingClasses]"
    :tabindex="disabled ? '-1' : '0'"
    @click="onClick"
    @keydown.enter="onClick"
  >
    {{ label }}
  </div>
</template>

<script lang="ts">
import { Spacing } from '../mixins/Spacing.js'

interface AquaTabData {
  selected: boolean
  spacingClasses: Array<string>
  header: boolean
}

export default {
  name: 'AquaTab',
  mixins: [Spacing],
  props: {
    value: [Number, String, Object],
    label: String,
    link: Boolean,
    to: Object,
    disabled: Boolean
  },
  emits: ['click'],
  data: () =>
    ({
      selected: false,
      spacingClasses: [],
      header: false
    } as AquaTabData),
  mounted() {
    this.SetSpacingClasses()
  },
  methods: {
    onClick() {
      if (this.disabled === true) {
        return
      }
      this.selected = true
      this.$emit('click', this.value)
    },
    // PUBLIC - USED BY Aqua-TABS COMPONENT
    setSelected(value: boolean) {
      this.selected = value
    },
    setHeader(isHeader: boolean) {
      this.header = isHeader
    }
  }
}
</script>

<style lang="scss">
@use '../aqua-vars.module.scss' as *;

.aqua-tab {
  position: relative;
  cursor: pointer;
  font-size: toRem(14);
  color: $aqua-color-vivid-blue;
  transition: color 250ms;
  padding-left: $aqua-spacing3;
  padding-right: $aqua-spacing3;
  padding-top: $aqua-spacing2;
  padding-bottom: $aqua-spacing2;
  text-align: center;
  &.selected {
    font-weight: 700;
    color: $aqua-color-gray-600;
  }
  &.disabled {
    color: $aqua-color-gray-600;
    pointer-events: none;
  }
}
a.aqua-tab {
  &:hover {
    text-decoration: none;
  }
}
</style>

<template>
  <a
    v-if="externalLink"
    :href="(to as string)"
    target="_blank"
    class="aqua-button"
    :class="[{ disabled }, spacingClasses]"
    :tabindex="disabled ? '-1' : '0'"
  >
    <slot></slot>
  </a>
  <RouterLink
    v-else-if="link"
    :to="to"
    class="aqua-button"
    :class="[{ disabled }, spacingClasses]"
    :tabindex="disabled ? '-1' : '0'"
  >
    <slot></slot>
  </RouterLink>
  <button
    v-else
    class="aqua-button"
    :class="[{ disabled }, spacingClasses]"
    :tabindex="disabled ? '-1' : '0'"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Spacing } from '../mixins/Spacing.js'

interface AquaButtonData {
  spacingClasses: Array<string>
}

export default {
  name: 'AquaButton',
  mixins: [Spacing],
  props: {
    disabled: Boolean,
    link: Boolean,
    externalLink: Boolean,
    to: [Object, String]
  },
  emits: ['click'],
  data() {
    return {
      spacingClasses: []
    } as AquaButtonData
  },
  computed: {
    toIsString() {
      return this.to instanceof String
    }
  },
  mounted() {
    this.SetSpacingClasses()
  }
}
</script>

<style lang="scss">
@use '../aqua-vars.module.scss' as *;

.aqua-button {
  cursor: pointer;
  outline: none;
  height: toRem(38);
  border: none;
  border-radius: toRem(2);
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  justify-content: center;
  position: relative;
  text-decoration: none;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  appearance: none;
  -webkit-appearance: none;
  background-color: transparent;
  transition: all 250ms;
  font-weight: $aqua-font-weight-bold;
  text-transform: uppercase;
  font-size: toRem(12);
  padding-left: $aqua-spacing5;
  padding-right: $aqua-spacing5;
  font-family: $aqua-font-family;
  &[primary] {
    color: $aqua-color-white;
    background-color: $aqua-color-vivid-blue;
    border: toRem(1) solid $aqua-color-vivid-blue;
    &:focus,
    &:hover {
      background-color: $aqua-color-vivid-blue-dark;
      border: toRem(1) solid $aqua-color-vivid-blue-dark;
    }
    &:active {
      background-color: $aqua-color-vivid-blue;
      border: toRem(1) solid $aqua-color-azul-500;
    }
    &.disabled {
      color: $aqua-color-gray-600;
      border: toRem(1) solid $aqua-color-gray-600;
      background-color: $aqua-color-gray-200;
    }
  }
  &[secondary] {
    color: $aqua-color-vivid-blue;
    background-color: transparent;
    border: toRem(1) solid $aqua-color-vivid-blue;
    &:focus,
    &:hover {
      color: $aqua-color-vivid-blue-dark;
      border: toRem(1) solid $aqua-color-vivid-blue-dark;
    }
    &:active {
      color: $aqua-color-vivid-blue;
      border: toRem(1) solid $aqua-color-azul-500;
    }
    &.disabled {
      border: toRem(1) solid $aqua-color-gray-600;
    }
  }
  &[tertiary],
  &[link-style] {
    color: $aqua-color-vivid-blue;
    border: toRem(1) solid transparent;
    &:focus,
    &:hover {
      color: $aqua-color-vivid-blue-dark;
      text-decoration-line: underline;
    }
    &:active {
      color: $aqua-color-vivid-blue;
    }
    &.disabled {
      color: $aqua-color-gray-600;
    }
  }
  &[link-style] {
    height: auto;
    border: none;
    font-family: inherit;
    font-weight: inherit;
    padding: 0;
    text-transform: none;
    vertical-align: inherit;
  }
  &.disabled {
    pointer-events: none;
  }
}

a.aqua-button {
  &:hover {
    text-decoration: none;

    // preserve hover color on primary button (all others same as link hover)
    &[primary] {
      color: $aqua-color-white;
    }
  }
}
</style>

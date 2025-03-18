<template>
  <AquaLayout class="aqua-toolbar-button" :class="[{ collapse, stacked }, spacingClasses]">
    <AquaLayout
      v-if="label"
      :id="`toolbar-button-${label.toLowerCase().replaceAll(/\W/g, '-')}`"
      ref="theButton"
      vertical
      align="center"
      justify="center"
      class="main-button"
      :class="{ disabled, selected, highlighted, split }"
      :tabindex="disabled ? -1 : 0"
      :aria-hidden="disabled ? 'true' : 'false'"
      role="button"
      @click="onClick"
    >
      <AquaDotIndicator
        v-if="count && count > 0"
        class="dot-container"
        :class="{ collapse }"
        :background-color="colors.aquaColorCoral600"
        :text-color="colors.aquaColorWhite"
        :text="count"
      ></AquaDotIndicator>

      <template v-if="stacked">
        <AquaLayout horizontal align="center" justify="center" class="aqua-toolbar-button-layout">
          <AquaFlex flex="0">
            <div
              v-if="!collapse"
              :class="{ 'aqua-toolbar-button-icon': collapse }"
              :style="`
              -webkit-mask-image: url('${icon}');
              mask-image: url('${icon}');`"
            ></div>
          </AquaFlex>

          <AquaFlex flex="1">
            <div class="aqua-toolbar-button-label">{{ label }}</div>
          </AquaFlex>
        </AquaLayout>
      </template>

      <template v-else>
        <template v-if="custom"><slot name="custom" :custom-button="$props"></slot></template>

        <AquaLayout
          v-if="!custom"
          vertical
          align="center"
          justify="center"
          class="aqua-toolbar-button-layout"
        >
          <div
            :class="{ 'aqua-toolbar-button-icon': !collapse }"
            :style="`
              -webkit-mask-image: url('${icon}');
              mask-image: url('${icon}');`"
          ></div>

          <div class="aqua-toolbar-button-label">{{ label }}</div>
        </AquaLayout>
      </template>

      <AquaIcon
        v-if="dropdown"
        class="aqua-toolbar-button-dropdown-indicator"
        aria-hidden="true"
        icon="chevron-down"
        size="12"
        :tint="colors.aquaColorPrimary900"
      ></AquaIcon>

      <div class="aqua-toolbar-button-focus-indicator" :class="{ split }"></div>
    </AquaLayout>
    <AquaLayout
      v-if="split"
      align="center"
      justify="center"
      class="split-button"
      :class="[{ selected, highlighted, collapse }]"
      tabindex="0"
      @click.stop.prevent="onClickSplit"
      @keydown.enter.stop.prevent="onClickSplit"
    >
      <AquaIcon
        aria-hidden="true"
        icon="arrow-down-solid"
        size="12"
        :tint="colors.aquaColorVividBlue"
      ></AquaIcon>
      <div class="aqua-toolbar-button-focus-indicator"></div>
      <slot name="split"></slot>
    </AquaLayout>
  </AquaLayout>
</template>

<script lang="ts">
import colors from '@aqua/styles/design-system/colors.module.scss'

import { Spacing } from '../mixins/Spacing.js'
import type { ComponentOptionsWithObjectProps } from 'vue'

interface AquaToolbarButtonData {
  spacingClasses: Array<string>
}

export default {
  name: 'AquaToolbarButton',
  mixins: [Spacing],
  emits: ['clicked-split'],
  props: {
    label: String,
    count: Number,
    icon: [String, Object],
    dropdown: Boolean,
    split: Boolean,
    menuItems: Array,
    stacked: Boolean,
    disabled: Boolean,
    highlighted: Boolean,
    selected: Boolean,
    custom: Boolean,
    collapse: Boolean,
    timeout: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      spacingClasses: []
    } as AquaToolbarButtonData
  },
  computed: {
    colors() {
      return colors
    }
  },
  mounted() {
    this.SetSpacingClasses()
  },
  methods: {
    onClick() {
      // If a timeout has been set, unfocus the button
      if (this.timeout) {
        setTimeout(() => {
          ;(this.$refs.theButton as ComponentOptionsWithObjectProps).$el.blur()
        }, this.timeout)
      }
    },
    onClickSplit() {
      this.$emit('clicked-split')
    }
  }
}
</script>

<style scoped lang="scss">
@use '../aqua-vars.module.scss' as *;

.aqua-toolbar-button {
  position: relative;
  flex: 0 0 auto;
  cursor: pointer;
  margin-left: 0;
  margin-right: 0;
  transition: all 250ms;
  font-size: toRem(12);
  height: toRem(61);
  &.collapse {
    height: toRem(22);
  }
  &:hover {
    background-color: $aqua-color-gray-100;
    border-radius: toRem(2);
    .split,
    .split-button {
      &:not(.selected) {
        background-color: $aqua-color-gray-50;
      }
    }
  }
  &:focus {
    outline: none;
    .aqua-toolbar-button-focus-indicator {
      opacity: 1;
    }
  }
  &:focus:not(:focus-visible) {
    // Undo all the focused element styles if the
    // element has focus but the browser wouldn't normally
    // show default focus styles

    // Note that this works even in browsers that don’t
    // support :focus-visible because although :not()
    // supports pseudo-classes as part of its selector list,
    // browsers will ignore the whole thing when using a
    // pseudo-class they don’t understand/support, meaning
    // the entire :focus:not(:focus-visible) { ... }
    // block is never applied.
    .aqua-toolbar-button-focus-indicator {
      opacity: 0;
    }
  }
  .disabled {
    pointer-events: none;
    .aqua-toolbar-button-icon {
      background-color: $aqua-color-steel-400;
    }
    .aqua-toolbar-button-label {
      color: $aqua-color-steel-400;
    }
  }
  .stacked {
    height: 50%;
    min-height: 50%;
    max-height: 50%;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: start;
    text-align: left;
    .aqua-toolbar-button-icon {
      width: toRem(14);
      height: toRem(14);
      max-height: toRem(14);
      margin: toRem(4);
    }
    .aqua-toolbar-button-label {
      margin: toRem(8) toRem(8) toRem(8) 0;
      text-align: left;
    }
  }
  .selected {
    background-color: $aqua-color-vivid-blue-hover;
    &:hover {
      background-color: $aqua-color-vivid-blue-active;
    }
    .aqua-toolbar-button-icon {
      background-color: $aqua-color-gray-800;
    }
  }
  .highlighted {
    background-color: $aqua-color-primary-100;
  }
  .collapse {
    height: toRem(20);
    .aqua-toolbar-button-label {
      margin: 0 toRem(2);
      text-align: center;
    }
  }
  .dot-container {
    position: absolute;
    top: toRem(3);
    right: toRem(3);
    font-weight: $aqua-font-weight-bold;
    &.collapse {
      font-size: toRem(8);
    }
  }
  .aqua-toolbar-button-layout {
    width: 100%;
  }
  .aqua-toolbar-button-icon {
    width: toRem(24);
    height: toRem(24);
    max-height: toRem(24);
    background-color: $aqua-color-gray-800;
    margin: toRem(2) 0 toRem(4) 0;
    mask-size: contain;
    mask-repeat: no-repeat;
    mask-mode: alpha;
    pointer-events: none;
  }
  .aqua-toolbar-button-label {
    margin: 0 toRem(8) 0 toRem(8);
    text-align: center;
    white-space: nowrap;
  }
  .aqua-toolbar-button-dropdown-indicator {
    position: absolute;
    right: toRem(2);
    bottom: 0;
    font-size: toRem(12);
  }
  .aqua-toolbar-button-focus-indicator {
    opacity: 0;
    border: toRem(2) solid $aqua-color-azul-500;
    border-radius: toRem(2);
    &.split {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    pointer-events: none;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: opacity 250ms;
  }
  .main-button {
    border-radius: toRem(2);
    &.split {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      &:hover {
        background-color: $aqua-color-gray-100;
      }
      &.selected {
        &:hover {
          background-color: $aqua-color-vivid-blue-active;
        }
      }
    }
  }
  .split-button {
    height: 100%;
    position: relative;
    padding-left: toRem(2);
    padding-right: toRem(2);
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: toRem(2);
    border-bottom-right-radius: toRem(2);
    &:hover {
      &:not(.selected) {
        background-color: $aqua-color-gray-100;
      }
    }
    &.selected {
      &:hover {
        background-color: $aqua-color-vivid-blue-active;
      }
    }
    .aqua-toolbar-button-focus-indicator {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-top-right-radius: toRem(2);
      border-bottom-right-radius: toRem(2);
    }
  }
}
</style>

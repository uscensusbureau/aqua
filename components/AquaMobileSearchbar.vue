<template>
  <AquaLayout horizontal class="aqua-mobile-searchbar" align="stretch" justify="center">
    <AquaLayout vertical class="aqua-searchbar_layout" role="combobox" @click="focusInput">
      <div
        ref="liveregion"
        class="liveregion"
        role="status"
        aria-live="assertive"
        aria-atomic="true"
        aria-relevant="text"
      ></div>

      <AquaLayout horizontal align="center" justify="center" class="aqua-searchbar_input-layout">
        <slot name="prependSlot"></slot>
        <AquaTextInput
          ref="input"
          v-model="valueInternal"
          simple
          :placeholder="placeholder"
          :navbar="navbar"
          mobile
          role="combobox"
          @update:model-value="onChange"
          @enter="onEnter"
          @focus="inputFocus"
          @clear="inputClear"
        ></AquaTextInput>
        <slot ref="appendSlot" name="appendSlot"></slot>

        <AquaFlex flex="0" center-content>
          <AquaFlex
            center-content
            flex="0"
            class="search-button"
            tabindex="0"
            aria-label="Search Button"
            role="combobox"
            @mousedown="$emit('clickSearch')"
            @keydown.enter="$emit('clickSearch')"
          >
            <AquaIcon
              class="searchIcon"
              icon="search"
              size="28"
              :tint="colors.aquaColorGray800"
            ></AquaIcon>
          </AquaFlex>
        </AquaFlex>
      </AquaLayout>
    </AquaLayout>
  </AquaLayout>
</template>

<script lang="ts">
import colors from '@aqua/styles/design-system/colors.module.scss'

import { MenuKeyboardNavigation } from '../mixins/MenuKeyboardNavigation.js'
import { Spacing } from '../mixins/Spacing.js'
import type { ComponentOptionsWithObjectProps } from 'vue'

interface AquaMobileSearchbarData {
  valueInternal: string
  spacingClasses: Array<string>
}

export default {
  name: 'AquaMobileSearchbar',
  mixins: [Spacing, MenuKeyboardNavigation],
  props: {
    modelValue: String,
    placeholder: String,
    navbar: Boolean,
    simple: Boolean
  },
  emits: ['update:modelValue', 'clickSearch', 'focus', 'enter', 'clear'],
  data() {
    return {
      valueInternal: '',
      spacingClasses: []
    } as AquaMobileSearchbarData
  },
  computed: {
    colors() {
      return colors
    }
  },
  watch: {
    modelValue(newValue) {
      this.valueInternal = newValue
    }
  },
  mounted() {
    this.SetSpacingClasses()

    if (this.modelValue) this.valueInternal = this.modelValue

    // The next few lines need some explaining. JAWS gets
    // 'weird' when you nest focusable sub-elements within a combobox.
    // The only solution I've found is to make those elements
    // also have a role of combobox.
    const input = this.$el.querySelector('input')
    if (input) {
      input.setAttribute('role', 'combobox')
    }
    const clear = this.$el.querySelector('.clearTextButton')
    if (clear) {
      clear.setAttribute('role', 'combobox')
    }
  },
  methods: {
    inputFocus() {
      this.$emit('focus')
    },
    inputClear() {
      // Terrible fix for JAWS
      ;(this.$refs.input as ComponentOptionsWithObjectProps).$el.querySelector('input').blur()
      setTimeout(() => {
        this.focusInput()
      }, 500)
    },
    focusInput() {
      // Can't remember why exactly this is disabled for mobile but it was causing issues for the mobile searchbar
      ;(this.$refs.input as ComponentOptionsWithObjectProps).$el.querySelector('input').focus()
    },
    onChange(value: string) {
      this.valueInternal = value
      this.$emit('update:modelValue', value)
    },
    onEnter() {
      this.$emit('enter')
    },
    onClear() {
      this.valueInternal = ''
      this.$emit('update:modelValue', '')
      this.$emit('clear')
    }
  }
}
</script>

<style lang="scss">
@use '../aqua-vars.module.scss' as *;

.aqua-mobile-searchbar {
  .search-button {
    margin-left: $aqua-spacing2;
    margin-right: $aqua-spacing2;
  }
}
</style>

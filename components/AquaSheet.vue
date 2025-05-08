<template>
  <div v-if="showSheet">
    <div
      class="aqua-sheet-backdrop"
      :class="{ openAnimation, closeAnimation }"
      :style="{ left }"
      @click="onClose"
    ></div>
    <AquaCard
      ref="sheet"
      square
      class="aqua-sheet"
      :class="[{ openAnimation, closeAnimation, noLeft }, spacingClasses]"
      :style="{ left }"
      aria-modal="true"
    >
      <AquaLayout vertical>
        <AquaLayout horizontal justify="start" align="center" class="aqua-sheet-titlebar">
          <AquaFlex flex="0">
            <h5>{{ title }}</h5>
          </AquaFlex>
          <AquaSpacer></AquaSpacer>
          <slot name="titlebar"></slot>
          <AquaFlex flex="0">
            <AquaLayout
              role="button"
              vertical
              align="center"
              justify="center"
              tabindex="0"
              class="aqua-close-button-layout"
              @click="onClose"
              @keydown.enter="onClose"
            >
              <div class="aqua-close-button-icon">
                <AquaIcon
                  icon="chevron-double-down"
                  size="30"
                  :tint="colors.aquaColorVividBlue"
                ></AquaIcon>
              </div>
              <div class="aqua-close-button-label">Done</div>
            </AquaLayout>
          </AquaFlex>
        </AquaLayout>
        <AquaLayout vertical justify="start" align="center" pa-4 class="aqua-sheet-content">
          <slot></slot>
        </AquaLayout>
      </AquaLayout>
    </AquaCard>
  </div>
</template>

<script lang="ts">
import colors from '@aqua/styles/design-system/colors.module.scss'

import { Spacing } from '../mixins/Spacing.js'
import type { ComponentOptionsWithObjectProps } from 'vue'
import { mapStores } from 'pinia'
import type { FocusID } from '@aqua/store/focusManager'
import { useFocusStore } from '@aqua/store/focusManager'

interface AquaSheetData {
  valueInternal: boolean
  showSheet: boolean
  openAnimation: boolean
  openTimer: number
  closeAnimation: boolean
  closeTimer: number
  spacingClasses: Array<string>
  focusID: FocusID | undefined
}

export default {
  name: 'AquaSheet',
  mixins: [Spacing],
  props: {
    modelValue: Boolean,
    title: String,
    left: {
      type: String,
      default: '0'
    }
  },
  emits: ['update:modelValue'],
  data: function () {
    return {
      valueInternal: false,
      showSheet: false,
      openAnimation: false,
      openTimer: -1,
      closeAnimation: false,
      closeTimer: -1,
      spacingClasses: [],
      focusID: undefined
    } as AquaSheetData
  },
  computed: {
    ...mapStores(useFocusStore),

    noLeft() {
      return this.left === undefined || this.left === '0' || this.left === '0px'
    },
    colors() {
      return colors
    }
  },
  watch: {
    modelValue(newValue) {
      this.valueInternal = newValue
      if (newValue) {
        this.focusID = this.focusStore.requestFocus()
        this.$nextTick(() => {
          this.sheetOpenAnimation()
        })
      } else {
        this.sheetCloseAnimation()
        if (this.focusID) this.focusStore.releaseFocus(this.focusID)
      }
    },
    valueInternal() {
      this.$emit('update:modelValue', this.valueInternal) // for v-model support
    }
  },
  mounted() {
    this.SetSpacingClasses()

    this.valueInternal = this.modelValue
    window.addEventListener('click', (event: MouseEvent) => this.onDocumentClick(event))
    window.addEventListener('focusin', (event: FocusEvent) => this.onFocusIn(event))
  },
  beforeUnmount() {
    window.removeEventListener('click', (event: MouseEvent) => this.onDocumentClick(event))
    window.removeEventListener('focusin', (event: FocusEvent) => this.onFocusIn(event))
  },
  methods: {
    onFocusIn(event: FocusEvent) {
      if (!event) {
        return
      }

      if (this.focusID) {
        if (!this.focusStore.hasFocus(this.focusID)) return
      }

      // If there is a dialog present, let it handle tabbing
      const dialog = document.querySelectorAll('.aqua-dialog')
      if (dialog.length) {
        return
      }

      const sheet = this.$refs.sheet
        ? (this.$refs.sheet as ComponentOptionsWithObjectProps).$el
        : null
      const target = event.target
      const targetElement = target ? (target as HTMLElement) : null
      const canStealFocus = targetElement?.closest('.aqua-searchbar') !== null // At some point we could make this check for a more generic class

      if (
        !!target &&
        !!sheet &&
        ![document, sheet].includes(target) &&
        !sheet.contains(target) &&
        !canStealFocus
      ) {
        // Something outside the sheet was focused.
        // Set focus to the first available element inside the sheet.
        const focusable = sheet.querySelectorAll(
          '.aqua-button, [href], [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length && focusable[0]) {
          focusable[0].focus()
        }
      }
    },
    onDocumentClick(event: MouseEvent) {
      this.$nextTick(() => {
        const target = event.target
        const targetElement = target ? (target as HTMLElement) : null
        this.handlDocumentClick(targetElement)
      })
    },
    handlDocumentClick(target: HTMLElement | null) {
      if (this.openAnimation) {
        return
      }
      const targetElement = target ? (target as HTMLElement) : null
      if (this.$el && this.$el.querySelector) {
        const sheet = this.$el.querySelector('.aqua-sheet')
        const dialog = document.querySelector('.aqua-dialog')
        if (
          (target && target.classList.contains('aqua-dialog-backdrop')) ||
          (dialog && dialog.contains(target)) ||
          sheet.contains(target) ||
          (target && target.classList.contains('aqua-tooltip-closebutton'))
        ) {
          // Do nothing
        } else {
          this.onClose()
        }
      }
    },
    onClose() {
      this.valueInternal = false
    },
    sheetOpenAnimation() {
      // Show the sheet
      this.showSheet = true
      // Do open animation
      this.openAnimation = false
      this.$nextTick(() => {
        if ((this.$refs.sheet as ComponentOptionsWithObjectProps).focus) {
          ;(this.$refs.sheet as ComponentOptionsWithObjectProps).focus()
        }
        this.openAnimation = true
        window.clearTimeout(this.openTimer)
        this.openTimer = window.setTimeout(() => (this.openAnimation = false), 250)
      })
    },
    sheetCloseAnimation() {
      // Do close animation
      this.closeAnimation = false
      this.$nextTick(() => {
        this.closeAnimation = true
        window.clearTimeout(this.closeTimer)
        this.closeTimer = window.setTimeout(() => {
          this.closeAnimation = false
          this.showSheet = false
        }, 250)
      })
    }
  }
}
</script>

<style scoped lang="scss">
@use '../aqua-vars.module.scss' as *;

.aqua-sheet-backdrop {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: $aqua-color-gray-800;
  opacity: 0.46;
  z-index: $aqua-zindex-sheet-backdrop;
  &.openAnimation {
    animation: backgroundOpen 150ms;
    animation-iteration-count: 1;
  }
  &.closeAnimation {
    animation: backgroundClose 260ms;
    animation-iteration-count: 1;
  }
}
.aqua-sheet {
  position: fixed;
  transform: translatez(0); // GPU hack
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0;
  background-color: $aqua-color-steel-50;
  &.noLeft {
    box-shadow: 0 0 toRem(5) toRem(-3) rgba($aqua-color-black, 0.2),
      0 0 toRem(10) toRem(1) rgba($aqua-color-black, 0.14),
      0 0 toRem(14) toRem(2) rgba($aqua-color-black, 0.12);
  }
  z-index: $aqua-zindex-sheet;
  &.openAnimation {
    animation: sheetOpen 250ms forwards;
    animation-iteration-count: 1;
  }
  &.closeAnimation {
    animation: sheetClose 260ms forwards;
    animation-iteration-count: 1;
  }
  .aqua-sheet-titlebar {
    height: toRem(50);
    background-color: $aqua-color-white;
    padding-left: toRem(20);
    padding-right: 0;

    .aqua-close-button-layout {
      width: 100%;
      border-left: toRem(1) solid $aqua-color-steel-200;
      height: toRem(50);
      transition: all 250ms;
      font-size: toRem(12);
      cursor: pointer;
      &:hover {
        background-color: $aqua-color-primary-50;
      }
    }
    .aqua-close-button-icon {
      width: toRem(24);
      height: toRem(24);
      max-height: toRem(24);
      margin: toRem(6) toRem(5) toRem(4) 0;
    }
    .aqua-close-button-label {
      margin: 0 toRem(8) toRem(8) toRem(8);
      text-align: center;
      color: $aqua-color-vivid-blue;
    }
  }
  .aqua-sheet-content {
    max-height: 80vh;
    overflow-y: auto;
  }
}
</style>

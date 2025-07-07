<template>
  <div v-if="showDialog">
    <div
      v-if="!mobile"
      role="presentation"
      class="aqua-dialog-backdrop"
      :class="{ openAnimation, closeAnimation }"
      :style="{ 'background-color': backgroundColor }"
      @click="onClickOffDialog"
    ></div>
    <AquaCard
      ref="dialog"
      tabindex="0"
      elevated
      class="aqua-dialog"
      :class="[
        {
          closebutton,
          small,
          medium,
          large,
          xlarge,
          mobile,
          bumpAnimation,
          openAnimation,
          closeAnimation,
          'pa-6': !noPadding
        },
        spacingClasses
      ]"
      aria-modal="true"
      role="dialog"
    >
      <AquaLayout vertical justify="start" align="start">
        <slot></slot>
        <AquaLayout horizontal justify="center" align="center" class="aqua-dialog-button-layout">
          <AquaSpacer v-if="!mobile"></AquaSpacer>
          <AquaButtonRow id="aqua-dialog-buttons">
            <slot name="buttons"></slot>
          </AquaButtonRow>
        </AquaLayout>
      </AquaLayout>
      <div
        v-if="closebutton"
        tabindex="0"
        class="aqua-dialog-close-button"
        aria-label="Close Dialog"
        role="button"
        @click="onClose"
        @keydown.enter="onClose"
        @keydown.space="onClose"
      >
        <AquaIcon icon="close" size="16" :tint="colors.aquaColorPrimary900"></AquaIcon>
      </div>
    </AquaCard>
  </div>
</template>

<script lang="ts">
import colors from '@aqua/styles/design-system/colors.module.scss'
import { mapStores } from 'pinia'
import { Spacing } from '../mixins/Spacing.js'
import type { ComponentObjectPropsOptions } from 'vue'
import type { FocusID } from '@aqua/store/focusManager'
import { useFocusStore } from '@aqua/store/focusManager'

interface AquaDialogData {
  valueInternal: boolean
  showDialog: boolean
  bumpAnimation: boolean
  bumpTimer: number
  openAnimation: boolean
  openTimer: number
  closeAnimation: boolean
  closeTimer: number
  spacingClasses: Array<string>
  focusID: FocusID | undefined
}

export default {
  name: 'AquaDialog',
  mixins: [Spacing],
  props: {
    modelValue: Boolean,
    closebutton: Boolean,
    modal: Boolean,
    small: Boolean,
    medium: Boolean,
    large: {
      type: Boolean,
      default: true
    },
    xlarge: Boolean,
    mobile: Boolean,
    backgroundColor: {
      type: String,
      default: 'rgba(' + colors.aquaColorGray800 + ',.46)'
    },
    noPadding: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'close'],
  data: function () {
    return {
      valueInternal: false,
      showDialog: false,
      bumpAnimation: false,
      bumpTimer: -1,
      openAnimation: false,
      openTimer: -1,
      closeAnimation: false,
      closeTimer: -1,
      spacingClasses: [],
      focusID: undefined
    } as AquaDialogData
  },
  computed: {
    ...mapStores(useFocusStore),
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
          this.dialogOpenAnimation()
        })
      } else {
        this.dialogCloseAnimation()
        if (this.focusID) this.focusStore.releaseFocus(this.focusID)
      }
    },
    valueInternal() {
      this.$emit('update:modelValue', this.valueInternal) // for v-model support
    }
  },
  // In attempt to close aqua dialog when Back/Forword button is clicked,
  // "added popstate event".
  mounted() {
    this.SetSpacingClasses()

    this.valueInternal = this.modelValue

    window.addEventListener('focusin', (event: FocusEvent) => this.onFocusIn(event))
    window.addEventListener('popstate', (event: PopStateEvent) => this.onClose())
  },
  beforeUnmount() {
    window.removeEventListener('focusin', (event: FocusEvent) => this.onFocusIn(event))
    window.removeEventListener('popstate', (event: PopStateEvent) => this.onClose())
  },
  methods: {
    onFocusIn(event: FocusEvent) {
      if (!event) {
        return
      }

      if (this.focusID) {
        if (!this.focusStore.hasFocus(this.focusID)) return
      }

      const dialogComponent = this.$refs.dialog
        ? (this.$refs.dialog as ComponentObjectPropsOptions)
        : null
      const dialog = dialogComponent?.$el as HTMLElement
      const target: HTMLElement | null = event.target as HTMLElement
      const canStealFocus = target?.closest('.aqua-searchbar') !== null // At some point we could make this check for a more generic class

      if (
        !!target &&
        !!dialog &&
        ![document, dialog].includes(target) &&
        !dialog.contains(target) &&
        !canStealFocus
      ) {
        // Something outside the dialog was focused.
        // Set focus to the first available element inside the dialog.
        const focusable = dialog.querySelectorAll(
          '.aqua-activator, .aqua-dialog-close-button, [href], [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length && focusable[0]) {
          const element: HTMLElement = focusable[0] as HTMLElement
          element.focus()
        }
      }
    },
    onClose() {
      this.valueInternal = false
      this.$emit('close')
    },
    onClickOffDialog() {
      if (!this.modal) {
        this.onClose()
      } else {
        // do "bump" animation
        this.bumpAnimation = false
        this.$nextTick(() => {
          this.bumpAnimation = true
          window.clearTimeout(this.bumpTimer)
          this.bumpTimer = window.setTimeout(() => (this.bumpAnimation = false), 150)
        })
      }
    },
    dialogOpenAnimation() {
      // Show the dialog
      this.showDialog = true
      if (!this.mobile) {
        // Do open animation
        this.openAnimation = false
        this.$nextTick(() => {
          this.setInitialFocus()
          this.openAnimation = true
          window.clearTimeout(this.openTimer)
          this.openTimer = window.setTimeout(() => (this.openAnimation = false), 150)
        })
      }
    },
    dialogCloseAnimation() {
      if (this.mobile) {
        this.showDialog = false
      } else {
        // Do close animation
        this.closeAnimation = false
        this.$nextTick(() => {
          this.closeAnimation = true
          window.clearTimeout(this.closeTimer)
          this.closeTimer = window.setTimeout(() => {
            this.closeAnimation = false
            this.showDialog = false
          }, 250)
        })
      }
    },
    setInitialFocus() {
      // Set focus to the first available element inside the dialog.
      const dialogComponent = this.$refs.dialog
        ? (this.$refs.dialog as ComponentObjectPropsOptions)
        : null
      const dialog = dialogComponent?.$el as HTMLElement
      if (dialog) {
        // Try and find a button first
        const focusable = dialog.querySelectorAll(
          '.aqua-button, .button, *[tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length && focusable[0]) {
          const element: HTMLElement = focusable[0] as HTMLElement
          element.focus()
        } else {
          // No button found - find something else
          const focusable = dialog.querySelectorAll(
            '.aqua-dialog-close-button, [href], [tabindex]:not([tabindex="-1"])'
          )
          if (focusable.length && focusable[0]) {
            const element: HTMLElement = focusable[0] as HTMLElement
            element.focus()
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
@use '../aqua-vars.module.scss' as *;

.aqua-dialog-backdrop {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba($aqua-color-gray-800, 0.46);
  z-index: $aqua-zindex-dialog-backdrop;
  &.openAnimation {
    animation: backgroundOpen 150ms;
    animation-iteration-count: 1;
  }
  &.closeAnimation {
    animation: backgroundClose 260ms;
    animation-iteration-count: 1;
  }
}
.aqua-dialog {
  display: block;
  position: fixed;
  background-color: $aqua-color-white;
  overflow: hidden;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: toRem(2);
  min-width: toRem(600);
  max-width: toRem(600);
  max-height: 90vh;
  overflow-y: auto;
  text-align: left;
  z-index: $aqua-zindex-dialog;
  &.closebutton {
    padding-top: toRem(28);
  }
  &.small {
    min-width: toRem(400);
    max-width: toRem(400);
  }
  &.medium {
    min-width: toRem(600);
    max-width: toRem(600);
  }
  &.large {
    min-width: toRem(800);
    max-width: toRem(800);
  }
  &.xlarge {
    min-width: toRem(1000);
    max-width: toRem(1000);
  }
  &.mobile {
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    transform: scale(1) translate(0, 0);
    opacity: 1;
    min-width: 100%;
    max-width: none;
    max-height: none;
  }
  &.bumpAnimation {
    animation: dialogBump 150ms;
    animation-iteration-count: 1;
  }
  &.openAnimation {
    animation: dialogOpen 250ms;
    animation-iteration-count: 1;
  }
  &.closeAnimation {
    animation: dialogClose 260ms;
    animation-iteration-count: 1;
  }
  .aqua-dialog-close-button {
    position: absolute;
    top: $aqua-spacing2;
    right: $aqua-spacing2;
    padding: toRem(8);
    cursor: pointer;
  }
  .aqua-dialog-title {
    margin-bottom: $aqua-spacing2;
  }
  .aqua-dialog-button-layout {
    width: 100%;
    padding-top: $aqua-spacing4;
  }
}
</style>

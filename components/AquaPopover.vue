<template>
  <AquaCard
    v-if="showPopover"
    ref="popover"
    class="aqua-popover"
    :class="{ mobile, 'pa-6': !mobile }"
    aria-modal="true"
  >
    <slot></slot>
  </AquaCard>
</template>

<script lang="ts">
import { debounce } from 'lodash-es'
import { mapStores } from 'pinia'
import type { ComponentOptionsWithObjectProps } from 'vue'
import type { FocusID } from '@aqua/store/focusManager'
import { useFocusStore } from '@aqua/store/focusManager'

interface AquaPopoverData {
  showPopover: boolean
  focusID: FocusID | undefined
}

export default {
  name: 'AquaPopover',
  props: {
    modelValue: Boolean,
    fullWidth: Boolean,
    positionX: [String, Number],
    positionY: [String, Number],
    justify: {
      type: String,
      default: 'center'
    },
    justifyY: {
      type: String,
      default: 'down'
    },
    mobile: Boolean
  },
  emits: ['update:modelValue', 'close'],
  data() {
    return {
      showPopover: false,
      focusID: undefined
    } as AquaPopoverData
  },
  watch: {
    modelValue(newValue) {
      this.showPopover = newValue
      if (newValue) {
        this.focusID = this.focusStore.requestFocus()
        this.$nextTick(() => {
          this.drawPopover()
        })
      } else {
        this.$emit('close')
        if (this.focusID) this.focusStore.releaseFocus(this.focusID)
      }
    },
    positionX: {
      handler(newValue) {
        if (newValue) {
          this.$nextTick(() => {
            this.drawPopover()
          })
        }
      },
      deep: true
    },
    showPopover() {
      this.$emit('update:modelValue', this.showPopover) // for v-model support
    },
    fullWidth() {
      // Re-draw the popover whenever the fullWidth boolean changes,
      // for when the popover is still open and needs to be re-drawn.
      this.$nextTick(() => {
        this.drawPopover()
      })
    },
    positionY: {
      handler(newValue) {
        if (newValue) {
          this.$nextTick(() => {
            this.drawPopover()
          })
        }
      },
      deep: true
    }
  },
  mounted() {
    window.addEventListener('click', (event: MouseEvent) => this.onDocumentClick(event))
    window.addEventListener('focusin', (event: FocusEvent) => this.onFocusIn(event))
    window.addEventListener('keydown', (event: KeyboardEvent) => this.onEsc(event))

    this.showPopover = this.modelValue
  },
  beforeUnmount() {
    window.removeEventListener('click', (event: MouseEvent) => this.onDocumentClick(event))
    window.removeEventListener('focusin', (event: FocusEvent) => this.onFocusIn(event))
    window.removeEventListener('keydown', (event: KeyboardEvent) => this.onEsc(event))
  },
  computed: {
    ...mapStores(useFocusStore)
  },
  methods: {
    onEsc(e: KeyboardEvent) {
      if (this.showPopover && e.key === 'Escape') {
        this.showPopover = false
        this.$emit('close')
      }
    },
    onDocumentClick(event: MouseEvent) {
      if (this.mobile) {
        return
      }

      const target = event.target
      const targetElement = target ? (target as HTMLElement) : null
      if (!targetElement) return

      // Check to see if the clicked element is a popover activator
      const activatorParent = targetElement.closest('.aqua-activator')
      if (activatorParent || targetElement.classList.contains('aqua-activator')) {
        // Clicked the activator element - return without closing
        return
      }

      if (event.target === this.$el || this.$el.contains(event.target)) {
        // Clicked the content of the popover return without closing
        return
      }
      this.closePopover()
    },
    closePopover() {
      // tell the toolbar component that the popover is closing. Useful for button states
      this.$emit('close')

      // Hide the popover
      if (this.$el && this.$el.style) {
        this.$el.style.opacity = 0
        this.$el.style.pointerEvents = 'none'
      }
      this.showPopover = false
    },
    onFocusIn(event: FocusEvent) {
      if (!event) {
        return
      }

      if (this.focusID) {
        if (!this.focusStore.hasFocus(this.focusID)) return
      }

      const popover = (this.$refs.popover as ComponentOptionsWithObjectProps)
        ? (this.$refs.popover as ComponentOptionsWithObjectProps).$el
        : null
      const target = event.target
      const targetElement = target ? (target as HTMLElement) : null
      if (!targetElement) return

      const canStealFocus = targetElement.closest('.aqua-searchbar') !== null // At some point we could make this check for a more generic class

      if (
        !!target &&
        !!popover &&
        ![document, popover].includes(target) &&
        !popover.contains(target) &&
        !canStealFocus
      ) {
        // Something outside the popover was focused.
        // Set focus to the first available element inside the popover.
        const focusable = popover.querySelectorAll(
          '.aqua-button, .aqua-dialog-close-button, [href], [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length && focusable[0]) {
          focusable[0].focus()
        }
      }
    },
    closeAllOtherPopovers() {
      const popovers = document.querySelectorAll('.aqua-popover')
      for (const popover of popovers) {
        const popoverVueInstance = (popover as any).__vue__
        if (popoverVueInstance !== this) {
          popoverVueInstance.closePopover()
        }
      }
    },
    drawPopover: debounce<(this: any) => void>(function () {
      this.closeAllOtherPopovers

      if (this.mobile) {
        this.$el.style.opacity = 1
        this.$el.style.pointerEvents = 'auto'
        return
      }
      const popoverRect = this.$el.getBoundingClientRect()
      const viewportWidth = document.documentElement.clientWidth
      const viewportHeight = document.documentElement.clientHeight

      if (this.justifyY === 'up') {
        this.$el.style.bottom = this.positionY + 'px'
        this.$el.style.right = 'unset'
        this.$el.style.top = 'unset'
      } else {
        this.$el.style.top = this.positionY + 'px'
        this.$el.style.right = 'unset'
        this.$el.style.bottom = 'unset'
      }

      // Make sure it doesn't go past the bottom of the screen
      if (this.positionY + popoverRect.height > viewportHeight) {
        this.$el.style.bottom = '12px'
      }

      if (this.fullWidth) {
        // Set full width
        this.$el.style.left = '12px'
        this.$el.style.right = '12px'
      } else if (this.justify === 'left' || this.justify === 'center') {
        // position it anchored to the specified anchorId
        let popoverLeft =
          this.justify === 'center' ? this.positionX - popoverRect.width / 2 : this.positionX

        // Make sure doesn't extend off the left edge of the screen
        if (popoverLeft < 0) {
          popoverLeft = 0
        }
        // Make sure doesn't extend off the right edge of the screen
        if (popoverLeft + popoverRect.width > viewportWidth) {
          // as a fallback, center it
          popoverLeft = viewportWidth - popoverRect.width - 8
        }

        this.$el.style.left = popoverLeft + 'px'
        this.$el.style.right = 'auto'
      } else if (this.justify === 'right') {
        const popoverRight = this.positionX
        this.$el.style.left = 'auto'
        this.$el.style.right = popoverRight + 'px'
      }

      if (this.justifyY === 'up') {
        // Make sure the popover doesn't extend off the top edge of the screen
        // If the top is above the 50% mark switch out to "down" justifyY
        if (popoverRect.top < viewportHeight / 2) {
          this.$el.style.top = this.positionY
          this.$el.style.bottom = 'unset'
        }
      }

      this.$el.style.opacity = 1
      this.$el.style.pointerEvents = 'auto'
    }, 200),

    async updatePopoverHeight() {
      const viewportHeight = document.documentElement.clientHeight

      if (this.justifyY === 'up') {
        this.$el.style.top = 'unset'
      } else {
        this.$el.style.bottom = 'unset'
      }

      // NOTE: the timeout is here because something is cluttering up the call stack, often preventing the right height from getting recognized right away. So we need to force the bottom overflow check - which is essentially why this method exists in the first place - to the top of the stack.
      setTimeout(() => {
        const popoverRect = this.$el.getBoundingClientRect()

        // Make sure it doesn't go past the bottom of the screen
        if (this.positionY + popoverRect.height > viewportHeight) {
          this.$el.style.bottom = '12px'
        }

        if (this.justifyY === 'up') {
          // Make sure the popover doesn't extend off the top edge of the screen
          // If the top is above the 50% mark switch out to "down" justifyY
          if (popoverRect.top < viewportHeight / 2) {
            this.$el.style.top = this.positionY
            this.$el.style.bottom = 'unset'
          }
        }
      }, 0)
    }
  }
}
</script>

<style lang="scss">
@use '../aqua-vars.module.scss' as *;

.aqua-popover {
  display: block;
  opacity: 0;
  transition: opacity 100ms;
  position: fixed;
  z-index: $aqua-zindex-popover;
  box-shadow: 0 toRem(4) toRem(8) 0 rgba($aqua-color-black, 0.5);
  border-radius: toRem(3);
  &.mobile {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    box-shadow: none;
  }
}
</style>

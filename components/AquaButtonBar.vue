<template>
  <AquaLayout
    class="AquaButtonBar"
    :class="[spacingClasses]"
    resizable
    @keydown.enter.stop.prevent="onEnter"
    @keydown.down.stop.prevent="onDownArrow"
    @keydown.up.stop.prevent="onUpArrow"
    @keydown.esc.stop.prevent="onEscape"
    @resize="onResize"
  >
    <div
      ref="liveregion"
      class="liveregion"
      role="status"
      aria-live="assertive"
      aria-atomic="true"
      aria-relevant="text"
    ></div>
    <AquaLayout horizontal justify="start" class="AquaButtonBar_layout">
      <div
        ref="buttonContainer"
        class="buttonContainer"
        :class="{ mobile }"
        :style="{
          width: totalButtonWidthStyle,
          left: `${draggingPos / 16}rem`
        }"
      >
        <template v-for="(button, index) in buttons">
          <div
            v-if="index < numButtonsToShow || mobile"
            :key="index"
            class="button aqua-text-caption"
            tabindex="0"
            :class="{
              active: index === valueInternal && !noSelect,
              disabled: isLoading
            }"
            :aria-label="(button as string)"
            @click="onClick(index)"
            @keydown.enter="onClick(index)"
          >
            {{ button }}
          </div>
        </template>

        <div
          v-if="overflowCount > 0 && !mobile"
          ref="moreButton"
          class="button more-button aqua-text-caption aqua-activator"
          tabindex="0"
          :aria-label="moreButtonLabel"
          @click="onClickMore"
          @keydown.enter="onClickMore"
        >
          <strong>{{ moreButtonLabel }}</strong>
        </div>
      </div>

      <div>
        <AquaCard v-show="showOverflowMenu" ref="overflowMenu" class="overflow-menu" elevated>
          <template v-for="(button, index) in buttons">
            <AquaMenuItem
              v-if="index >= numButtonsToShow"
              :key="index"
              :aria-label="button"
              @click="onClick(index)"
              @keydown.enter="onClick(index)"
            >
              {{ button }}
            </AquaMenuItem>
          </template>
        </AquaCard>
      </div>
    </AquaLayout>
    <AquaLayout horizontal justify="start" class="AquaButtonBar_measure">
      <div
        v-for="(button, index) in buttons"
        :key="index"
        class="button measure aqua-text-caption"
        :class="{ active: index === valueInternal && !noSelect }"
        @click="onClick(index)"
        @keydown.enter="onClick(index)"
      >
        {{ button }}
      </div>
    </AquaLayout>
  </AquaLayout>
</template>

<script lang="ts">
import { MenuKeyboardNavigation } from '../mixins/MenuKeyboardNavigation.js'
import { Spacing } from '../mixins/Spacing.js'
import type { ComponentOptionsWithObjectProps } from 'vue'

interface AquaButtonBarData {
  valueInternal: number
  numButtonsToShow: number
  overflowCount: number
  showOverflowMenu: boolean
  totalButtonWidth: number
  totalButtonWidthStyle: string
  dragging: boolean
  dragStartPos: number
  draggingPos: number
  draggingSpeed: number
  lastTouchPos: number
  dragged: boolean
  spacingClasses: Array<string>
}

export default {
  name: 'AquaButtonBar',
  mixins: [Spacing, MenuKeyboardNavigation],
  props: {
    buttons: Array,
    modelValue: Number,
    mobile: Boolean,
    isLoading: Boolean,
    disableOverflow: Boolean,
    noSelect: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  data: () =>
    ({
      valueInternal: 0,
      numButtonsToShow: 0,
      overflowCount: 0,
      showOverflowMenu: false,
      totalButtonWidth: 0,
      totalButtonWidthStyle: '',
      dragging: false,
      dragStartPos: 0,
      draggingPos: 0,
      draggingSpeed: 0,
      lastTouchPos: 0,
      dragged: false,
      spacingClasses: []
    } as AquaButtonBarData),
  computed: {
    moreButtonLabel() {
      return `More (${this.overflowCount})`
    }
  },
  watch: {
    modelValue(newValue) {
      this.valueInternal = newValue
    },
    buttons: {
      handler() {
        this.$nextTick(() => {
          this.draggingPos = 0
          this.calculateVisibleButtons()
        })
      },
      deep: true
    }
  },
  mounted() {
    this.SetSpacingClasses()

    if (this.modelValue) {
      this.valueInternal = this.modelValue
    }

    window.addEventListener('click', (event: MouseEvent) => this.onDocumentClick(event))
    window.addEventListener('mousemove', (event: MouseEvent) => this.onMouseMove(event))
    this.$el.addEventListener('mousedown', (event: MouseEvent) => this.onMouseDown(event))
    window.addEventListener('mouseup', (event: MouseEvent) => this.onMouseUp())

    window.addEventListener('touchmove', (event: TouchEvent) => this.onTouchMove(event))
    this.$el.addEventListener('touchstart', (event: TouchEvent) => this.onTouchStart(event))
    window.addEventListener('touchend', (event: TouchEvent) => this.onMouseUp())

    this.calculateVisibleButtons()
  },
  beforeUnmount() {
    window.removeEventListener('click', (event: MouseEvent) => this.onDocumentClick(event))
    window.removeEventListener('mousemove', (event: MouseEvent) => this.onMouseMove(event))
    this.$el.removeEventListener('mousedown', (event: MouseEvent) => this.onMouseDown(event))
    window.removeEventListener('mouseup', (event: MouseEvent) => this.onMouseUp())

    window.removeEventListener('touchmove', (event: TouchEvent) => this.onTouchMove(event))
    this.$el.removeEventListener('touchstart', (event: TouchEvent) => this.onTouchStart(event))
    window.removeEventListener('touchend', (event: TouchEvent) => this.onMouseUp())
  },
  methods: {
    onResize() {
      this.calculateVisibleButtons()
    },
    onMouseMove(event: MouseEvent) {
      if (this.mobile && this.dragging) {
        const availableWidth = this.$el.clientWidth
        this.draggingPos += event.movementX
        this.draggingSpeed = event.movementX
        this.dragged = true
        if (this.draggingPos > 0) {
          this.draggingPos = 0
        }
        if (this.draggingPos < -(this.totalButtonWidth - availableWidth)) {
          this.draggingPos = -(this.totalButtonWidth - availableWidth)
        }
      }
    },
    onMouseDown(event: MouseEvent) {
      if (this.mobile && this.overflowCount) {
        this.dragging = true
        this.dragStartPos = event.clientX
        this.dragged = false
      }
    },
    onMouseUp() {
      if (this.mobile && this.dragging) {
        const availableWidth = this.$el.clientWidth
        this.dragging = false
        if (Math.abs(this.draggingSpeed) > 0) {
          const timerId = setInterval(() => {
            this.draggingSpeed *= 0.98
            this.draggingPos += this.draggingSpeed
            if (this.draggingPos > 0) {
              this.draggingPos = 0
              this.draggingSpeed = 0
            }
            if (this.draggingPos < -(this.totalButtonWidth - availableWidth)) {
              this.draggingPos = -(this.totalButtonWidth - availableWidth)
              this.draggingSpeed = 0
            }
            if (Math.abs(this.draggingSpeed) < 0.001) {
              this.draggingSpeed = 0
              clearInterval(timerId)
            }
          }, 10)
        }
      }
    },
    onTouchStart(event: TouchEvent) {
      if (this.mobile && this.overflowCount) {
        this.dragging = true
        this.dragStartPos = event.touches[0].clientX
        this.lastTouchPos = this.dragStartPos
        this.dragged = false
      }
    },
    onTouchMove(event: TouchEvent) {
      if (this.mobile && this.dragging) {
        const availableWidth = this.$el.clientWidth
        const movement = event.touches[0].clientX - this.lastTouchPos
        this.draggingPos += movement
        this.draggingSpeed = movement
        this.lastTouchPos = event.touches[0].clientX
        this.dragged = true
        if (this.draggingPos > 0) {
          this.draggingPos = 0
        }
        if (this.draggingPos < -(this.totalButtonWidth - availableWidth)) {
          this.draggingPos = -(this.totalButtonWidth - availableWidth)
        }
      }
    },
    onDocumentClick(event: MouseEvent) {
      this.$nextTick(() => {
        const menu = this.$el.querySelector('.overflow-menu')
        const moreButton = this.$el.querySelector('.more-button')

        if (menu && menu.contains(event.target)) {
          return
        }

        if (moreButton && moreButton.contains(event.target)) {
          return
        }

        this.showOverflowMenu = false
      })
    },
    onClick(index: number) {
      if (index === this.valueInternal && !this.noSelect) {
        return
      }
      if (!this.mobile || (this.mobile && !this.dragged)) {
        this.showOverflowMenu = false
        this.valueInternal = index
        this.$emit('update:modelValue', this.valueInternal)
      }
    },
    onClickMore() {
      const buttonRect = (this.$refs.buttonContainer as HTMLDivElement).getBoundingClientRect()
      ;(this.$refs.overflowMenu as ComponentOptionsWithObjectProps).$el.style.top =
        buttonRect.bottom + 'px'
      ;(this.$refs.overflowMenu as ComponentOptionsWithObjectProps).$el.style.right =
        window.innerWidth - buttonRect.right + 'px'
      this.showOverflowMenu = true
    },
    calculateVisibleButtons() {
      const availableWidth = this.$el.clientWidth
      const moreButtonWidth = 60

      // Measure each button and determine how many we can show
      let width = 0
      let numButtonsToShow = 0
      const buttons = this.$el.querySelectorAll('.button.measure')

      for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i]
        width += button.clientWidth + 3
        if (this.disableOverflow || width <= availableWidth - moreButtonWidth) {
          ++numButtonsToShow
        } else if (!this.mobile) {
          break
        }
      }

      this.totalButtonWidth = width
      this.totalButtonWidthStyle = this.mobile ? `${width / 16}rem` : 'auto'
      this.overflowCount = buttons.length - numButtonsToShow
      this.numButtonsToShow = numButtonsToShow
    },
    onDownArrow() {
      if (!this.showOverflowMenu) {
        // If the menu is not shown, show it and focus the first item
        this.showOverflowMenu = true
        this.$nextTick(() => {
          this.nextMenuItem((this.$refs.overflowMenu as ComponentOptionsWithObjectProps).$el)
          this.updateHighlightedLabel()
        })
      } else {
        // else navigate down through the menu items
        this.nextMenuItem((this.$refs.overflowMenu as ComponentOptionsWithObjectProps).$el)
        this.updateHighlightedLabel()
      }
    },
    onUpArrow() {
      if (this.showOverflowMenu) {
        // Navigate up through the menu items
        this.prevMenuItem((this.$refs.overflowMenu as ComponentOptionsWithObjectProps).$el)
        this.updateHighlightedLabel()
      }
    },
    onEscape() {
      if (this.showOverflowMenu) {
        this.showOverflowMenu = false
        this.$nextTick(() => {
          // After closing the menu set focus back to the activator
          ;(this.$refs.moreButton as HTMLDivElement).focus()
        })
      }
    },
    onEnter() {
      const highlightedItem = this.highlightedMenuItem()
      if (highlightedItem) {
        this.onClick(this.highlightedItemIndex())
      }
    },
    highlightedMenuItem() {
      if (this.buttons) {
        return this.highlightedItemIndex() >= 0 ? this.buttons[this.highlightedItemIndex()] : null
      }
      return null
    },
    highlightedItemIndex() {
      const allItems = (
        this.$refs.overflowMenu as ComponentOptionsWithObjectProps
      ).$el.querySelectorAll('.aqua-menu-item')
      for (let i = 0; i < allItems.length; i++) {
        const item = allItems[i]
        if (item.classList.contains('highlighted')) {
          return i + this.numButtonsToShow
        }
      }
      return -1
    },
    updateHighlightedLabel() {
      this.$nextTick(() => {
        const highlighted = (
          this.$refs.overflowMenu as ComponentOptionsWithObjectProps
        ).$el.querySelector('.highlighted')
        if (highlighted) {
          const label = highlighted.getAttribute('aria-label')
          ;(this.$refs.liveregion as HTMLDivElement).innerText = label
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.AquaButtonBar {
  .liveregion {
    opacity: 0;
    position: absolute;
    pointer-events: none;
  }
  .buttonContainer.mobile {
    position: relative;
    left: 0;
  }
  .button {
    display: inline-block;
    white-space: nowrap;
    background-color: $aqua-color-white;
    padding: toRem(2) $aqua-spacing2;
    border: toRem(1) solid $aqua-color-steel-400;
    border-left: none;
    cursor: pointer;
    user-select: none;
    transition: background-color 500ms;
    box-shadow: inset 0 0 0 0 $aqua-color-gray-100, inset 0 0 0 0 $aqua-color-gray-100;
    &:first-child {
      border-top-left-radius: toRem(3);
      border-bottom-left-radius: toRem(3);
      border-left: toRem(1) solid $aqua-color-steel-400;
    }
    &:last-child {
      border-top-right-radius: toRem(3);
      border-bottom-right-radius: toRem(3);
    }
    &.active {
      background-color: $aqua-color-primary-100;
    }
    &:hover {
      box-shadow: inset 0 0 toRem(96) toRem(56) $aqua-color-gray-100,
        inset toRem(96) toRem(56) 0 0 $aqua-color-gray-100;
      transition: all 0.3s ease-in;
    }
  }
  .AquaButtonBar_layout {
    display: inline-block;
    overflow: hidden;
    max-width: 100%;
  }
  .AquaButtonBar_measure {
    position: absolute;
    visibility: hidden;
  }
  .overflow-menu {
    position: fixed;
    right: 0;
    top: 0;
    bottom: auto;
    left: auto;
    z-index: 2;
    max-height: toRem(300);
    overflow-y: auto;
  }
  .disabled {
    pointer-events: none;
  }
}
</style>

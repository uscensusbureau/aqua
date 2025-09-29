<template>
  <AquaLayout
    ref="aquaToolbar"
    horizontal
    align="center"
    justify="start"
    class="aqua-toolbar"
    :class="[spacingClasses]"
    role="toolbar"
  >
    <!-- VISIBLE BUTTONS -->
    <AquaLayout horizontal class="visible-buttons" align="center" justify="start">
      <template v-for="(button, index) in buttonDisplay.visible">
        <div
          v-if="button.label"
          :key="index"
          :ref="getButtonID(button, 0)"
          class="visible-toolbar-button"
          @click="performAction(button, false)"
          @keydown.enter="performAction(button, false)"
        >
          <slot name="button" :button="button"></slot>
        </div>
        <!-- <div
          v-else-if="button.buttons && index < numButtonsToShow"
          :key="index"
        >
          <aqua-layout vertical align="stretch" justify="center">
            <div
              v-for="(stackedButton, stackedIndex) in button.buttons"
              :key="stackedIndex"
              @click="performAction(stackedButton)"
              @keydown.enter="performAction(stackedButton)"
              :ref="getButtonID(stackedButton)"
            >
              <slot name="stackedButton" :button="stackedButton"></slot>
            </div>
          </aqua-layout>
        </div> -->
        <div
          v-else
          :key="`${index}-else`"
          class="mx-1"
          :class="collapse ? 'aqua-toolbar-separator collapse' : 'aqua-toolbar-separator'"
        ></div>
      </template>
    </AquaLayout>
    <slot name="extra"></slot>

    <!-- MORE BUTTON -->
    <div v-show="overflow && isOverflowed" horizontal class="more-button aqua-activator">
      <AquaToolbarButton
        ref="moreButton"
        :label="moreButtonLabel"
        :icon="moreIcon"
        :collapse="collapse"
        tabindex="0"
        @click="onMoreButton"
        @keydown.enter="onMoreButton"
      ></AquaToolbarButton>
    </div>

    <!-- OVERFLOW MENU -->
    <AquaPopover
      v-show="showMoreMenu && !mobile"
      v-if="overflow"
      ref="menu"
      v-model="showMoreMenu"
      tabindex="0"
      class="aqua-toolbar-menu more-tools-menu-popover"
      :full-width="false"
      :position-y="positionY"
      :position-x="positionX"
      justify="left"
      :mobile="mobile"
      @keydown.down="onDownArrow"
      @keydown.up="onUpArrow"
      @keydown.enter="onEnter"
      @close="closeDropdown($event)"
    >
      <AquaLayout vertical align="stretch" justify="center">
        <template v-for="(button, index) in buttonDisplay.overflow">
          <AquaMenuItem
            v-if="button.label"
            :key="index"
            :ref="getButtonID(button, 0)"
            :active="button.states.selected"
            role="button"
            tabindex="0"
            class="aqua-activator"
            @click="performAction(button, false)"
            @keydown.enter.capture="performAction(button, false)"
          >
            <AquaLayout horizontal align="start" justify="start">
              <AquaIcon
                class="aqua-toolbar-menu-icon"
                :external-icon="button.icon"
                size="18"
                :tint="colors.aquaColorGray800"
              ></AquaIcon>
              <div class="aqua-toolbar-menu-label">
                <AquaLayout class="overflow-menu-item">
                  <span class="aqua-screenreader-only">Item {{ index + 1 }}.</span>
                  {{ button.label }}
                  <AquaDotIndicator
                    v-if="button.count > 0"
                    class="dot-container"
                    :background-color="colors.aquaColorCoral600"
                    :text-color="colors.aquaColorWhite"
                    :text="button.count"
                  ></AquaDotIndicator>
                </AquaLayout>
              </div>
            </AquaLayout>
          </AquaMenuItem>
        </template>
      </AquaLayout>
    </AquaPopover>

    <!-- MOBILE MENU -->
    <AquaCard
      v-if="showMoreMenu && mobile"
      ref="mobileMenu"
      square
      class="aqua-toolbar-menu mobile"
    >
      <AquaLayout vertical align="stretch" justify="start" class="mobile-menu-main-layout">
        <AquaFlex flex="0" tabindex="0">
          <slot name="mobileMoreMenuHeader"></slot>
        </AquaFlex>
        <AquaFlex flex="1" aqua-relative>
          <AquaLayout
            vertical
            align="stretch"
            justify="start"
            class="mobile-menu-scroll-area"
            aqua-pin-to-parent
          >
            <template v-for="(button, index) in buttonDisplay.mobile">
              <AquaMenuItem
                v-if="button.label"
                :key="index"
                :ref="getButtonID(button, 0)"
                tabindex="0"
                :aria-label="button.label"
                class="mobile-menu-item"
                :active="button.states.selected"
                @click="performAction(button, true)"
                @keydown.enter="performAction(button, true)"
              >
                <AquaLayout horizontal align="stretch" justify="start">
                  <AquaIcon
                    class="aqua-toolbar-menu-icon"
                    :external-icon="button.icon"
                    size="18"
                    :tint="colors.aquaColorGray800"
                  ></AquaIcon>
                  <div class="aqua-toolbar-menu-label">
                    <AquaLayout
                      >{{ button.label }}
                      <AquaDotIndicator
                        v-if="button.count > 0"
                        class="dot-container"
                        :background-color="colors.aquaColorCoral600"
                        :text-color="colors.aquaColorWhite"
                        :text="button.count"
                      ></AquaDotIndicator>
                    </AquaLayout>
                  </div>
                  <AquaSpacer></AquaSpacer>
                  <div v-if="button.hasSubview">
                    <AquaIcon
                      icon="chevron-right"
                      size="18"
                      :tint="colors.aquaColorGray800"
                    ></AquaIcon>
                  </div>
                </AquaLayout>
              </AquaMenuItem>
              <div v-else :key="`${index}-else`" class="aqua-toolbar-menu-separator my-1"></div>
            </template>
          </AquaLayout>
        </AquaFlex>
      </AquaLayout>
    </AquaCard>

    <!-- COLLAPSE BUTTON -->
    <AquaLayout
      v-if="!disableCollapse"
      tabindex="0"
      class="collapse-button aqua-toolbar-button"
      :class="{ collapse, mobile }"
      role="button"
      :aria-label="
        collapse ? 'Press enter to uncollapse the toolbar' : 'Press enter to collapse the toolbar'
      "
      @keydown.enter="collapseExpandMapBar"
      @click="collapseExpandMapBar"
    >
      <AquaIcon
        class="aqua-icon-toggle"
        icon="double-chevron-up"
        size="20"
        :tint="colors.aquaColorVividBlue"
      ></AquaIcon>
    </AquaLayout>
    <!-- MEASURE BUTTONS -->
    <AquaLayout v-if="overflow" horizonal class="measure-buttons">
      <template v-for="(button, index) in buttons">
        <div v-if="(button as AquaToolbarButtonType).label" :key="index" class="button measure">
          <slot name="button" :button="button"></slot>
        </div>
        <!-- <div v-else-if="button.buttons" :key="index" class="button measure">
          <aqua-layout vertical align="stretch" justify="center">
           <div
              v-for="(stackedButton, stackedIndex) in button.buttons"
              :key="stackedIndex"
            >
              <slot name="stackedButton" :button="stackedButton"></slot>
            </div>
          </aqua-layout>
        </div>-->
        <div
          v-else
          :key="`${index}-else`"
          class="mx-1 aqua-toolbar-separator button measure"
          :class="{ collapse }"
        ></div>
      </template>
    </AquaLayout>
  </AquaLayout>
</template>

<script lang="ts">
import colors from '@aqua/styles/design-system/colors.module.scss'

import moreIcon from '../images/icons/more.svg'
import { MenuKeyboardNavigation } from '../mixins/MenuKeyboardNavigation.js'
import { Spacing } from '../mixins/Spacing.js'
import type { ComponentOptionsWithObjectProps } from 'vue'

interface AquaToolbarButtonDisplay {
  overflow: Array<AquaToolbarButtonType>
  visible: Array<AquaToolbarButtonType>
  mobile: Array<AquaToolbarButtonType>
}

interface AquaToolbarButtonType {
  states: Record<string, any>
  label: string
  hasSubview: boolean
  icon: string
  count: number
  action: (buttonEl: ComponentOptionsWithObjectProps, fromMobileMenu: boolean) => void
}

interface AquaToolbarData {
  spacingClasses: Array<string>
  resizeObserver: ResizeObserver | null
  showMoreMenu: boolean
  isOverflowed: boolean
  buttonDisplay: AquaToolbarButtonDisplay
  positionY: number
  positionX: number
  moreIcon: any
}

export default {
  name: 'AquaToolbar',
  mixins: [Spacing, MenuKeyboardNavigation],
  props: {
    buttons: Array,
    mobile: Boolean,
    moreButtonLabel: {
      type: String,
      default: 'More'
    },
    overflow: Boolean,
    collapse: Boolean,
    disableCollapse: Boolean
  },
  emits: ['open', 'eventcollapse', 'button-display', 'close', 'customButtonWidth'],
  data() {
    return {
      spacingClasses: [],
      resizeObserver: null,
      showMoreMenu: false,
      isOverflowed: false,
      buttonDisplay: {
        overflow: [],
        visible: [],
        mobile: []
      },
      positionY: 0,
      positionX: 0,
      moreIcon
    } as AquaToolbarData
  },
  computed: {
    enabledButtons() {
      return this.buttons?.filter((button) => {
        return (
          ((button as AquaToolbarButtonType).states &&
            !(button as AquaToolbarButtonType).states.disabled) ||
          !(button as AquaToolbarButtonType).label
        )
      })
    },
    colors() {
      return colors
    }
  },
  watch: {
    buttons: {
      handler() {
        if (this.overflow) {
          // Waiting for re-rendering measure buttons
          this.$nextTick(this.calculateVisibleButtons)
        }
      },
      deep: true
    },
    buttonDisplay: {
      handler(val) {
        this.$emit('button-display', val)
      },
      deep: true
    }
  },
  mounted() {
    this.SetSpacingClasses()

    if (this.overflow) {
      this.resizeObserver = new ResizeObserver(() => {
        this.calculateVisibleButtons()
      })
      // Observe the element for resize
      if (this.$el) {
        this.resizeObserver.observe(this.$el)
      }
      this.calculateVisibleButtons()
    } else {
      this.buttonDisplay.visible = this.buttons as Array<AquaToolbarButtonType>
    }
  },
  beforeUnmount() {
    if (this.overflow) {
      this.resizeObserver?.disconnect()
    }
  },
  methods: {
    // dynamically generate unique button id from label
    getButtonID(button: AquaToolbarButtonType, index: number) {
      if (button.label) {
        return `button-${button.label.toLowerCase().replace(/\W/g, '-')}`
      } else {
        return `button${index}`
      }
    },
    performAction(button: AquaToolbarButtonType, fromMobileMenu: boolean) {
      if (button.states.disabled) {
        return
      }
      const buttonEl = (
        this.$refs[this.getButtonID(button, 0)] as Array<ComponentOptionsWithObjectProps>
      )[0]
      button.action(buttonEl, fromMobileMenu)
      if (!this.mobile || !button.hasSubview) {
        this.$nextTick(() => {
          this.showMoreMenu = false
        })
      }
    },
    onMoreButton() {
      if (!this.showMoreMenu) {
        this.$emit('open')
        const buttonRect = (
          this.$refs.moreButton as ComponentOptionsWithObjectProps
        ).$el.getBoundingClientRect()
        this.positionX = buttonRect.left
        this.positionY = buttonRect.bottom + 6
        this.showMoreMenu = true
        this.$nextTick(() => {
          ;(this.$refs.menu as ComponentOptionsWithObjectProps).$el.focus()
        })
      } else {
        this.showMoreMenu = false
        this.$emit('close')
      }
    },

    onDownArrow() {
      if (!this.overflow) {
        // If the menu is not shown, show it and focus the first item
        this.showMoreMenu = true
        this.$nextTick(() => {
          this.nextMenuItem((this.$refs.menu as ComponentOptionsWithObjectProps).$el)
        })
      } else {
        // else navigate down through the menu items
        this.nextMenuItem((this.$refs.menu as ComponentOptionsWithObjectProps).$el)
      }
    },

    onUpArrow() {
      if (this.overflow) {
        // Navigate up through the menu items
        this.prevMenuItem((this.$refs.menu as ComponentOptionsWithObjectProps).$el)
      }
    },

    onEnter() {
      const allButtons = (this.$refs.menu as ComponentOptionsWithObjectProps).$el.querySelectorAll(
        '.aqua-menu-item'
      )
      const highlightedButton = (
        this.$refs.menu as ComponentOptionsWithObjectProps
      ).$el.querySelector('.aqua-menu-item.highlighted')
      for (let i = 0; i < allButtons.length; i++) {
        if (allButtons[i] === highlightedButton) {
          this.performAction(this.buttonDisplay.overflow[i], this.mobile)
          break
        }
      }
    },

    collapseExpandMapBar() {
      this.$emit('eventcollapse')
    },

    closeDropdown(event: Event) {
      if (this.mobile) {
        return
      }

      //if clicking the more tools button, toggle menu visibility
      if (
        event &&
        (this.$refs.moreButton as ComponentOptionsWithObjectProps).$el.contains(event.target)
      ) {
        this.showMoreMenu = this.showMoreMenu ? false : true
        return
      }
    },

    onCloseMobileMenu(isLast: boolean) {
      if (isLast || isLast === undefined) {
        this.showMoreMenu = false
      }
    },

    async calculateVisibleButtons() {
      if (!this.buttons) return

      //make sure if there is a button with custom width, it's calculated now.
      this.$emit('customButtonWidth')
      await this.$nextTick()

      const collapseButtWidth = this.$el.querySelector('.collapse-button')?.clientWidth ?? 0
      const moreButtonClientWidth = (
        this.$refs.moreButton as ComponentOptionsWithObjectProps
      ).$el.getBoundingClientRect().width
      const moreButtonWidth = moreButtonClientWidth ? moreButtonClientWidth + 75 : 150

      //on mobile, it leaves extra space for the collapsed button
      //also deduct the more tools button width from available width now
      const availableWidth =
        this.$el.clientWidth > 0
          ? this.$el.clientWidth - collapseButtWidth - moreButtonWidth
          : 99999

      // Measure each button and determine how many we can show
      let width = 0
      const buttons = this.$el.querySelectorAll('.button.measure')

      this.buttonDisplay.visible = []
      this.buttonDisplay.overflow = []
      this.buttonDisplay.mobile = []
      this.isOverflowed = false
      let wantsSeparator = false

      for (let i = 0; i < buttons.length; i++) {
        const buttonObj = this.buttons[i] as AquaToolbarButtonType
        const nextButtonObj = this.buttons[i + 1] as AquaToolbarButtonType
        if (!buttonObj.label) {
          wantsSeparator = true
        }
        if (buttonObj.label && buttonObj.states && !buttonObj.states.disabled) {
          const button = buttons[i]
          width += button.clientWidth + 4
          this.buttonDisplay.mobile.push(buttonObj)
          if (width <= availableWidth) {
            this.buttonDisplay.visible.push(buttonObj)
          } else {
            this.isOverflowed = true
            this.buttonDisplay.overflow.push(buttonObj)
          }
        } else if (
          (buttonObj.label && wantsSeparator) ||
          (nextButtonObj && nextButtonObj.label && wantsSeparator)
        ) {
          wantsSeparator = false
          if (
            this.buttonDisplay.visible.length &&
            this.buttonDisplay.visible[this.buttonDisplay.visible.length - 1].label
          ) {
            // Separator
            this.buttonDisplay.visible.push({} as AquaToolbarButtonType)
          }
          if (
            this.buttonDisplay.mobile.length &&
            this.buttonDisplay.mobile[this.buttonDisplay.mobile.length - 1].label
          ) {
            // Separator
            this.buttonDisplay.mobile.push({} as AquaToolbarButtonType)
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
@use '../aqua-vars.module.scss' as *;

.aqua-toolbar {
  position: relative;
  border-bottom: toRem(1) solid $aqua-color-primary-50;
  .aqua-toolbar-separator {
    width: toRem(1);
    height: toRem(50);
    border-left: toRem(1) solid $aqua-color-vivid-blue;
    margin-top: toRem(5);
    &.collapse {
      height: toRem(18);
      margin-top: toRem(0);
    }
    + .visible-toolbar-button {
      margin-left: 0;
    }
  }
  .visible-toolbar-button {
    margin-left: toRem(2);
  }
}
.aqua-toolbar-menu {
  position: fixed;
  min-width: toRem(200);
  z-index: 100;
  overflow-y: auto;
  .aqua-toolbar-menu-icon {
    margin-right: toRem(10);
  }
  .aqua-toolbar-menu-label {
    margin-right: toRem(8);
    color: $aqua-color-gray-800;
  }
  &.mobile {
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
}
.aqua-toolbar-menu-separator {
  width: 100%;
  height: toRem(1);
  border-top: toRem(1) solid $aqua-color-gray-400;
}

.visible-buttons {
  flex: 0 0 auto;
}
.measure-buttons {
  flex: 0 0 auto;
  position: absolute;
  visibility: hidden;
}
.mobile-menu-main-layout {
  height: 100%;
}
.mobile-menu-scroll-area {
  overflow-y: auto;
}
.mobile-menu-item {
  min-height: toRem(50);
}
.dot-container {
  position: relative;
  font-size: toRem(12);
  font-weight: $aqua-font-weight-bold;
  margin-left: toRem(5);
}
.aqua-icon-toggle {
  position: relative;
  top: calc(50% - 7px);
  border-radius: 5px;
  width: 1.5rem !important;
  height: 1.5rem !important;
  max-height: 2rem !important;

  @media only screen and (max-width: $breakpoint-mobile) {
    top: calc(50% - 9px);
  }
}
.more-tools-menu-popover {
  padding: 0;
}

.aqua-toolbar-button.collapse-button {
  flex: 0 0 auto;
  cursor: pointer;
  margin-left: 0;
  margin-right: 0;
  font-size: toRem(12);
  height: toRem(61);
  &.stacked {
    height: 50%;
    min-height: 50%;
    max-height: 50%;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: start;
    text-align: left;
  }
  &:focus {
    outline: none;
  }

  transition: 0.1s;
  height: auto;
  border-radius: 5px;
  position: absolute;
  right: toRem(12);
  border: 1px solid $aqua-color-steel-200;
  margin-left: toRem(4);
  &.collapse {
    border-width: 0px;
    transform: rotate(180deg) scale(0.625);
  }
}
</style>
<style lang="scss">
.aqua-toolbar {
  .aqua-dot-indicator {
    min-width: toRem(16);
  }
}
</style>

<template>
  <AquaLayout
    horizontal
    class="aqua-searchbar"
    align="stretch"
    justify="center"
    tabindex="0"
    :class="[
      {
        navbar,
        mobile,
        simple,
        focused,
        componentHovered: hovered
      },
      spacingClasses
    ]"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @focus="inputFocus"
  >
    <AquaLayout
      vertical
      class="aqua-searchbar_layout"
      :class="{
        navbar,
        mobile,
        simple,
        focused
      }"
      role="combobox"
      aria-owns="aqua-searchbar-dropdown"
      aria-haspopup="listbox"
      :aria-expanded="showDropdown"
      @click="focusInput"
      @keydown.tab="onTab($event)"
      @keydown.down.stop.prevent="onDownArrow"
      @keydown.up.stop.prevent="onUpArrow"
      @keydown.left="onLeftArrow($event)"
      @keydown.right="onRightArrow($event)"
      @keydown.esc.stop.prevent="onEscape"
    >
      <div
        ref="liveregion"
        class="liveregion"
        role="status"
        aria-live="assertive"
        aria-atomic="true"
        aria-relevant="text"
      ></div>

      <AquaLayout
        horizontal
        align="center"
        justify="start"
        class="aqua-searchbar_input-layout"
        @click="inputFocus"
      >
        <slot name="prependSlot"></slot>
        <AquaFlex flex="1" class="input-label" @click="onClickInputLabel($event)">{{
          inputLabelDisplay
        }}</AquaFlex>

        <AquaFlex flex="0">
          <div
            :style="{ opacity: hasText ? '1' : '0' }"
            :tabindex="hasText ? '0' : '-1'"
            class="clear-button-container"
            aria-label="Clear Text"
            @click="onClear"
            @keydown.enter="onClear"
          >
            <AquaIcon
              icon="close"
              :size="mobile ? 12 : 15"
              :tint="colors.aquaColorPrimary900"
              tint-transition-time="250"
            ></AquaIcon>
          </div>
        </AquaFlex>

        <slot name="endSlot"></slot>

        <AquaFlex
          v-if="supportsSpeech"
          flex="0"
          class="speech"
          tabindex="0"
          aria-label="Speak to perform a search"
          role="button"
          @click="onSpeech"
          @keydown.enter="onSpeech"
        >
          <AquaIcon :icon="microphoneIcon" size="20" :tint="microphoneColor"></AquaIcon>
        </AquaFlex>

        <AquaFlex flex="0" center-content class="search-button-container">
          <AquaCircularFocusIndicator
            v-show="!(showDropdown && !suppressDropdown && !simple)"
            class="focus-indicator"
            :active="true"
            :offset-x="`${focusIndicatorX / 16}rem`"
            :offset-y="`${focusIndicatorY / 16}rem`"
            size="3.125rem"
          ></AquaCircularFocusIndicator>
          <AquaFlex
            center-content
            flex="0"
            class="search-button"
            :class="{ isMobile: mobile, parentHovered: hovered || focused }"
            tabindex="0"
            aria-label="Search Button"
            role="combobox"
            @mousedown="$emit('clickSearch')"
            @keydown.enter="$emit('clickSearch')"
          >
            <AquaIcon
              class="searchIcon"
              icon="search"
              :size="mobile ? 28 : 20"
              :tint="searchIconColor"
            ></AquaIcon>
          </AquaFlex>
        </AquaFlex>
      </AquaLayout>
      <AquaCard
        v-show="showDropdown && !suppressDropdown && !simple"
        id="aqua-searchbar-dropdown"
        ref="dropdown"
        class="aqua-searchbar_dropdown"
        :class="{ enableRightCol }"
        role="listbox"
        aria-label="Input dropdown"
      >
        <!-- THIS IS THE INPUT AND SEARCH BUTTON ROW -->
        <!-- NOTE THAT IT IS LOCATED ON THE DROPDOWN CARD -->
        <!-- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX -->

        <AquaLayout horizontal align="center" justify="center" class="aqua-searchbar_input-layout">
          <slot name="prependSlot"></slot>
          <AquaTextInput
            ref="input"
            v-model="valueInternal"
            class="input-component"
            simple
            :placeholder="placeholder"
            :aria-label="ariaLabel"
            :navbar="navbar"
            :mobile="mobile"
            role="combobox"
            @update:model-value="onChange"
            @enter="onEnter"
            @focus="inputFocus"
            @clear="inputClear"
          ></AquaTextInput>
          <slot ref="appendSlot" name="appendSlot"></slot>

          <AquaFlex
            v-if="supportsSpeech"
            flex="0"
            class="speech dropdown"
            tabindex="0"
            aria-label="Speak to perform a search"
            role="button"
            @click="onSpeech"
            @keydown.enter="onSpeech"
          >
            <AquaIcon :icon="microphoneIcon" size="20" :tint="microphoneColor"></AquaIcon>
          </AquaFlex>

          <AquaFlex flex="0" center-content class="dropdown-search-button">
            <AquaCircularFocusIndicator
              class="focus-indicator"
              :active="true"
              :offset-x="`${focusIndicatorX / 16}rem`"
              :offset-y="`${focusIndicatorY / 16}rem`"
              size="3.125rem"
            ></AquaCircularFocusIndicator>
            <AquaFlex
              center-content
              flex="0"
              class="search-button"
              :class="{ isMobile: mobile, parentHovered: hovered || focused }"
              tabindex="0"
              aria-label="Search Button"
              aria-roledescription="button"
              role="combobox"
              @mousedown="$emit('clickSearch')"
              @keydown.enter="$emit('clickSearch')"
              @focus="onFocusSearchButton($event)"
            >
              <AquaIcon
                class="searchIcon"
                icon="search"
                :size="mobile ? 28 : 20"
                :tint="searchIconColor"
              ></AquaIcon>
            </AquaFlex>
          </AquaFlex>
        </AquaLayout>

        <!-- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX -->

        <!-- DROPDOWN MENU ITEMS -->
        <div class="menu-items">
          <AquaLayout horizontal>
            <AquaFlex flex="1">
              <div
                ref="menuPrependSlot"
                @mousedown="onSelectPrependSlot"
                @keydown.enter="onSelectPrependSlot"
              >
                <slot name="menuItemsPrepend"></slot>
              </div>
              <div ref="menuItems">
                <div
                  v-for="(item, index) in menuItems"
                  :key="index"
                  @mousedown="onSelectItem(item)"
                  @keydown.enter="onSelectItem(item)"
                >
                  <slot name="menuitem" :item="item"></slot>
                </div>
              </div>
              <div
                ref="menuAppendSlot"
                @mousedown="onSelectAppendSlot($event)"
                @keydown.enter="onSelectAppendSlot($event)"
              >
                <slot name="menuItemsAppend"></slot>
              </div>
            </AquaFlex>
            <AquaFlex v-if="enableRightCol" ref="rightCol" flex="1" class="right-col">
              <div
                v-for="(item, index) in menuItems"
                :key="index"
                class="right-col-item"
                @mousedown="onSelectItem(item)"
                @keydown.enter="onSelectItem(item)"
              >
                <slot name="rightColSlot" :item="item"></slot>
              </div>
            </AquaFlex>
          </AquaLayout>
        </div>
      </AquaCard>
    </AquaLayout>
  </AquaLayout>
</template>

<script lang="ts">
import colors from '@aqua/styles/design-system/colors.module.scss'

import { MenuKeyboardNavigation } from '../mixins/MenuKeyboardNavigation.js'
import { Spacing } from '../mixins/Spacing.js'
import type { ComponentOptionsWithObjectProps } from 'vue'

interface AquaSearchbarData {
  valueInternal: string
  showDropdown: boolean
  suppressDropdown: boolean
  hovered: boolean
  dictating: boolean
  spacingClasses: Array<string>
}

export default {
  name: 'AquaSearchbar',
  mixins: [Spacing, MenuKeyboardNavigation],
  props: {
    ariaLabel: String,
    modelValue: String,
    placeholder: String,
    menuItems: Array,
    navbar: Boolean,
    mobile: Boolean,
    simple: Boolean,
    enableRightCol: Boolean,
    enableSpeech: Boolean,
    disabled: Boolean,
    isMobile: Boolean //TODO: revamp and consolidate mobile (only true for non-landing mobile searchbar) and isMobile (mobile layout )
  },
  emits: [
    'update:modelValue',
    'clickSearch',
    'focus',
    'blur',
    'enter',
    'clear',
    'selectMenuItem',
    'selectMenuAppendSlot',
    'selectMenuPrependSlot',
    'selectRightColSlot'
  ],
  data() {
    return {
      valueInternal: '',
      showDropdown: false,
      suppressDropdown: false,
      hovered: false,
      dictating: false,
      spacingClasses: []
    } as AquaSearchbarData
  },
  computed: {
    supportsSpeech() {
      return (
        // eslint-disable-next-line no-prototype-builtins
        this.enableSpeech && window.hasOwnProperty('webkitSpeechRecognition')
      )
    },
    searchIconColor() {
      if (this.mobile) {
        return this.colors.aquaColorVividBlue
      }
      return this.colors.aquaColorWhite
    },
    focusIndicatorX() {
      if (this.mobile) {
        return 21 + 5
      } else {
        return 21
      }
    },
    focusIndicatorY() {
      if (this.mobile) {
        return 21 - 7
      } else {
        return 19
      }
    },
    inputLabelDisplay() {
      return this.valueInternal?.length ? this.valueInternal : this.placeholder
    },
    hasText() {
      return this.valueInternal?.trim().length
    },
    microphoneIcon() {
      return this.dictating ? 'mic-active' : 'mic'
    },
    microphoneColor() {
      return this.dictating ? colors.aquaColorCoral900 : colors.aquaColorPrimary900
    },
    colors() {
      return colors
    },
    focused() {
      return this.showDropdown
    }
  },
  watch: {
    modelValue(newValue) {
      this.valueInternal = newValue
    },
    showDropdown() {
      // Even though the aqua-searchbar component has an aria-expanded attribute,
      // JAWS doesn't seem to recognize that unless the attribute is also on the core input tag.
      const input = this.$el.querySelector('input')
      if (input) {
        input.setAttribute('aria-expanded', this.showDropdown ? 'true' : 'false')
      }
    }
  },
  mounted() {
    this.SetSpacingClasses()

    if (this.modelValue) this.valueInternal = this.modelValue

    window.addEventListener('click', (event: MouseEvent) => this.onDocumentClick())
    window.addEventListener('keyup', (event: KeyboardEvent) => this.onDocumentClick())

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
  beforeUnmount() {
    window.removeEventListener('click', (event: MouseEvent) => this.onDocumentClick())
    window.removeEventListener('keyup', (event: KeyboardEvent) => this.onDocumentClick())
  },
  methods: {
    onSpeech() {
      /* eslint-disable no-prototype-builtins */
      /* eslint-disable new-cap */
      /* eslint-disable no-undef */
      if (window.hasOwnProperty('webkitSpeechRecognition')) {
        const recognition = new (window as any).webkitSpeechRecognition()

        recognition.continuous = false
        recognition.interimResults = false

        recognition.lang = 'en-US'
        recognition.start()

        this.dictating = true

        recognition.onresult = (e: any) => {
          // no idea what type this is
          this.dictating = false
          this.showDropdown = false
          this.valueInternal = e.results[0][0].transcript
          this.$emit('update:modelValue', this.valueInternal)
          this.$emit('enter')
          recognition.stop()
        }

        recognition.onerror = () => {
          this.dictating = false
          recognition.stop()
        }
      }
    },
    onClickInputLabel(event: MouseEvent) {
      let range

      // Figure out where the user clicked within the input label and place the caret there on the actual input element

      if ((document as any).caretPositionFromPoint) {
        // standard
        range = (document as any).caretPositionFromPoint(event.pageX, event.pageY)
      } else if ((document as any).caretRangeFromPoint) {
        // WebKit
        range = (document as any).caretRangeFromPoint(event.pageX, event.pageY)
      }

      const input = (this.$refs.input as ComponentOptionsWithObjectProps).$el.querySelector('input')
      input.focus()
      input.setSelectionRange(range.startOffset, range.endOffset)
    },
    onDocumentClick() {
      // Close the dropdown when the user clicks outside the searchbar.
      this.$nextTick(() => {
        // But, first check to see if any of the searchbar's children have focus.
        const focusedElement = document.querySelector(':focus')
        // If so, don't close the dropdown.
        if (!focusedElement || !this.$el.contains(focusedElement)) {
          this.closeDropdown()
        }
      })
    },
    inputFocus() {
      // do not focus if user pressed end slot (one of the buttons on the search bar)
      if (!this.disabled) {
        // Position and open the dropdown
        ;(this.$refs.dropdown as ComponentOptionsWithObjectProps).$el.style.top = '-2px'
        ;(this.$refs.dropdown as ComponentOptionsWithObjectProps).$el.style.overflow = 'visible'
        this.showDropdown = true
        this.suppressDropdown = false
        this.hovered = true
        const input = (this.$refs.input as ComponentOptionsWithObjectProps).$el.querySelector(
          'input'
        )
        this.$nextTick(() => {
          input.focus()
        })

        // Keeping this around for now
        // const input = this.$refs.input.$el.querySelector('input')
        // if (input.setSelectionRange) {
        //   input.focus()
        //   input.setSelectionRange(0, 0)
        // } else if (input.createTextRange) {
        //   const t = input.createTextRange()
        //   t.collapse(true)
        //   t.moveEnd('character', 0)
        //   t.moveStart('character', 0)
        //   t.select()
        // }

        this.$emit('focus')
      }
    },
    inputClear() {
      // Terrible fix for JAWS
      ;(this.$refs.input as ComponentOptionsWithObjectProps).$el.querySelector('input').blur()
      this.closeDropdown()
      setTimeout(() => {
        this.focusInput()
      }, 500)
    },
    focusInput() {
      // Can't remember why exactly this is disabled for mobile but it was causing issues for the mobile searchbar
      if (!this.mobile && !this.isMobile) {
        ;(this.$refs.input as ComponentOptionsWithObjectProps).$el.querySelector('input').focus()
      }
    },
    // TODO: move this up into Searchbar.vue
    onFocusSearchButton(event: FocusEvent) {
      const target = event.target
      const relatedTarget = target ? (target as HTMLElement) : null
      if (!relatedTarget) return

      // If the user has SHIFT/TAB backwards into the searchbar focus the input
      if (relatedTarget && relatedTarget.classList.contains('advanced-search')) {
        this.$el.querySelector('input').focus()
      }
    },
    onChange(value: string) {
      this.valueInternal = value
      this.$emit('update:modelValue', value)
      this.suppressDropdown = false
    },
    onEnter() {
      if (this.isPrependMenuItemHighlighted()) {
        this.onSelectPrependSlot()
      } else if (this.isAppendMenuItemHighlighted()) {
        this.onSelectAppendSlot(null)
      } else {
        const highlightedIndex = this.highlightedMenuItemIndex()
        if (highlightedIndex >= 0) {
          if (this.menuItems) {
            const highlightedMenuItem = this.menuItems[highlightedIndex]
            this.onSelectItem(highlightedMenuItem)
          }
        } else if (this.isRightColMenuItemHighlighted()) {
          // This will need some expanding upon when multiple right column items are to be supported
          return this.onSelectRightColSlot()
        } else {
          this.$emit('enter')
        }
      }
      this.$nextTick(() => {
        this.closeDropdown()
      })
    },
    onSelectItem(item: any) {
      this.$nextTick(() => {
        this.closeDropdown()
      })
      this.$emit('selectMenuItem', item)
    },
    onSelectPrependSlot() {
      this.$nextTick(() => {
        this.closeDropdown()
      })
      this.$emit('selectMenuPrependSlot')
    },
    onSelectAppendSlot(event: MouseEvent | KeyboardEvent | null) {
      const target = event?.target
      const targetElement = target ? (target as HTMLElement) : null

      if (
        event === null ||
        (event && targetElement && targetElement.classList.contains('aqua-menu-item'))
      ) {
        this.$emit('selectMenuAppendSlot')
        this.closeDropdown()
      }
    },
    onSelectRightColSlot() {
      this.$nextTick(() => {
        this.closeDropdown()
      })
      this.$emit('selectRightColSlot')
    },
    onTab(event: KeyboardEvent) {
      const target = event.target
      const targetElement = target ? (target as HTMLElement) : null

      let tabbedOut = false
      if (targetElement) {
        if (event.shiftKey && targetElement.tagName === 'INPUT') {
          tabbedOut = true
        }
      }
      if (tabbedOut) {
        this.closeDropdown()
        this.updateHighlightedLabel()
      }
    },
    onDownArrow() {
      if (!this.showDropdown || this.suppressDropdown) {
        // If the menu is not shown, show it and focus the first item
        this.suppressDropdown = false
        this.showDropdown = true
        this.$nextTick(() => {
          this.nextMenuItem((this.$refs.dropdown as ComponentOptionsWithObjectProps).$el)
          this.updateHighlightedLabel()
        })
      } else {
        // else navigate down through the menu items
        this.nextMenuItem((this.$refs.dropdown as ComponentOptionsWithObjectProps).$el)
        this.updateHighlightedLabel()
      }
    },
    onUpArrow() {
      if (this.showDropdown) {
        // Navigate up through the menu items
        this.prevMenuItem((this.$refs.dropdown as ComponentOptionsWithObjectProps).$el)
        this.updateHighlightedLabel()
      }
    },
    onLeftArrow(event: KeyboardEvent) {
      const highlightedChipsElement = this.$el.querySelector(
        '.aqua-menu-item.hasSubItems.highlighted'
      )
      if (highlightedChipsElement) {
        event.stopPropagation()
        event.preventDefault()
        this.goLeft(highlightedChipsElement)
        this.updateHighlightedLabel()
      }
    },
    onRightArrow(event: KeyboardEvent) {
      const highlightedChipsElement = this.$el.querySelector(
        '.aqua-menu-item.hasSubItems.highlighted'
      )
      if (highlightedChipsElement) {
        event.stopPropagation()
        event.preventDefault()
        this.goRight(highlightedChipsElement)
        this.updateHighlightedLabel()
      }
    },
    onEscape() {
      if (this.showDropdown) {
        this.unhighlightAll((this.$refs.dropdown as ComponentOptionsWithObjectProps).$el)
        this.suppressDropdown = true
      }
    },
    closeDropdown() {
      this.$emit('blur')
      if (this.$refs.dropdown as ComponentOptionsWithObjectProps) {
        this.unhighlightAll((this.$refs.dropdown as ComponentOptionsWithObjectProps).$el)
      }
      this.showDropdown = false
    },
    hasPrependContents() {
      const slotItems = (
        this.$refs.menuPrependSlot as ComponentOptionsWithObjectProps
      ).querySelectorAll('.aqua-menu-item')
      return !!(slotItems && slotItems.length)
    },
    numAppendItems() {
      const slotItems = (
        this.$refs.menuAppendSlot as ComponentOptionsWithObjectProps
      ).querySelectorAll('.aqua-menu-item')
      return slotItems ? slotItems.length : 0
    },
    numMenuItems() {
      const menuItems = (this.$refs.menuItems as ComponentOptionsWithObjectProps).querySelectorAll(
        '.aqua-menu-item'
      )
      return menuItems && menuItems.length ? menuItems.length : 0
    },
    highlightedMenuItem() {
      if (!this.menuItems) return null
      return this.highlightedMenuItemIndex() >= 0
        ? this.menuItems[this.highlightedMenuItemIndex()]
        : null
    },
    highlightedItemIndex() {
      const allItems = (
        this.$refs.dropdown as ComponentOptionsWithObjectProps
      ).$el.querySelectorAll('.aqua-menu-item')
      for (let i = 0; i < allItems.length; i++) {
        const item = allItems[i]
        if (item.classList.contains('highlighted')) {
          return i
        }
      }
      return -1
    },
    highlightedMenuItemIndex() {
      const allItems = (this.$refs.menuItems as ComponentOptionsWithObjectProps).querySelectorAll(
        '.aqua-menu-item'
      )
      for (let i = 0; i < allItems.length; i++) {
        const item = allItems[i]
        if (item.classList.contains('highlighted')) {
          return i
        }
      }
      return -1
    },
    isPrependMenuItemHighlighted() {
      return this.hasPrependContents() && this.highlightedItemIndex() === 0
    },
    isAppendMenuItemHighlighted() {
      const highlightedSlotItem = (
        this.$refs.menuAppendSlot as ComponentOptionsWithObjectProps
      ).querySelector('.aqua-menu-item.highlighted')
      return !!highlightedSlotItem
    },
    isRightColMenuItemHighlighted() {
      if (this.$refs.rightCol) {
        const highlightedSlotItem = (
          this.$refs.rightCol as ComponentOptionsWithObjectProps
        ).$el.querySelector('.aqua-menu-item.highlighted')
        return !!highlightedSlotItem
      }
      return false
    },
    updateHighlightedLabel() {
      this.$nextTick(() => {
        let highlighted = (
          this.$refs.dropdown as ComponentOptionsWithObjectProps
        ).$el.querySelector('[subItemHighlight]')
        if (!highlighted) {
          highlighted = (this.$refs.dropdown as ComponentOptionsWithObjectProps).$el.querySelector(
            '.highlighted'
          )
        }
        if (highlighted) {
          const label = highlighted.getAttribute('aria-label')
          ;(this.$refs.liveregion as HTMLElement).innerText = label
        } else {
          ;(this.$refs.liveregion as HTMLElement).innerText = 'No selection.'
        }
      })
    },
    setLiveRegionText(text: string) {
      ;(this.$refs.liveregion as HTMLElement).innerText = text
    },
    onMouseEnter() {
      this.hovered = true
    },
    onMouseLeave() {
      this.hovered = false
    },
    onClear() {
      this.valueInternal = ''
      this.$emit('update:modelValue', this.valueInternal)
      this.$emit('clear')
    }
  }
}
</script>

<style lang="scss">
@use '../aqua-vars.module.scss' as *;

.aqua-searchbar {
  flex: 1 1 auto;
  position: relative;
  transition: box-shadow 250ms;
  &:focus {
    outline: none;
  }
  .aqua-searchbar_layout {
    cursor: text;
    border-right: none;
    border-radius: toRem(2);
    height: toRem(45);
    padding-left: $aqua-spacing3;
    transition: background-color 500ms, box-shadow 250ms;
    &.simple {
      height: toRem(38);
      border: toRem(1) solid $aqua-color-steel-400;
      border-radius: toRem(2);
      padding: toRem(1) toRem(7) toRem(1) toRem(13);
      &:active,
      &:hover,
      &.focused {
        border: toRem(2) solid $aqua-color-vivid-blue;
        padding: 0 toRem(6) 0 toRem(12);
      }
      *.focused {
        box-shadow: 0 toRem(1) toRem(8) 0 rgba($aqua-color-black, 0.2);
      }
    }
    .aqua-searchbar_input-layout {
      font-size: toRem(16);
      height: 100%;
      text-align: left;
      margin-left: $aqua-spacing2;
      .input-label {
        margin-left: toRem(2);
        margin-right: $aqua-spacing4;
        white-space: nowrap;
        overflow: hidden;
        color: $aqua-color-gray-600;
      }
      .input-component {
        margin-top: toRem(-4);
        border-bottom: toRem(1) solid rgba(0, 0, 0, 0.2);
      }
      .clear-button-container {
        position: relative;
        color: $aqua-color-primary-900;
        padding: toRem(4);
        margin-right: $aqua-spacing3;
        top: toRem(2);
        left: toRem(-3);
        cursor: pointer;
      }
    }
    .aqua-searchbar_dropdown {
      position: absolute;
      overflow: visible;
      left: toRem(-2);
      right: toRem(-2);
      top: 0;
      z-index: 9;
      font-size: toRem(16);
      font-weight: 400;
      max-height: toRem(520);
      overflow-y: auto;
      border: toRem(2) solid $aqua-color-white;
      border-top-left-radius: toRem(20);
      border-top-right-radius: toRem(20);
      border-bottom-left-radius: toRem(20);
      border-bottom-right-radius: toRem(20);
      background-color: $aqua-color-warm-gray-lighter;
      .aqua-searchbar_input-layout {
        width: auto;
        margin-top: toRem(2);
      }
      &.enableRightCol {
        right: toRem(-200);
      }
      .aqua-menu-item {
        padding: $aqua-spacing2 $aqua-spacing5;
      }
      .right-col {
        max-width: toRem(288);
      }
      .menu-items {
        height: 100%;
        max-height: toRem(300);
        overflow-y: auto;
      }
    }
    .liveregion {
      opacity: 0;
      position: absolute;
      pointer-events: none;
    }
  }
  .mobile.aqua-searchbar_layout {
    background-color: transparent;
    border: none;
    &:active,
    &:hover,
    &.focused {
      background-color: transparent;
      border: none;
      padding: toRem(1) toRem(7) toRem(1) toRem(13);
    }
  }
  &:not(.mobile) {
    border-radius: toRem(24) !important;
    .search-button-container {
      position: relative;
      top: toRem(2);
    }
  }
  .aqua-card {
    box-shadow: 0 toRem(1) toRem(8) 0 rgba($aqua-color-black, 0.2);
  }
  &:not(.navbar) {
    &:not(.focused) {
      box-shadow: none;
    }
  }
  &:not(.navbar) {
    .aqua-searchbar_layout {
      padding-right: 0;
      border-right: none;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  &:not(.mobile) {
    .aqua-searchbar_layout {
      border-radius: toRem(24) !important;
      box-shadow: 0 0 toRem(5) rgba(0, 0, 0, 0.2) !important;
      background-color: $aqua-color-white;
      transition: all 250ms;
      &.focused {
        // border: 1.5px solid $aqua-color-vivid-blue !important;
        box-shadow: none !important;
        border: toRem(1.5) solid transparent;
        .search-button {
          background-color: $aqua-color-vivid-blue;
        }
      }
    }
    &.componentHovered {
      .aqua-searchbar_layout {
        border: toRem(1.5) solid rgba($aqua-color-vivid-blue, 0.5) !important;
      }
    }

    .aqua-searchbar_layout {
      border-radius: toRem(24) !important;
      border: toRem(1.5) solid transparent !important;
      transition: all 250ms;
      &.focused {
        .search-button {
          background-color: $aqua-color-vivid-blue;
        }
      }
    }

    .search-button:hover {
      .aqua-icon {
        background-color: $aqua-color-white !important;
      }
    }
  }

  .aqua-text-input_content {
    padding-left: $aqua-spacing3;
    padding-right: $aqua-spacing3;
    .close {
      padding: $aqua-spacing2;
      .aqua-icon {
        height: toRem(14) !important;
        width: toRem(14) !important;
        max-height: toRem(14) !important;
      }
    }
  }

  .search-button {
    &.isMobile {
      margin-left: $aqua-spacing3;
    }
  }
  &:not(.mobile) {
    .search-button {
      z-index: 4;
      border: toRem(2) solid $aqua-color-vivid-blue;
      background-color: $aqua-color-vivid-blue;
      color: $aqua-color-white;
      margin-left: toRem(8);
      height: toRem(41);
      width: toRem(41);
      text-align: center;
      text-transform: uppercase;
      font-family: $aqua-font-family;
      font-weight: $aqua-font-weight-bold;
      transition: all 250ms;
      cursor: pointer;
      &:focus,
      &:hover {
        background-color: $aqua-color-vivid-blue;
      }
      &:active {
        background-color: $aqua-color-vivid-blue;
      }
      &.isMobile {
        margin-left: $aqua-spacing2;
        margin-right: $aqua-spacing2;
      }
      &.parentHovered {
        opacity: 1;
        background-color: $aqua-color-vivid-blue;
      }
    }
    .search-button {
      height: toRem(35);
      width: toRem(35);
      border-radius: toRem(20);
      margin: toRem(3);
      margin-right: toRem(5);
      position: relative;
      top: toRem(-2);
    }
    &.mobile .search-button {
      background-color: transparent;
    }
  }

  .focus-indicator {
    opacity: 0;
    transform: scale(0);
  }
  &.componentHovered .focus-indicator,
  &.focused .focus-indicator {
    opacity: 0.25;
    transform: scale(1);
  }

  .speech {
    cursor: pointer;
    padding: $aqua-spacing2;
    position: relative;
    top: toRem(2);
    &.dropdown {
      top: 0;
    }
  }

  .dropdown-search-button {
    position: relative;
    top: toRem(-1);
  }
}
</style>

<template>
  <AquaLayout
    class="aqua-dropdown"
    :class="[spacingClasses]"
    :aria-controls="ariaControls"
    vertical
    align="start"
    justify="end"
    @keydown.enter.stop.prevent="onEnter"
    @keydown.down.stop.prevent="onDownArrow"
    @keydown.up.stop.prevent="onUpArrow"
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
    <div
      v-if="label && label.trim().length"
      ref="label"
      class="aqua-dropdown_label"
      :aria-labe="ariaLabel"
    >
      {{ label }}
    </div>
    <AquaLayout
      ref="activator"
      tabindex="0"
      role="combobox"
      :aria-expanded="showMenu"
      :aria-controls="ariaControls"
      horizontal
      align="center"
      justify="start"
      class="aqua-dropdown_activator nowrap py-1"
      :class="{ outlined, condensed, disabled: isDisabled }"
      :aria-label="ariaLabel"
      @click="onClickActivator"
      @keydown.tab="onTab"
    >
      <template v-if="isString(displayText)">
        <AquaFlex
          v-if="displayText.trim().length && items"
          flex="1"
          class="nowrap"
          :style="`color: ${textColor}`"
        >
          <slot name="selection" :item="items[selectedIndex]">
            <div>{{ items[selectedIndex] }}</div>
          </slot>
        </AquaFlex>
        <AquaFlex v-else flex="1" class="placeholder">
          <div>{{ placeholder }}</div>
        </AquaFlex>
      </template>
      <template v-else>
        <AquaFlex v-if="items" flex="1" class="nowrap" :style="`color: ${textColor}`">
          <slot name="selection" :item="items[selectedIndex]">
            <span>{{ items[selectedIndex] }}</span>
          </slot>
        </AquaFlex>
      </template>
      <AquaFlex flex="0">
        <div class="chevron" :class="{ rotate: showMenu, condensed, disabled: isDisabled }">
          <AquaIcon
            icon="chevron-down"
            size="20"
            tint-transition-time="100"
            :tint="textColor"
          ></AquaIcon>
        </div>
      </AquaFlex>
    </AquaLayout>

    <AquaCard
      v-show="showMenu"
      ref="menu"
      class="aqua-dropdown_menu"
      elevated
      :class="{ 'has-label': label && label.trim().length }"
      role="listbox"
      :aria-label="ariaLabel"
    >
      <AquaTextInput
        v-if="searchable"
        v-model="searchText"
        search
        aria-label="Search within dropdown menu"
        placeholder="Search"
        class="searchbar"
      ></AquaTextInput>

      <template v-if="disableVirtualScroll">
        <AquaMenuItem
          v-for="(item, index) in filteredItems"
          :key="index"
          :selected="index === filteredSelectedIndex"
          :aria-label="getMenuItemAriaTag(item)"
          :wrap="wrapMenuItems"
          @click="onClickMenuItem(item, index)"
          @keydown.enter="onClickMenuItem(item, index)"
        >
          <slot name="item" :item="item">
            <span>{{ item }}</span>
          </slot>
        </AquaMenuItem>
      </template>
      <AquaScroller
        v-else
        v-slot="slotProps"
        :scroller-items="filteredItems"
        :scroller-key="itemValue"
        :scroller-height="menuItemsHeight"
      >
        <AquaMenuItem
          :key="slotProps.scrollIndex"
          :selected="slotProps.scrollIndex === filteredSelectedIndex"
          :aria-label="getMenuItemAriaTag(slotProps.scrollItem)"
          :wrap="wrapMenuItems"
          @click="onClickMenuItem(slotProps.scrollItem, slotProps.scrollIndex)"
          @keydown.enter="onClickMenuItem(slotProps.scrollItem, slotProps.scrollIndex)"
        >
          <slot name="item" :item="slotProps.scrollItem">
            <span>{{ slotProps.scrollItem }}</span>
          </slot>
        </AquaMenuItem>
      </AquaScroller>
    </AquaCard>
  </AquaLayout>
</template>

<script lang="ts">
import { debounce } from 'lodash-es'
import type { ComponentObjectPropsOptions } from 'vue'
import colors from '@aqua/styles/design-system/colors.module.scss'

import { MenuKeyboardNavigation } from '../mixins/MenuKeyboardNavigation.js'
import { Spacing } from '../mixins/Spacing.js'

import { aquaRelativePosition } from '../service/position'

interface AquaDropdownData {
  displayText: string
  selectedIndex: number
  filteredSelectedIndex: number
  showMenu: boolean
  searchText: string
  filteredItems: Array<Record<any, any>>
  spacingClasses: Array<string>
  menuItemsHeight: string
}

export default {
  name: 'AquaDropdown',
  mixins: [Spacing, MenuKeyboardNavigation],
  props: {
    modelValue: [String, Object],
    items: Array,
    itemLabel: String,
    itemValue: String,
    ariaLabel: String,
    ariaControls: String,
    label: String,
    placeholder: String,
    outlined: Boolean,
    condensed: Boolean,
    disableDropdownOnSingleItem: Boolean,
    bottomAlignDropdown: Boolean,
    searchable: Boolean,
    disableVirtualScroll: Boolean,
    disabled: {
      type: Boolean,
      default: false
    },
    textColor: {
      type: String,
      default: colors.aquaColorSteel700
    },
    wrapMenuItems: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'activate', 'deactivate'],
  data() {
    return {
      displayText: '',
      selectedIndex: 0,
      filteredSelectedIndex: 0,
      showMenu: false,
      searchText: '',
      filteredItems: this.items,
      spacingClasses: [],
      menuItemsHeight: '18.75rem'
    } as AquaDropdownData
  },
  computed: {
    colors() {
      return colors
    },
    isDisabled() {
      return (
        (this.disableDropdownOnSingleItem && this.items && this.items.length <= 1) || this.disabled
      )
    }
  },
  watch: {
    showMenu(val) {
      // emit "deacticate" event, only when the value turns to "false"
      if (!val) {
        this.$emit('deactivate', (this.$refs.menu as ComponentObjectPropsOptions).$el)
      }
    },
    modelValue: {
      handler(newValue) {
        this.selectItemByValue(newValue, false)
      },
      deep: true
    },
    items: {
      handler(newValue) {
        this.filteredItems = newValue
        this.selectedIndex = 0
        this.filteredSelectedIndex = 0
        this.selectItemByValue(this.modelValue, false)
      },
      deep: true
    },
    searchText: debounce<(this: any, newValue: string) => void>(function (newValue) {
      newValue = newValue.toUpperCase()

      const newItems: Array<Record<any, any>> = []

      this.items.forEach((item: any) => {
        if (
          (this.isString(item) === true && item.toUpperCase().includes(newValue)) ||
          (this.itemLabel !== undefined &&
            this.isString(item[this.itemLabel]) === true &&
            item[this.itemLabel].toUpperCase().includes(newValue)) ||
          item[this.itemValue].toUpperCase().includes(newValue)
        ) {
          newItems.push(item)
        }
      })

      this.filteredSelectedIndex = -1
      this.filteredItems = newItems
    }, 1000)
  },
  mounted() {
    this.SetSpacingClasses()
    window.addEventListener('click', (event: MouseEvent) => this.onClickDocument(event))
    this.selectItemByValue(this.modelValue, false)
    /**
     * provide warning in the event itemValue and itemLabel are not
     * passed in when items is an array of objects
     */
    if (this.items && typeof this.items[0] === 'object' && (!this.itemValue || !this.itemLabel)) {
      console.error(
        'when passing items as an array of objects, itemLabel and itemValue props are both required'
      )
    }
  },
  beforeUnmount() {
    window.removeEventListener('click', (event: MouseEvent) => this.onClickDocument(event))
  },
  methods: {
    onClickActivator() {
      if (this.isDisabled) {
        return
      }

      // Close if dropdown is open
      if (this.showMenu) {
        this.showMenu = false
        return
      }

      // Open the dropdown
      this.showMenu = true

      // Position the dropdown
      const labelHeight =
        this.label && this.label.trim().length
          ? (this.$refs.label as HTMLDivElement).clientHeight + 4
          : 0

      const menuEl = (this.$refs.menu as ComponentObjectPropsOptions).$el as HTMLElement
      if (menuEl) {
        this.$nextTick(() => {
          aquaRelativePosition(this.$el, menuEl, 'below', labelHeight + 6)
          this.$emit('activate', this.$refs.menu)
        })
      }
    },
    onClickMenuItem(item: any, index: number) {
      this.filteredSelectedIndex = index

      const value = this.isString(item) ? item : item[this.itemValue as string]

      if (value === null || value === undefined) return

      this.selectItemByValue(value, true)
      this.showMenu = false
      this.$nextTick(() => {
        // After selecting an item set focus back to the activator
        if (this.$refs.activator) {
          const activatorComponent = this.$refs.activator as ComponentObjectPropsOptions
          const activatorElement = activatorComponent.$el
            ? (activatorComponent.$el as HTMLElement)
            : null
          if (activatorElement) activatorElement.focus()
        }
      })
    },
    onClickDocument(event: MouseEvent) {
      const eventTarget = event.target ? (event.target as HTMLElement) : null

      const activatorComponent = this.$refs.activator as ComponentObjectPropsOptions
      if (!activatorComponent) {
        return
      }
      const activatorElement = activatorComponent.$el
        ? (activatorComponent.$el as HTMLElement)
        : null

      const menuComponent = this.$refs.menu as ComponentObjectPropsOptions
      if (!menuComponent) {
        return
      }
      const menuElement = menuComponent.$el ? (menuComponent.$el as HTMLElement) : null

      if (menuElement && menuElement.contains(eventTarget)) {
        return
      }

      if (activatorElement && activatorElement.contains(eventTarget)) {
        return
      }

      this.filteredSelectedIndex = this.selectedIndex
      this.showMenu = false
    },
    onTab() {
      this.showMenu = false
    },
    selectItemByValue(value: any, doEmit: boolean) {
      if (!this.items) return
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i] as any
        if (this.isString(item)) {
          if (item === value) {
            this.selectedIndex = i
            this.filteredSelectedIndex = this.filteredItems.indexOf(item)
            this.displayText = item
            if (doEmit === true) {
              this.$emit('update:modelValue', item)
            }
            break
          }
        } else {
          const itemValue = this.itemValue
          const itemLabel = this.itemLabel
          if (itemLabel && itemValue) {
            if (item[itemValue] === value) {
              this.selectedIndex = i
              this.filteredSelectedIndex = this.filteredItems.findIndex(
                (item) => item[itemValue] === value
              )
              this.displayText = item[itemLabel]
              if (doEmit === true) {
                this.$emit('update:modelValue', item[itemValue])
              }
              break
            }
          }
        }
      }
      this.showMenu = false
    },
    isString(item: any) {
      return typeof item === 'string'
    },
    onEnter() {
      const highlightedItem = this.highlightedMenuItem()
      if (highlightedItem) {
        this.onClickMenuItem(highlightedItem, this.highlightedItemIndex())
      }
    },
    onDownArrow() {
      const menuComponent = this.$refs.menu as ComponentObjectPropsOptions
      const menuElement = menuComponent.$el ? (menuComponent.$el as HTMLElement) : null
      if (!this.showMenu && menuElement) {
        // If the menu is not shown, show it and focus the first item
        this.onClickActivator()
        this.$nextTick(() => {
          this.nextMenuItem(menuElement)
          this.updateHighlightedLabel()
        })
      } else if (menuElement) {
        // else navigate down through the menu items
        this.nextMenuItem(menuElement)
        this.updateHighlightedLabel()
      }
    },
    onUpArrow() {
      const menuComponent = this.$refs.menu as ComponentObjectPropsOptions
      const menuElement = menuComponent.$el ? (menuComponent.$el as HTMLElement) : null
      if (this.showMenu && menuElement) {
        // Navigate up through the menu items
        this.prevMenuItem(menuElement)
        this.updateHighlightedLabel()
      }
    },
    onEscape() {
      const activatorComponent = this.$refs.activator as ComponentObjectPropsOptions
      const activatorElement = activatorComponent.$el
        ? (activatorComponent.$el as HTMLElement)
        : null

      if (this.showMenu && activatorElement) {
        this.showMenu = false
        this.$nextTick(() => {
          // After closing the menu set focus back to the activator
          activatorElement.focus()
        })
      }
    },
    getMenuItemAriaTag(item: any) {
      if (this.isString(item)) {
        return item
      } else if (this.itemLabel) {
        return item[this.itemLabel]
      }
    },
    highlightedMenuItem() {
      if (!this.items) return null
      return this.highlightedItemIndex() >= 0 ? this.items[this.highlightedItemIndex()] : null
    },
    highlightedItemIndex() {
      const menuComponent = this.$refs.menu as ComponentObjectPropsOptions
      const menuElement = menuComponent.$el ? (menuComponent.$el as HTMLElement) : null
      if (menuElement) {
        const allItems = menuElement.querySelectorAll('.aqua-menu-item')
        for (let i = 0; i < allItems.length; i++) {
          const item = allItems[i]
          if (item.classList.contains('highlighted')) {
            return i
          }
        }
      }
      return -1
    },
    updateHighlightedLabel() {
      const menuComponent = this.$refs.menu as ComponentObjectPropsOptions
      const menuElement = menuComponent.$el ? (menuComponent.$el as HTMLElement) : null

      const liveRegionElement = this.$refs.liveregion as HTMLDivElement

      if (!menuElement || !liveRegionElement) return

      this.$nextTick(() => {
        const highlighted = menuElement.querySelector('.highlighted')
        if (highlighted) {
          const label = highlighted.getAttribute('aria-label')
          if (label) {
            liveRegionElement.innerText = label
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
@use '../aqua-vars.module.scss' as *;

.aqua-dropdown {
  display: block;
  position: relative;
  .liveregion {
    opacity: 0;
    position: absolute;
    pointer-events: none;
  }
  .aqua-dropdown_label {
    font-size: toRem(14);
    font-weight: 500;
    margin-bottom: toRem(4);
    text-align: left;
  }
  .aqua-dropdown_activator {
    position: relative;
    cursor: pointer;
    text-align: left;
    min-height: toRem(34);
    border-bottom: toRem(1) solid $aqua-color-steel-300;
    &.outlined {
      padding: toRem(8);
      border: toRem(1) solid $aqua-color-primary-900;
      border-radius: toRem(4);
    }
    &.condensed {
      padding: 0;
      height: toRem(16);
    }
    &.disabled {
      opacity: 50%;
      pointer-events: none;
      cursor: default;
    }

    .aqua-icon {
      max-height: unset !important;
    }
  }
  .chevron {
    font-size: toRem(18);
    pointer-events: none;
    display: flex;
    transition: transform 250ms;
    &:not(.outlined) {
      margin-left: toRem(8);
    }
    &.rotate {
      transform: rotate(180deg);
    }
    &.disabled {
      display: none;
    }
  }
  .placeholder {
    color: $aqua-color-steel-700;
  }
  .aqua-dropdown_menu {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 200;
    max-height: toRem(300);
    overflow-y: auto;
    &.has-label {
      top: toRem(21);
    }
    .searchbar {
      .aqua-text-input_content {
        padding: toRem(12) 0 toRem(12) toRem(16);
      }
    }
  }
}
.nowrap {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

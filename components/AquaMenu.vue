<template>
  <Component
    :is="popup ? 'aqua-card' : 'div'"
    square
    elevated
    class="AquaMenu"
    :class="[spacingClasses]"
  >
    <AquaLayout vertical class="aqua-menu-layout">
      <AquaFlex flex="0">
        <AquaTextInput
          v-if="searchable"
          v-model="searchText"
          simple
          search
          class="search-input"
          placeholder="Search"
          tabindex="0"
        ></AquaTextInput>
      </AquaFlex>
      <AquaFlex v-if="itemLabel" ref="list" flex="1" class="menu">
        <AquaMenuItem
          v-for="(item, index) in menuItems"
          :key="index"
          :class="{ check: index === selectedMenuIndex }"
          :aria-label="item[itemLabel]"
          tabindex="0"
          wrap
          @click="onClickMenuItem(item, index)"
          @keydown.enter="onClickMenuItem(item, index)"
        >
          <AquaLayout horizontal justify="start" align="center">
            <AquaFlex flex="0">
              <AquaIcon
                icon="check"
                size="24"
                class="mr-2"
                :tint="colors.aquaColorPrimary900"
                :class="{ hide: index !== selectedMenuIndex }"
              ></AquaIcon>
            </AquaFlex>
            <AquaFlex flex="1">
              {{ item[itemLabel] }}
            </AquaFlex>
          </AquaLayout>
        </AquaMenuItem>
      </AquaFlex>
    </AquaLayout>
  </Component>
</template>

<script lang="ts">
import { debounce, defaultTo } from 'lodash-es'

import colors from '@aqua/styles/design-system/colors.module.scss'

import { Spacing } from '../mixins/Spacing.js'
import type { ComponentOptionsWithObjectProps } from 'vue'

interface AquaMenuData {
  searchText: string
  selectedIndex: number
  menuItems: Array<any>
  selectedMenuIndex: number
  spacingClasses: Array<string>
}

export default {
  name: 'AquaMenu',
  mixins: [Spacing],
  props: {
    modelValue: String,
    items: Array,
    itemLabel: String,
    itemValue: String,
    popup: {
      type: Boolean,
      default: false
    },
    searchable: {
      type: Boolean,
      default: false
    },
    wrap: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      searchText: '',
      selectedIndex: -1,
      menuItems: this.items,
      selectedMenuIndex: -1,
      spacingClasses: []
    } as AquaMenuData
  },
  computed: {
    filtered() {
      return this.searchText.length
    },
    colors() {
      return colors
    }
  },
  watch: {
    selectedMenuIndex() {
      this.$nextTick(() => {
        const selectedEl = (this.$refs.list as ComponentOptionsWithObjectProps).$el.querySelector(
          '.check'
        )
        if (selectedEl && selectedEl.scrollIntoView) {
          selectedEl.scrollIntoView({ block: 'nearest' })
        }
      })
    },
    searchText: debounce<(this: any, txt: string) => void>(function (txt) {
      // TODO: At a minimum combine this with the aqua-dropdown code via a mixin.
      //       Preferably convert aqua-dropdown to use aqua-menu
      if (txt.length) {
        txt = txt.toLowerCase()
        this.menuItems = this.items.filter((item: any) =>
          item[this.itemLabel].toLowerCase().includes(txt)
        )
        this.selectedMenuIndex = -1
      } else {
        this.menuItems = this.items
        this.selectedMenuIndex = this.selectedIndex
      }
    }, 1000)
  },
  mounted() {
    this.SetSpacingClasses()
    if (this.itemValue && this.modelValue) {
      const foundIndex = this.items?.findIndex(
        (it: any) => it[this.itemValue as string] === this.modelValue
      )
      this.selectedIndex = defaultTo(foundIndex, -1)
      this.selectedMenuIndex = this.selectedIndex
    }
  },
  methods: {
    onClickMenuItem(item: any, index: number) {
      this.selectedMenuIndex = index
      if (this.items && this.itemValue) {
        if (this.filtered) {
          this.selectedIndex = this.items.findIndex(
            (it: any) => it[this.itemValue as string] === item[this.itemValue as string]
          )
        } else {
          this.selectedIndex = index
        }
        this.$emit(
          'update:modelValue',
          (this.items as Array<any>)[this.selectedIndex][this.itemValue]
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.AquaMenu {
  .search-input {
    padding: $aqua-spacing4 $aqua-spacing2 $aqua-spacing2 $aqua-spacing4;
    border-bottom: toRem(1) solid $aqua-color-steel-100;
  }
  .aqua-menu-layout {
    .menu {
      overflow-y: auto;
      max-height: toRem(200);
    }
    .check {
      background-color: $aqua-color-vivid-blue-active;
    }
    .hide {
      visibility: hidden;
    }
  }
}
</style>

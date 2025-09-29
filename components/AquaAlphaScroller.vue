<template>
  <AquaLayout
    class="AquaAlphaScroller"
    :class="[spacingClasses]"
    vertical
    justify="spacearound"
    align="center"
    tabindex="0"
    aria-label="Alpha numeric menu. To select a region by letter use the arrow keys. Press enter to make a selection."
    @mousedown="onMouseDown"
    @mousemove="onMouseMove"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @keydown.enter.capture.stop.prevent="onEnter"
    @keydown.left.capture="onLeftArrow"
    @keydown.up.capture="onUpArrow"
    @keydown.down.capture="onDownArrow"
    @keydown.capture="onKeyDown"
    role="list"
  >
    <template v-if="twoColumns && !numeric">
      <AquaLayout
        v-for="(item, index) in numeric ? searchItemsNumeric : searchItemsAlpha"
        :key="item"
        horizontal
        align="center"
        justify="spacebetween"
        class="row"
      >
        <template v-if="!(index & 1)">
          <div
            class="item"
            :class="{ disabled: isItemDisabled(item) }"
            :tabindex="isItemDisabled(item) ? -1 : 0"
            :aria-disabled="isItemDisabled(item)"
            role="listitem"
          >
            {{ numeric ? searchItemsNumeric[index] : searchItemsAlpha[index] }}
          </div>
          <div
            class="item"
            :class="{ disabled: isItemDisabled(item) }"
            :tabindex="isItemDisabled(item) ? -1 : 0"
            :aria-disabled="isItemDisabled(item)"
            role="listitem"
          >
            {{ numeric ? searchItemsNumeric[index + 1] : searchItemsAlpha[index + 1] }}
          </div>
        </template>
      </AquaLayout>
    </template>
    <template v-else>
      <div
        v-for="item in numeric ? searchItemsNumeric : searchItemsAlpha"
        :key="item"
        class="item"
        :class="{ disabled: isItemDisabled(item) }"
        :tabindex="isItemDisabled(item) ? -1 : 0"
        :aria-disabled="isItemDisabled(item)"
        role="listitem"
      >
        {{ item }}
      </div>
    </template>
  </AquaLayout>
</template>

<script lang="ts">
import { Spacing } from '../mixins/Spacing.js'

interface AquaAlphaScrollerData {
  spacingClasses: Array<string>
  searchItemsAlpha: Array<string>
  searchItemsNumeric: Array<string>
  mouseDown: boolean
  resizeObserver: ResizeObserver | null
  twoColumns: boolean
}

export default {
  name: 'AquaAlphaScroller',
  mixins: [Spacing],
  emits: ['scrollTo', 'exitFocus'],
  props: {
    items: {
      type: Array<string>,
      required: true
    },
    numeric: Boolean
  },
  data() {
    return {
      spacingClasses: [],
      searchItemsAlpha: [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
      ],
      searchItemsNumeric: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      mouseDown: false,
      resizeObserver: null as ResizeObserver | null,
      twoColumns: false
    } as AquaAlphaScrollerData
  },
  mounted() {
    this.SetSpacingClasses()
    document.addEventListener('mouseup', this.onMouseUp)
    window.addEventListener('touchend', (event: TouchEvent) => this.onMouseUp())

    this.resizeObserver = new ResizeObserver((entries) => {
      const height = (this.$el as HTMLDivElement).getBoundingClientRect().height
      this.twoColumns = height < 320
    })

    // Observe the element for resize
    if (this.$el) {
      this.resizeObserver.observe(this.$el as HTMLDivElement)
    }
  },
  beforeUnmount() {
    document.removeEventListener('mouseup', this.onMouseUp)
    window.removeEventListener('touchend', (event: TouchEvent) => this.onMouseUp())
  },
  methods: {
    onTouchStart(event: any) {
      if (!event.touches[0].target || !event.touches[0].target.innerText) return
      if (event.touches[0].target.className !== 'item') return
      this.mouseDown = true
      this.$emit('scrollTo', event.touches[0].target.innerText)
    },
    onTouchMove(event: any) {
      const target = document.elementFromPoint(
        event.touches[0].clientX,
        event.touches[0].clientY
      ) as any
      if (!target || !target.innerText) return
      if (target.className !== 'item') return
      if (this.mouseDown) {
        this.$emit('scrollTo', target.innerText)
      }
    },
    onMouseDown(event: any) {
      if (!event.target || !event.target.innerText) return
      if (event.target.className !== 'item') return
      this.mouseDown = true
      this.$emit('scrollTo', event.target.innerText)
    },
    onMouseMove(event: any) {
      if (!event.target || !event.target.innerText) return
      if (event.target.className !== 'item') return
      if (this.mouseDown) {
        this.$emit('scrollTo', event.target.innerText)
      }
    },
    onMouseUp() {
      this.mouseDown = false
    },
    isItemDisabled(item: string) {
      return !this.items?.find((el) => {
        return el.charAt(0) === item.charAt(0)
      })
    },
    getFocusedItemIndex(item: any) {
      const allItems = this.$el.querySelectorAll('.item:not([tabindex="-1"])')
      for (let i = 0; i < allItems.length; i++) {
        if (allItems[i] === item) {
          return i
        }
      }
      return -1
    },
    focusItemByIndex(index: number) {
      const allItems = this.$el.querySelectorAll('.item:not([tabindex="-1"])')
      if (index < 0) {
        index = allItems.length - 1
      } else if (index >= allItems.length) {
        index = 0
      }
      allItems[index].focus()
    },
    onKeyDown(event: any) {
      if (event.key === 'Tab') {
        this.$emit('exitFocus')
      }
    },
    onEnter(event: any) {
      if (!event.target || !event.target.innerText) return
      if (event.target.className !== 'item') return
      this.$emit('scrollTo', event.target.innerText)
    },
    onLeftArrow() {
      this.$emit('exitFocus')
    },
    onUpArrow() {
      const focusedItem = this.$el.querySelector('.item:focus')
      if (focusedItem) {
        const index = this.getFocusedItemIndex(focusedItem)
        this.focusItemByIndex(index - 1)
      }
    },
    onDownArrow() {
      const focusedItem = this.$el.querySelector('.item:focus')
      if (focusedItem) {
        const index = this.getFocusedItemIndex(focusedItem)
        this.focusItemByIndex(index + 1)
      } else {
        // probably focused on the component itself - focus the first item
        this.focusItemByIndex(0)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.AquaAlphaScroller {
  background-color: white;
  border: toRem(1) solid rgba(0, 0, 0, 0.2);
  border-radius: toRem(14);
  position: absolute;
  right: calc($aqua-spacing2 + toRem(20));
  top: $aqua-spacing2;
  bottom: $aqua-spacing2;
  padding: toRem(8) toRem(4);
  .item {
    margin: 0 toRem(4);
    font-size: toRem(10);
    width: 100%;
    text-align: center;
    user-select: none;
    cursor: pointer;
    &.disabled {
      opacity: 0.25;
      pointer-events: none;
      cursor: default;
    }
  }
  .row {
    white-space: nowrap;
    width: 100%;
  }
}
</style>

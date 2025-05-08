<template>
  <div class="AquaFlowLayout">
    <div v-for="(item, index) of items" :key="index" class="aqua-flow-item">
      <slot name="item" :itemIndex="index"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AquaFlowLayout',
  props: {
    items: {
      type: Array,
      required: true
    },
    minItemWidth: {
      type: Number,
      required: true
    },
    itemHGap: {
      type: Number,
      required: true
    },
    itemVGap: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      resizeObserver: null as null | ResizeObserver,
      itemWidth: 0,
      numColumns: 0,
      numRows: 0
    }
  },
  computed: {},
  methods: {
    onResize() {
      const availableWidth = this.$el.getBoundingClientRect().width
      const itemEls = this.$el.querySelectorAll('.aqua-flow-item')

      const numItems = itemEls.length
      let xPos = 0
      let yPos = 0

      // Calculate how many items fit on a row
      let itemsPerRow = 1
      let x = 0
      for (let i = 0; i < numItems; i++) {
        x += this.minItemWidth + this.itemHGap
        if (x + this.minItemWidth + this.itemHGap <= availableWidth) {
          ++itemsPerRow
        } else {
          break
        }
      }

      itemsPerRow = Math.floor(itemsPerRow)
      itemsPerRow = Math.min(itemsPerRow, this.items.length)

      let numGaps = itemsPerRow > 1 ? itemsPerRow - 1 : 0

      let itemWidth = availableWidth / itemsPerRow

      // subtract the gaps (horizontal space between items)
      itemWidth -= this.itemHGap / (itemsPerRow / numGaps)

      let rowHeight = 0
      let colCounter = 0
      for (let i = 0; i < numItems; i++) {
        itemEls[i].style.width = this.minItemWidth + 'px'

        itemEls[i].style.left = xPos + 'px'
        itemEls[i].style.top = yPos + 'px'
        itemEls[i].style.width = itemWidth + 'px'
        itemEls[i].style.minWidth = itemWidth + 'px'
        itemEls[i].style.maxWidth = itemWidth + 'px'

        if (itemEls[i].getBoundingClientRect().height > rowHeight) {
          rowHeight = itemEls[i].getBoundingClientRect().height
        }

        ++colCounter

        xPos += itemWidth
        if (colCounter < itemsPerRow) {
          xPos += this.itemHGap
        }

        if (colCounter >= itemsPerRow) {
          // newRow
          colCounter = 0
          xPos = 0
          yPos += rowHeight + this.itemVGap
          rowHeight = 0
        }
      }
      yPos += rowHeight
      this.$el.style.height = yPos + 'px'
    }
  },
  mounted() {
    this.resizeObserver = new ResizeObserver(() => {
      this.$nextTick(() => {
        this.onResize()
      })
    })
    // Observe the element for resize
    if (this.$el) {
      this.resizeObserver.observe(this.$el)
    }
    this.$nextTick(() => {
      this.onResize()
    })
  },
  beforeUnmount() {
    // remove resize observer
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
    }
  }
})
</script>

<style lang="scss" scoped>
.AquaFlowLayout {
  position: relative;
  width: 100%;
  &:not(:last-child) {
    margin-bottom: 4px;
  }
  .aqua-flow-item {
    position: absolute;
  }
}
</style>

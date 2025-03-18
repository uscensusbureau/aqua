<template>
  <Component :is="tag" class="aqua-layout" :class="allClasses">
    <slot></slot>
  </Component>
</template>

<script lang="ts">
import { Spacing } from '../mixins/Spacing.js'

interface AquaLayoutData {
  spacingClasses: Array<string>
  resizeObserver: ResizeObserver | null
}

export default {
  name: 'AquaLayout',
  mixins: [Spacing],
  props: {
    horizontal: Boolean,
    vertical: Boolean,
    align: String,
    justify: String,
    wrap: Boolean,
    inline: Boolean,
    mobile: Boolean,
    resizable: Boolean,
    alignMobile: String,
    justifyMobile: String,
    tag: {
      default: 'div',
      type: String
    }
  },
  emits: ['resize'],
  data() {
    return {
      spacingClasses: [],
      resizeObserver: null
    } as AquaLayoutData
  },
  computed: {
    classes() {
      const alignment = this.mobile ? this.alignMobile : this.align
      const justification = this.mobile ? this.justifyMobile : this.justify
      const classes = []

      if (this.inline) {
        classes.push('inline')
      }
      if (this.wrap) {
        classes.push('wrap')
      }

      if (this.horizontal) {
        classes.push('horizontal')
      }
      if (this.vertical) {
        classes.push('vertical')
      }

      switch (alignment) {
        case 'start':
          classes.push('align-start')
          break
        case 'center':
          classes.push('align-center')
          break
        case 'end':
          classes.push('align-end')
          break
        case 'stretch':
          classes.push('align-stretch')
          break
      }

      switch (justification) {
        case 'start':
          classes.push('justify-start')
          break
        case 'center':
          classes.push('justify-center')
          break
        case 'end':
          classes.push('justify-end')
          break
        case 'spacearound':
          classes.push('justify-spacearound')
          break
        case 'spacebetween':
          classes.push('justify-spacebetween')
          break
        case 'even':
          classes.push('justify-spaceevenly')
          break
      }

      return classes
    },
    allClasses() {
      return this.classes.concat(this.spacingClasses)
    }
  },
  mounted() {
    this.SetSpacingClasses()
    if (this.resizable) {
      this.resizeObserver = new ResizeObserver(() => {
        this.$emit('resize')
      })
      // Observe the element for resize
      if (this.$el) {
        this.resizeObserver.observe(this.$el)
      }
    }
  },
  beforeUnmount() {
    if (this.resizable) {
      this.resizeObserver?.disconnect()
    }
  }
}
</script>

<style lang="scss">
.aqua-layout {
  display: flex;
  flex: 1 1 auto;
  justify-content: space-around;
  align-items: stretch;
  flex-wrap: nowrap;
  border: none;
  outline: none;
  min-height: 0;
  min-width: 0;
  position: relative;

  &.inline {
    display: inline-flex;
  }

  &.wrap {
    flex-wrap: wrap;
  }

  &.horizontal {
    flex-direction: row;
  }
  &.vertical {
    flex-direction: column;
  }

  &.align-start {
    align-items: flex-start;
  }
  &.align-center {
    align-items: center;
  }
  &.align-end {
    align-items: flex-end;
  }
  &.align-stretch {
    align-items: stretch;
  }

  &.justify-start {
    justify-items: flex-start;
    justify-content: flex-start;
  }
  &.justify-center {
    justify-items: center;
    justify-content: center;
  }
  &.justify-end {
    justify-items: flex-end;
    justify-content: flex-end;
  }
  &.justify-spacearound {
    justify-items: stretch;
    justify-content: space-around;
  }
  &.justify-spacebetween {
    justify-items: stretch;
    justify-content: space-between;
  }
  &.justify-spaceevenly {
    justify-items: stretch;
    justify-content: space-evenly;
  }
}
</style>

<template>
  <div class="AquaCarousel" @keydown.tab="onTab">
    <!-- LEFT CHEVERON AND FADE -->
    <AquaLayout
      v-show="showLeftOverflow"
      justify="center"
      align="center"
      class="scroller left"
      :class="{ mobile }"
      :style="carouselFadeStyleLeft"
    >
      <AquaIcon
        v-if="!mobile"
        class="chevron"
        icon="chevron-left"
        size="32"
        tint-transition-time="200"
        :tint="colors.aquaColorVividBlue"
        @mousedown="onMouseDownLeftScroll"
        @mouseup="onMouseUpLeftScroll"
        @mouseout="onMouseUpLeftScroll"
      ></AquaIcon>
    </AquaLayout>

    <!-- MAIN CAROUSEL SLIDE AREA -->
    <AquaLayout
      ref="displayList"
      horizontal
      justify="start"
      align="start"
      class="carousel-slide"
      :style="`left: ${scrollXPos}px`"
    >
      <slot></slot>
    </AquaLayout>

    <!-- RIGHT CHEVERON AND FADE -->
    <AquaLayout
      v-show="showRightOverflow"
      justify="center"
      align="center"
      class="scroller right"
      :class="{ mobile }"
      :style="carouselFadeStyleRight"
    >
      <AquaIcon
        v-if="!mobile"
        class="chevron"
        icon="chevron-right"
        size="32"
        tint-transition-time="200"
        :tint="colors.aquaColorVividBlue"
        @mousedown="onMouseDownRightScroll"
        @mouseup="onMouseUpRightScroll"
        @mouseout="onMouseUpRightScroll"
      ></AquaIcon>
    </AquaLayout>
  </div>
</template>

<script lang="ts">
import type { ComponentOptionsWithObjectProps } from 'vue'
import colors from '@aqua/styles/design-system/colors.module.scss'

interface AquaCarouselData {
  scrollXPos: number
  draggingX: boolean
  draggingXSpeed: number
  lastTouchPos: number
  showLeftOverflow: boolean
  showRightOverflow: boolean
  timerIdScroll: number
}

interface AquaCararouselInitialCalculations {
  scrollXSectionWidth: number
  viewportCenter: number
}

export default {
  name: 'AquaCarousel',
  props: {
    fadeColor: {
      type: String,
      default: 'white'
    },
    mobile: Boolean
  },
  data() {
    return {
      scrollXPos: 0,
      draggingX: false,
      draggingXSpeed: 0,
      lastTouchPos: 0,
      showLeftOverflow: false,
      showRightOverflow: false
    } as AquaCarouselData
  },
  computed: {
    colors() {
      return colors
    },
    carouselFadeStyleLeft() {
      return {
        'background-image': 'linear-gradient(to right,' + this.fadeColor + ',90%,' + 'rgba(0,0,0,0)'
      }
    },
    carouselFadeStyleRight() {
      return {
        'background-image': 'linear-gradient(to left,' + this.fadeColor + ',90%,' + 'rgba(0,0,0,0)'
      }
    }
  },
  watch: {
    scrollXPos() {
      this.$nextTick(() => {
        this.updateOverflow()
      })
    }
  },
  mounted() {
    ;(this.$refs.displayList as ComponentOptionsWithObjectProps).$el.addEventListener(
      'mousedown',
      (event: MouseEvent) => this.onMouseDown()
    )
    window.addEventListener('mousemove', (event: MouseEvent) => this.onMouseMove(event))
    window.addEventListener('mouseup', (event: MouseEvent) => this.onMouseUp())
    ;(this.$refs.displayList as ComponentOptionsWithObjectProps).$el.addEventListener(
      'touchstart',
      (event: TouchEvent) => this.onTouchStart(event)
    )
    window.addEventListener('touchmove', (event: TouchEvent) => this.onTouchMove(event))
    window.addEventListener('touchend', (event: TouchEvent) => this.onMouseUp())

    window.addEventListener('click', (event: MouseEvent) => this.onMouseUp())

    this.updateOverflow()
  },
  beforeUnmount() {
    ;(this.$refs.displayList as ComponentOptionsWithObjectProps).$el.removeEventListener(
      'mousedown',
      (event: MouseEvent) => this.onMouseDown()
    )
    window.removeEventListener('mousemove', (event: MouseEvent) => this.onMouseMove(event))
    window.removeEventListener('mouseup', (event: MouseEvent) => this.onMouseUp())
    ;(this.$refs.displayList as ComponentOptionsWithObjectProps).$el.removeEventListener(
      'touchstart',
      (event: TouchEvent) => this.onTouchStart(event)
    )
    window.removeEventListener('touchmove', (event: TouchEvent) => this.onTouchMove(event))
    window.removeEventListener('touchend', (event: TouchEvent) => this.onMouseUp())

    window.removeEventListener('click', (event: MouseEvent) => this.onMouseUp())
  },

  methods: {
    // Traverses up the DOM looking for the topmost element that is both
    // a parent of the focused element and a child of the slot element.
    // This will be the element we center within the carousel.
    getTopmostSlotElement(element: HTMLElement): HTMLElement | null {
      let el: HTMLElement | null = element
      if (el !== null) {
        const slideEl = (this.$refs.displayList as ComponentOptionsWithObjectProps).$el
        while (el?.parentElement && el.parentElement !== slideEl) {
          el = element.parentElement
        }
      }
      return el
    },

    /**
     * This is the function that checks calculations
     *  and decides when to it's finished calculating 🏁
     *
     * Needs a better name
     */
    intervalFunction(initialCalculations: AquaCararouselInitialCalculations, done: Function) {
      const { scrollXSectionWidth, viewportCenter } = initialCalculations

      return (/* setInverval will call */) => {
        const focusEl = document.querySelector('*:focus')
        if (!focusEl) {
          return done()
        }

        const isInSlideArea = focusEl.closest('.carousel-slide')
        if (!isInSlideArea) {
          return done()
        }

        const focusedSlotEl = this.getTopmostSlotElement(focusEl as HTMLElement)
        const rect = focusedSlotEl?.getBoundingClientRect()
        if (rect === undefined) return done()
        const focusedElCenter = rect.left + rect.width / 2

        // This code should be targeted for a future-state abstract component that
        // handles all components needing a left/right drag-to-scroll horizontally interaction.
        // There are opportunities here for refinement.

        // Determine direction of animation (left/right) and move the scrollXPos 20px each animation tick
        if (focusedElCenter < viewportCenter) {
          this.scrollXPos += 20
        } else if (focusedElCenter > viewportCenter) {
          this.scrollXPos -= 20
        }

        // If the focused element is within +/- 30px of the center of the caarousel then we are done animating
        if (focusedElCenter > viewportCenter) {
          const diff = focusedElCenter - viewportCenter
          if (diff < 30) {
            return done()
          }
        } else {
          const diff = viewportCenter - focusedElCenter
          if (diff < 30) {
            return done()
          }
        }

        // Don't allow scrolling too far right
        if (this.scrollXPos > 0) {
          this.scrollXPos = 0
          return done()
        }

        // Don't allow scrolling too far left
        const availableWidth = this.$el.clientWidth
        if (this.scrollXPos < -(scrollXSectionWidth - availableWidth)) {
          this.scrollXPos = -(scrollXSectionWidth - availableWidth)
          return done()
        }
      }
    },
    /**
     * Simply kick-starts the interval calculation logic
     *  with some initial measurements
     */
    onTab() {
      const scrollXSectionWidth = (
        this.$refs.displayList as ComponentOptionsWithObjectProps
      ).$el.getBoundingClientRect().width
      const viewPortRect = this.$el.getBoundingClientRect()
      const viewportCenter = viewPortRect.left + viewPortRect.width / 2

      // setup function to be called on each interval
      const initialCalculations: AquaCararouselInitialCalculations = {
        scrollXSectionWidth,
        viewportCenter
      }
      const boundFunction = this.intervalFunction(
        initialCalculations,
        (/* when it's finished, this will get called */) => clearInterval(timerId)
      )

      const timerId = setInterval(boundFunction, 10 /* ms */)
    },
    onMouseDown() {
      if (!this.draggingX) {
        this.draggingX = true
      }
    },
    onMouseMove(event: MouseEvent) {
      if (this.draggingX) {
        const availableWidth = this.$el.clientWidth
        const scrollXSectionWidth = (
          this.$refs.displayList as ComponentOptionsWithObjectProps
        ).$el.getBoundingClientRect().width
        this.scrollXPos += event.movementX
        this.draggingXSpeed = event.movementX
        if (this.scrollXPos > 0) {
          this.scrollXPos = 0
        }
        if (this.scrollXPos < -(scrollXSectionWidth - availableWidth)) {
          this.scrollXPos = -(scrollXSectionWidth - availableWidth)
        }
      }
    },
    onMouseUp() {
      const availableWidth = this.$el.clientWidth
      const scrollXSectionWidth = (
        this.$refs.displayList as ComponentOptionsWithObjectProps
      ).$el.getBoundingClientRect().width
      this.draggingX = false
      if (Math.abs(this.draggingXSpeed) > 0) {
        const timerId = setInterval(() => {
          this.draggingXSpeed *= 0.98
          this.scrollXPos += this.draggingXSpeed
          if (this.scrollXPos > 0) {
            this.scrollXPos = 0
            clearInterval(timerId)
          }
          if (this.scrollXPos < -(scrollXSectionWidth - availableWidth)) {
            this.scrollXPos = -(scrollXSectionWidth - availableWidth)
            clearInterval(timerId)
          }
          if (Math.abs(this.draggingXSpeed) < 0.001) {
            this.draggingXSpeed = 0
            clearInterval(timerId)
          }
        }, 10)
      }
    },
    onTouchStart(event: TouchEvent) {
      this.draggingX = true
      this.lastTouchPos = event.touches[0].clientX
    },
    onTouchMove(event: TouchEvent) {
      if (this.draggingX) {
        const availableWidth = this.$el.clientWidth
        const scrollXSectionWidth = (
          this.$refs.displayList as ComponentOptionsWithObjectProps
        ).$el.getBoundingClientRect().width
        const movement = event.touches[0].clientX - this.lastTouchPos
        this.scrollXPos += movement / 2
        this.draggingXSpeed = movement / 2
        this.lastTouchPos = event.touches[0].clientX
        if (this.scrollXPos > 0) {
          this.scrollXPos = 0
        }
        if (this.scrollXPos < -(scrollXSectionWidth - availableWidth)) {
          this.scrollXPos = -(scrollXSectionWidth - availableWidth)
        }
      }
    },
    onMouseDownLeftScroll() {
      if (this.mobile) {
        return
      }
      this.draggingXSpeed = 0
      this.timerIdScroll = setInterval(() => {
        this.scrollXPos += 10
        if (this.scrollXPos > 0) {
          this.scrollXPos = 0
          clearTimeout(this.timerIdScroll)
        }
      }, 10)
    },
    onMouseUpLeftScroll() {
      this.draggingXSpeed = 0
      clearTimeout(this.timerIdScroll)
    },
    onMouseDownRightScroll() {
      if (this.mobile) {
        return
      }
      this.draggingXSpeed = 0
      const availableWidth = this.$el.clientWidth
      const scrollXSectionWidth = (
        this.$refs.displayList as ComponentOptionsWithObjectProps
      ).$el.getBoundingClientRect().width
      this.timerIdScroll = setInterval(() => {
        this.scrollXPos -= 10
        if (this.scrollXPos < -(scrollXSectionWidth - availableWidth)) {
          this.scrollXPos = -(scrollXSectionWidth - availableWidth)
          clearTimeout(this.timerIdScroll)
        }
      }, 10)
    },
    onMouseUpRightScroll() {
      this.draggingXSpeed = 0
      clearTimeout(this.timerIdScroll)
    },
    updateOverflow() {
      const availableWidth = this.$el.clientWidth
      const scrollXSectionWidth = (
        this.$refs.displayList as ComponentOptionsWithObjectProps
      ).$el.getBoundingClientRect().width
      const overflowed = scrollXSectionWidth > availableWidth
      this.showLeftOverflow = overflowed && this.scrollXPos < -10
      this.showRightOverflow =
        overflowed && this.scrollXPos - 10 > -(scrollXSectionWidth - availableWidth)
      if (!this.showLeftOverflow && !this.showRightOverflow) {
        this.scrollXPos = 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.AquaCarousel {
  position: relative;
  overflow: hidden;

  .carousel-slide {
    position: absolute;
  }

  .highlights-controls {
    padding-top: $aqua-spacing4;
    padding-right: $aqua-spacing2;
    padding-left: $aqua-spacing10;

    .source-toggle {
      flex: 0.1;
      font-weight: normal !important;
      &.disabled {
        opacity: 0.5;
      }
    }

    &.mobile {
      padding-left: $aqua-spacing4;

      .source-toggle {
        margin-top: $aqua-spacing3;
      }
    }
  }

  .scroller {
    position: absolute;
    top: 0;
    bottom: 0;
    width: toRem(80);
    z-index: 1;
    cursor: pointer;
    pointer-events: none;
    &.mobile {
      width: toRem(40);
    }
    &.left {
      left: 0;
      padding-right: $aqua-spacing8;
    }
    &.right {
      right: 0;
      padding-left: $aqua-spacing8;
    }
    .chevron {
      pointer-events: all;
    }
  }
}
</style>
<style lang="scss">
// Aqua style overrides
.AquaCarousel {
  .scroller {
    .aqua-icon {
      max-height: unset !important;
    }

    &:hover {
      .aqua-icon {
        height: toRem(38) !important;
        width: toRem(38) !important;
      }
    }
  }
}
</style>

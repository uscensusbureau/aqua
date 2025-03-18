<template>
  <span>
    <Component :is="tag" ref="text" class="AquaText">{{ text }}</Component>
    <span v-if="maxLines" ref="measureText" class="measure-text">X</span>
  </span>
</template>

<script lang="ts">
export default {
  name: 'AquaText',
  props: {
    text: String,
    tag: {
      type: String,
      default: 'div'
    },
    scaleToWidth: Number,
    desiredSize: Number,
    maxSize: Number,
    maxLines: Number
  },
  watch: {
    text() {
      this.updateSize()
    },
    scaleToWidth() {
      this.updateSize()
    }
  },
  mounted() {
    this.updateSize()
  },
  methods: {
    updateSize() {
      if (!this.scaleToWidth) {
        return
      }
      const getWidth = () => (this.$refs.text as HTMLDivElement).getBoundingClientRect().width
      const getLineHeight = () =>
        (this.$refs.measureText as HTMLSpanElement).getBoundingClientRect().height
      const getTextHeight = () => (this.$refs.text as HTMLDivElement).getBoundingClientRect().height

      if (this.desiredSize && getWidth() > this.scaleToWidth) {
        let size = this.desiredSize
        do {
          ;(this.$refs.text as HTMLDivElement).style.cssText = `font-size: ${size / 16}rem`
          size--
        } while (getWidth() > this.scaleToWidth)
      } else {
        let size = 10
        let lines = 1 // start at one line, and hopefully it fits
        do {
          ;(this.$refs.text as HTMLDivElement).style.cssText = `font-size: ${size / 16}rem`
          size++
        } while (this.maxSize && size <= this.maxSize && getWidth() < this.scaleToWidth)
        /** This is where it gets weird. 3 scenarios:
         *  1. If hit max font size while still fitting width, we're done.
         *  2. If > size threshold or intending to fit on single line, go down one size so it fits on one line.
         *  3. If < size threshold, split to two lines and keep going, adjusting algorithm to check height
         */
        if (getWidth() < this.scaleToWidth) return
        if (
          !this.maxLines ||
          this.maxLines < 2 ||
          (this.maxSize && size > (this.maxSize * (this.maxLines - 1)) / this.maxLines)
        ) {
          // Oops, we just went to too many lines. Let's tick down one size so it fits.
          ;(this.$refs.text as HTMLDivElement).style.cssText = `font-size: ${(size - 2) / 16}rem`
          return
        }
        while (lines < this.maxLines) {
          lines++
          do {
            ;(this.$refs.text as HTMLDivElement).style.cssText = `font-size: ${
              size / 16
            }rem; white-space: normal; max-width: ${this.scaleToWidth / 16}rem`
            ;(this.$refs.measureText as HTMLSpanElement).style.cssText = `font-size: ${
              size / 16
            }rem`
            size++
          } while (
            this.maxSize &&
            size <= this.maxSize &&
            getTextHeight() <= getLineHeight() * lines
          )
          if (getTextHeight() <= getLineHeight() * lines) return // if it fits, we're all done!
          // Otherwise, measure against next size threshold. If still smaller, we add another line. Condition always true at max lines.
          if (
            this.maxSize &&
            size > (this.maxSize * (this.maxLines - lines)) / (this.maxLines - lines + 1)
          ) {
            ;(this.$refs.text as HTMLDivElement).style.cssText = `font-size: ${
              (size - 2) / 16
            }rem; white-space: normal; max-width: ${this.scaleToWidth / 16}rem`
            return
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.AquaText {
  display: inline-block;
}

.measure-text {
  position: absolute;
  visibility: hidden;
}
</style>

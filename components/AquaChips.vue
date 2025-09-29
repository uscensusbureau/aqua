<template>
  <AquaLayout v-if="chips && chips.length" vertical class="AquaChips" resizable @resize="onResize">
    <slot name="prependSlot"></slot>
    <AquaLayout ref="chips" horizontal :wrap="wrap" align="center" justify="start" class="chips">
      <div v-for="(chip, index) in chipsToDisplay" :key="index">
        <slot v-if="index < numChipsToShow || wrap" name="chip" :chip="chip"></slot>
      </div>
      <AquaButton v-if="overflow" tertiary @click="$emit('clickedMore')">
        {{ `MORE (${chips.length - numChipsToShow})` }}
      </AquaButton>
    </AquaLayout>
    <!-- DUPLICATE OF THE ABOVE, BUT ONLY USED FOR MEASURING
    THE WIDTH OF THE CHIPS FOR OVERFLOW IN THE CASE OF NO WRAP-->
    <AquaLayout v-if="!wrap" horizontal align="start" justify="start" class="measure-row">
      <div v-for="(chip, index) in chips" :key="index">
        <slot name="chip" :chip="chip"></slot>
      </div>
      <AquaButton tertiary class="measure-more-button" tabindex="-1">
        {{ `MORE (${chips.length - numChipsToShow})` }}
      </AquaButton>
    </AquaLayout>
  </AquaLayout>
  <AquaLayout v-else vertical class="AquaChips"></AquaLayout>
</template>

<script lang="ts">
import { Spacing } from '../mixins/Spacing.js'

interface AquaChipsData {
  spacingClasses: Array<string>
  numChipsToShow: number
  overflow: boolean
}

export default {
  name: 'AquaChips',
  mixins: [Spacing],
  props: {
    chips: Array,
    wrap: Boolean,
    limit: {
      type: Number,
      default: 0
    }
  },
  emits: ['clickedMore'],
  data() {
    return {
      spacingClasses: [],
      numChipsToShow: 0,
      overflow: false
    } as AquaChipsData
  },
  computed: {
    chipsToDisplay() {
      if (this.chips && this.limit > 0) {
        return this.chips.slice(0, this.limit)
      } else {
        return this.chips
      }
    }
  },
  watch: {
    chips: {
      handler() {
        this.$nextTick(() => {
          this.computeNumVisibleChips()
        })
      },
      deep: true
    }
  },
  mounted() {
    this.SetSpacingClasses()
    this.computeNumVisibleChips()
  },
  methods: {
    onResize() {
      this.computeNumVisibleChips()
    },
    computeNumVisibleChips() {
      if (this.wrap) {
        this.overflow = false
      } else {
        // Get the available width for a single line of chips + the "More" button
        const availableWidth = this.$el.clientWidth
        const moreButtonWidth = this.$el.querySelector('.measure-more-button')
          ? this.$el.querySelector('.measure-more-button').clientWidth
          : 0

        // Measure each chip and determine how many we can show
        let width = 0
        let numChipsToShow = 0
        const chips = this.$el.querySelectorAll('.measure-row .aqua-chip')

        for (let i = 0; i < chips.length; i++) {
          const chip = chips[i]
          width += chip.clientWidth + 4 // 4px left margin
          if (width <= availableWidth - moreButtonWidth) {
            ++numChipsToShow
          } else {
            break
          }
        }

        this.overflow = numChipsToShow < chips.length
        this.numChipsToShow = numChipsToShow
      }
    }
  }
}
</script>

<style lang="scss">
@use '../aqua-vars.module.scss' as *;

.AquaChips {
  position: relative;
  .aqua-chip {
    margin-left: $aqua-spacing1;
    margin-top: $aqua-spacing1;
    margin-bottom: $aqua-spacing1;
  }
  .measure-row {
    pointer-events: none;
    position: absolute;
    visibility: hidden;
    left: 0;
    right: 0;
  }
}
</style>

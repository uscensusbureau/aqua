<template>
  <AquaLayout
    horizontal
    class="AquaPagination aqua-text-caption"
    :class="[spacingClasses, { mobile }]"
    resizable
    justify="center"
    align="center"
    align-mobile="start"
    :mobile="mobile"
    @resize="onResize"
  >
    <AquaLayout horizontal justify="center" align="center">
      <AquaLayout
        v-if="enablePrev"
        vertical
        align="end"
        justify="center"
        class="page-prev"
        :class="{ mobile }"
        tabindex="0"
        aria-label="previous page"
        @click="onClickPrev"
        @keydown.enter="onClickPrev"
      >
        <AquaIcon
          icon="chevron-left"
          size="16"
          tint-transition-time="200"
          :tint="colors.aquaColorVividBlue"
        ></AquaIcon>
      </AquaLayout>
      <template v-for="page in pagesRange" :key="page">
        <div
          class="page"
          :class="{ selected: page === valueInternal, mobile }"
          tabindex="0"
          :aria-label="`page ${page + 1}`"
          @click="onClick(page)"
          @keydown.enter="onClick(page)"
        >
          <AquaLayout vertical align="center" justify="center" class="page-element-layout">
            <span>{{ page + 1 }}</span>
          </AquaLayout>
        </div>
      </template>
      <AquaLayout
        v-if="enableNext"
        vertical
        align="start"
        justify="center"
        class="page-next"
        :class="{ mobile }"
        tabindex="0"
        aria-label="next page"
        @click="onClickNext"
        @keydown.enter="onClickNext"
      >
        <AquaIcon
          icon="chevron-right"
          size="16"
          tint-transition-time="200"
          :tint="colors.aquaColorVividBlue"
        ></AquaIcon>
      </AquaLayout>
    </AquaLayout>
    <AquaLayout horizontal justify="center" align="center" class="measurePages">
      <AquaLayout
        v-if="enablePrev"
        vertical
        align="end"
        justify="center"
        class="page-prev"
        :class="{ mobile }"
        tabindex="0"
        @click="onClickPrev"
        @keydown.enter="onClickPrev"
      >
        <AquaIcon
          icon="chevron-left"
          size="14"
          tint-transition-time="200"
          :tint="colors.aquaColorVividBlue"
        ></AquaIcon>
      </AquaLayout>
      <template v-for="page in pagesToDraw" :key="page">
        <div class="page measure" :class="{ selected: page === valueInternal, mobile }">
          <AquaLayout vertical align="center" justify="center" class="page-element-layout">
            <span>{{ page + 1 }}</span>
          </AquaLayout>
        </div>
      </template>
      <AquaLayout
        v-if="enableNext"
        vertical
        align="start"
        justify="center"
        class="page-next"
        :class="{ mobile }"
        tabindex="0"
        @click="onClickNext"
        @keydown.enter="onClickNext"
      >
        <AquaIcon
          icon="chevron-right"
          size="14"
          tint-transition-time="200"
          :tint="colors.aquaColorVividBlue"
        ></AquaIcon>
      </AquaLayout>
    </AquaLayout>
  </AquaLayout>
</template>

<script lang="ts">
import { range } from 'lodash-es'

import colors from '@aqua/styles/design-system/colors.module.scss'

import { Spacing } from '../mixins/Spacing.js'

interface AquaPaginationData {
  valueInternal: number
  numPagesToDisplay: number
  overflow: boolean
  spacingClasses: Array<string>
  resizeObserver: ResizeObserver | null
}

export default {
  name: 'AquaPagination',
  mixins: [Spacing],
  props: {
    pageCount: Number,
    maxPages: {
      type: String,
      default: '100'
    },
    mobile: {
      type: Boolean,
      default: false
    },
    modelValue: Number
  },
  emits: ['update:modelValue'],
  data() {
    return {
      valueInternal: 0,
      numPagesToDisplay: 0,
      overflow: false,
      spacingClasses: [],
      resizeObserver: null
    } as AquaPaginationData
  },
  computed: {
    enableNext() {
      if (this.pageCount) return this.valueInternal < this.pageCount - 1
      else return true
    },
    enablePrev() {
      return this.valueInternal > 0
    },
    offsetStart() {
      if (this.overflow && this.pageCount) {
        let start = 0
        start = this.valueInternal - Math.ceil(this.numPagesToDisplay / 2)
        if (start < 0) {
          start = 0
        }
        if (start + this.numPagesToDisplay > this.pageCount) {
          start = this.pageCount - this.numPagesToDisplay
        }
        return Math.max(0, start)
      }
      return 0
    },
    colors() {
      return colors
    },
    pagesToDraw() {
      if (this.pageCount) return Math.min(this.pageCount, Number.parseInt(this.maxPages))
      else return 0
    },
    pagesRange() {
      return range(this.offsetStart, this.offsetStart + this.numPagesToDisplay)
    }
  },
  watch: {
    modelValue() {
      if (this.modelValue) this.valueInternal = this.modelValue
      this.$nextTick(() => {
        this.calcNumPagesToDisplay()
      })
    },
    pagesToDraw() {
      this.$nextTick(() => {
        this.calcNumPagesToDisplay()
      })
    }
  },
  mounted() {
    if (this.modelValue) this.valueInternal = this.modelValue
    this.calcNumPagesToDisplay()

    if (this.pageCount) this.overflow = this.pageCount > this.numPagesToDisplay
  },
  methods: {
    onResize() {
      this.calcNumPagesToDisplay()
    },
    range,
    onClick(page: number) {
      this.valueInternal = page
      this.$emit('update:modelValue', this.valueInternal)
    },
    onClickNext() {
      if (this.enableNext) {
        ++this.valueInternal
        this.$emit('update:modelValue', this.valueInternal)
      }
    },
    onClickPrev() {
      if (this.enablePrev) {
        --this.valueInternal
        this.$emit('update:modelValue', this.valueInternal)
      }
    },
    calcNumPagesToDisplay() {
      const availableWidth = this.$el.clientWidth

      const prev = this.$el.querySelector('.page-prev')
      const next = this.$el.querySelector('.next-prev')

      const arrowButtonsWidth =
        (prev ? prev.getBoundingClientRect().width : 0) +
        (next ? next.getBoundingClientRect().width : 0) +
        this.mobile
          ? 120
          : 80

      // Measure each button and determine how many we can show
      let width = 0
      let numPagesToDisplay = 0
      const pages = this.$el.querySelectorAll('.page.measure')

      for (let i = 0; i < pages.length; i++) {
        const page = pages[i]
        width += page.getBoundingClientRect().width + (this.mobile ? 28 : 8)
        if (
          width <= availableWidth - arrowButtonsWidth &&
          numPagesToDisplay < parseInt(this.maxPages) - 1
        ) {
          ++numPagesToDisplay
        } else {
          break
        }
      }

      this.overflow = pages.length - numPagesToDisplay > 0
      this.numPagesToDisplay = numPagesToDisplay
    }
  }
}
</script>

<style lang="scss" scoped>
@use '../aqua-vars.module.scss' as *;

.AquaPagination {
  position: relative;
  &.mobile {
    height: toRem(93);
  }
  .page {
    padding-left: $aqua-spacing1;
    padding-right: $aqua-spacing1;
    margin-left: $aqua-spacing1;
    margin-right: $aqua-spacing1;
    cursor: pointer;
    width: toRem(21);
    height: toRem(21);
    color: $aqua-color-gray-800;
    font-weight: bold;
    user-select: none;
    transition: all 0.25s ease;
    &:not(.selected):hover {
      font-size: toRem(16);
    }
    &.selected {
      cursor: unset;
      color: $aqua-color-white;
      background-color: $aqua-color-vivid-blue;
      border-radius: 50%;
    }
    .page-element-layout {
      width: 100%;
      height: 100%;
    }
    &.mobile {
      margin-left: $aqua-spacing3;
      margin-right: $aqua-spacing3;
    }
  }
  .page-next,
  .page-prev {
    cursor: pointer;
    flex: 0 0 auto;
    height: toRem(30);
    width: toRem(30);
    padding: $aqua-spacing1;
    &.mobile {
      padding: $aqua-spacing3;
    }
  }
  .measurePages {
    position: absolute;
    visibility: hidden;
  }
}
</style>

<style lang="scss">
.page-next,
.page-prev {
  .aqua-icon {
    max-height: unset !important;
  }

  &:hover {
    .aqua-icon {
      height: toRem(24) !important;
      width: toRem(24) !important;
    }
  }
}
</style>

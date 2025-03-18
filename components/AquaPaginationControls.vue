<template>
  <AquaLayout
    class="AquaPaginationControls"
    :class="[spacingClasses]"
    horizontal
    justify="center"
    align="center"
    aria-label="Pagination"
    role="nav"
  >
    <AquaLayout class="wrapper" horizontal inline justify="center">
      <AquaLayout
        v-if="firstPage"
        vertical
        align="center"
        justify="center"
        class="dir-btn dir-btn-first"
        :class="{ disabled: disablePrevPage }"
        aria-label="First page"
        :aria-disabled="disablePrevPage"
        role="button"
        :tabindex="disablePrevPage ? -1 : 0"
        @click="goToFirstPage"
        @keydown.enter="goToFirstPage"
      >
        <AquaIcon
          icon="double-chevron-left"
          size="20"
          :tint="disablePrevPage ? colors.aquaColorGray400 : colors.aquaColorGray800"
        ></AquaIcon>
      </AquaLayout>

      <AquaLayout
        vertical
        align="center"
        justify="center"
        class="dir-btn dir-btn-prev"
        :class="{ disabled: disablePrevPage }"
        aria-label="Previous page"
        :aria-disabled="disablePrevPage"
        role="button"
        :tabindex="disablePrevPage ? -1 : 0"
        @click="goToPrevPage"
        @keydown.enter="goToPrevPage"
      >
        <AquaIcon
          icon="chevron-left"
          size="20"
          :tint="disablePrevPage ? colors.aquaColorGray400 : colors.aquaColorGray800"
        ></AquaIcon>
      </AquaLayout>

      <AquaLayout horizontal class="page-description aqua-text-caption" role="status"
        >Page {{ currentPage }} of {{ pageCount }}</AquaLayout
      >

      <AquaLayout
        vertical
        align="center"
        justify="center"
        class="dir-btn dir-btn-next"
        :class="{ disabled: disableNextPage }"
        aria-label="Next page"
        :aria-disabled="disableNextPage"
        role="button"
        :tabindex="disableNextPage ? -1 : 0"
        @click="goToNextPage"
        @keydown.enter="goToNextPage"
      >
        <AquaIcon
          icon="chevron-right"
          size="20"
          :tint="disableNextPage ? colors.aquaColorGray400 : colors.aquaColorGray800"
        ></AquaIcon>
      </AquaLayout>

      <AquaLayout
        v-if="lastPage"
        vertical
        align="center"
        justify="center"
        class="dir-btn dir-btn-last"
        :class="{ disabled: disableNextPage }"
        aria-label="Last page"
        :aria-disabled="disableNextPage"
        role="button"
        :tabindex="disableNextPage ? -1 : 0"
        @click="goToLastPage"
        @keydown.enter="goToLastPage"
      >
        <AquaIcon
          icon="double-chevron-right"
          size="20"
          :tint="disableNextPage ? colors.aquaColorGray400 : colors.aquaColorGray800"
        ></AquaIcon>
      </AquaLayout>
    </AquaLayout>
  </AquaLayout>
</template>

<script lang="ts">
import colors from '@aqua/styles/design-system/colors.module.scss'
import { Spacing } from '../mixins/Spacing.js'

interface AquaPaginationControlsData {
  valueInternal: number
  spacingClasses: Array<string>
}

export default {
  name: 'AquaPaginationControls',
  mixins: [Spacing],
  props: {
    firstPage: Boolean,
    lastPage: Boolean,
    modelValue: {
      type: Number,
      default: 0
    },
    pageCount: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:modelValue'],
  data(): AquaPaginationControlsData {
    return {
      valueInternal: 0,
      spacingClasses: []
    }
  },
  computed: {
    colors() {
      return colors
    },
    currentPage() {
      return this.valueInternal === this.pageCount ? this.pageCount : this.valueInternal + 1
    },
    disableNextPage() {
      return this.valueInternal === this.pageCount - 1
    },
    disablePrevPage() {
      return this.valueInternal === 0
    }
  },
  watch: {
    modelValue(value, oldValue) {
      if (value !== oldValue) this.valueInternal = this.modelValue
    }
  },
  mounted() {
    this.valueInternal = this.modelValue
  },
  methods: {
    goToNextPage() {
      if (this.disableNextPage) return
      this.valueInternal += 1
      this.$emit('update:modelValue', this.valueInternal)
    },
    goToPrevPage() {
      if (this.disablePrevPage) return
      this.valueInternal -= 1
      this.$emit('update:modelValue', this.valueInternal)
    },
    goToFirstPage() {
      if (this.disablePrevPage) return
      this.valueInternal = 0
      this.$emit('update:modelValue', this.valueInternal)
    },
    goToLastPage() {
      if (this.disableNextPage) return
      this.valueInternal = this.pageCount - 1
      this.$emit('update:modelValue', this.valueInternal)
    }
  }
}
</script>

<style lang="scss" scoped>
.AquaPaginationControls {
  .dir-btn {
    cursor: pointer;
    flex: 0 0 auto;
    height: toRem(20);
    width: toRem(20);
    margin: 0 $aqua-spacing1;
    &[aria-disabled='true'] {
      pointer-events: none;
    }
  }
  .page-description {
    line-height: toRem(20);
    margin: 0 $aqua-spacing1;
  }
  .wrapper {
    flex: 0 0 auto;
  }
}
</style>

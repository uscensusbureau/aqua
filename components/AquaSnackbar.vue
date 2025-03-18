<template>
  <div v-if="showSnackbar">
    <div
      v-if="!cardType"
      class="aqua-snackbar"
      :class="[
        {
          top,
          center,
          bottom,
          relativePosition,
          openAnimation,
          closeAnimation,
          wFull
        },
        spacingClasses
      ]"
    >
      <slot></slot>
    </div>
    <AquaCard
      v-else
      square
      elevated
      class="aqua-snackbar"
      :class="[
        {
          top,
          center,
          bottom,
          relativePosition,
          openAnimation,
          closeAnimation,
          wFull
        },
        spacingClasses
      ]"
    >
      <AquaLayout horizontal class="aqua-snackbar-content pa-2" justify="center" align="center">
        <slot></slot>
      </AquaLayout>
    </AquaCard>
  </div>
</template>

<script lang="ts">
import { Spacing } from '../mixins/Spacing.js'

interface AquaSnackbarData {
  valueInternal: boolean
  showSnackbar: boolean
  openAnimation: boolean
  openTimer: number
  closeAnimation: boolean
  closeTimer: number
  spacingClasses: Array<string>
}

export default {
  name: 'AquaSnackbar',
  mixins: [Spacing],
  props: {
    modelValue: Boolean,
    timeout: {
      type: [String, Number],
      default: -1
    },
    top: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    },
    relativePosition: {
      type: Boolean,
      default: false
    },
    bottom: {
      type: Boolean,
      default: false
    },
    cardType: {
      type: Boolean,
      default: true
    },
    wFull: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  data: function () {
    return {
      valueInternal: false,
      showSnackbar: false,
      openAnimation: false,
      openTimer: -1,
      closeAnimation: false,
      closeTimer: -1,
      spacingClasses: []
    } as AquaSnackbarData
  },
  watch: {
    modelValue(newValue) {
      this.valueInternal = newValue
      if (newValue) {
        this.$nextTick(() => {
          this.snackbarOpenAnimation()
        })
      } else {
        this.snackbarCloseAnimation()
      }
    },
    valueInternal() {
      this.$emit('update:modelValue', this.valueInternal) // for v-model support
    }
  },
  mounted() {
    this.SetSpacingClasses()

    this.valueInternal = this.modelValue
  },
  methods: {
    snackbarOpenAnimation() {
      // Handle auto-dismiss
      if (this.timeout !== -1) {
        setTimeout(() => {
          this.valueInternal = false
        }, parseInt(this.timeout as string))
      }
      // Show the snackbar
      this.showSnackbar = true
      // Do open animation
      this.openAnimation = false
      this.$nextTick(() => {
        this.openAnimation = true
        window.clearTimeout(this.openTimer)
        this.openTimer = window.setTimeout(() => (this.openAnimation = false), 250)
      })
    },
    snackbarCloseAnimation() {
      // Do close animation
      this.closeAnimation = false
      this.$nextTick(() => {
        this.closeAnimation = true
        window.clearTimeout(this.closeTimer)
        this.closeTimer = window.setTimeout(() => {
          this.closeAnimation = false
          this.showSnackbar = false
        }, 250)
      })
    }
  }
}
</script>

<style scoped lang="scss">
@use '../aqua-vars.module.scss' as *;

.aqua-snackbar {
  &.wFull {
    width: 100%;
  }
  &.relativePosition {
    position: absolute;
  }
  &:not(.relativePosition) {
    position: fixed;
  }

  left: 50%;
  transform: translate(-50%, 0);
  padding: 0;
  z-index: $aqua-zindex-snackbar;
  &.center {
    top: 50%;
    transform: translate(-50%, -50%);
    // opacity: 0;
    transition: opacity 250ms;
    &.openAnimation {
      opacity: 1;
    }
    &.closeAnimation {
      opacity: 0;
    }
  }
  &.top {
    top: 0;
    &.openAnimation {
      animation: snackbarOpenTop 250ms forwards;
      animation-iteration-count: 1;
    }
    &.closeAnimation {
      animation: snackbarCloseTop 250ms forwards;
      animation-iteration-count: 1;
    }
  }
  &.bottom {
    bottom: 0;
    &.openAnimation {
      animation: snackbarOpenBottom 250ms forwards;
      animation-iteration-count: 1;
    }
    &.closeAnimation {
      animation: snackbarCloseBottom 250ms forwards;
      animation-iteration-count: 1;
    }
  }
}
</style>

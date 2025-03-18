<template>
  <div
    v-if="size === 'thin' && indeterminate"
    class="aqua-progress-linear"
    :class="[spacingClasses]"
  >
    <div class="progress-thin-indeterminate"></div>
  </div>

  <div
    v-else-if="size === 'thin' && !indeterminate"
    class="aqua-progress-linear"
    :class="[spacingClasses]"
  >
    <div class="progress-thin-determinate">
      <div class="thin-progress" :style="`width: ${value}%; background-color: ${color};`"></div>
    </div>
  </div>

  <div
    v-else-if="size === 'normal'"
    class="aqua-progress-linear normal"
    :aria-label="value + '%'"
    :class="[spacingClasses]"
  >
    <div class="progress-normal-determinate">
      <AquaLayout horizontal justify="start">
        <div class="normal-progress-background" :class="{ mobile: isMobile }"></div>

        <slot></slot>
      </AquaLayout>

      <div
        class="normal-progress"
        :class="{ mobile: isMobile }"
        :style="`width: ${value}%; background-color: ${color};`"
      ></div>
    </div>
  </div>

  <div v-else class="aqua-progress-linear" :aria-label="value + '%'" :class="[spacingClasses]">
    <div class="full-progress" :style="`width: ${value}%`">
      <div class="full-label">{{ value }}%</div>
    </div>
  </div>
</template>

<script lang="ts">
import colors from '@aqua/styles/design-system/colors.module.scss'

import { Spacing } from '../mixins/Spacing.js'

interface AquaProgressLinearData {
  spacingClasses: Array<string>
}

export default {
  name: 'AquaProgressLinear',
  mixins: [Spacing],
  props: {
    value: [Number, String],
    size: {
      type: String,
      default: 'normal'
    },
    indeterminate: Boolean,
    color: {
      type: String,
      default: colors.aquaColorCoral500
    },
    isMobile: Boolean
  },
  data() {
    return {
      spacingClasses: []
    } as AquaProgressLinearData
  },
  computed: {
    colors() {
      return colors
    }
  },
  mounted() {
    this.SetSpacingClasses()
  }
}
</script>

<style lang="scss">
@use '../aqua-vars.module.scss' as *;

@keyframes running-progress {
  0% {
    margin-left: 0px;
    margin-right: 100%;
  }
  50% {
    margin-left: 25%;
    margin-right: 0%;
  }
  100% {
    margin-left: 100%;
    margin-right: 0;
  }
}

.aqua-progress-linear {
  display: block;
  position: relative;
  color: $aqua-color-white;
  text-align: left;
  height: toRem(16);
  &.normal {
    height: toRem(10);
  }
  .full-progress {
    height: 100%;
    background-image: linear-gradient(to right, #4cb4c2, $aqua-color-primary-900);
    transition: width 250ms;
  }
  .full-label {
    font-size: toRem(10);
    font-family: $aqua-font-family;
    width: 100%;
    text-align: right;
    padding-right: toRem(6);
    position: relative;
    top: toRem(1);
  }
  .progress-thin-determinate,
  .progress-thin-indeterminate,
  .progress-thin-indeterminate:before {
    height: toRem(3);
    width: 100%;
    margin: 0;
  }
  .progress-thin-indeterminate {
    background-color: $aqua-color-gray-50;
    display: flex;
    &:before {
      background-color: $aqua-color-coral-500;
      content: '';
      animation: running-progress 500ms linear infinite;
    }
  }
  .progress-thin-determinate {
    background-color: $aqua-color-steel-200;
    display: flex;
    position: relative;
    .thin-progress {
      height: 100%;
      transition: width 250ms;
    }
  }
  .progress-normal-determinate {
    height: 100%;
    width: 100%;
    margin: 0;
    display: flex;
    color: $aqua-color-steel-600;
    font-size: toRem(9);
    position: absolute;
    line-height: toRem(10);
    .normal-progress {
      transition: width 250ms;
      z-index: 1;
      max-width: toRem(140);
      position: absolute;

      &.mobile {
        max-width: toRem(200);
      }
    }
    .normal-progress-background {
      background-color: $aqua-color-steel-200;
      width: toRem(140);
      margin-right: $aqua-spacing1;

      &.mobile {
        width: toRem(200);
      }
    }
    .normal-progress,
    .normal-progress-background {
      border-radius: toRem(25);
      height: toRem(6);
      margin-top: toRem(2);
    }
  }
}
</style>

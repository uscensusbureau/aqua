<template>
  <AquaCard
    square
    class="aqua-banner"
    :class="[spacingClasses]"
    :style="`
      background-color: ${bgColor};
    `"
  >
    <AquaLayout horizontal align="stretch" justify="center" class="aqua-banner_outer-layout">
      <!-- color bar -->
      <AquaFlex
        v-if="leftHighlight"
        flex="0"
        class="bar"
        :style="`
          background-color: ${fgColor};
        `"
      ></AquaFlex>
      <AquaFlex flex="1">
        <AquaLayout horizontal align="start" justify="center" class="aqua-banner_inner-layout">
          <!-- icon -->
          <AquaFlex flex="0">
            <AquaIcon class="icon" :icon="type" size="24" :tint="fgColor" aria-label></AquaIcon>
          </AquaFlex>
          <!-- text -->
          <AquaFlex flex="1" class="message">
            <div tabindex="0" v-html="message"></div>
          </AquaFlex>
          <!-- close button -->
          <AquaFlex
            v-if="closeable"
            flex="0"
            tabindex="0"
            @click="$emit('close')"
            @keydown.enter="$emit('close')"
          >
            <AquaIcon
              icon="close"
              size="12"
              :tint="colors.aquaColorPrimary900"
              class="close"
              aria-label="close banner"
            ></AquaIcon>
          </AquaFlex>
        </AquaLayout>
      </AquaFlex>
    </AquaLayout>
  </AquaCard>
</template>

<script lang="ts">
import colors from '@aqua/styles/design-system/colors.module.scss'

import { Spacing } from '../mixins/Spacing.js'

interface AquaBannerData {
  spacingClasses: Array<string>
}

export default {
  name: 'AquaBanner',
  mixins: [Spacing],
  props: {
    type: {
      type: String,
      default: 'info'
    },
    message: String,
    closeable: {
      type: Boolean,
      default: true
    },
    leftHighlight: {
      type: Boolean,
      default: true
    }
  },
  emits: ['close'],
  data() {
    return {
      spacingClasses: []
    } as AquaBannerData
  },
  computed: {
    fgColor() {
      switch (this.type) {
        default:
        case 'info':
          return '#00BDE3'
        case 'warn':
          return '#FFBE2E'
        case 'error':
          return '#D54309'
        case 'success':
          return '#00A91C'
      }
    },
    bgColor() {
      switch (this.type) {
        default:
        case 'info':
          return '#E7F6F8'
        case 'warn':
          return '#FAF3D1'
        case 'error':
          return '#F4E3DB'
        case 'success':
          return '#ECF3EC'
      }
    },
    colors() {
      return colors
    }
  },
  mounted() {
    this.SetSpacingClasses()
  }
}
</script>

<style scoped lang="scss">
@use '../aqua-vars.module.scss' as *;

.aqua-banner {
  min-height: toRem(44);
  width: 100%;
  color: $aqua-color-gray-800;
  .bar {
    width: toRem(6);
  }
  .icon {
    position: relative;
    top: toRem(2);
    width: toRem(24);
    margin-right: $aqua-spacing2;
  }
  .message {
    position: relative;
    top: toRem(6);
    margin-right: $aqua-spacing2;
    margin-bottom: $aqua-spacing2;
  }
  .close {
    cursor: pointer;
    margin-top: toRem(6);
  }
  .aqua-banner_outer-layout .aqua-banner_inner-layout {
    height: 100%;
  }
  .aqua-banner_inner-layout {
    padding: $aqua-spacing2;
  }
}
</style>

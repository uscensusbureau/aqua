<template>
  <AquaLayout
    horizontal
    align="center"
    justify="center"
    class="aqua-chip"
    :class="[spacingClasses]"
    :style="{ color: textColor, backgroundColor: backgroundColor, borderColor }"
    tabindex="0"
    @keydown.enter.stop.prevent="onEnter"
  >
    <AquaLayout vertical justify="start" class="aqua-chip_icon-area">
      <slot name="prepend"></slot>
    </AquaLayout>
    <AquaFlex flex="1" class="aqua-chip_label-area aqua-text-small-caption">
      <slot></slot>
    </AquaFlex>
    <AquaFlex v-if="closeable" flex="0">
      <AquaIcon
        v-if="closeable"
        class="close"
        icon="close"
        size="8"
        :tint="textColor"
        @click.stop.prevent="onClick"
      ></AquaIcon>
    </AquaFlex>
    <slot name="append"></slot>
  </AquaLayout>
</template>

<script lang="ts">
import { Spacing } from '../mixins/Spacing.js'

interface AquaChipData {
  spacingClasses: Array<string>
}

export default {
  name: 'AquaChip',
  mixins: [Spacing],
  props: {
    closeable: Boolean,
    textColor: String,
    backgroundColor: String,
    borderColor: String
  },
  emits: ['close'],
  data() {
    return {
      spacingClasses: []
    } as AquaChipData
  },
  mounted() {
    this.SetSpacingClasses()
  },
  methods: {
    onClick() {
      this.$emit('close')
    },
    onEnter() {
      this.onClick()
    }
  }
}
</script>

<style lang="scss">
@use '../aqua-vars.module.scss' as *;

/*
  Adding .aqua-layout for the specificity score so that
    aqua-chip always has precedence. 
*/
.aqua-layout.aqua-chip {
  flex: 0 0 auto;
  background-color: $aqua-color-azul-50;
  color: $aqua-color-black;
  border-radius: toRem(2);
  border-width: toRem(1);
  border-style: solid;
  padding-left: $aqua-spacing1;
  padding-right: $aqua-spacing2;
  min-height: toRem(26);
  .aqua-chip_icon-area,
  .aqua-chip_label-area {
    cursor: default;
    padding: 0;
    margin: 0;
    margin-right: $aqua-spacing1;
    height: 100%;
    max-width: 100%;
    font-weight: bold;
    min-width: auto;
  }
  .aqua-chip_icon-area {
    * {
      vertical-align: middle;
      height: toRem(14);
    }
  }
  .close {
    cursor: pointer;
    font-size: toRem(18);
    position: relative;
    left: toRem(2);
    padding-bottom: toRem(9);
    margin-left: $aqua-spacing1;
  }
  &[disabled],
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>

// TODO: This component could use some fleshing out (ie, implement v-model, positioning, etc)
<template>
  <AquaCard square class="aqua-tooltip" :class="{ triangle: !closeable, shadow }">
    <AquaLayout vertical>
      <AquaLayout horizontal class="aqua-tooltip-closelayout">
        <AquaSpacer></AquaSpacer>
        <div
          v-if="closeable"
          class="aqua-tooltip-closebutton"
          tabindex="0"
          aria-label="Close Tooltip"
          @click="$emit('close')"
          @keydown.enter="$emit('close')"
        >
          <AquaIcon icon="close" size="14" :tint="colors.aquaColorPrimary900"></AquaIcon>
        </div>
      </AquaLayout>
      <slot></slot>
    </AquaLayout>
  </AquaCard>
</template>

<script lang="ts">
import colors from '@aqua/styles/design-system/colors.module.scss'

interface AquaTooltipData {
  spacingClasses: Array<string>
}

export default {
  name: 'AquaTooltip',
  props: {
    closeable: Boolean,
    shadow: Boolean
  },
  emits: ['close'],
  data() {
    return {
      spacingClasses: []
    } as AquaTooltipData
  },
  computed: {
    colors(): CSSModuleClasses {
      return colors
    }
  }
}
</script>

<style scoped lang="scss">
@use '../aqua-vars.module.scss' as *;

.aqua-tooltip {
  color: $aqua-color-gray-800;
  background: $aqua-color-gray-100;
  padding: toRem(10);
  border-radius: 3px;
  min-width: toRem(200);
  z-index: 99;
  overflow: visible;
  position: absolute;
  white-space: normal;
  .aqua-tooltip-closelayout {
    width: 100%;
  }
  .aqua-tooltip-closebutton {
    padding: toRem(6);
    font-size: toRem(18);
    color: $aqua-color-primary-900;
    cursor: pointer;
  }
  &.shadow {
    box-shadow: 0 toRem(5) toRem(5) toRem(-3) rgba($aqua-color-black, 0.2),
      0 toRem(8) toRem(10) toRem(1) rgba($aqua-color-black, 0.14),
      0 toRem(3) toRem(14) toRem(2) rgba($aqua-color-black, 0.12);
  }
}

.triangle:before {
  border: solid;
  border-color: $aqua-color-gray-100 transparent;
  border-width: 0 toRem(8) toRem(8) toRem(8);
  top: toRem(-8);
  content: '';
  left: toRem(15);
  position: absolute;
  z-index: 99;
}
</style>

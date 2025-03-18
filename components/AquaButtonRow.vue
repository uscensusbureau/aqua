<template>
  <AquaLayout horizontal class="AquaButtonRow" :class="[spacingClasses]">
    <slot></slot>
  </AquaLayout>
</template>

<script lang="ts">
import { Spacing } from '../mixins/Spacing.js'

interface AquaButtonRowData {
  spacingClasses: Array<string>
}

export default {
  name: 'AquaButtonRow',
  mixins: [Spacing],
  data() {
    return {
      spacingClasses: []
    } as AquaButtonRowData
  },
  mounted() {
    this.SetSpacingClasses()
  }
}
</script>

<style lang="scss">
@use '../aqua-vars.module.scss' as *;

.AquaButtonRow {
  .aqua-button:not(:last-child) {
    margin-right: $aqua-spacing4;
  }
}
</style>

<style scoped lang="scss">
.AquaButtonRow {
  flex: 0 0 auto;
}
</style>

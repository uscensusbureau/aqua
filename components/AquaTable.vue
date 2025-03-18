<template>
  <AquaLayout
    horizontal
    align="start"
    justify="start"
    class="AquaTable"
    :class="[spacingClasses]"
    role="table"
  >
    <!-- Column Headers -->
    <div class="aqua-flex-table header" role="rowgroup">
      <div
        v-for="(column, columnIndex) in columns"
        :key="columnIndex"
        class="aqua-flex-row"
        :class="columnClasses ? columnClasses[columnIndex] : ''"
        role="row"
      >
        <slot name="column" :column="{ columnIndex, label: column }"></slot>
      </div>
    </div>

    <!-- Rows and Cells -->
    <div v-for="(row, rowIndex) in rows" :key="rowIndex" class="aqua-flex-column">
      <div name="row" :row="row" class="aqua-flex-row" role="row">
        <div
          v-for="(cell, cellIndex) in row"
          :key="cellIndex"
          class="aqua-flex-cell"
          :class="columnClasses ? columnClasses[cellIndex] : ''"
          role="cell"
        >
          <slot name="cell" :cell="{ rowIndex, cellInstance: cell }"></slot>
        </div>
      </div>
    </div>
  </AquaLayout>
</template>

<script lang="ts">
import { Spacing } from '../mixins/Spacing.js'

interface AquaTableData {
  spacingClasses: Array<string>
}

export default {
  name: 'AquaTable',
  mixins: [Spacing],
  props: {
    rows: Array,
    columns: Array,
    /* enable custom styles (e.g. width, alignment, etc) on both column header and row cells
    Ex: ['dimension', 'dimension', 'measure']
    Then apply styles in implementation component css. Ex: .dimension { color: blue } */
    columnClasses: Array
  },
  data: () =>
    ({
      spacingClasses: []
    } as AquaTableData),
  mounted() {
    this.SetSpacingClasses()
  }
}
</script>

<style lang="scss">
@use '../aqua-vars.module.scss' as *;

.AquaTable {
  display: block;
  width: 100%;
  color: $aqua-color-gray-800;
  font-size: toRem(12);
}

.aqua-flex-table {
  display: flex;
  flex-flow: row wrap;
  border-left: solid toRem(1) $aqua-color-gray-500;
  &:first-of-type .aqua-flex-row {
    background-color: $aqua-color-gray-100;
    border-top: solid toRem(1) $aqua-color-gray-500;
    border-bottom: solid toRem(1) $aqua-color-gray-500;
    border-right: solid toRem(1) $aqua-color-gray-500;
    font-weight: 600;
  }
  &.row:nth-child(odd) .aqua-flex-row {
    border-bottom: solid toRem(1) $aqua-color-steel-200;
    border-right: solid toRem(1) $aqua-color-steel-200;
  }
  &.header {
    width: 100%;
  }
}

.aqua-flex-row {
  display: table-row;
  flex: 1;
  text-align: center;
  padding: toRem(8) toRem(8);
}

.aqua-flex-column {
  display: flex;
  flex-flow: column wrap;
  width: 100%;
  padding: 0;
  .aqua-flex-row {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    padding: 0;
    border: 0;
    border-bottom: solid toRem(1) $aqua-color-steel-200;
    &:hover {
      background-color: $aqua-color-steel-50;
    }
    transition: background-color 500ms;
  }
}

.aqua-flex-cell {
  text-align: center;
  padding: toRem(8) toRem(8);
  display: table-cell;
  flex: 1;
  border-right: solid toRem(1) $aqua-color-primary-200;
  &:first-child {
    border-left: solid toRem(1) $aqua-color-primary-200;
  }
}
</style>

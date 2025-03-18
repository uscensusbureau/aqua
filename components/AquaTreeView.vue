<template>
  <ul class="AquaTreeView">
    <div v-show="valueInternal && options.maxDepth >= 0">
      <AquaTreeViewItem
        v-for="(_, index) in valueInternal"
        :key="index"
        v-model="valueInternal[index]"
        :options="options"
        :depth="0"
        @expand="onExpand"
        @checked="onChecked"
        @selected="onSelected"
        @collapsed="onCollapsed"
      >
        <template #headerIcon="{ item }">
          <slot name="headerIcon" :item="item"></slot>
        </template>

        <template #item="{ item }">
          <slot name="item" :item="item">{{ item.label }}</slot>
        </template>

        <template #appendSlot="{ item }">
          <slot name="appendSlot" :item="item"></slot>
        </template>
      </AquaTreeViewItem>
    </div>
  </ul>
</template>

<script>
export default {
  name: 'AquaTreeView',
  props: {
    modelValue: Object,
    options: {
      type: Object,
      default: () => ({
        showLeaves: true,
        checkableBranches: true
      })
    }
  },
  emits: ['update:modelValue', 'expand', 'checked', 'selected', 'collapsed'],
  data: () => ({
    valueInternal: null
  }),
  watch: {
    modelValue: {
      handler(newValue) {
        this.valueInternal = newValue
      },
      immediate: true,
      deep: true
    },
    valueInternal: {
      handler(newValue) {
        this.$emit('update:modelValue', newValue)
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    onExpand(itemData) {
      // You can use this to lazy load the children
      this.$emit('expand', itemData)
    },
    onChecked(itemData) {
      this.$emit('checked', itemData)
    },
    onSelected(itemData) {
      const items = this.$el.querySelectorAll('.AquaTreeViewItem')
      for (const item of items) {
        const component = item.__vue__
        if (component) {
          const isSelectedItem = itemData === component.modelValue
          component.setSelected(isSelectedItem ? true : false)
        }
      }

      this.$emit('selected', itemData)
    },
    onCollapsed(itemData) {
      this.$emit('collapsed', itemData)
    }
  }
}
</script>

<style lang="scss">
.AquaTreeView {
  margin-left: -1.25rem;
  list-style-type: none !important;
  ul,
  li {
    list-style-type: none !important;
  }
  ul {
    margin-left: 0;
    padding-left: 1.75rem;
  }
}
</style>

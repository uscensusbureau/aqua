<template>
  <li
    class="AquaTreeViewItem"
    :class="{
      emphasized: valueInternal.selected && options.emphasizedActiveState,
      'is-branch-checkbox': showCheckbox && isBranch,
      'indent-for-parent-checkbox': indentForParentCheckbox
    }"
    :aria-label="ariaLabel"
  >
    <AquaLayout
      v-show="showItem"
      horizontal
      justify="center"
      align="top"
      class="itemContent"
      :class="{
        selected: valueInternal.selected,
        disabled: valueInternal.disabled,
        expanded: valueInternal.expanded,
        wideItemSpacing: options.wideItemSpacing
      }"
      :aria-disabled="valueInternal.disabled"
      @keydown.enter="onEnter"
      @click.stop="onClick"
    >
      <!-- Slot for custom icons -->
      <slot class="slot" name="headerIcon" :item="valueInternal"></slot>

      <div
        v-if="showCheckbox && !isBranch"
        class="checkbox inline"
        :class="{ 'show-as-folders': options.asFolders && isBranch }"
      >
        <AquaCheckbox
          v-model="valueInternal.checked"
          :aria-label="valueInternal.label"
          :disabled="valueInternal.disabled"
          @click.stop="() => {}"
        ></AquaCheckbox>
      </div>

      <div class="inline" :tabindex="isBranch && !valueInternal.disabled ? '0' : '-1'">
        <div
          v-if="
            (chevronIcon || folderIcon) &&
            (hasBranchChildren || options.showLeaves) &&
            !options.noIcon
          "
          class="expand inline"
          :tabindex="options.selectableBranches ? '0' : '-1'"
          @click.stop="onClickIcon"
          @keydown.enter.stop="onEnterIcon"
        >
          <template v-if="!options.asFolders">
            <AquaIcon
              :icon="chevronIcon"
              :tint="colors.aquaColorGray800"
              :size="24"
              class="chevron-icon"
              :class="{ expanded: valueInternal.expanded }"
              tint-transition-time="100"
            ></AquaIcon>
          </template>

          <template v-else>
            <AquaIcon
              :icon="folderIcon"
              :tint="colors.aquaColorGray800"
              :size="24"
              tint-transition-time="250"
              class="folder-icon"
            ></AquaIcon>
          </template>
        </div>

        <div
          v-if="showCheckbox && isBranch"
          class="checkbox inline"
          :class="{ 'show-as-folders': options.asFolders && isBranch }"
          @click.stop.prevent
        >
          <AquaCheckbox
            v-model="valueInternal.checked"
            :aria-label="valueInternal.label"
            :disabled="valueInternal.disabled"
          ></AquaCheckbox>
        </div>

        <slot class="slot" name="item" :item="valueInternal"
          ><span>{{ item.label }}</span></slot
        >
      </div>
    </AquaLayout>

    <ul v-if="valueInternal && valueInternal.expanded && isBranch && isBelowMaxDepth">
      <AquaTreeViewItem
        v-for="(_, index) in valueInternal.children"
        :key="index"
        v-model="valueInternal.children[index]"
        :options="options"
        :depth="depth + 1"
        :branch-mixture="branchMixtureOfChildren"
        @selected="onChildSelected"
        @expand="onChildExpanded"
        @checked="onChecked"
      >
        <template #item="{ item }">
          <slot name="item" :item="item"></slot>
        </template>
      </AquaTreeViewItem>
    </ul>

    <slot name="appendSlot" :item="valueInternal"></slot>
  </li>
</template>

<script>
import colors from '@aqua/styles/design-system/colors.module.scss'

export default {
  name: 'AquaTreeViewItem',
  props: {
    modelValue: Object,
    branchMixture: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default: () => ({
        showLeaves: true,
        checkableBranches: true
      })
    },
    depth: Number
  },
  emits: ['update:modelValue', 'expand', 'checked', 'selected', 'collapsed'],
  data: () => ({
    valueInternal: null,
    branchMixtureOfChildren: false
  }),
  computed: {
    indentForParentCheckbox() {
      // add extra indentation if siblings have a checkbox and this item does not
      if (this.branchMixture && !this.isBranch) return true
      return this.options.checkableBranches && !this.showCheckbox
    },
    ariaLabel() {
      if (this.isBranch) {
        if (this.valueInternal.expanded) {
          return `expanded.`
        } else {
          return `collapsed.`
        }
      } else {
        return ''
      }
    },
    chevronIcon() {
      return this.isBranch
        ? this.valueInternal.expanded &&
          (this.hasBranchChildren || this.options.showLeaves) &&
          this.isBelowMaxDepth
          ? 'chevron-right'
          : 'chevron-right'
        : null
    },
    folderIcon() {
      return this.isBranch
        ? this.valueInternal.expanded &&
          (this.hasBranchChildren || this.options.showLeaves) &&
          this.isBelowMaxDepth
          ? 'tree-folder-open'
          : 'tree-folder'
        : null
    },
    isSelectable() {
      return (
        this.options.selectableBranches ||
        !this.options.showLeaves ||
        (!this.isBelowMaxDepth && this.isBranch) ||
        (!this.isBranch && !this.options.checkableLeaves)
      )
    },
    isBranch() {
      return this.valueInternal && !!this.valueInternal.children
    },
    isBranchWithChildren() {
      return (
        this.valueInternal && this.valueInternal.children && this.valueInternal.children.length > 0
      )
    },
    hasBranchChildren() {
      if (this.isBranch) {
        for (const child of this.valueInternal.children) {
          if (child.children && child.children.length > 0) {
            return true
          }
        }
      }
      return false
    },
    showItem() {
      return (
        this.valueInternal &&
        !(this.options.hideDisabled && this.valueInternal.disabled) &&
        (this.isBranch || this.options.showLeaves)
      )
    },
    showCheckbox() {
      if (this.valueInternal.checkable === false) {
        return false
      }

      if (this.isBranch && this.valueInternal.checkable) {
        return true
      }

      return this.isBranch ? this.options.checkableBranches : this.options.checkableLeaves
    },
    isBelowMaxDepth() {
      return this.depth < this.options.maxDepth
    },
    isChecked() {
      return this.valueInternal.checked
    },
    colors() {
      return colors
    }
  },
  watch: {
    modelValue: {
      handler(newValue) {
        this.valueInternal = newValue
        if (this.valueInternal.children && this.valueInternal.checkable) {
          return
        }
        if (this.valueInternal.children) {
          let hasBranches = false
          let hasNotBranches = false
          let hasExpandableCheckboxes = false
          let hasNotExpandableCheckboxes = false
          for (const child of this.valueInternal.children) {
            if (child.checkable && child.children) hasExpandableCheckboxes = true
            else hasNotExpandableCheckboxes = true
            if (child.children) hasBranches = true
            else hasNotBranches = true
            if (
              hasBranches &&
              hasNotBranches &&
              hasExpandableCheckboxes &&
              hasNotExpandableCheckboxes
            )
              break
          }
          this.branchMixtureOfChildren =
            hasBranches && hasNotBranches && hasExpandableCheckboxes && hasNotExpandableCheckboxes
        }
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
    },
    isChecked() {
      this.$emit('checked', this.valueInternal)
    }
  },
  methods: {
    onEnter() {
      this.onClick()
    },
    onEnterIcon() {
      this.onClickIcon()
    },
    onClickIcon() {
      if (this.options.selectableBranches) {
        if (this.valueInternal.disabled) {
          return
        }
        this.toggleExpanded()
        if (this.isSelectable && !this.options.selectableBranches) {
          this.$emit('selected', this.valueInternal)
        }
      } else {
        this.onClick()
      }
    },
    onClick() {
      if (this.valueInternal.disabled) {
        return
      }
      if (!this.isBranch) {
        // Allow checking items by clicking the label
        this.valueInternal.checked = !this.valueInternal.checked
      }
      if (!this.options.selectableBranches) {
        this.toggleExpanded()
      }
      if (this.isSelectable) {
        this.$emit('selected', this.valueInternal)
      }
    },
    toggleExpanded() {
      if (this.isBranch && (this.hasBranchChildren || this.options.showLeaves)) {
        this.valueInternal.expanded = !this.valueInternal.expanded
        this.$emit('update:modelValue', this.valueInternal) // for v-model support
        if (this.valueInternal.expanded) {
          // You can use this to lazy load the children
          this.$emit('expand', this.valueInternal)
        } else {
          this.$emit('collapsed', this.valueInternal)
        }
      }
    },
    onChecked(itemData) {
      this.$emit('checked', itemData)
    },
    onChildSelected(itemData) {
      this.$emit('selected', itemData)
    },
    onChildExpanded(itemData) {
      this.$emit('expand', itemData)
    },
    setSelected(value) {
      this.valueInternal.selected = value
    }
  }
}
</script>

<style lang="scss">
.AquaTreeViewItem {
  position: relative;

  &.indent-for-parent-checkbox {
    margin-left: toRem(28);
  }

  &.emphasized {
    border-left: toRem(4) solid $aqua-color-coral-500;
    font-weight: $aqua-font-weight-bold;
    background-color: $aqua-color-vivid-blue-active;
  }

  &.is-branch-checkbox {
    .expand {
      + .checkbox {
        margin-left: 0;
      }
    }
    .checkbox {
      margin-left: 1.75rem;
    }
  }

  ul {
    margin-top: toRem(-2);
  }

  .aqua-radio-group {
    padding-left: toRem(18);
  }

  .itemContent {
    display: inline-flex;
    cursor: pointer;
    padding: toRem(5);
    &.selected {
      background-color: $aqua-color-vivid-blue-active;
    }
    &.disabled {
      cursor: inherit;
      opacity: 0.5;
      pointer-events: none;
    }
    &.wideItemSpacing {
      min-height: 2rem;
      align-items: center;
      width: 100%;
      justify-content: start;
    }
  }

  .inline {
    display: inline-flex;
    vertical-align: middle;
    height: 100%;
  }

  .folder-icon {
    position: relative;
    top: toRem(6);
    margin-right: $aqua-spacing2;
  }

  .chevron-icon {
    margin-right: $aqua-spacing1;
    position: relative;
    top: -3px;
    &.expanded {
      transform: rotate(90deg);
    }
  }

  .checkbox {
    margin-right: toRem(3);
    &.show-as-folders {
      margin-right: $aqua-spacing3;
    }
  }
}
</style>

<template>
  <nav class="aqua-breadcrumbs" :class="[spacingClasses]">
    <span>//</span>
    <span v-for="(item, index) in items" :key="index" class="breadcrumbs-item">
      <span v-if="index > 0" class="breadcrumbs-divider">/</span>
      <RouterLink v-if="item.to" :to="item.to" class="link-hover">{{ item.text }}</RouterLink>
      <span v-else tabindex="0">{{ item.text }}</span>
    </span>
  </nav>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { Spacing } from '../mixins/Spacing.js'

interface AquaBreadcrumbsData {
  spacingClasses: Array<string>
}

interface AquaBreadcrumbItem {
  text: string
  to: Record<string, any>
}

export default {
  name: 'AquaBreadcrumbs',
  mixins: [Spacing],
  props: {
    items: Array as PropType<Array<AquaBreadcrumbItem>>
  },
  data() {
    return {
      spacingClasses: []
    } as AquaBreadcrumbsData
  },
  mounted() {
    this.SetSpacingClasses()
  }
}
</script>

<style lang="scss">
.link-hover {
  text-decoration: none !important;
  position: relative;
}

.link-hover:after {
  @include hoverUnderline();
}
.link-hover:hover:after {
  @include hoverUnderlineAfter();
}
.aqua-breadcrumbs {
  font-size: toRem(12);

  .breadcrumbs-item {
    padding-left: $aqua-spacing2;

    .breadcrumbs-divider {
      padding-right: $aqua-spacing2;
    }
  }
}
</style>

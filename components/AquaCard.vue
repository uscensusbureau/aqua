<template>
  <div class="aqua-card" :class="[{ navigates }, spacingClasses]" :aria-label="ariaLabel">
    <!-- action links -->
    <a
      v-if="navigates && external"
      class="aqua-card-action-link"
      :href="(linkTarget as string)"
      target="_blank"
      :aria-label="ariaLabel"
    ></a>
    <RouterLink
      v-if="navigates && !external"
      class="aqua-card-action-link"
      :to="linkTarget"
      :aria-label="ariaLabel"
    ></RouterLink>

    <!-- main card content -->
    <slot></slot>

    <!-- navigation icon, if passed -->
    <div v-if="hasIcon" class="navigationIconOuter">
      <div class="navigationIcon">
        <slot name="icon"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Spacing } from '../mixins/Spacing.js'

interface AquaCardData {
  spacingClasses: Array<string>
}

export default {
  name: 'AquaCard',
  mixins: [Spacing],
  props: {
    navigates: Boolean,
    external: Boolean,
    linkTarget: [String, Object],
    ariaLabel: String
  },
  data() {
    return {
      spacingClasses: []
    } as AquaCardData
  },
  computed: {
    hasIcon() {
      return !!this.$slots.icon
    }
  },
  mounted() {
    this.SetSpacingClasses()
  }
}
</script>

<style lang="scss">
@use '../aqua-vars.module.scss' as *;

.aqua-card {
  display: inline-block;
  position: relative;
  background-color: $aqua-color-white;
  border-radius: toRem(3);
  overflow: hidden;
  text-overflow: ellipsis;

  .aqua-card-action-link {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .aqua-card-heading-text {
    font-size: toRem(10);
    text-transform: uppercase;
    border-bottom: toRem(1) solid $aqua-color-coral-500;
  }
  .aqua-card-title-text {
    font-size: toRem(22);
    font-weight: bold;
    margin: toRem(18) 0 toRem(4) 0;
  }
  .aqua-card-description-text {
    font-size: toRem(14);
    margin-right: toRem(20);
  }
  .navigationIconOuter {
    position: absolute;
    right: toRem(10);
    bottom: toRem(10);
    width: toRem(25);
    height: toRem(25);
    .navigationIcon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: toRem(25);
      height: toRem(25);
      border: toRem(3) solid $aqua-color-vivid-blue;
      border-radius: 50%;
    }
  }
  &[square] {
    border-radius: 0;
  }
  &[border] {
    border: toRem(1) solid $aqua-color-steel-400;
  }
  &[elevated] {
    box-shadow: 0 toRem(5) toRem(5) toRem(-3) rgba($aqua-color-black, 0.2),
      0 toRem(8) toRem(10) toRem(1) rgba($aqua-color-black, 0.14),
      0 toRem(3) toRem(14) toRem(2) rgba($aqua-color-black, 0.12);
  }
  &.navigates {
    cursor: pointer;
  }
  &[overflow] {
    overflow: visible;
  }
}
</style>

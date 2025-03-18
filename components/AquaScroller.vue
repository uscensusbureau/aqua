<template>
  <DynamicScroller
    :items="scrollerItems"
    :min-item-size="10"
    :key-field="scrollerKey"
    :buffer="scrollerBuffer || 20"
    :class="classes"
  >
    <template #default="{ item, index, active }">
      <DynamicScrollerItem :item="item" :index="index" :active="active" :size-dependencies="[item]">
        <slot :scroll-item="item" :scroll-index="index"></slot>
      </DynamicScrollerItem>
    </template>
  </DynamicScroller>
</template>

<script lang="ts">
interface AquaScrollerData {
  parentHeight: string
  classes: Array<string>
}

export default {
  name: 'AquaScroller',
  props: {
    /**
     * The array of items to iterate over in the scroller
     * This is mandatory
     */
    scrollerItems: Array,
    /**
     * The unique identifier key of each object in the scrollerItems array of objects
     * This is mandatory
     */
    scrollerKey: String,
    /**
     * The height of the scroll element in desktop view. Must have a hard value for scroller to work properly
     */
    scrollerHeight: {
      type: String,
      default: 'auto'
    },
    /**
     * The width of the scroll element. If no value is defined, then the scroller will default to the width of the closest
     * ancestor element with a hard-defined width property
     */
    scrollerWidth: String,
    /**
     * The buffer distance from the bottom of the parent element for which the scroller will load additional list items
     * This is how many elements will be loaded out of the view field - the larger the buffer, the more elements
     * will be loaded 'out of view'
     * @default 20
     */
    scrollerBuffer: Number,
    /**
     * Property to detect whether the app is is mobile or desktop view
     */
    scrollerMobile: Boolean,
    /**
     * For use with scroller in popovers - a boolean that marks whether a popover dropdown is showing or not
     * this is watched for additional logic
     */
    scrollerShow: Boolean
  },
  data() {
    return {
      parentHeight: '',
      classes: ['scroller']
    } as AquaScrollerData
  },
  watch: {
    scrollerShow: {
      handler(newValue) {
        if (newValue) {
          this.setClasses()
        }
      },
      deep: true
    }
  },
  mounted() {
    this.setClasses()
  },
  methods: {
    async setClasses() {
      await this.$nextTick()

      if (this.scrollerMobile) {
        const parentHeightAdjusted = this.$el.parentElement.offsetHeight * 0.9
        this.parentHeight = `${parentHeightAdjusted}px`
        this.classes.push('scrollerMobile')
      } else {
        this.classes.push('scrollerDesktop')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.scroller {
  flex: 1;
}
.scrollerDesktop {
  width: v-bind('scrollerWidth');
  max-height: v-bind('scrollerHeight');
}

.scrollerMobile {
  width: 100%;
  height: v-bind('parentHeight');
}
</style>

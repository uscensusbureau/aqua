<template>
  <AquaCard v-show="valueInternal" square class="aqua-tooltip" :class="{ shadow }">
    <div class="triangle"></div>
    <AquaLayout vertical class="content-layout">
      <AquaLayout horizontal class="slot-layout" justify="center" align="center">
        <slot></slot>
        <AquaSpacer></AquaSpacer>
        <div
          v-if="closeable"
          class="aqua-tooltip-closebutton"
          tabindex="0"
          aria-label="Close Tooltip"
          @click="onClose"
          @keydown.enter="onClose"
        >
          <AquaIcon icon="close" size="14" :tint="colors.aquaColorPrimary900"></AquaIcon>
        </div>
      </AquaLayout>
    </AquaLayout>
  </AquaCard>
</template>

<script lang="ts">
import { aquaRelativePosition } from '../service/position'
import colors from '@aqua/styles/design-system/colors.module.scss'

interface AquaTooltipData {
  valueInternal: boolean
  spacingClasses: Array<string>
}

export default {
  name: 'AquaTooltip',
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    parentSelector: {
      type: String,
      required: true
    },
    orientation: {
      type: String,
      required: true
    },
    gap: {
      type: Number,
      default: 0
    },
    closeable: Boolean,
    shadow: Boolean
  },
  emits: ['update:modelValue', 'close'],
  data() {
    return {
      spacingClasses: [],
      valueInternal: false
    } as AquaTooltipData
  },
  watch: {
    modelValue: {
      handler(newValue: boolean) {
        if (newValue) {
          const parentElement = document.querySelector(this.parentSelector) as HTMLElement
          if (parentElement) {
            this.valueInternal = true
            this.$nextTick(() => {
              aquaRelativePosition(parentElement, this.$el, this.orientation, this.gap)
              aquaRelativePosition(parentElement, this.$el, this.orientation, this.gap)
              // Position the small caret
              this.$nextTick(() => {
                const triangleEl = this.$el.querySelector('.triangle')
                const tooltipEl = this.$el.querySelector('.content-layout')
                const triangleRect = triangleEl.getBoundingClientRect()
                const tooltipRect = tooltipEl.getBoundingClientRect()
                if (this.orientation === 'above') {
                  triangleEl.style.top = tooltipRect.bottom - 2 - triangleRect.height / 2 + 'px'
                  triangleEl.style.left =
                    tooltipRect.left + tooltipRect.width / 2 - triangleRect.width / 2 + 'px'
                }
                if (this.orientation === 'below') {
                  triangleEl.style.top = tooltipRect.top + 2 - triangleRect.height / 2 + 'px'
                  triangleEl.style.left =
                    tooltipRect.left + tooltipRect.width / 2 - triangleRect.width / 2 + 'px'
                }
                if (this.orientation === 'left') {
                  triangleEl.style.left = tooltipRect.right + 3 - triangleRect.width / 2 + 'px'
                  triangleEl.style.top =
                    tooltipRect.top + 3 + tooltipRect.height / 2 - triangleRect.height / 2 + 'px'
                }
                if (this.orientation === 'right') {
                  triangleEl.style.left = tooltipRect.left + 3 - triangleRect.width / 2 + 'px'
                  triangleEl.style.top =
                    tooltipRect.top + 3 + tooltipRect.height / 2 - triangleRect.height / 2 + 'px'
                }
              })
            })
          }
        } else {
          this.valueInternal = false
        }
      }
    }
  },
  computed: {
    colors(): CSSModuleClasses {
      return colors
    }
  },
  mounted() {
    document.addEventListener('click', (event: MouseEvent) => this.onClickDocument(event))
  },
  beforeUnmount() {
    document.removeEventListener('click', (event: MouseEvent) => this.onClickDocument(event))
  },
  methods: {
    onClickDocument(event: MouseEvent) {
      const target = event.target
      const targetElement = target ? (target as HTMLElement) : null
      if (!targetElement) return

      // Check to see if the clicked element is an activator
      const activatorParent = targetElement.closest('.aqua-activator')
      if (activatorParent || targetElement.classList.contains('aqua-activator')) {
        // Clicked the activator element - return without closing
        return
      }

      this.onClose()
    },
    onClose() {
      this.valueInternal = false
      this.$emit('update:modelValue', this.valueInternal)
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
@use '../aqua-vars.module.scss' as *;

.aqua-tooltip {
  color: $aqua-color-gray-800;
  background: $aqua-color-gray-100;
  border-radius: 3px;
  min-width: toRem(160);
  z-index: 99;
  overflow: visible;
  position: fixed;
  white-space: normal;
  .aqua-tooltip-closebutton {
    margin-left: $aqua-spacing2;
    font-size: toRem(18);
    color: $aqua-color-primary-900;
    cursor: pointer;
  }
  &.shadow {
    box-shadow: 0 toRem(5) toRem(5) toRem(-3) rgba($aqua-color-black, 0.2),
      0 toRem(8) toRem(10) toRem(1) rgba($aqua-color-black, 0.14),
      0 toRem(3) toRem(14) toRem(2) rgba($aqua-color-black, 0.12);
  }
  .slot-layout {
    margin-left: $aqua-spacing1;
    margin-right: $aqua-spacing1;
  }

  .triangle {
    position: fixed;
    height: toRem(20);
    width: toRem(20);
    background-color: $aqua-color-gray-100;
    transform: rotate(45deg);
  }
}
</style>

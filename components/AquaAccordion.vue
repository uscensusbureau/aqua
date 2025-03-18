<template>
  <AquaLayout
    v-if="panels.length"
    class="aqua-accordion"
    :class="[spacingClasses]"
    vertical
    align="start"
    justify="start"
  >
    <AquaFlex
      v-for="(panel, panelIndex) in panels"
      :key="panelIndex"
      flex="1"
      class="accordion-panel"
    >
      <h3 class="accordion-title">
        <AquaButton
          :id="`accordion-button-${panelIndex}-${uniqueID}`"
          class="accordion-button"
          type="button"
          :aria-controls="`accordion-content-${panelIndex}-${uniqueID}`"
          :aria-expanded="activeStates[panelIndex] ? 'true' : 'false'"
          tabindex="0"
        >
          <slot name="title" :panel="{ title: (panel as any).title }"></slot>
          <AquaFlex class="accordion-icon" flex="0" role="presentation">
            <AquaIcon icon="chevron-right" size="18" :tint="colors.aquaColorVividBlue"></AquaIcon
          ></AquaFlex>
        </AquaButton>
      </h3>
      <Transition
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @before-leave="onBeforeLeave"
        @leave="onLeave"
      >
        <div
          v-show="activeStates[panelIndex]"
          :id="`accordion-content-${panelIndex}-${uniqueID}`"
          class="accordion-content"
          :aria-hidden="activeStates[panelIndex] ? 'false' : 'true'"
          :aria-labelledby="`accordion-button-${panelIndex}-${uniqueID}`"
          role="region"
        >
          <div class="accordion-content-inner-container">
            <slot name="content" :panel="{ content: (panel as any).content }"></slot>
          </div>
        </div>
      </Transition>
    </AquaFlex>
  </AquaLayout>
</template>

<script lang="ts">
import { isUndefined } from 'lodash-es'

import colors from '@aqua/styles/design-system/colors.module.scss'

import { Spacing } from '../mixins/Spacing.js'

interface AquaAccordionData {
  activeStates: Array<boolean>
  spacingClasses: Array<string>
  uniqueID: string
}

export default {
  name: 'AquaAccordion',
  mixins: [Spacing],
  props: {
    activePanelIndex: {
      type: Number,
      required: false
    },
    panels: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activeStates: [],
      spacingClasses: [],
      uniqueID: ''
    } as AquaAccordionData
  },
  computed: {
    colors() {
      return colors
    }
  },
  created() {
    this.uniqueID = this.createID()

    for (let i = 0; i < this.panels.length; i++) {
      this.activeStates.push(
        !isUndefined(this.activePanelIndex) && i === this.activePanelIndex ? true : false
      )
    }
  },
  mounted() {
    this.SetSpacingClasses()

    this.$el.addEventListener('click', (event: MouseEvent) => this.toggle(event))
    window.addEventListener('keydown', (event: KeyboardEvent) => this.onKeydown(event))
  },
  beforeUnmount() {
    this.$el.removeEventListener('click', (event: MouseEvent) => this.toggle(event))
    window.removeEventListener('keydown', (event: KeyboardEvent) => this.onKeydown(event))
  },
  methods: {
    /**
     * Create a unique identifier to help differentiate between multiple instances of
     * an accordion on a page and safeguard against the occurence of duplicate
     * accordion button and content id attributes
     */
    createID() {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      const maxLength = 10

      let id = ''
      let num = 0

      while (num < maxLength) {
        id += chars.charAt(Math.floor(Math.random() * chars.length))
        num += 1
      }

      return id
    },
    toggle(e: MouseEvent) {
      const target = e.target
      const targetElement = target ? (target as HTMLElement) : null
      if (targetElement) {
        if (targetElement && targetElement.classList.contains('accordion-button')) {
          const panels = this.$el.querySelectorAll('.accordion-panel')
          panels.forEach((panel: any, panelIndex: number) => {
            const button = panel.querySelector('.accordion-button')
            this.toggleState(panelIndex, button.id === targetElement.id ? true : false)
          })
        }
      }
    },
    toggleState(index: number, current = false) {
      this.activeStates[index] = current ? !this.activeStates[index] : false
    },
    onKeydown(e: KeyboardEvent) {
      const keyCode = e.keyCode
      const activeElement = document.activeElement
      if (activeElement && activeElement.classList.contains('accordion-button')) {
        const buttons = this.$el.querySelectorAll('.accordion-button')
        buttons.forEach((button: HTMLElement, index: number) => {
          if (button === activeElement) {
            // Down arrow
            if (keyCode === 40) {
              const i = index === buttons.length - 1 ? 0 : (index += 1)
              buttons[i].focus()
            }
            // Up arrow
            if (keyCode === 38) {
              const i = index === 0 ? buttons.length - 1 : (index -= 1)
              buttons[i].focus()
            }
          }
        })
      }
    },
    onBeforeEnter(el: HTMLElement) {
      el.style.height = '0'
    },
    onEnter(el: HTMLElement) {
      el.style.height = `${el.scrollHeight}px`
    },
    onBeforeLeave(el: HTMLElement) {
      el.style.height = `${el.scrollHeight}px`
    },
    onLeave(el: HTMLElement) {
      el.style.height = '0'
    }
  }
}
</script>

<style lang="scss">
@use 'sass:math';

.aqua-accordion {
  .accordion-panel {
    background-color: $aqua-color-white;
    border-radius: toRem(6);
    overflow: hidden;
    width: 100%;
    &:not(:first-of-type) {
      margin-top: toRem(8);
    }
  }
  .accordion-title {
    .aqua-button {
      font-size: toRem(14);
      white-space: normal;
    }
  }
  .accordion-button {
    display: block;
    height: auto;
    text-align: left;
    text-transform: none;
    padding: toRem(15) toRem(36) toRem(15) toRem(15);
    position: relative;
    width: 100%;
    &[aria-expanded='true'] {
      padding-bottom: toRem(10);
      .accordion-icon {
        transform: rotate(-90deg);
      }
    }
  }
  .accordion-icon {
    height: toRem(16);
    pointer-events: none;
    position: absolute;
    right: toRem(8);
    top: calc(50% - #{toRem(math.div(16, 2))});
    transition: transform 300ms ease-in-out;
    width: toRem(16);
  }
  .accordion-content {
    overflow: hidden;
    transition: height 300ms ease-in-out;
  }
  .accordion-content-inner-container {
    padding: 0 toRem(15) toRem(15);
    :first-child {
      margin-top: 0;
    }
    :last-child {
      margin-bottom: 0;
    }
  }
}
</style>

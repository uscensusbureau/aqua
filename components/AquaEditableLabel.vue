<template>
  <AquaLayout
    horizontal
    align="center"
    justify="center"
    class="AquaEditableLabel"
    :class="[spacingClasses, { inputFocused }]"
  >
    <AquaFlex
      ><Component
        :is="tag"
        ref="label"
        class="label"
        tabindex="0"
        v-show="!editing"
        @click="onStartEditing"
        @keydown.enter="onStartEditing"
      >
        {{ valueInternal }}
      </Component></AquaFlex
    >

    <AquaFlex>
      <input
        v-show="editing"
        :value="modelValue"
        :maxlength="maxCharacterCount"
        ref="input"
        tabindex="0"
        :size="modelValue && modelValue.length < 150 ? modelValue.length : 150"
        class="input"
        type="text"
        @paste="handlePaste"
        @input="onInputChange($event as InputEvent)"
        @keydown.enter="onInputEnter"
        @focus="inputFocusEvent"
        @blur="inputBlurEvent"
    /></AquaFlex>
    <AquaLayout wrap flex="0">
      <AquaFlex
        v-show="!editing"
        class="pen-icon"
        tabindex="0"
        flex="0"
        @click="onStartEditing"
        @keydown.enter="onStartEditing"
      >
        <AquaIcon ref="icon" icon="pen" :tint="colors.aquaColorVividBlue" size="20"></AquaIcon
      ></AquaFlex>
      <AquaFlex
        flex="0"
        v-show="label !== valueInternal"
        class="reset-icon"
        tabindex="0"
        @click="onReset"
        @keydown.enter="onReset"
      >
        <AquaIcon icon="reset" size="20" :tint="colors.aquaColorVividBlue"></AquaIcon></AquaFlex
    ></AquaLayout>
    <AquaTooltip v-show="invalidInputMsg !== ''" class="invalid-input">
      {{ invalidInputMsg }}
    </AquaTooltip>
  </AquaLayout>
</template>

<script lang="ts">
import { Spacing } from '../mixins/Spacing.js'
import colors from '@aqua/styles/design-system/colors.module.scss'
import type { ComponentOptionsWithObjectProps } from 'vue'

interface EditableLabelData {
  spacingClasses: Array<string>
  valueInternal: string
  editing: boolean
  leftPosition: string
  invalidInputMsg: string
  deletedChars: Array<string>
  inputFocused: boolean
}
export default {
  name: 'AquaEditableLabel',
  mixins: [Spacing],
  props: {
    label: {
      type: String,
      required: true
    },
    modelValue: {
      type: String,
      required: true
    },
    fontSize: {
      type: String,
      default: '1rem'
    },
    maxCharacterCount: {
      type: Number,
      default: 300
    },
    allowedCharactersRegex: {
      type: RegExp,
      default: /./g //if no restrictions are set, allow any character
    },
    allowedCharactersString: {
      type: String
    },
    tag: {
      type: String,
      default: 'h2'
    }
  },
  emits: ['update:modelValue', 'startEdit', 'endEdit', 'reset'],
  data() {
    return {
      spacingClasses: [],
      valueInternal: '',
      editing: false,
      leftPosition: '',
      invalidInputMsg: '',
      deletedChars: [],
      inputFocused: false
    } as EditableLabelData
  },
  watch: {
    modelValue: {
      handler(newValue: string) {
        this.valueInternal = newValue
      }
    }
  },
  computed: {
    colors() {
      return colors
    },
    timer() {
      return this.invalidInputMsg !== '' ? 4000 : 0
    }
  },
  mounted() {
    this.SetSpacingClasses()
    if (this.modelValue) {
      this.valueInternal = this.modelValue
    }
    ;(this.$refs.input as ComponentOptionsWithObjectProps).value = this.modelValue as string

    window.addEventListener('click', (event: MouseEvent) => this.onDocumentClick(event))
  },
  beforeUnmount() {
    // odd case where the user clicks away by clicking on a button before 'saving' and there are special characters in the label
    this.handleNotAllowedCharacters(this.valueInternal)
    window.removeEventListener('click', (event: MouseEvent) => this.onDocumentClick(event))
  },
  methods: {
    onStartEditing() {
      this.editing = true
      this.$emit('startEdit')
      this.$nextTick(() => {
        ;(this.$refs.input as ComponentOptionsWithObjectProps).value = this.valueInternal
        ;(this.$refs.input as ComponentOptionsWithObjectProps).focus()
      })
    },

    /**
     * Updates the valueInternal and exits edit mode when clicked away from label
     */
    onDocumentClick(event: MouseEvent) {
      if (
        event.target !== this.$refs.label &&
        !(event.target as HTMLElement)?.classList.contains('aqua-icon')
      ) {
        //remove any character not allowed
        this.handleNotAllowedCharacters(this.valueInternal)

        this.resetValues()
      }
    },

    /**
     * Updates the valueInternal and exits edit mode when pressing enter key
     */
    onInputEnter() {
      //remove any character not allowed
      this.handleNotAllowedCharacters(this.valueInternal)

      this.resetValues()
    },

    /**
     * Resets values and dismisses the tooltip
     */
    resetValues() {
      //wait to reset all the values so it can auto dismiss the tooltip, if any
      setTimeout(() => {
        this.invalidInputMsg = ''
        this.editing = false
        this.$emit('endEdit')
        this.deletedChars = []
      }, this.timer)
    },

    /**
     * Updates the valueInternal any time a character is typed
     * @param event
     */
    onInputChange(event: InputEvent) {
      //check for the max length
      if ((event.target as HTMLInputElement).value.length >= this.maxCharacterCount) {
        this.handleMaxLength(event)
      }
      this.valueInternal = (event.target as HTMLInputElement).value

      this.$emit('update:modelValue', this.valueInternal)
    },

    /**
     * Reverts any changes made to the label
     */
    onReset() {
      this.$nextTick(() => {
        this.valueInternal = this.label as string
        ;(this.$refs.input as ComponentOptionsWithObjectProps).value = this.label
        this.$emit('update:modelValue', this.label)
        this.$emit('reset')

        this.invalidInputMsg = ''
      })
    },
    /**
     * Checks if the value passed has only allowed characters, removes them if not
     * @param value
     */
    handleNotAllowedCharacters(value: string) {
      ;[...value].forEach((char) => {
        if (!char.match(this.allowedCharactersRegex)) {
          value = value.split(char).join('')

          //push the invalid character into an array
          if (!this.deletedChars.includes(char)) this.deletedChars.push(char)
        }
      })

      if (this.deletedChars.length > 0) {
        this.invalidInputMsg = `The following characters were removed from your title: ${this.deletedChars.join(
          ''
        )}. Please only use alphanumeric characters or "${this.allowedCharactersString}".`
        if (
          this.$refs.input &&
          (this.$refs.input as ComponentOptionsWithObjectProps).getBoundingClientRect()
        ) {
          //set the left position of the tooltip
          this.leftPosition = `${Math.max(
            (this.$refs.input as ComponentOptionsWithObjectProps).getBoundingClientRect().width / 2,
            50
          )}px`
        }
      } else {
        this.invalidInputMsg = ''
      }

      this.valueInternal = value
      this.$emit('update:modelValue', this.valueInternal)
    },

    /**
     * Removes any characters above the maximum allowed length
     * @param event
     */
    handleMaxLength(event: InputEvent | ClipboardEvent) {
      this.valueInternal = (event.target as HTMLInputElement).value.slice(0, this.maxCharacterCount)
      this.$emit('update:modelValue', this.valueInternal)

      this.invalidInputMsg = `Sorry, only ${this.maxCharacterCount} characters allowed for this title.`
    },

    /**
     * Checks if text length is within the allowed length after text is pasted
     * @param event
     */
    handlePaste(event: ClipboardEvent) {
      const pastedText = event.clipboardData?.getData('text')
      //wait for the pasted text to get included in the input
      this.$nextTick(() => {
        if (pastedText && (event.target as HTMLInputElement).value.includes(pastedText)) {
          //check for the max length
          if ((event.target as HTMLInputElement).value.length >= this.maxCharacterCount) {
            this.handleMaxLength(event)
          }
        }
      })
    },
    inputFocusEvent() {
      this.inputFocused = true
    },
    inputBlurEvent() {
      this.inputFocused = false
    }
  }
}
</script>

<style scoped lang="scss">
.AquaEditableLabel {
  .label {
    font-size: v-bind('fontSize');
    color: $aqua-color-black;
    cursor: pointer;
    margin-right: $aqua-spacing1;
    margin-left: $aqua-spacing1;
    word-break: break-word;
    text-wrap: wrap;
    text-align: center;
    white-space: pre-wrap;
  }

  .pen-icon,
  .reset-icon,
  .check-icon {
    cursor: pointer;
  }

  .pen-icon {
    margin-left: $aqua-spacing1;
    margin-right: $aqua-spacing1;
  }

  .reset-icon {
    margin-right: $aqua-spacing1;
    margin-left: $aqua-spacing1;
  }

  .input {
    font-size: v-bind('fontSize');
    border: none;
    outline: transparent;
    max-width: 100%;
    text-align: center;
  }

  .invalid-input {
    font-size: toRem(12);
    top: 2.5rem;
    left: v-bind('leftPosition');
  }
}
</style>

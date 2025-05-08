/* eslint-disable camelcase */
export default {
  title: 'AquaButton',
  excludeStories: /.*Data$/
}

export const actionsData = {
  // onPinTask: action('onPinTask')
  // onArchiveTask: action('onArchiveTask')
}

const buttonTypes = Object.freeze({
  PRIMARY: 'Primary',
  SECONDARY: 'Secondary',
  TERTIARY: 'Tertiary'
})

const buttonTemplate = (type = buttonTypes.PRIMARY) =>
  `<aqua-button ${type} :disabled="disabled">Test Button</aqua-button>`

export const Primary = () => ({
  template: buttonTemplate(buttonTypes.PRIMARY),
  props: {
    disabled: {
      default: () => false
    }
  }
})

export const Primary_Disabled = () => ({
  template: buttonTemplate(buttonTypes.PRIMARY),
  props: {
    disabled: {
      default: () => true
    }
  }
})

export const Secondary = () => ({
  template: buttonTemplate(buttonTypes.SECONDARY),
  props: {
    disabled: {
      default: () => false
    }
  }
})

export const Secondary_Disabled = () => ({
  template: buttonTemplate(buttonTypes.SECONDARY),
  props: {
    disabled: {
      default: () => true
    }
  }
})

export const Tertiary = () => ({
  template: buttonTemplate(buttonTypes.TERTIARY),
  props: {
    disabled: {
      default: () => false
    }
  }
})

export const Tertiary_Disabled = () => ({
  template: buttonTemplate(buttonTypes.TERTIARY),
  props: {
    disabled: {
      default: () => true
    }
  }
})

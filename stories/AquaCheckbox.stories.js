export default {
  title: 'AquaCheckbox',
  excludeStories: /.*Data$/
}

export const actionsData = {
  // onPinTask: action('onPinTask')
  // onArchiveTask: action('onArchiveTask')
}

const checkboxTemplate = `
      <aqua-layout vertical inline align="center" justify="center">
        <aqua-checkbox label="Test Checkbox" :checked="checked" :disabled="disabled"></aqua-checkbox>
      </aqua-layout>
    `

export const Default = () => ({
  template: checkboxTemplate,
  props: {
    checked: {
      default: () => false
    },
    disabled: {
      default: () => false
    }
  }
})

export const Disabled = () => ({
  template: checkboxTemplate,
  props: {
    checked: {
      default: () => false
    },
    disabled: {
      default: () => true
    }
  }
})

export const Checked = () => ({
  template: checkboxTemplate,
  props: {
    checked: {
      default: () => true
    },
    disabled: {
      default: () => false
    }
  }
})

export const DisabledAndChecked = () => ({
  template: checkboxTemplate,
  props: {
    checked: {
      default: () => true
    },
    disabled: {
      default: () => true
    }
  }
})

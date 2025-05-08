export default {
  title: 'AquaToggle',
  excludeStories: /.*Data$/
}

export const actionsData = {
  // onPinTask: action('onPinTask')
  // onArchiveTask: action('onArchiveTask')
}

const toggleTemplate = `
      <aqua-toggle v-model="model" label="Toggle Switch" :disabled="disabled"></aqua-toggle>
    `

export const Default = () => ({
  template: toggleTemplate,
  props: {
    model: {
      default: () => false
    },
    disabled: {
      default: () => false
    }
  }
})

export const DisabledOff = () => ({
  template: toggleTemplate,
  props: {
    model: {
      default: () => false
    },
    disabled: {
      default: () => true
    }
  }
})

export const DisabledOn = () => ({
  template: toggleTemplate,
  props: {
    model: {
      default: () => true
    },
    disabled: {
      default: () => true
    }
  }
})

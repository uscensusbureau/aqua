export default {
  title: 'AquaRadio',
  excludeStories: /.*Data$/
}

export const actionsData = {
  // onPinTask: action('onPinTask')
  // onArchiveTask: action('onArchiveTask')
}

const radioTemplate = `
<aqua-radio-group v-model="model">
  <aqua-radio label="Test Radio Button 1" value="1" :disabled="disabled" :checked="checked"></aqua-radio>
  <aqua-radio label="Test Radio Button 2" value="2" :disabled="disabled" :checked="checked"></aqua-radio>
  <aqua-radio label="Test Radio Button 3" value="3" :disabled="disabled" :checked="checked"></aqua-radio>
</aqua-radio-group>
`

export const Default = () => ({
  template: radioTemplate,
  data: () => ({
    model: ''
  }),
  props: {
    disabled: { default: () => false },
    checked: { default: () => false }
  }
})

export const Checked = () => ({
  template: radioTemplate,
  data: () => ({
    model: ''
  }),
  props: {
    disabled: { default: () => false },
    checked: { default: () => true }
  }
})

export const Disabled = () => ({
  template: radioTemplate,
  data: () => ({
    model: ''
  }),
  props: {
    disabled: { default: () => true },
    checked: { default: () => false }
  }
})

export const CheckedAndDisabled = () => ({
  template: radioTemplate,
  data: () => ({
    model: ''
  }),
  props: {
    disabled: { default: () => true },
    checked: { default: () => true }
  }
})

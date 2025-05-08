// import { action } from '@storybook/addon-actions'

export default {
  title: 'AquaNumberInput',
  excludeStories: /.*Data$/
}

export const actionsData = {
  // onPinTask: action('onPinTask')
  // onArchiveTask: action('onArchiveTask')
}

const validation1to9 = (value) => {
  return parseFloat(value) >= 1 && parseFloat(value) <= 9
}

export const Default = () => ({
  template: `
    <aqua-number-input v-model="model" placeholder="Enter a number">
    </aqua-number-input>
  `,
  data: () => ({
    model: ''
  })
})

export const Error = () => ({
  template: `
    <aqua-number-input v-model="model" placeholder="Enter a number" error>
    </aqua-number-input>
  `,
  data: () => ({
    model: ''
  })
})

export const Validation1To9 = () => ({
  template: `
    <aqua-number-input v-model="model" placeholder="Enter a number between 1 and 9" :validator="validator">
    </aqua-number-input>
  `,
  data: () => ({
    model: '',
    validator: validation1to9
  })
})

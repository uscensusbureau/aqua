export default {
  title: 'AquaButtonBar',
  excludeStories: /.*Data$/
}

export const actionsData = {
  // onPinTask: action('onPinTask')
  // onArchiveTask: action('onArchiveTask')
}

export const Default = () => ({
  template: '<aqua-button-bar :buttons="buttons" v-model="model"></aqua-button-bar>',
  data: () => ({
    buttons: ['First', 'Second', 'Third', 'Fourth'],
    model: 0
  })
})

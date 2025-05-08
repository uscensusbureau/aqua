export default {
  title: 'AquaTextInput',
  excludeStories: /.*Data$/
}

export const actionsData = {
  // onPinTask: action('onPinTask')
  // onArchiveTask: action('onArchiveTask')
}

export const Default = () => ({
  data: () => ({
    model: ''
  }),
  template: '<aqua-text-input placeholder="Type here" v-model="model"></aqua-text-input>'
})

export const Outlined = () => ({
  data: () => ({
    model: ''
  }),
  template: '<aqua-text-input outlined placeholder="Type here" v-model="model"></aqua-text-input>'
})

export const DefaultSearch = () => ({
  data: () => ({
    model: ''
  }),
  template: '<aqua-text-input search placeholder="Type here" v-model="model"></aqua-text-input>'
})

export const OutlinedSearch = () => ({
  data: () => ({
    model: ''
  }),
  template:
    '<aqua-text-input search outlined placeholder="Type here" v-model="model"></aqua-text-input>'
})

export const Labeled = () => ({
  data: () => ({
    model: ''
  }),
  template:
    '<aqua-text-input search outlined label="Sample Label" placeholder="Type here" v-model="model"></aqua-text-input>'
})

export const Percentage = () => ({
  data: () => ({
    model: '100'
  }),
  template:
    '<aqua-text-input class="percent-input" outlined justify-right minimal :clearable="false" v-model="model"><div slot="append" class="percent">%</div></aqua-text-input>'
})

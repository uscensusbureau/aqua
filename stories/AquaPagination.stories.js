export default {
  title: 'AquaPagination',
  excludeStories: /.*Data$/
}

export const actionsData = {
  // onPinTask: action('onPinTask')
  // onArchiveTask: action('onArchiveTask')
}

export const Default = () => ({
  template: `
    <aqua-pagination :pageCount="5" v-model="model">
    </aqua-pagination>
  `,
  data: () => ({
    model: 1
  })
})

export const Overflow = () => ({
  template: `
    <aqua-pagination :pageCount="20" v-model="model">
    </aqua-pagination>
  `,
  data: () => ({
    model: 1
  })
})

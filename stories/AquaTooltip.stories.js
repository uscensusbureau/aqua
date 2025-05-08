export default {
  title: 'AquaTooltip',
  excludeStories: /.*Data$/
}

export const actionsData = {
  // onPinTask: action('onPinTask')
  // onArchiveTask: action('onArchiveTask')
}

const tooltipTemplate = `
    <aqua-layout horizontal justify="start">
      <aqua-tooltip :closeable="closeable"><p style="margin: 4px">This is a tooltip.</p></aqua-tooltip>
    </aqua-layout>
  `

export const Default = () => ({
  template: tooltipTemplate,
  data: () => ({
    closeable: false
  })
})

export const Closeable = () => ({
  template: tooltipTemplate,
  data: () => ({
    closeable: true
  })
})

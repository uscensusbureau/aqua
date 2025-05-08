export default {
  title: 'AquaTabs',
  excludeStories: /.*Data$/
}

export const actionsData = {
  // onPinTask: action('onPinTask')
  // onArchiveTask: action('onArchiveTask')
}

const tabsTemplate = `
    <aqua-tabs v-model="model">
      <aqua-tab value="all" label="ALL"></aqua-tab>
      <aqua-tab value="table" label="TABLES"></aqua-tab>
      <aqua-tab value="map" label="MAPS"></aqua-tab>
      <aqua-tab value="pages" label="PAGES"></aqua-tab>
      <aqua-tab value="disabled" label="DISABLED" disabled></aqua-tab>
    </aqua-tabs>
  `

export const Default = () => ({
  template: tabsTemplate,
  data: () => ({
    model: 'all'
  })
})

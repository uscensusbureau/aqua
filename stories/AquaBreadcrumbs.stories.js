export default {
  title: 'AquaBreadcrumbs',
  excludeStories: /.*Data$/
}

export const actionsData = {
  // onPinTask: action('onPinTask')
  // onArchiveTask: action('onArchiveTask')
}

const breadcrumbsTemplate = `
    <aqua-breadcrumbs :items="items"></aqua-breadcrumbs>
  `

export const Default = () => ({
  template: breadcrumbsTemplate,
  data: () => ({
    items: [
      {
        text: 'Search',
        to: () => {
          alert('Clicked Search')
        }
      },
      {
        text: 'Map',
        to: () => {
          alert('Clicked Map')
        }
      },
      {
        text: 'S0101',
        to: () => {}
      }
    ]
  })
})

export default {
  title: 'AquaNavbar',
  excludeStories: /.*Data$/
}

export const actionsData = {
  // onPinTask: action('onPinTask')
  // onArchiveTask: action('onArchiveTask')
}

export const SampleNavbarWithButtons = () => ({
  template: `
    <aqua-navbar class="sample-navbar">
      <aqua-button primary>Button</aqua-button>
      <aqua-spacer></aqua-spacer>
      <aqua-button secondary>Button</aqua-button>
      <aqua-button secondary>Button</aqua-button>
    </aqua-navbar>  
  `
})

export const SampleNavbarWithExtendedSlot = () => ({
  template: `
    <aqua-navbar class="sample-navbar" color="#f0f0f0">
      <aqua-button primary>Button</aqua-button>
      <aqua-spacer></aqua-spacer>
      <aqua-button secondary>Button</aqua-button>
      <aqua-button secondary>Button</aqua-button>
      <template slot="extended">
        <p style="margin: 8px">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam blandit vulputate diam fringilla congue. Praesent quam dui, sagittis ac rhoncus vitae, sagittis ut quam. Aliquam et feugiat sem, at mattis tellus. Donec in sagittis sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque nec vulputate orci. Mauris laoreet felis ut urna posuere, id maximus nibh mattis. In lobortis volutpat tellus in tempor. Nam condimentum vehicula purus. Maecenas eu neque posuere, bibendum ex eu, mollis arcu. Suspendisse potenti. Cras suscipit sed urna gravida vulputate.
        </p>
      </template>
    </aqua-navbar>  
  `
})

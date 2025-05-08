export default {
  title: 'AquaTypography',
  excludeStories: /.*Data$/
}

export const actionsData = {
  // onPinTask: action('onPinTask')
  // onArchiveTask: action('onArchiveTask')
}

const typographyTemplate = `
    <div>
      <h1>H1 Heading</h1>
      <h2>H2 Heading</h2>
      <h3>H3 Heading</h3>
      <h4>H4 Heading</h4>

      <p>Paragraph text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam blandit vulputate diam fringilla congue. Praesent quam dui, sagittis ac rhoncus vitae, sagittis ut quam. Aliquam et feugiat sem, at mattis tellus. Donec in sagittis sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque nec vulputate orci. Mauris laoreet felis ut urna posuere, id maximus nibh mattis. In lobortis volutpat tellus in tempor. Nam condimentum vehicula purus. Maecenas eu neque posuere, bibendum ex eu, mollis arcu. Suspendisse potenti. Cras suscipit sed urna gravida vulputate.</p>

      <a>Hyperlink</a> | <a disabled>Disabled Hyperlink</a>

      <br><br>
      <div>Font Family (Inter)</div>

      <br><br>
      <h3 heading>Heading with the "heading" attribute set</h3>
      <br><br>
      <h3 uppercase>Heading with the "uppercase" attribute set</h3>
      <br><br>
      <h3 wrap>Heading with the "wrap" attribute set Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam blandit vulputate diam fringilla congue. Praesent quam dui, sagittis ac rhoncus vitae, sagittis ut quam.</h3>
    </div>
  `

export const Default = () => ({
  template: typographyTemplate
})

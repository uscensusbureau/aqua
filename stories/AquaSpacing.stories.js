export default {
  title: 'AquaSpacing',
  excludeStories: /.*Data$/
}

export const actionsData = {
  // onPinTask: action('onPinTask')
  // onArchiveTask: action('onArchiveTask')
}

export const Default = () => ({
  template: `
    <div>
      <aqua-button primary ma-2>Button 1</aqua-button> 
      <aqua-button primary ma-2>Button 2</aqua-button> 
      <aqua-button primary ma-2>Button 3</aqua-button> 
      <aqua-button primary ma-2>Button 4</aqua-button> 
      <div class="block ma-md-12"></div>
      <div class="block ma-md-12"></div>
      <div class="block ma-md-12"></div>
    </div>
  `
})

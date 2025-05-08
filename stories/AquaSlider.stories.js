export default {
  title: 'AquaSlider',
  excludeStories: /.*Data$/
}

export const actionsData = {
  // onPinTask: action('onPinTask')
  // onArchiveTask: action('onArchiveTask')
}

export const Default = () => ({
  template: `
    <aqua-layout horizontal justify="center" align="center">
      <aqua-flex flex="1">
        <aqua-slider v-model="model" class="slider">
          <div slot="prepend"></div>
          <div slot="append"></div>          
        </aqua-slider>
      </aqua-flex>
      <aqua-flex flex="0" class="slider-label">{{parseInt(model)}}</aqua-flex>
    </aqua-layout>
  `,
  data: () => ({
    model: 25
  })
})

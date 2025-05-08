export default {
  title: 'AquaProgress',
  excludeStories: /.*Data$/
}

export const actionsData = {
  // onPinTask: action('onPinTask')
  // onArchiveTask: action('onArchiveTask')
}

export const Circular = () => ({
  template: `
    <aqua-progress-circular size="75" width="6" color="#112e51" indeterminate></aqua-progress-circular>
  `
})

export const LinearInterterminateThin = () => ({
  template: `
    <aqua-progress-linear thin indeterminate></aqua-progress-linear>
  `
})

export const LinearDeterminateThin = () => ({
  template: `
  <aqua-progress-linear value="50" thin></aqua-progress-linear>
  `
})

export const LinearDeterminate = () => ({
  template: `
  <aqua-progress-linear value="50"></aqua-progress-linear>
  `
})

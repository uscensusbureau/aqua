export default {
  title: 'AquaBanner',
  excludeStories: /.*Data$/
}

export const actionsData = {
  // onPinTask: action('onPinTask')
  // onArchiveTask: action('onArchiveTask')
}

export const Info = () => ({
  template: `
    <aqua-banner type="info" message="This is an info banner"></aqua-banner>
  `
})

export const Warning = () => ({
  template: `
    <aqua-banner type="warn" message="This is a warning banner"></aqua-banner>
  `
})

export const Error = () => ({
  template: `
    <aqua-banner type="error" message="This is an error banner"></aqua-banner>
  `
})

export const Success = () => ({
  template: `
    <aqua-banner type="success" message="This is a success banner"></aqua-banner>
  `
})

export const LongMessage = () => ({
  template: `
    <aqua-banner type="info" message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus malesuada, nisi aliquam lacinia iaculis, nisi justo pellentesque tellus, sed tristique sapien leo quis ante. Etiam justo velit, venenatis at enim sit amet, accumsan mattis tellus. Etiam non hendrerit libero. Ut vitae venenatis massa. Pellentesque in nisi risus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque lobortis arcu in magna imperdiet, sed volutpat ligula bibendum."></aqua-banner>
  `
})

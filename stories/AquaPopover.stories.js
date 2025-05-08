export default {
  title: 'AquaPopover',
  excludeStories: /.*Data$/
}

export const Default = () => ({
  template: `
    <div>
      <aqua-button class="aqua-activator" primary @click="model = true">Click Me</aqua-button>
      <aqua-popover class="sample-card"
        v-model="model"
        :positionY="62"
        :positionX="430"
        >
        <h3 class="aqua-dialog-title">Popover Title</h3>
        A Simple Popover. You can click outside the popover to dismiss this dialog.
      </aqua-popover>
    </div>
  `,
  data: () => ({
    model: false
  })
})

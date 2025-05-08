export default {
  title: 'AquaSheet',
  excludeStories: /.*Data$/
}

export const actionsData = {
  // onPinTask: action('onPinTask')
  // onArchiveTask: action('onArchiveTask')
}

export const Default = () => ({
  template: `
    <div>
      <aqua-button primary @click="model = true">Click Me</aqua-button>
      <aqua-sheet title="Simple Sheet" v-model="model">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non metus eros. Cras ut semper nisl, interdum accumsan ipsum. Proin id orci est. Integer egestas, diam a tempor sagittis, massa libero gravida nulla, ac ornare ipsum mi eu dolor. Aliquam vel lorem eget metus imperdiet viverra in et eros. Nam imperdiet nisi vel eros ullamcorper ornare. Sed ultrices velit quis pulvinar luctus. Curabitur in malesuada ipsum. Nam vel hendrerit magna, ac congue elit. Curabitur eu enim eu urna maximus tincidunt in eget libero. Praesent orci risus, ultricies at nibh eget, feugiat pharetra nisi. Maecenas lorem felis, finibus ac turpis at, blandit finibus tortor.</p>
        <p>Cras vitae dignissim sapien. Aenean id dolor ac enim bibendum feugiat in nec libero. Praesent lectus mauris, porta quis quam tristique, porta molestie dolor. Etiam eget eros scelerisque, placerat magna in, pretium lorem. Ut sodales orci sed diam lacinia, sit amet placerat justo pulvinar. Praesent eget tempor purus. Proin consectetur massa sit amet varius auctor.</p>
      </aqua-sheet>
    </div>
  `,
  data: () => ({
    model: false
  })
})

export const SheetUsingTitlebarSlot = () => ({
  template: `
    <div>
      <aqua-button primary @click="model = true">Click Me</aqua-button>
      <aqua-sheet title="Sheet Using Titlebar Slot" v-model="model">
        <template slot="titlebar">
          <aqua-button secondary style="margin-right: 8px">Sample Button</aqua-button>
        </template>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non metus eros. Cras ut semper nisl, interdum accumsan ipsum. Proin id orci est. Integer egestas, diam a tempor sagittis, massa libero gravida nulla, ac ornare ipsum mi eu dolor. Aliquam vel lorem eget metus imperdiet viverra in et eros. Nam imperdiet nisi vel eros ullamcorper ornare. Sed ultrices velit quis pulvinar luctus. Curabitur in malesuada ipsum. Nam vel hendrerit magna, ac congue elit. Curabitur eu enim eu urna maximus tincidunt in eget libero. Praesent orci risus, ultricies at nibh eget, feugiat pharetra nisi. Maecenas lorem felis, finibus ac turpis at, blandit finibus tortor.</p>
        <p>Cras vitae dignissim sapien. Aenean id dolor ac enim bibendum feugiat in nec libero. Praesent lectus mauris, porta quis quam tristique, porta molestie dolor. Etiam eget eros scelerisque, placerat magna in, pretium lorem. Ut sodales orci sed diam lacinia, sit amet placerat justo pulvinar. Praesent eget tempor purus. Proin consectetur massa sit amet varius auctor.</p>
      </aqua-sheet>
    </div>
  `,
  data: () => ({
    model: false
  })
})

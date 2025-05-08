export default {
  title: 'AquaSnackbar',
  excludeStories: /.*Data$/
}

export const actionsData = {
  // onPinTask: action('onPinTask')
  // onArchiveTask: action('onArchiveTask')
}

export const BottomSnackbar = () => ({
  template: `
    <div>
      <aqua-button primary @click="model = true">Click Me</aqua-button>
      <aqua-snackbar v-model="model">
        <strong>This is a bottom snackbar</strong>
        <aqua-button primary @click="model = false" style="margin-left: 8px">Close</aqua-button>
      </aqua-snackbar>
    </div>
  `,
  data: () => ({
    model: false
  })
})

export const TopSnackbar = () => ({
  template: `
    <div>
      <aqua-button primary @click="model = true">Click Me</aqua-button>
      <aqua-snackbar top v-model="model">
        <strong>This is a top snackbar</strong>
        <aqua-button primary @click="model = false" style="margin-left: 8px">Close</aqua-button>
      </aqua-snackbar>
    </div>
  `,
  data: () => ({
    model: false
  })
})

export const AutoDismissSnackbar = () => ({
  template: `
    <div>
      <aqua-button primary @click="model = true">Click Me</aqua-button>
      <aqua-snackbar top v-model="model" timeout="5000">
        <strong>This Snackbar Auto-Dismisses After 5 Seconds</strong>
      </aqua-snackbar>
    </div>
  `,
  data: () => ({
    model: false
  })
})

export const CenterDismissSnackbar = () => ({
  template: `
    <div>
      <aqua-button primary @click="model = true">Click Me</aqua-button>
      <aqua-snackbar center :cardType="false" v-model="model" timeout="3000">
        <aqua-banner :closeable="false" :leftHighlight="false" message="This Snackbar Auto-Dismisses After 3 Seconds"></aqua-banner>
      </aqua-snackbar>
    </div>
  `,
  data: () => ({
    model: false
  })
})

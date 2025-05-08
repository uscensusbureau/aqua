export default {
  title: 'AquaDialog',
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
      <aqua-dialog closebutton v-model="model">
        <h3 class="aqua-dialog-title">Dialog Title</h3>
        A Simple Dialog. You can click outside the dialog or the close "X" button to dismiss this dialog.
      </aqua-dialog>
    </div>
  `,
  data: () => ({
    model: false
  })
})

export const Modal = () => ({
  template: `
    <div>
      <aqua-button primary @click="model = true">Click Me</aqua-button>
      <aqua-dialog modal closebutton v-model="model">
        <h3 class="aqua-dialog-title">Dialog Title</h3>
        A Simple Modal Dialog. You can click the close "X" button to dismiss this dialog. Clicking outside the dialog box will not dismiss it.
      </aqua-dialog>
    </div>
  `,
  data: () => ({
    model: false
  })
})

export const DialogWithButtons = () => ({
  template: `
    <div>
      <aqua-button primary @click="model = true">Click Me</aqua-button>
      <aqua-dialog modal closebutton v-model="model">
        <h3 class="aqua-dialog-title">Dialog Title</h3>
        A Modal Dialog With Buttons. Click either button to dismiss the dialog box.
        <template slot="buttons">
          <aqua-button primary @click="model = false">Yes</aqua-button>
          <aqua-button secondary @click="model = false">No</aqua-button>
        </template>        
      </aqua-dialog>
    </div>
  `,
  data: () => ({
    model: false
  })
})

export const MobileDialog = () => ({
  template: `
    <div>
      <aqua-button primary @click="model = true">Click Me</aqua-button>
      <aqua-dialog mobile closebutton v-model="model">
        <h3 class="aqua-dialog-title">Dialog Title</h3>
        A Simple Mobile Dialog. Mobile dialogs take up the entire browser window.
      </aqua-dialog>
    </div>
  `,
  data: () => ({
    model: false
  })
})

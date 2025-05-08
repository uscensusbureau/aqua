export default {
  title: 'AquaChip',
  excludeStories: /.*Data$/
}

export const actionsData = {
  // onPinTask: action('onPinTask')
  // onArchiveTask: action('onArchiveTask')
}

const chipTemplate = `
      <aqua-layout horizontal justify="start" align="center" class="nowrap">
        <aqua-flex flex="0"><aqua-chip :closeable="closeable" :disabled="disabled" :textColor="textColor" :backgroundColor="backgroundColor">Test Chip</aqua-chip></aqua-flex>
      </aqua-layout>
    `

export const Default = () => ({
  template: chipTemplate,
  props: {
    closeable: {
      default: () => false
    },
    disabled: {
      default: () => false
    },
    textColor: {
      default: () => ''
    },
    backgroundColor: {
      default: () => ''
    }
  }
})

export const Closeable = () => ({
  template: chipTemplate,
  props: {
    closeable: {
      default: () => true
    },
    disabled: {
      default: () => false
    },
    textColor: {
      default: () => ''
    },
    backgroundColor: {
      default: () => ''
    }
  }
})

export const Disabled = () => ({
  template: chipTemplate,
  props: {
    closeable: {
      default: () => true
    },
    disabled: {
      default: () => true
    },
    textColor: {
      default: () => ''
    },
    backgroundColor: {
      default: () => ''
    }
  }
})

export const AlternateColors = () => ({
  template: chipTemplate,
  props: {
    closeable: {
      default: () => true
    },
    disabled: {
      default: () => false
    },
    textColor: {
      default: () => 'white'
    },
    backgroundColor: {
      default: () => 'blue'
    }
  }
})

export default {
  title: 'AquaDropdown',
  excludeStories: /.*Data$/
}

export const actionsData = {
  // onPinTask: action('onPinTask')
  // onArchiveTask: action('onArchiveTask')
}

const dropdownTemplate = `
    <aqua-dropdown :items="items" :outlined="outlined" :label="label"
      placeholder="Select an Item" item-label="label" item-value="value" v-model="model">
      <template slot="selection" slot-scope="{ item }">
        <span>{{ item.label }}</span>
      </template>
      <template slot="item" slot-scope="{ item }">
        <span>{{ item.label }}</span>
      </template>      
    </aqua-dropdown>
  `

const getDefaultProps = () => ({
  items: {
    default: () => [
      { label: 'Item One', value: 'one' },
      { label: 'Item Two', value: 'two' },
      { label: 'Item Three', value: 'three' },
      { label: 'Item Four', value: 'four' },
      { label: 'Item Five', value: 'five' },
      { label: 'Item Six', value: 'six' },
      { label: 'Item Seven', value: 'seven' }
    ]
  },
  model: {
    default: () => ''
  }
})

export const Default = () => ({
  template: dropdownTemplate,
  props: {
    ...getDefaultProps(),
    label: {
      default: () => ''
    },
    outlined: {
      default: () => false
    }
  }
})

export const Outlined = () => ({
  template: dropdownTemplate,
  props: {
    ...getDefaultProps(),
    label: {
      default: () => ''
    },
    outlined: {
      default: () => true
    }
  }
})

export const Labeled = () => ({
  template: dropdownTemplate,
  props: {
    ...getDefaultProps(),
    label: {
      default: () => 'Optional Label'
    },
    outlined: {
      default: () => true
    }
  }
})

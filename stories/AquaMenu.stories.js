export default {
  title: 'AquaMenu',
  excludeStories: /.*Data$/
}

export const actionsData = {
  // onPinTask: action('onPinTask')
  // onArchiveTask: action('onArchiveTask')
}

export const Default = () => ({
  template: `
    <aqua-menu
      v-model="model"
      :items="menuItems"
      item-value="id"
      item-label="label">
    </aqua-menu>
  `,
  data: () => ({
    model: '1',
    menuItems: [
      { label: 'Homer', id: '1' },
      { label: 'Marge', id: '2' },
      { label: 'Bart', id: '3' },
      { label: 'Lisa', id: '4' },
      { label: 'Maggie', id: '5' },
      { label: "Santa's Little Helper", id: '6' },
      { label: 'Snowball II', id: '7' },
      { label: 'Mr. Burns', id: '8' },
      { label: 'Smithers', id: '9' },
      { label: 'Flanders', id: '10' },
      { label: 'Moe', id: '11' },
      { label: 'Barney', id: '12' },
      { label: 'Carl', id: '13' },
      { label: 'Lenny', id: '14' },
      { label: 'Crusty The Clown', id: '15' },
      { label: 'Nelson', id: '16' }
    ]
  })
})

export const AsAPopup = () => ({
  template: `
    <aqua-menu
      popup
      v-model="model"
      :items="menuItems"
      item-value="id"
      item-label="label">
    </aqua-menu>
  `,
  data: () => ({
    model: '1',
    menuItems: [
      { label: 'Homer', id: '1' },
      { label: 'Marge', id: '2' },
      { label: 'Bart', id: '3' },
      { label: 'Lisa', id: '4' },
      { label: 'Maggie', id: '5' },
      { label: "Santa's Little Helper", id: '6' },
      { label: 'Snowball II', id: '7' },
      { label: 'Mr. Burns', id: '8' },
      { label: 'Smithers', id: '9' },
      { label: 'Flanders', id: '10' },
      { label: 'Moe', id: '11' },
      { label: 'Barney', id: '12' },
      { label: 'Carl', id: '13' },
      { label: 'Lenny', id: '14' },
      { label: 'Crusty The Clown', id: '15' },
      { label: 'Nelson', id: '16' }
    ]
  })
})

export const Searchable = () => ({
  template: `
    <aqua-menu
      popup
      searchable
      v-model="model"
      :items="menuItems"
      item-value="id"
      item-label="label">
    </aqua-menu>
  `,
  data: () => ({
    model: '1',
    menuItems: [
      { label: 'Homer', id: '1' },
      { label: 'Marge', id: '2' },
      { label: 'Bart', id: '3' },
      { label: 'Lisa', id: '4' },
      { label: 'Maggie', id: '5' },
      { label: "Santa's Little Helper", id: '6' },
      { label: 'Snowball II', id: '7' },
      { label: 'Mr. Burns', id: '8' },
      { label: 'Smithers', id: '9' },
      { label: 'Flanders', id: '10' },
      { label: 'Moe', id: '11' },
      { label: 'Barney', id: '12' },
      { label: 'Carl', id: '13' },
      { label: 'Lenny', id: '14' },
      { label: 'Crusty The Clown', id: '15' },
      { label: 'Nelson', id: '16' }
    ]
  })
})

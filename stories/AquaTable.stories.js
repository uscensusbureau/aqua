export default {
  title: 'AquaTable',
  excludeStories: /.*Data$/
}

export const Default = () => ({
  template: `
    <div>
    <aqua-table :rows="rows" :columns="columns" class="">
    <template slot="column" slot-scope="{ column }">
        {{ column.label }}
      </template>

      <template slot="cell" slot-scope="{ cell }">
          <div v-if="typeof cell.cellInstance === 'string'">
            {{ cell.cellInstance }}
          </div>
          <div class="checkbox-cell" v-else>
            <aqua-checkbox class="centered-checkbox"
            v-model="cell.cellInstance.checked"
            :disabled="cell.cellInstance.disabled"></aqua-checkbox>
            {{cell.cellInstance.label}}
          </div>
        </template>
  </aqua-table>
    </div>
  `,
  data: () => ({
    columns: ['Title 1', 'Title 2', 'Title 3', 'Title 4'],
    rows: [
      // [{ value: 'row 1.1' }, { value: 'row 1.2' }, { value: 'row 1.3' }]
      [
        'row 1',
        { checked: true, label: 'Left' },
        { checked: false, label: 'Right', disabled: true },
        { checked: false, label: 'Right' }
      ],
      [
        'row 2',
        { checked: false, label: 'Left' },
        { checked: true, label: 'Right', disabled: true },
        { checked: false, label: 'Right' }
      ],
      [
        'row 3',
        { checked: false, label: 'Left' },
        { checked: false, label: 'Right' },
        { checked: false, label: 'Right' }
      ],
      [
        'row 4',
        { checked: false, label: 'Left' },
        { checked: true, label: 'Right' },
        { checked: false, label: 'Right' }
      ],
      [
        'row 5',
        { checked: true, label: 'Left' },
        { checked: false, label: 'Right' },
        { checked: false, label: 'Right' }
      ],
      [
        'row 6',
        { checked: false, label: 'Left' },
        { checked: false, label: 'Right' },
        { checked: true, label: 'Right' }
      ]
    ]
  })
})

export default {
  title: 'AquaChips',
  excludeStories: /.*Data$/
}

export const actionsData = {
  // onPinTask: action('onPinTask')
  // onArchiveTask: action('onArchiveTask')
}

export const MultiLine = () => ({
  template: `
    <aqua-chips :chips="chips" wrap>
      <template slot="chip" slot-scope="{ chip }">
        <aqua-chip closeable textColor="white" backgroundColor="blue" class="nowrap">{{ chip }}</aqua-chip>
      </template>
    </aqua-chips>
  `,
  data: () => ({
    chips: ['Chip 1', 'Chip 2', 'Chip 3', 'Chip 4', 'Chip 5', 'Chip 6', 'Chip 7', 'Chip 8']
  })
})

export const SingleLine = () => ({
  template: `
    <aqua-chips :chips="chips">
      <template slot="chip" slot-scope="{ chip }">
        <aqua-chip closeable textColor="white" backgroundColor="blue" class="nowrap">{{ chip }}</aqua-chip>
      </template>
    </aqua-chips>
  `,
  data: () => ({
    chips: ['Chip 1', 'Chip 2', 'Chip 3', 'Chip 4', 'Chip 5', 'Chip 6', 'Chip 7', 'Chip 8']
  })
})

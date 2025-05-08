export default {
  title: 'AquaIcon',
  excludeStories: /.*Data$/
}

export const actionsData = {
  // onPinTask: action('onPinTask')
  // onArchiveTask: action('onArchiveTask')
}

export const Default = () => ({
  template: `
    <div>
      <aqua-icon icon="placeholder" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="select" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="cancel" tint="gray" size="32"></aqua-icon>
      <aqua-icon icon="table" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="notes" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="selections" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="geographies" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="years" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="topics" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="survey" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="code" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="hide" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="filter" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="sort" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="transpose" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="moe" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="restore" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="download" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="print" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="ftp" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="map" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="export" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="search" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="menu" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="more" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="add-to-list" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="layers" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="pan" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="identify" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="boundary-history" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="opacity" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="colors" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="classification" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="base-map" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="api" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="select-by-point" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="select-polygon" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="delete" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="chevron-double-down" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="my-list" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="customize" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="check" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="loading" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="close" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="back" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="chevron-down" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="chevron-up" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="chip-remove" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="blank" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="chevron-right" tint="gray" size="32"></aqua-icon> 
      <aqua-icon icon="chevron-left" tint="gray" size="32"></aqua-icon> 
    </div>
  `
})

export const TintMap = () => ({
  template: `
    <div>
      <aqua-icon icon="delete" :tintMap="{ default: 'gray', hover: 'orange' }" state="default" size="32"></aqua-icon> 
      <aqua-icon icon="delete" :tintMap="{ default: 'gray', hover: 'orange' }" state="hover" size="32"></aqua-icon> 
    </div>
  `
})

export const TintMapHoverEffect = () => ({
  template: `
    <div>
      <h5>Hover over the icon to see it change colors</h5>
      <aqua-icon
        icon="delete"
        :tintMap="{ default: 'gray', hover: 'orange' }"
        :state="state"
        size="48"
        @mouseover="state = 'hover'"
        @mouseleave="state = 'default'"
      >
      </aqua-icon> 
    </div>
  `,
  data: () => ({
    state: 'default'
  })
})

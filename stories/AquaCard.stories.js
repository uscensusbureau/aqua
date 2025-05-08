export default {
  title: 'AquaCard',
  excludeStories: /.*Data$/
}

export const actionsData = {
  // onPinTask: action('onPinTask')
  // onArchiveTask: action('onArchiveTask')
}

const cardTemplate = `
      <aqua-card :border="border" :square="square" :elevated="elevated" class="sample-card">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam blandit vulputate diam fringilla congue. Praesent quam dui, sagittis ac rhoncus vitae, sagittis ut quam. Aliquam et feugiat sem, at mattis tellus. Donec in sagittis sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque nec vulputate orci. Mauris laoreet felis ut urna posuere, id maximus nibh mattis. In lobortis volutpat tellus in tempor. Nam condimentum vehicula purus. Maecenas eu neque posuere, bibendum ex eu, mollis arcu. Suspendisse potenti. Cras suscipit sed urna gravida vulputate.
        </p>
      </aqua-card>
    `

export const Default = () => ({
  template: cardTemplate,
  props: {
    border: {
      default: () => false
    },
    square: {
      default: () => false
    },
    elevated: {
      default: () => false
    }
  }
})

export const Bordered = () => ({
  template: cardTemplate,
  props: {
    border: {
      default: () => true
    },
    square: {
      default: () => false
    },
    elevated: {
      default: () => false
    }
  }
})

export const Square = () => ({
  template: cardTemplate,
  props: {
    border: {
      default: () => true
    },
    square: {
      default: () => true
    },
    elevated: {
      default: () => false
    }
  }
})

export const Elevated = () => ({
  template: cardTemplate,
  props: {
    border: {
      default: () => false
    },
    square: {
      default: () => false
    },
    elevated: {
      default: () => true
    }
  }
})

export const BlueNavigationCard = () => ({
  template: `
    <aqua-card class="sample-card">
      <span class="aqua-card-heading-text">Explore Data</span>
      <div class="aqua-card-title-text">Maryland Profile</div>
      <div class="aqua-card-description-text">Maryland has a total area of 9,707 square miles, including 2,695.6 square miles of water, making it the 42nd-largest state by area. Maryland is bordered by West Virginia, Pennsylvania, Delaware, District of Columbia, and Virginia.</div>
    </aqua-card>
  `
})

export const AquaNavigationCard = () => ({
  template: `
    <aqua-card class="sample-card">
      <span class="aqua-card-heading-text">Explore Data</span>
      <div class="aqua-card-title-text">9.0% <span class="moe">+/- 0.4%</span> Poverty, All people in Maryland</div>
      <div class="small-text">
        Source 2018 American Community Survey 1-Year Estimates<br>
        https://www.census.gov/programs-surveys/acs/          
      </div>
    </aqua-card
  `
})

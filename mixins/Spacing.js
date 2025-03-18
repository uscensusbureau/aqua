export const Spacing = {
  methods: {
    // Converts spacing attributes to classes
    SetSpacingClasses() {
      const spacings = [
        'ma-',
        'mt-',
        'mr-',
        'mb-',
        'ml-',
        'mx-',
        'my-',
        'pa-',
        'pt-',
        'pr-',
        'pb-',
        'pl-',
        'px-',
        'py-'
      ]
      const attrs = Object.keys(this.$attrs)
      attrs.forEach((attr) => {
        if (spacings.includes(attr.slice(0, 3))) {
          this.spacingClasses.push(attr)
        }
      })
    }
  }
}

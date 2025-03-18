/**
 * Master list of value filters.
 * @param value value to format
 * @param format how the value should be formatted
 */
export const aquaFormatValue = (value, format) => {
  // TODO have api/search featuredresults response also use these updated format values
  if (format === 'commas') {
    format = 'number'
  } else if (format === 'commas,dollar' || format === 'commas, dollar') {
    format = 'dollar'
  }

  // handle values that haven't been assigned
  if (value === undefined || value === null) {
    return ''
  }

  // simply return booleans and non-numbers as is
  if (typeof value === 'boolean' || isNaN(value)) {
    return value
  }

  switch (format) {
    // Returns value formatted as a dollar currency
    case 'dollar':
      return '$' + parseFloat(value).toLocaleString()

    // Classifies and returns a number's position as 1st, 2nd, 3rd, or higher
    case 'ordinal': {
      const n = Number(value)
      const j = n % 10
      const k = n % 100

      if (n === 1) {
        return ''
      } else if (j === 1 && k !== 11) {
        return n + 'st-'
      } else if (j === 2 && k !== 12) {
        return n + 'nd-'
      } else if (j === 3 && k !== 13) {
        return n + 'rd-'
      } else {
        return n + 'th-'
      }
    }

    // Returns value formatted as a percentage
    case 'PCT':
    case 'percent':
      return value + '%'

    case 'annotation':
      return value

    /* Returns number value as a string formatted with commas and decimal points
    ex. 1231234.56 => 1,231,234.56 */
    // Also add commas if incorrect or undefined format is provided
    case 'number':
    default:
      // HACK: linter makes a valid point here
      // eslint-disable-next-line no-case-declarations
      let parsedFloat = parseFloat(value).toLocaleString()
      if (typeof value === 'string') {
        const valueSplit = value.split('.')
        const parsedSplit = parsedFloat.split('.')
        if (valueSplit.length === 2) {
          const valueDigits = valueSplit[1].length
          if (parsedSplit.length !== 2) {
            parsedFloat += '.' + '0'.repeat(valueDigits)
          } else {
            const parsedDigits = parsedSplit[1].length
            if (valueDigits > parsedDigits) {
              parsedFloat += '0'.repeat(valueDigits - parsedDigits)
            }
          }
        }
      }
      return parsedFloat
  }
}

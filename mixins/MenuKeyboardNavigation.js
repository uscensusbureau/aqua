export const MenuKeyboardNavigation = {
  methods: {
    goLeft(menuItemElement) {
      const highlightable = menuItemElement.querySelectorAll('[tabindex]:not([tabindex="-1"])')
      // Get the index of the currently highlighted sub item (if present)
      let index = -1
      for (let i = 0; i < highlightable.length; i++) {
        const item = highlightable[i]
        if (item.hasAttribute('subItemHighlight')) {
          index = i
          break
        }
      }
      if (!!highlightable && highlightable.length) {
        // Unhighlight any previously highlighted items
        highlightable.forEach((item) => {
          item.removeAttribute('subItemHighlight')
        })
        // No current subItemHighlight item - highlight the last sub item
        if (index === -1) {
          highlightable[highlightable.length - 1].setAttribute('subItemHighlight', 'true')
        } else {
          // Highlight the previous item
          --index
          if (index < 0) {
            // Wrap
            index = highlightable.length - 1
          }
          highlightable[index].setAttribute('subItemHighlight', 'true')
        }
      }
    },
    goRight(menuItemElement) {
      const highlightable = menuItemElement.querySelectorAll('[tabindex]:not([tabindex="-1"])')
      // Get the index of the currently highlighted sub item (if present)
      let index = -1
      for (let i = 0; i < highlightable.length; i++) {
        const item = highlightable[i]
        if (item.hasAttribute('subItemHighlight')) {
          index = i
          break
        }
      }
      if (!!highlightable && highlightable.length) {
        // Unhighlight any previously highlighted items
        highlightable.forEach((item) => {
          item.removeAttribute('subItemHighlight')
        })
        // No current subItemHighlight item - highlight the first sub item
        if (index === -1) {
          highlightable[0].setAttribute('subItemHighlight', 'true')
        } else {
          // Highlight the next item
          ++index
          if (index >= highlightable.length) {
            // Wrap
            index = 0
          }
          highlightable[index].setAttribute('subItemHighlight', 'true')
        }
      }
    },
    nextMenuItem(menuElement) {
      unhighlightAllSubItems(menuElement)
      const highlightedIndex = highlightedItemIndex(menuElement)
      if (highlightedIndex === -1) {
        // highlight the first item
        highlightItemByIndex(menuElement, 0)
      } else {
        // highlight the next item
        highlightItemByIndex(menuElement, highlightedIndex + 1)
      }
      scrollHighlightedIntoView(menuElement)
    },
    prevMenuItem(menuElement) {
      unhighlightAllSubItems(menuElement)
      const highlightedIndex = highlightedItemIndex(menuElement)
      if (highlightedIndex === 0) {
        // Hitting up arrow on the first item unhighlights all
        this.unhighlightAll(menuElement)
      } else if (highlightedIndex === -1) {
        // highlight the first item
        highlightItemByIndex(menuElement, 0)
      } else {
        // highlight the previous item
        highlightItemByIndex(menuElement, highlightedIndex - 1)
      }
      scrollHighlightedIntoView(menuElement)
    },
    unhighlightAll(menuElement) {
      const allItems = menuElement.querySelectorAll('.aqua-menu-item')
      for (let i = 0; i < allItems.length; i++) {
        allItems[i].__vue__.setHighlighted(false)
      }
      unhighlightAllSubItems(menuElement)
    }
  }
}

function scrollHighlightedIntoView(menuElement) {
  const allItems = menuElement.querySelectorAll('.aqua-menu-item')
  // This statement gets exactly the new highlighted item
  // while menuElement.querySelector('.highlighted') does not.
  const highlighted = [...allItems].find((item) => item.__vue__.highlighted)
  if (!highlighted) {
    return
  }

  const rect = highlighted.getBoundingClientRect()
  const menuRect = menuElement.getBoundingClientRect()
  // When the element is fully visible, do nothing
  if (rect.top >= menuRect.top && rect.bottom <= menuRect.bottom) {
    return
  }

  highlighted.scrollIntoView({
    behavior: 'auto',
    block: 'end',
    inline: 'nearest'
  })
}

function highlightedItemIndex(menuElement) {
  const highlighted = menuElement.querySelector('.highlighted')
  if (highlighted) {
    const allItems = menuElement.querySelectorAll('.aqua-menu-item')
    for (let i = 0; i < allItems.length; i++) {
      if (allItems[i] === highlighted) {
        return i
      }
    }
  }
  return -1
}

function highlightItemByIndex(menuElement, index) {
  const allItems = menuElement.querySelectorAll('.aqua-menu-item')
  if (index >= 0 && index < allItems.length) {
    for (let i = 0; i < allItems.length; i++) {
      allItems[i].__vue__.setHighlighted(i === index)
    }
  }
}

function unhighlightAllSubItems(menuElement) {
  const highlightable = menuElement.querySelectorAll('[tabindex]:not([tabindex="-1"])')
  if (!!highlightable && highlightable.length) {
    highlightable.forEach((item) => {
      item.removeAttribute('subItemHighlight')
    })
  }
}

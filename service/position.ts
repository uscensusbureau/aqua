/**
 * Positions an element relative to another, parent element
 * @param parentEl the parent html element
 * @param relativeEl the html element to be relatively positioned. This should be 'fixed' position.
 * @param align one of 'below', 'above', 'left', 'right'
 * @param gap extra space to be added between parent and relative element
 */
export const aquaRelativePosition = (
  parentEl: HTMLElement,
  relativeEl: HTMLElement,
  align: string = 'below',
  gap: number = 0
) => {
  const parentRect = parentEl.getBoundingClientRect()
  const parentHeight = parentRect.height
  const parentWidth = parentRect.width
  const relativeRect = relativeEl.getBoundingClientRect()
  const relativeHeight = relativeRect.height
  const relativeWidth = relativeRect.width
  const windowHeight = document.documentElement.clientHeight
  const windowWidth = document.documentElement.clientWidth

  if (align === 'below') {
    const newTop = parentRect.top + parentHeight + gap

    relativeEl.style.left = parentRect.left + 'px'
    relativeEl.style.top = newTop + 'px'
    relativeEl.style.minWidth = parentWidth + 'px'
    relativeEl.style.maxWidth = parentWidth + 'px'

    // Ensure the top and bottom of the element stay on screen
    if (relativeHeight > windowHeight) {
      // taller than the window
      relativeEl.style.top = '0'
      relativeEl.style.maxHeight = windowHeight + 'px'
    } else if (newTop + relativeHeight > windowHeight) {
      // goes off the bottom of the screen
      relativeEl.style.top = windowHeight - relativeHeight + 'px'
    }
  } else if (align === 'above') {
    const newTop = parentRect.top - (relativeHeight + gap)

    relativeEl.style.left = parentRect.left + 'px'
    relativeEl.style.top = newTop + 'px'
    relativeEl.style.minWidth = parentWidth + 'px'
    relativeEl.style.maxWidth = parentWidth + 'px'

    // Ensure the top and bottom of the element stay on screen
    if (relativeHeight > windowHeight) {
      // taller than the window
      relativeEl.style.top = '0'
      relativeEl.style.maxHeight = windowHeight + 'px'
    } else if (newTop < 0) {
      // goes off the top of the screen
      relativeEl.style.top = '0px'
    }
  } else if (align === 'left') {
    const newLeft = parentRect.left - (relativeWidth + gap)
    const newTop = parentRect.top + parentHeight / 2 - relativeHeight / 2

    relativeEl.style.top = newTop + 'px'
    relativeEl.style.left = newLeft + 'px'

    // Ensure the left and right of the element stay on screen
    if (relativeWidth > windowWidth) {
      // wider than the window
      relativeEl.style.left = '0'
      relativeEl.style.maxWidth = windowWidth + 'px'
    } else if (newLeft < 0) {
      // goes off the left of the screen
      relativeEl.style.left = 0 + 'px'
    } else if (newLeft + relativeWidth > windowWidth) {
      // goes off the right of the screen
      relativeEl.style.left = windowWidth - relativeWidth + 'px'
    }
  } else if (align === 'right') {
    const newRight = parentRect.right + gap
    const newTop = parentRect.top + parentHeight / 2 - relativeHeight / 2

    relativeEl.style.top = newTop + 'px'
    relativeEl.style.left = newRight + 'px'

    // Ensure the left and right of the element stay on screen
    if (relativeWidth > windowWidth) {
      // wider than the window
      relativeEl.style.left = '0'
      relativeEl.style.maxWidth = windowWidth + 'px'
    } else if (newRight < 0) {
      // goes off the left of the screen
      relativeEl.style.left = 0 + 'px'
    } else if (newRight + relativeWidth > windowWidth) {
      // goes off the right of the screen
      relativeEl.style.left = windowWidth - relativeWidth + 'px'
    }
  }
}

/**
 * This function is used to calculate the position at which to place a popover on the screen relative to the activator element sent
 * @param activator the html element for the popover to open
 * @param justify the value that will be set to justify popover
 * @param popoverPosY the Y position for popover to open
 * @param popoverPosX the X position for popover to open
 */
export function aquaCalculatePopoverPosition(
  activator: HTMLElement,
  justify: string,
  popoverPosY: number,
  popoverPosX: number
): {
  justify: string
  popoverPosY: number
  popoverPosX: number
} {
  // Uses the button element to determine where the popover should be drawn
  let anchorRect
  if (activator?.getBoundingClientRect) {
    anchorRect = activator.getBoundingClientRect()
  } else {
    // For buttons within 'More Tools' we need to use another point of reference
    const moreToolsButton = document.getElementById('toolbar-button-more-tools') as HTMLElement
    if (moreToolsButton) {
      anchorRect = moreToolsButton.getBoundingClientRect() as DOMRect
      justify = 'left'
    }
  }
  if (anchorRect) {
    popoverPosY = anchorRect.bottom + 6
    popoverPosX
    switch (justify) {
      case 'left':
        popoverPosX = anchorRect.left + 6
        break
      case 'right':
        popoverPosX = 8
        break
      default:
        popoverPosX = anchorRect.left + anchorRect.width / 2
    }
  }

  return {
    justify: justify,
    popoverPosY: popoverPosY,
    popoverPosX: popoverPosX
  }
}

# **AQUA DOCUMENTATION**

### **COLORS**

[Jump to **Colors** section](#colors-section)

### **TYPOGRAPHY**

[Jump to **Typography** section](#typography-section)

### **ICONS**

[Jump to **Icons** section](#icons-section)

### UTILITY CSS CLASSES

[Jump to **Utility CSS** section](#utility-section)

### SPACING AND BREAKPOINTS

[Jump to **Spacing and Breakpoints** section](#spacing-section)

## **COMPONENTS**

### Form Elements

- [AquaButton](#AquaButton)
- [AquaButtonBar](#AquaButtonBar)
- [AquaCheckbox](#AquaCheckbox)
- [AquaCheckboxGroup](#AquaCheckboxGroup)
- [AquaDropdown](#AquaDropdown)
- [AquaEditableLabel](#AquaEditableLabel)
- [AquaFileInput](#AquaFileInput)
- [AquaRadio](#AquaRadio)
- [AquaRadioGroup](#AquaRadioGroup)
- [AquaRangeSlider](#AquaRangeSlider)
- [AquaSearchbar](#AquaSearchbar)
- [AquaMenu](#AquaMenu)
- [AquaMenuItem](#AquaMenuItem)
- [AquaMobileSearchbar](#AquaMobileSearchbar)
- [AquaNumberInput](#AquaNumberInput)
- [AquaSimpleSearchbar](#AquaSimpleSearchbar)
- [AquaSlider](#AquaSlider)
- [AquaText](#AquaText)
- [AquaTextArea](#AquaTextArea)
- [AquaTextInput](#AquaTextInput)
- [AquaToggle](#AquaToggle)

### Tab-like Components

- [AquaAccordion](#AquaAccordion)
- [AquaTab](#AquaTab)

### Navigation Components

- [AquaBreadcrumbs](#AquaBreadcrumbs)
- [AquaPagination](#AquaPagination)
- [AquaPaginationControls](#AquaPaginationControls)

### Alerts and Modals

- [AquaBanner](#AquaBanner)
- [AquaDialog](#AquaDialog)
- [AquaPopover](#AquaPopover)
- [AquaSnackbar](#AquaSnackbar)
- [AquaSheet](#AquaSheet)

### Display Components

- [AquaCarousel](#AquaCarousel)
- [AquaTable](#AquaTable)
- [AquaTreeView](#AquaTreeView)
- [AquaTreeViewItem](#AquaTreeViewItem)

### Miscellaneous Components

- [AquaCard](#AquaCard)
- [AquaChip](#AquaChip)
- [AquaChips](#AquaChips)
- [AquaDotIndicator](#AquaDotIndicator)
- [AquaIcon](#AquaIcon)
- [AquaProgressCircular](#AquaProgressCircular)
- [AquaProgressLinear](#AquaProgressLinear)
- [AquaTooltip](#AquaTooltip)

### Layout Components

- [AquaLayout](#AquaLayout)
- [AquaFlex](#AquaFlex)
- [AquaNavbar](#AquaNavbar)
- [AquaSpacer](#AquaSpacer)
- [AquaButtonRow](#AquaButtonRow)

### Toolbars

- [AquaToolbar](#AquaToolbar)
- [AquaToolbarButton](#AquaToolbarButton)

### Aqua-Internal Only

- [AquaScroller](#AquaScroller)
- [AquaCircularFocusIndicator](#AquaCircularFocusIndicator)

<a id="AquaAccordion"></a>

## AquaAccordion

The AquaAccordion component is useful for reducing vertical space that have large amounts of information. The component has multiple, collapsible/expandible vertical sections, but only displays one panel at a time.

![](/documentation_images/AquaAccordion.png)

#### Properties

`activePanelIndex`: A number that indicates which panel to display

`panels`: Array of panel data

<a id="AquaBanner"></a>

## AquaBanner

AquaBanner is used to display messages as a wide strip. The component has several modes; `info`, `warn`, and `error`. The icon and color scheme of the banner changes depending on the `type`.

![](/documentation_images/AquaBanner.png)

#### Properties

`type`: One of the following - `warn` | `error` | `error` | `success`

`message`: HTML fragment to display within the message area of the banner

`closeable`: Boolean that enables the banner close button

`leftHighlight`: Boolean that enables the color bar on the left side of the banner

#### Events

`close`: emitted when the close button is clicked

<a id="AquaBreadcrumbs"></a>

## AquaBreadcrumbs

The AquaBreadcrumbs component is used as a navigational helper and to display hierarchy for pages.

![](/documentation_images/AquaBreadcrumbs.png)

#### Properties

`items`: Array of breadcrumb items

<a id="AquaButton"></a>

## AquaButton

AquaButton replaces the standard html button with a themed equivalent. AquaButton has 3 variations; `primary`, `secondary`, and `tertiary`.

![](/documentation_images/AquaButton.png)

#### Attributes

`primary`: Buttons displays as a primary button

`secondary`: Buttons displays as a secondary button

`tertiary`: Buttons displays as a tertiary button

#### Properties

`disabled`: If set to true, the button becomes disabled.

`link`: If set to true, the button acts as a Vue `RouterLink`

`externalLink`: If set to true, the button acts as an HTML anchor tag. The URL must be specified in the `to` property.

`to`: The URL to navigate to on button click if `externalLink` is true.

#### Events

`click`: emitted when the button is clicked

<a id="AquaButtonBar"></a>

## AquaButtonBar

AquaButtonBar contains several segmented buttons forming a bar. Only one button can be selected at a time. When there is not enough space to show all the buttons the component automatically shows a "More" item to help users access the items that have overflowed.

The component can also be configured to show all items within a sliding container that the user can drag left or right.

![](/documentation_images/AquaButtonBar.png)

#### Properties

`buttons`: Array of button labels

`modelValue`: Model value that represents the currently selected button

`mobile`: Boolean value that turns off the "MORE" indicator on overflow and instead enables the user to drag-slide the overflowed buttons left and right

`isLoading`: Boolean that disables the component. _**WILL BE RENAMED**_

`disableOverflow`: Boolean that turns off the "MORE" indicator overflow functionality

`noSelect`: If true, prevents clicked buttons from becoming selected.

#### Events

`update:modelValue`: emitted when the active button changes

<a id="AquaButtonRow"></a>

## AquaButtonRow

AquaButtonRow is a layout component used for buttons at the bottom of a dialog. It will automatically align and pad the buttons within it appropriately.

![](/documentation_images/AquaButtonRow.png)

<a id="AquaCard"></a>

## AquaCard

AquaCard is a simple wrapper component that has a white background and various options for a border and drop shadow. Can also act as a navigation element.

#### Properties

`navigates`: Indicates that clicking the card will navigate via a Vue `RouterLink` or `<a>` anchor tag.

`external`: When `navigates` is enabled, the card acts as an `<a>` tag if `external` is true. Otherwise the card acts as a Vue `RouterLink`.

`linkTarget`: URL for navigation

`ariaLabel`: Used to apply an `arial-label` string to the element for 508 compliance.

<a id="AquaCarousel"></a>

## AquaCarousel

AquaCarousel is used to display content panels within a left/right scrolling mechanism. Clickable left/right buttons on each end allow the user to scroll through the various panels within.

![](/documentation_images/AquaCarousel.png)

#### Properties

`fadeColor`: The color used for the gradient on the left and right edges of the component. Should match the background color of the page behind it.

`mobile`: if true, the left and right scroll buttons are hidden in favor of a drag to slide mechanism.

<a id="AquaCheckbox"></a>

## AquaCheckbox

AquaCheckbox replaces the standard html checkbox with a themed equivalent.

![](/documentation_images/AquaCheckbox.png)

#### Properties

`label`: The text label for the checkbox

`ariaLabel`: Used to apply an `arial-label` string to the element for 508 compliance.

`modelValue`: The model value for the checkbox state

`checked`: can be set to set the component to the "checked" state

`disabled`: Disables the component

#### Events

`update:modelValue`: emitted when the "checked" state changes

<a id="AquaCheckboxGroup"></a>

## AquaCheckboxGroup

An optional wrapper component you can place around a group of checkboxes that allows the user to SHIFT-CLICK a range of checkboxes to select or deselect all within the range.

#### Properties

`componentKey`: A unique number. To allow for checkboxes within the group changing, this number can be changed to allow the component to re-virtualize the child checkboxes.

#### Events

`rangeSelected`: emitted when a range of checkboxes is selected or deselected.

<a id="AquaChip"></a>

## AquaChip

The AquaChip component is used to convey small pieces of information. They have an optional `close` button which allows the user to "close" or dismiss the chip. The colors of the chip are customizable.

This component can be used by the **AquaChips**
component which provides additional layout logic and other functionality.

![](/documentation_images/AquaChip.png)

#### Properties

`closeable`: Enables the close button on the chip

`textColor`: Specifies the color of the text within the chip

`backgroundColor`: Specifies the fill color of the chip

`borderColor`: Specifies the border color of the chip

<a id="AquaChips"></a>

#### Events

`close`: emitted when the optional close button is clicked

## AquaChips

A wrapper around a group of **AquaChip** components that provides optional wrapping and the ability to limit the number of chips shown. If the number of chips exceeds the amount of available space, a "MORE" button appears at the end of the list of chips.

![](/documentation_images/AquaChips.png)

#### Properties

`chips`: Array of chips to display

`wrap`: Boolean that enables wrapping of the chips as needed.

`limit`: A number that can be used to limit the maximum amount of chips that can be displayed. If the total number of chips exceeds this number, a "MORE" button appears at the end of the list.

#### Events

`clickedMore`: emitted when the "MORE" button is clicked

<a id="AquaCircularFocusIndicator"></a>

## AquaCircularFocusIndicator

For internal Aqua use only. Displays a round focus indicator on some interactive components (ex: checkboxes).

![](/documentation_images/AquaCircularFocusIndicator.png)

#### Properties

`active`: Informs the indicator if it should appear in its active or inactive state.

`offsetX`: X axis offset for the indicator

`offsetY`: Y axis offset for the indicator

`size`: The size (diameter) of the indicator

<a id="AquaDialog"></a>

## AquaDialog

A graphical control element in the form of a small window that communicates information to the user and prompts them for a response.

The dialog can be either `modal` or `modeless` depending on the options provided to it.

![](/documentation_images/AquaDialog.png)

#### Properties

`modelValue`: The model value that controls the visibilty of the dialog

`closebutton`: Enables the "close" button in the upper right of the dialog.

`modal`: If enabled, the user cannot click outside the dialog to dismiss it.

`small`: Indicates a small dialog

`medium`: Indicates a medium dialog

`large`: Indicates a large dialog

`xlarge`: Indicates an extra large dialog

`mobile`: Changes the appearance of the dialog to fit mobile form factors.

`backgroundColor`: Specifies the color of the area behind the dialog

`noPadding`: Disables the built-in padding

#### Events

`update:modelValue`: emitted when the model value changes

`close`: Emitted when the "close" button is clicked

<a id="AquaDotIndicator"></a>

## AquaDotIndicator

A small circular "badge" typically used to display a count (number of items selected for example).

![](/documentation_images/AquaDotIndicator.png)

#### Properties

`text`: The text string to appear within the indicator

`size`: The size (diameter) of the indicator

`backgroundColor`: The background color for the indicator

`textColor`: The text color for the indicator

<a id="AquaDropdown"></a>

## AquaDropdown

AquaDropdown replaces the standard html dropdown with a themed equivalent.

![](/documentation_images/AquaDropdown.png)

#### Properties

`items`: Array of items for the dropdown list. Can be an array of objects or an array of strings.

`itemLabel`: If using an array of objects, this specifies which property in the object to use for the label.

`itemValue`: If using an array of objects, this specifies which property in the object to use for the value.

`ariaLabel`: Used to apply an `arial-label` string to the element for 508 compliance.

`ariaControls`: Used to specify the `aria-controls` attribute used for 508 compliance.

`label`: An optional text label that appear above the dropdown.

`placeholder`: Placeholder text used when no item is selected.

`outlined`: Specifies the dropdown should display with an outline.

`condensed`: Compresses the space between items in the list.

`disableDropdownOnSingleItem`: If enabled, the dropdown will automatically disable if the dropdown only contains a single item.

`bottomAlignDropdown`: Controls the positioning of the dropdown menu relative to the component.

`searchable`: Enables a searchbar in the dropdown that allows the user to search through the items in the list.

`disableVirtualScroll`: Disables virtual scrolling

`disabled`: Disables the dropdown

`textColor`: Specifies the color to use for the text within the dropdown

`wrapMenuItems`: Enables text wrap for items in the dropdown list

#### Events

`update:modelValue`: emitted when the model value (the selected item) changes

`activate`: emitted when the dropdown menu becomes active

`deactivate`: emitted when the dropdown menu becomes inactive

<a id="AquaEditableLabel"></a>

## AquaEditableLabel

A static text label that transforms into a text input control when clicked.

![](/documentation_images/AquaEditableLabel.png)
![](/documentation_images/AquaEditableLabel-edit.png)

#### Properties

`label`: The label to display

`modelValue`: The model value for the editable text

`fontSize`: The size of the font to use

`maxCharacterCount`: The maximum number of characters that are allowed to be entered.

`allowedCharactersRegex`: An optional RegEx expression you can use to filter the allowed characters the user can type.

`allowedCharactersString`: A string used to form the warning to the user when they type a disallowed character.

`tag`: Specifies the type of HTML element used for the component. The default value is `<h2>`

#### Events

`update:modelValue`: emitted when the model value changes

`startEdit`: emitted when the user begins editing the text

`endEdit`: emitted when the user completes editing the text

`reset`: emitted when the "revert text" button is clicked

<a id="AquaFileInput"></a>

## AquaFileInput

A static text label that, when clicked, invokes the system File Picker - allowing the user to select a file. The path to the file selected is then reflected in the component's `files` model.

#### Properties

`ariaLabel`: Used to apply an `arial-label` string to the element for 508 compliance.

`accept`: Takes as its value a comma-separated list of one or more file types, or unique file type specifiers, describing which file types to allow.

`label`: Text used for the component label

`files`: A model used to hold the list of files selected.

`modelValue`: Represents the model value of the component.

`multiple`: Allows for selecting multiple files.

#### Events

`update:files`: emitted when the file list changes

`update:modelValue`: emitted when the model value changes

`click`: emitted when the component is clicked.

<a id="AquaFlex"></a>

## AquaFlex

AquaFlex is a layout component that abstracts a CSS flex child. Typically used within a **AquaLayout** component.

#### Properties

`flex`: A numeric value designating the flex weight

<a id="AquaLayout"></a>

## AquaLayout

AquaLayout is a layout component that abstracts a CSS flex parent. It contains many configurable options, such as vertical or horizontal orientation, etc.

#### Properties

`horizontal`: Specifies a horizontal layout

`vertical`: Specifies a vertical layout

`align`: Specifies the `align-items` attribute for the flex behavior

`justify`: Specifies the `justify-items` and `justify-content` attributes for the flex behavior

`wrap`: Enables flex wrapping

`inline`: If enabled, sets the component style to `display: inline-flex`

`mobile`: If enabled, `alignMobile` and `justifyMobile` will be used instead of `align` and `justify`

`resizable`: If enabled, the component will emit `resize` when the component is resized. (_**Not currently working**_)

`alignMobile`: The `align` value to use when `mobile` is enabled.

`justifyMobile`: The `justify` value to use when `mobile` is enabled.

`tag`: The HTML tag value to use for the component. Defaults to `<div>`.

#### Events

`resize`: emitted when the component is resized. (_**Not currently working**_)

<a id="AquaIcon"></a>

## AquaIcon

Displays an icon in any color and size. The icon can be one of the built-in Aqua icons or an external path to an image.

#### Properties

`icon`: The icon image to use. Must be one of the built-in Aqua icons.

`externalIcon`: Optional. Specifies the URL to an external (not built-in) icon image to use.

`size`: The size of the icon

`tint`: The color to shade the icon

`tintMap`: Optional. A lookup table of states and colors. This can be used to have different icon colors per user-defined state. See the `state` property below.

`state`: Optional. Tells the component which color in the `tintMap` to use.

`tintTransitionTime`: Optional. Specifies the transition time for the icon color as the `state` property changes.

<a id="AquaMenu"></a>

## AquaMenu

A menu component that forms a list of **AquaMenuItem** components. It also has an option to place a searchbar at the top of the items to search the items. The component provides keyboard navigation for the dropdown. It is also used internally by some Aqua components such as **AquaDropdown**.

![](/documentation_images/AquaMenu.png)

#### Properties

`modelValue`: The model for the current selection

`items`: An array of objects for each of the menu items.

`itemLabel`: Specifies which property in the object to use for the label.

`itemValue`: Specifies which property in the object to use for the value.

`popup`: if true, the component element is of type `AquaCard`, else it is a of type `<div>`.

`searchable`: Enables a searchbar at the top of the menu to allow searching for items.

`wrap`: Enables word wrap for each menu item.

#### Events

`update:modelValue`: emitted when the selected item changes

<a id="AquaMenuItem"></a>

## AquaMenuItem

Used interally by the **AquaMenu** component to abstract the items within the menu.

#### Properties

`selected`: Indicates the item should display as selected.

`active`: Indicates the item should display as active.

`disabled`: Indicates the item should display as disabled.

`wrap`: Enables word wrapping for the text.

<a id="AquaMobileSearchbar"></a>

## AquaMobileSearchbar

A minimalistic searchbar ideal for mobile form-factors. **_May be deprecated in the future in favor of the nearly identical AquaSimpleSearchbar_**

![](/documentation_images/AquaMobileSearchbar.png)

#### Properties

`modelValue`: Represents the text entered into the searchbar

`placeholder`: The placeholder text to display when no text has been entered into the component.

`navbar`: Alters the styles to better integrate with the **AquaNavBar**.

#### Events

`update:modelValue`: emitted when the model changes

`enter`: emitted when the user presses the enter key

`clear`: emitted when the clear button is clicked

`focus`: emitted when the component is focused

`blur`: emitted when the component loses focus

`previous`: emitted when the optional "previous" button is clicked

`next`: emitted when the optional "next" button is clicked

<a id="AquaNavbar"></a>

## AquaNavbar

A simple layout component that contains a vertical layout with two horizontal layouts within.

<a id="AquaNumberInput"></a>

## AquaNumberInput

A text input that accepts and validates numeric values.

![](/documentation_images/AquaNumberInput.png)

#### Properties

`modelValue`: Represents the value entered

`format`: How the value should be formatted. The default is `number`.

`precision`: The number of signicant digits to display after a decimal point in the number.

`disabled`: Disables the component

`placeholder`: The placeholder text to use when no text has been entered.

`error`: Styles the component to indicate an error has occur (ie a validation error)

`highlight`: Used to highlight the component with a blue outline and a drop shadow.

`validator`: A callback function used to validate the text entered

#### Events

`update:modelValue`: emitted when the text entered changes

`editStart`: emitted when the component is focused

`editEnd`: emitted when the component loses focus

`mousein`: emitted when the mouse is moved over the component

`mouseout`: emitted when the mouse is moved outside the component

`error`: emitted when validation fails

`valid`: emitted when validation succeeds

`enter`: emitted when the Enter key is pressed

<a id="AquaPagination"></a>

## AquaPagination

AquaPagination is used to visually represent the page numbers when there are multiple pages of results. It allows the user to select a page number and jump to that page. Used in conjunction with the **AquaPaginationControls** component.

![](/documentation_images/AquaPagination.png)

#### Properties

`modelValue`: Represents the current page

`pageCount`: Represents the number of pages

`maxPages`: The number of pages to display before overflow behavior starts

`mobile`: Adjusts the styles to display better on mobile devices

<a id="AquaPaginationControls"></a>

## AquaPaginationControls

Provides additional navigation aids for the **AquaPagination** component.

#### Properties

`firstPage`: Indicates that the pagination is at the first page

`lastPage`: Indicates that the pagination is at the last page

`modelValue`: Represents the current page number

`pageCount`: The number of pages

#### Events

`update:modelValue`: emitted when the current page changes

<a id="AquaPopover"></a>

## AquaPopover

AquaPopover is a container which displays over other elements on the page. A typical usage might be to appear below a toolbar button when it clicks to display contextual information. The popover will dismiss if users click anywhere outside the component.

![](/documentation_images/AquaPopover.png)

#### Properties

`modelValue`: Represnts whether or not the popover should be displayed

`fullWidth`: Indicates the popover should extend to the left and right edges of the screen.

`positionX`: Used to position the popover on the X axis

`positionY`: Used to position the popover on the Y axis

`justify`: Horizontal alignment. One of the following values; `left` | `center` | `right`

`justifyY`: Vertical alignment. One of the following values; `up` | `down`

`mobile`: Indicates the popover should display full screen

#### Events

`update:modelValue`: Emitted when the popover display state changes

`close`: Emitted when the close button is clicked

<a id="AquaProgressCircular"></a>

## AquaProgressCircular

A progress bar that has a circular shape. It can either represent a value between 0 - 100 or be "indeterminate" when the amount of progress is unknown.

![](/documentation_images/AquaProgressCircular.png)

#### Properties

`size`: The size (diameter) of the progress indicator

`width`: The width of the line (thickness) used to draw the progress indicator

`indeterminate`: Indicates that the component should display as indeterminate if the progress value is not known. _**Currently the component always displays as indeterminate**_

`value`: The progress value from 0 - 100 _**Currently the component always displays as indeterminate**_

`color`: The color to use for the progress indicator

<a id="AquaProgressLinear"></a>

## AquaProgressLinear

A typical progress bar UI element. It can either represent a value between 0 - 100 or be "indeterminate" when the amount of progress is unknown.

![](/documentation_images/AquaProgressLinear.png)

#### Properties

`value`: Indicates the size of the progress indicator. The possible values are `normal` | `thin`

`size`: The default value is `normal`

`indeterminate`: Indicates that the component should display as indeterminate if the progress value is not known.

`color`: The color to use for the progress indicator

<a id="AquaRadio"></a>

## AquaRadio

AquaRadio replaces the standard html radio button with a themed equivalent. Usually used in conjunction with the **AquaRadioGroup** component.

![](/documentation_images/AquaRadio.png)

#### Properties

`label`: The text label to display for the radio button

`value`: The value (`true|false`) of the radio button

`checked`: Indicates that the radio button is "checked"

`disabled`: Disables the radio button

<a id="AquaRadioGroup"></a>

## AquaRadioGroup

A wrapper around a group of **AquaRadio** components that provides both keyboard navigation and ensures the radio buttons within remain mutually exclusive.

![](/documentation_images/AquaRadioGroup.png)

#### Properties

`modelValue`: A model representing the currently selected radio button within the group.

`componentKey`: A unique number. To allow for radio buttons within the group changing, this number can be changed to allow the component to re-virtualize the child radio buttons.

#### Events

`update:modelValue`: emitted when the currently selected radio button changes.

<a id="AquaRangeSlider"></a>

## AquaRangeSlider

Similar to a typical slider type component but has two draggable "thumb" elements that allows the user to select a range (minimum and maximum).

![](/documentation_images/AquaRangeSlider.png)

#### Properties

`lower`: A model for the left thumb value

`upper`: A model for the right thumb value

#### Events

`update:lower`: Emitted when the left / lower value changes

`update:upper`: Emitted when the right / upper value changes

`dragDone`: Emitted when the user completes a drag of one of the two thumbs

<a id="AquaScroller"></a>

## AquaScroller

AquaScroller is a wrapper around **DynamicScroller**. Used internally by Aqua to virtualize scrolling elements to improve performance on very large lists.

#### Properties

`scrollerItems`: The array of items to iterate over in the scroller

`scrollerKey`: The unique identifier key of each object in the scrollerItems array of objects

`scrollerHeight`: The height of the scroll element in desktop view. Must have a hard value for scroller to work properly

`scrollerWidth`: The width of the scroll element. If no value is defined, then the scroller will default to the width of the closest ancestor element with a hard-defined width property

`scrollerBuffer`: The buffer distance from the bottom of the parent element for which the scroller will load additional list items. This is how many elements will be loaded out of the view field - the larger the buffer, the more elements will be loaded 'out of view'. The default value is 20.

`scrollerMobile`: Property to detect whether the app is is mobile or desktop view

`scrollerShow`: For use with scroller in popovers - a boolean that marks whether a popover dropdown is showing or not. This is watched for additional logic.

<a id="AquaSearchbar"></a>

## AquaSearchbar

A complex site searchbar. On Google Chrome browsers there is an optional dictation icon. Other optional icons may be added to the searchbar via the provided Vue `slots`. The component allows a user to enter, clear, and submit a text string. A dropdown appears when the searchbar is focused which allows for a list of suggested search terms based on the user's query.

![](/documentation_images/AquaSearchbar.png)

![](/documentation_images/AquaSearchbar-open.png)

#### Properties

`ariaLabel`: Used to apply an `arial-label` string to the element for 508 compliance.

`modelValue`: The model value representing the text in the searchbar.

`placeholder`: The placeholder text to use when no text is entered in the searchbar.

`menuItems`: An array of items to display below the searchbar.

`navbar`: Boolean value that can be set to better style the searchbar when used within an **AquaNavbar**.

`mobile`: Restyles the component and changes the logic for better use on mobile form factors.

`simple`: Removes certain styled element such as the border.

`enableRightCol`: Enables the use of the right column slot to place another column of content within the dropdown.

`enableSpeech`: Enables the optional dictation icon.

`disabled`: Disables the searchbar.

`isMobile`: Restyles the component and changes the logic for better use on mobile form factors.

#### Events

`update:modelValue`: Emitted when the search text changes

`clickSearch`: Emitted when the user clicks the "search" button

`focus`: Emitted when the searchbar is focused

`blur`: Emitted when the searchbar loses focus

`enter`: Emitted when the user presses the ENTER key

`clear`: Emitted when the clear text "X" icon is clicked

`selectMenuItem`: Emitted when an item is selected from the dropdown menu

`selectMenuAppendSlot`: Emitted when content in the `menuItemsAppend` slot is clicked

`selectMenuPrependSlot`: Emitted when content in the `prependSlot` slot is clicked

`selectRightColSlot`: Emitted when content in the `rightColSlot` slot is clicked

<a id="AquaSheet"></a>

## AquaSheet

AquaSheet is a type of "bottom drawer" that slides up from the bottom of the screen and contains content. It features a standard titlebar with a text heading and a dismiss button.

![](/documentation_images/AquaSheet.png)

#### Properties

`modelValue`: Represents the visiblity of the sheet

`title`: The title text for the sheet

`left`: Optional. Can be used to change the left edge position of the sheet.

#### Events

`update:modelValue`: emitted when the sheet visibility changes

<a id="AquaSimpleSearchbar"></a>

## AquaSimpleSearchbar

A minimalistic searchbar ideal for adding trivial search functionality.

![](/documentation_images/AquaSimpleSearchbar.png)

#### Properties

`modelValue`: Represents the text within the searchbar

`placeholder`: Specifies the placeholder text to display when there is no text entered within the searchbar.

#### Events

`update:modelValue`: emitted when the text value changes

<a id="AquaSlider"></a>

## AquaSlider

The component allows a user to use a slider type interface to select a value between 0 - 100.

![](/documentation_images/AquaSlider.png)

#### Properties

`modelValue`: Represents the value of the slider

#### Events

`update:modelValue`: emitted when the slider value changes

<a id="AquaSnackbar"></a>

## AquaSnackbar

The AquaSnackbar component is used to display a quick, temporary, closable notification message to the user. It can also be configured to auto-dismiss after a set interval.

![](/documentation_images/AquaSnackbar.png)

#### Properties

`modelValue`: Represents the visibility of the snackbar

`timeout`: Optional. Used to automatically dismiss the snackbar after a specified interval.

`top`: Displays the snackbar at the top of the screen.

`center`: Displays the snackbar at the center of the screen.

`bottom`: Displays the snackbar at the bottom of the screen.

`relativePosition`: Specifies that the component will be `position: relative`

`cardType`: Specifies that the component element will be an **AquaCard**. Otherwise it will be a `<div>`.

`wFull`: Specifies that the snackbar should be full width. _**This property will be renamed in the future**_

#### Events

`update:modelValue`: emitted when the visibilty changes

<a id="AquaSpacer"></a>

## AquaSpacer

A layout component that is used within the **AquaLayout** component to take up space. An example usage would be if you had a horizontal AquaLayout with 3 buttons and you wanted 1 button all the way on the left and two buttons all the way on the right with flexible space between them, you would use an AquaSpacer to produce that space.

<a id="AquaTable"></a>

## AquaTable

An **AquaTable** provides a simple but lightweight way to display information in a grid of rows and columns.

![](/documentation_images/AquaTable.png)

#### Properties

`rows`: Array of row data

`columns`: Array of column data

`columnClasses`: Enable custom styles (e.g. width, alignment, etc) on both column header and row cells. Ex: ['dimension', 'dimension', 'measure']. Then apply styles in implementation component css. Ex: .dimension { color: blue }.

<a id="AquaTab"></a>

## AquaTab

Individual tab components used within the **AquaTabs** component.

#### Properties

`value`: The tab's value

`label`: The label to display on the tab

`link`: If set to true, the tab acts as a `RouterLink`. Otherwise it is just a `<div>`.

`to`: If `link` is enabled, this specifies the URL for the `RouterLink`.

`disabled`: Disables the tab.

#### Events

`click`: emitted when the tab is clicked.

<a id="AquaTabs"></a>

## AquaTabs

A tab control interface that allows multiple panels of content to be contained within a single window, using the tabs as a navigational widget for switching between them. The AquaTabs component is a container for a series of **AquaTab** components.

![](/documentation_images/AquaTabs.png)

#### Properties

`modelValue`: Represents the currently selected tab.

`header`: A boolean that changes the styles to better fit within a single page application header area.

<a id="AquaText"></a>

## AquaText

Offers a way to display text that can auto-size to fit the specified amount of space.

![](/documentation_images/AquaText.png)

#### Properties

`text`: The text to be displayed

`tag`: Optional. The type of element desired. The default is `<div>`.

`scaleToWidth`: The desired maximum width for the text.

`desiredSize`: The desired size for the text.

`maxSize`: The maximum size for the text.

`maxLines`: The maximum number of lines to display.

<a id="AquaTextArea"></a>

## AquaTextArea

AquaTextArea replaces the standard html textarea with a themed equivalent.

![](/documentation_images/AquaTextArea.png)

#### Properties

`modelValue`: Represents the text within the textarea

`ariaLabel`: Used to apply an `arial-label` string to the element for 508 compliance.

`label`: Optional label that appears above the textarea

`placeholder`: Placeholder text to display when the textarea contains no text

`maxlength`: Optionaly. Maximum number of characters that can be entered

`outlined`: If true, the textarea has a rectangular outline around it

`clearable`: Specifies if the control should contain a clear "X" icon

`rows`: Initial height of the control in rows of text

`preventNewlines`: If true, newlines are blocked from being entered into the control

`autoGrow`: If true, the textarea will grow in height to fit text as it is entered

#### Events

`update:modelValue`: emitted when the text changes

`enter`: emitted when the ENTER key is pressed

`clear`: emitted when the clear "X" icon is clicked

`focus`: emitted when the component is focused

`blur`: emitted when the component loses focus

<a id="AquaTextInput"></a>

## AquaTextInput

A single line text input field.

![](/documentation_images/AquaTextInput.png)

#### Properties

`modelValue`: Represents the text entered into the text input

`ariaLabel`: Used to apply an `arial-label` string to the element for 508 compliance.

`currentSearchIndex`: The index of the current result of matching text found when `search` is enabled

`numberMatches`: The number of found results when `search` is enabled

`label`: Optional label that appears above the text input

`placeholder`: Placeholder text to display when the text input contains no text

`outlined`: If true, the text input has a rectangular outline around it

`simple`: If true, the styles are altered to give a more minimalistic, stripped-down appearance.

`search`: Enables search functionality

`readonly`: If true, the text in the component is read-only

`secondary`: Alters the styles for an alternative appearance

`searchingText`: The text the user is searching for if `search` is set

`clearable`: If true, the clear "X" icon is shown

`navbar`: If true, the styles are altered to allow a better visual fit when used within an **AquaNavbar** component.

`mobile`: Alters the styles to improve the look of the component on mobile form factors

`justifyRight`: Right-justifies the text

`numeric`: Specifies that only numeric values are allowed to be entered

#### Events

`update:modelValue`: emitted when the model value changes

`enter`: emitted when the user presses the ENTER key

`clear`: emitted when the user clicks the clear "X" icon

`focus`: emitted when the input is focused

`blur`: emitted when the input loses focused

`previous`: emitted when the "previous" icon is clicked

`next`: emitted when the "next" icon is clicked

<a id="AquaToggle"></a>

## AquaToggle

An interactive toggle "switch" control, used for turning values on or off.

![](/documentation_images/AquaToggle.png)

#### Properties

`modelValue`: Represents the state of the toggle

`label`: Label text for the toggle

`labelPosition`: If set to `left`, the label appears to the left of the toggle

`disabled`: If true, the toggle is disabled

#### Events

`update:modelValue`: emitted when the model value changes

`change`: emitted when the component is toggled

<a id="AquaToolbar"></a>

## AquaToolbar

The AquaToolbar component allows for quick access to functions that are commonly used. It is represented by a horizontal row of **AquaToolbarButton** components.

![](/documentation_images/AquaToolbar.png)

#### Properties

`buttons`: Array of button objects

`mobile`: If true, the toolbar styles are adjusted for a better appearance on mobile form factors

`moreButtonLabel`: The label for the "More" button when the toolbar overflows. Default value is "More"

`overflow`: Enables the overflow handler

`collapse`: Reduces the height of the toolbar by only showing labels

`disableCollapse`: Disables the display of the collapse button

#### Events

`open`: emitted when the "More" button is clicked to open the overflow menu

`eventcollapse`: emitted when the "collapse" button is clicked

`button-display`: emitted when changes to the `buttons` prop array are detected

`close`: emitted when the "More" button is clicked to close the overflow menu

`customButtonWidth`: emitted when a "custom" button is detected while the component is measuring the "buttons" array

<a id="AquaToolbarButton"></a>

## AquaToolbarButton

The AquaToolbarButton component represents a single button to be displayed within a **AquaToolbar** component.

#### Properties

`label`: Specifies the label for the button

`icon`: Specifies the icon for the button

`count`: Optional value to display a **DotIndicator** on the button

`dropdown`: If true, the button displays a small down chevron

`split`: If true, the button is a "split" button (a button with a thin clickable down chevron arrow area)

`stacked`: If true, it indicates this button should be stacked on top of another button (_**Not supported**_)

`disabled`: If true, the button is disabled

`highlighted`: If true, the button displays as highlighted

`selected`: If true, the button displays as selected

`custom`: Indicates that this is a custom button (atypical size)

`collapse`: Indicates the button should only displays the label

`timeout`: An optional timeout that will automatically unfocus the button after a specified interval

#### Events

`clicked-split`: emitted when a user clicks the "split" area of a split button

<a id="AquaTooltip"></a>

## AquaTooltip

A small popup window that can display contextual information.

![](/documentation_images/AquaTooltip.png)

#### Properties

`closeable`: Indicates the tooltip should display a "close" icon

`shadow`: Indicates the tooltip should have a drop shadow

#### Events

`close`: emitted when the user clicks the optional "close" icon

<a id="AquaTreeView"></a>

## AquaTreeView

Similar to Windows File Explorer, the AquaTreeView displays hierarchical data in a tree type structure. Items with subitems may be collapsed or expanded to reveal the child subitems. It also optionally allows for items to have checkboxes next to them for selecting items. Each item is an instance of an **AquaTreeViewItem** component.

![](/documentation_images/aquatreeview.png)

#### Properties

`modelValue`: Represents the display data for the treeview

`options`: Options object for the treeview. The default is:

```
showLeaves: true,
checkableBranches: true
```

#### Events

`update:modelValue`: emitted when the model value changes

`expand`: emitted when a treeview item is expanded

`collapsed`: emitted when a treeview item is collapsed

`checked`: emitted when a treeview item is checked

`selected`: emitted when a treeview item is selected

<a id="AquaTreeViewItem"></a>

## AquaTreeViewItem

Used within the **AquaTreeView** component, the AquaTreeViewItem represents a single item within the tree view.

#### Properties

`modelValue`: Represents the treeview item data

`branchMixture`: Used interally for indentation purposes.

`options`: An options object for the treeview item. The default is:

```
showLeaves: true,
checkableBranches: true
```

`depth`: Optional. Represents the maximum depth in the hierarchy the treeview should display

#### Events

`update:modelValue`: emitted when the model value changes

`expand`: emitted when the item is expanded

`collapsed`: emitted when the item is collapsed

`checked`: emitted when the item is checked (if it has a checkbox)

`selected`: emitted when the item is selected

<a id="colors-section"></a>

## COLORS

Provided as SCSS variables as well as exported to JS.

![](/documentation_images/colors.png)

<a id="icons-section"></a>

## ICONS

Below is a table of the built-in icons. You can use these with the **AquaIcon** component by specifying the icon name in the `icon` property.

![](/documentation_images/icons.png)

<a id="typography-section"></a>

## TYPOGRAPHY

The default font-face for data.census.gov is [Inter](https://fonts.google.com/specimen/Inter).

Aqua has styles for heading levels 1-5, as shown below, as well as some custom sizes.

![](/documentation_images/typography.png)

In addition to the above, you can specify the following Aqua CSS class names on H1-H4 tags:

`heading`: Specifies the header should be displayed with an underline beneath the header text

`uppercase`: Displays the header text in all upper case.

`capitalize`: Capitalizes the first letter of each word in the neader

`wrap`: Specifies that the header text is allowed to word wrap

Lastly, you can make any HTML element with text styled to look like an H1-H5 tag with the following CSS classes:

```
h1, h2, h3, h4, h5
```

<a id="utility-section"></a>

## UTILITY CSS CLASSES

`aqua-glass`: Gives an element a semi-transparent glasslike effect

`aqua-fullheight`: Styles the element as 100% height

`aqua-fullwidth`: Styles the element as 100% width

`aqua-screenreader-only`: Makes the element only visible to screenreaders

`aqua-relative`: Styles the element as `position: relative`

`aqua-fill-to-parent`: Styles the element as follows:

```
position: absolute;
width: 100%;
height: 100%;
```

`aqua-pin-to-parent`: Styles the element as follows:

```
position: absolute;
top: 0;
right: 0;
bottom: 0;
left: 0;
```

<a id="spacing-section"></a>

## SPACING AND BREAKPOINTS

Aqua offers standardized spacing variables and classes in increments of 4 pixels (0.25rem).

The spacing variables are provided as SCSS variables.

```
$aqua-spacing0: 0rem;
$aqua-spacing1: 0.25rem;
$aqua-spacing2: 0.5rem;
$aqua-spacing3: 0.75rem;
$aqua-spacing4: 1rem;
$aqua-spacing5: 1.25rem;
$aqua-spacing6: 1.5rem;
$aqua-spacing7: 1.75rem;
$aqua-spacing8: 2rem;
$aqua-spacing9: 2.25rem;
$aqua-spacing10: 2.5rem;
$aqua-spacing11: 2.75rem;
$aqua-spacing12: 3rem;
$aqua-spacing13: 3.25rem;
$aqua-spacing14: 3.5rem;
$aqua-spacing15: 3.75rem;
$aqua-spacing16: 4rem;
```

In addition you can add the following CSS classes on any HTML element to provide margins and/or padding.

Syntax:

`m|p` (margin or padding) `-1-12` where the number 1-12 are increments of 4 pixels.

Example:

`m-4`: Specifies margin of 4 (12px)

`p-4`: Specifies padding of 4 (12px)

You can also optionally specify a side as `t|r|b|l` (top, right, bottom, left)

Example:

`ml-2`: Specifies a left margin of 2 (8 pixels)

`pt-2`: Specifies top padding of 2 (8 pixels)

For negative margin, prepend the letter `n` to the number value.

Example:

`mr-n2`: Specifies a right margin of negative 2 (-8 pixels)

##### USING SPACING CLASSES WITH BREAKPOINTS

The following breakpoint values can be applied to the above spacing classes:

```
  'xs': 0
  'sm': 600px
  'md': 960px
  'lg': 1280px
  'xl': 1920px
```

EXAMPLE:

`m-md-4`: Specifies a margin of 4 (12 pixels) at the "medium" breakpoint

Breakpoint and spacing classes can be combined.

EXAMPLE:

```
class="mr-2 ml-1 mt-sm-2 mt-lg-4"
```

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2022-11-01

### Added

- initial CHANGELOG

## [1.1.0] - 2022-11-28

### Added

- added AquaScroller
- using "vue-virtual-scroller": "2.0.0-beta.3" [Vue Virtual Scroller(https://github.com/Akryum/vue-virtual-scroller)]

## [1.2.0] - 2022-11-29

### Added

- Added AquaSimpleSearchbar

## [1.3.0] - 2022-11-29

### Added

- added AquaTreeView

## [1.3.1] - 2022-12-01

### Fixed

- AquaTreeView `checked` events

## [1.3.2] - 2022-12-07

### Fixed

- AquaButtonBar round right side corners

## [1.4.0] - 2022-12-01

### Changed

- Changed AquaButton
- $event object is passed as a param to the emitted event

## [1.5.0] - 2022-12-06

### Added

- added new `selectableBranches` treeview option
- added `disabled` state to treeview items

## [1.6.0] - 2022-12-12

### Added

- AquaTreeView now emits a `selected` event

## [1.5.1] - 2023-01-03

### Added

- added conditional checkbox rendering to AquaTreeView branch items based on item `checkable` property

### Fixed

- AquaTreeView item alignment

## [1.6.0] - 2023-01-23

### Added

- support for custom column/cell classes in AquaTable

## [1.6.1] - 2023-02-22

### Added

- added prop for aria-label to AquaCard for navigation cards and regular cards

## [1.6.2] - 2023-02-27

### Added

- added aria-roledescription to AquaSearchbar button

## [1.7.0] - 2023-02-03

### Added

- added new template to AquaToolbarButton to include an optional custom button

## [1.7.1] - 2023-02-23

### Added

- added role button and keydownspace to close AquaDialog

## [1.7.2] - 2023-02-27

### Added

- added aria-roledescription to AquaSearchbar button

## [1.7.3] - 2023-03-07

### Added

- added labelPosition to AquaToggle for left or right of toggle

## [1.7.4] - 2023-04-03

### Added

- added aria-label to AquaSearchbar
- added aria-label to AquaTextInput

## [1.7.5] - 2023-04-04

### Added

- added role button and enter event to search microphone

## [1.7.6] - 2023-04-24

### Added

- added 'wrap' prop to AquaMenu to wrap AquaMenuItems

## [1.8.0] - 2023-03-07

### Added

- new `hideDisabled` prop in AquaTreeView
- don't render disabled items when `hideDisabled` prop is set to true

## [1.9.0] - 2023-03-22

### Added

- added new template/slot called appendSlot to AquaTreeView
- added new slot called appendSlot to AquaTreeViewItem

## [1.9.1] - 2023-03-29

### Refactored

- changed `v-if` to `v-show` in AquaTreeView and AquaTreeViewItem

## [1.10.0] - 2023-05-02

### Added

- defined letter spacing on `.h3`, `.h4`, and `.h5` classes

## [1.11.0] - 2023-05-09

### Changed

- changed AquaPopovers transition animation from 500ms to 100ms
- changed AquaToolbar collapsed height to 22px

### Removed

- removed bottom margin for aqua toolbar buttons label

## [1.11.1] - 2023-07-14

### Fixed

- import svg files in AquaIcon and AquaToolbar components

## [1.12.0] - 2023-06-26

### Added

- AquaTreeView and AquaTreeViewItem now emit a `collapsed` event
- added a new `slot` for custom header branch icons to AquaTreeViewItem and AquaTreeView
- added `noIcon` options prop to AquaTreeViewItem to disable the normal icon that is displayed to the left of the label
- added data check for `radioButtonChildren` to AquaTreeViewItem. When present, the children items are created as AquaRadio buttons instead of normal AquatreeViewItem components.
- added `emphasizedActiveState` options prop to AquaTreeViewItem to give selected items a more emphasized look
- Changed `onClick` method in AquaRadio to dispatch an input event instead of emitting a click event

## [1.13.0] - 2023-7-12

### Changed

- changed AquaCarousel main carousel slide area
  from ${scrollXPos / 16}rem to ${scrollXPos}px

## [1.13.1] - 2023-7-17

### Added

- added `wideItemSpacing` options prop to AquaTreeViewItem that increases spacing between items

### Changed

- modified click event handling on AquaTreeViewItem to cover entire item

## [1.14.0] - 2023-7-17

### Added

- Added `pagesToDraw()` to watch to update pagination display

## [1.15.0] - 2023-7-21

### Added

-Added a plain slot named extra in the AquaToolbar component

## [1.15.1] - 2023-7-17

### Removed

- removed bad ResizeObserver listener in AquaLayout component

## [1.16.0] - 2023-7-26

### Changed

- Reorderd Aquadialog buttons

## [1.17.0] - 2023-7-27

### Added

- added `role="button"` to AquaMenuItem in AquaToolBar to call out button in Jaws
- added `.focus()` to onMoreButton method. When button is clicked focus will go to the popover when it appears.
- added screen reader only code for menu items, adding an {{ index + 1}} for better accessibility when read out.

## [1.18.0] - 2023-07-31

### Added

- Added AquaAccordion

## [1.19.0] - 2023-8-10

### Added

- added `popstate` to AquaDialog to close the dilaog modal when Back/Forword button is clicked

## [1.20.0] - 2023-08-25

### Added

- added `disabled` prop to AquaButtonBar to fix toggled/untoggled data synchronization issue

## [1.21.0] - 2023-08-28

### Added

- added '.button' and 'tabindex' to AquaDialog focus trap querySelectorAll. This will query all elements within the dialog that are either a button or an element with a tabindex not equal to -1.

## [1.22.0] - 2023-08-28

### Added

- added split button to AquaToolbarButton
- added new slot called `split` to AquaToolbarButton

### Changed

- AquaToolbarButton template structure to support main action and dropdown menu from same button
- Refined spacing within and between AquaToolbarButton instances

## [1.23.0] - 2023-09-05

- added .mobile, .componentHovered, and .inputFocused classes to AquaTextInput. Providing the ability to change styles depending on event type.

## [1.23.1] - 2023-09-08

### Changed

- Updated AquaToolbarButton states and styles

## [1.23.2] - 2023-09-11

### Changed

- Updated AquaToolbar styles with a 2px margin, or space, between visible toolbar buttons

## [1.23.3] - 2023-09-12

### Changed

- Fixed AquaToolbarButton collapsed state font size and set split button to full height.

### Removed

- Removed an obsolete class in AquaToolbarButton

## [1.24.0] - 2023-09-18

### Added

- Added new props to AquaTextInput `currentSearchIndex`, `numberMatches`, and `searchingText` along with new emit events `previous` and `next`. These go along with other changes to power new buttons which allow iterating through search text matches.

## [1.24.1] - 2023-09-26

### Fixed

- Centered selected indicator in AquaRadio
- Resolved duplicate emits on item selection in AquaRadioGroup
- Improved accessibility in AquaRadioGroup

## [1.25.0] - 2023-10-04

### Changed

- Updated AquaTreeView CSS styles
- Updated AquaTreeViewItem CSS styles
- Refactored AquaTreeViewItem template (HTML)

### Added

- New conditional style class for AquaTreeViewItem

## [1.26.0] - 2023-10-16

### Added

- New "dot" icon

### Added

- New emitted event call to AquaToolbar for close that gets called when the more-tools popover is closed

## 2023-10-24

### Added

- New AquaFileInput component

## 2023-10-24

### Added

- componentKey prop to support changing lists in AquaRadioGroup

## 2023-11-06

### Added

- New disableOverflow prop in AquaButtonBar

## 2023-11-09

### Added

- Option to disable virtual scroller in AquaDropdown

### Fixed

- Ensure initially selected item is highlighted on mount in AquaDropdown

## 2023-11-13

### Added

- New `label` slot for AquaFileInput

## 2023-11-16

### Added

- Added keydown (enter) event for AquaFileInput

## 2023-12-07

### Changed

- Increased AquaDialog close animation timing from 250ms to 260ms

## 2023-12-12

### Added

- New AquaEditableLabel component

## 2024-02-07

### Added

- Added click event to AquaFileInput component

## 2024-02-16

### Changed

- Changed AquaToolbar available width calculation in CalculateVisibleButtons function to add collapsed button width to the initial available width in mobile

- Changed AquaToolbar styles for the added aqua-toolbar-button style block to be scoped and targetted specifically to the collapsed-button

## 2024-02-16

### Changed

- Changed the AquaToolbarButton height style to 22 from 20

## 2024-02-16

### Added

- Added focus and blur events, with inputFocused class, to AquaEditableLabel

## 2024-02-21

### Added

- New AquaPaginationControls component

## 2024-02-26

### Added

- Added `tag` property to AquaEditableLabel to allow specifying any element type for the label
- Added new events `startEdit` and `endEdit` to AquaEditableLabel

## 2024-03-13

### Added

- Added some null checking to AquaDropdown

## 2024-03-20

### Added

- Added new event `reset` to AquaEditableLabel

## 2024-03-27

### Fixed

- Resolved dropdown item not being selected within `onClickMenuItem` in AquaDropdown

## 2024-04-01

### Fixed

- Updated the `onClickMenuItem` no value conditional to exclude empty strings, within AquaDropdown.

## 2024-04-11

### Added

- Added new emitted event `customButtonWidth` to AquaToolbar that gets called when calculating visible buttons followed by a next tick and removed the collapse button width inside the calculateVisibleButton method only taken into consideration on mobile

## 2024-04-25

### Added new icon `capitol`

## 2024-05-09

### Added

- Option to disable collapse on AquaToolbar

## 2024-05-21

### Added

- Way to reset AquaPopover height on demand

## 2024-05-24

### Added `disabled` prop to AquaDropdown

## 2024-06-03

### Added `wrap-menu-items` prop to AquaDropdown

## 2023-06-17

### Added

- New AquaRangeSlider component

## 2024-07-10

### Updated icon image svg assest to remove color filters

## 2024-07-31

### Added `shadow` prop to AquaTooltip

## 2024-08-28

### Added

- `ariaControls` prop and `aria-label` attributes to AquaDropdown
- `ariaLabel` prop to AquaCheckbox
- `aria-label` attribute to AquaRangeSlider

## 2024-09-09

### Fixed

- support 0 for value watchers in AquaRangeSlider

## 2024-09-16

### Changed

- Styled toolbar button text to not word wrap (forcing single line)

## 2024-09-25

### Fixed

- Mobile touch events for AquaRangeSlider

## 2024-10-08

### Changed

- Removed unused data props in AquaRangeSlider

## 2024-11-18

### Changed

- Increased timer in AquaTabs mounted hook to allow time for proper underline positioning

## 2024-12-18

### Added

- Allow AquaTable table header row to expand the entire width of the table.

## 2025-01-08

### Added

- AquaCheckboxGroup component to allow shift-clicking to select a range of checkboxes
- Added methods to AquaCheckbox for the AquaCheckboxGroup component to use
- Modified AquaCheckbox to disallow text selection (it was causing text to be selected when multi-selecting checkboxes)

## 2025-01-16

### Fixed

- AquaTreeViewItem indentation

## 2025-01-29

### Added

- AquaSearchbar new prop endSlotClicked received when end slot is clicked to limit focus to the searchbar and isMobile to also focus on desktop as needed

## 2025-01-29

### Added

- AquaDialog emits a close action on dialog closes

## 2025-02-06

### Changed

- Made AquaSearchbar dropdown scrollable

## 2025-02-24

### Fixed

- Ensure AquaIcon doesn't scale down when its flex container becomes compressed

## 2025-03-11

### Fixed

- Left color bar on AquaBanner not extending all the way to the bottom of the banner
- Made AquaBanner icon vertically centered

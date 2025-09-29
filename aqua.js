import { DynamicScroller, DynamicScrollerItem, RecycleScroller } from 'vue-virtual-scroller'

import AquaAccordion from './components/AquaAccordion.vue'
import AquaBanner from './components/AquaBanner.vue'
import AquaBreadcrumbs from './components/AquaBreadcrumbs.vue'
import AquaButton from './components/AquaButton.vue'
import AquaButtonBar from './components/AquaButtonBar.vue'
import AquaButtonRow from './components/AquaButtonRow.vue'
import AquaCard from './components/AquaCard.vue'
import AquaCarousel from './components/AquaCarousel.vue'
import AquaCheckbox from './components/AquaCheckbox.vue'
import AquaChip from './components/AquaChip.vue'
import AquaChips from './components/AquaChips.vue'
import AquaCircularFocusIndicator from './components/AquaCircularFocusIndicator.vue'
import AquaDialog from './components/AquaDialog.vue'
import AquaPaginationControls from './components/AquaPaginationControls.vue'
import AquaDotIndicator from './components/AquaDotIndicator.vue'
import AquaDropdown from './components/AquaDropdown.vue'
import AquaFileInput from './components/AquaFileInput.vue'
import AquaFlex from './components/AquaFlex.vue'
import AquaIcon from './components/AquaIcon.vue'
import AquaLayout from './components/AquaLayout.vue'
import AquaMenu from './components/AquaMenu.vue'
import AquaMenuItem from './components/AquaMenuItem.vue'
import AquaMobileSearchbar from './components/AquaMobileSearchbar.vue'
import AquaNavbar from './components/AquaNavbar.vue'
import AquaNumberInput from './components/AquaNumberInput.vue'
import AquaPagination from './components/AquaPagination.vue'
import AquaPopover from './components/AquaPopover.vue'
import AquaProgressCircular from './components/AquaProgressCircular.vue'
import AquaProgressLinear from './components/AquaProgressLinear.vue'
import AquaRadio from './components/AquaRadio.vue'
import AquaRadioGroup from './components/AquaRadioGroup.vue'
import AquaRangeSlider from './components/AquaRangeSlider.vue'
import AquaScroller from './components/AquaScroller.vue'
import AquaSearchbar from './components/AquaSearchbar.vue'
import AquaSheet from './components/AquaSheet.vue'
import AquaSimpleSearchbar from './components/AquaSimpleSearchbar.vue'
import AquaSlider from './components/AquaSlider.vue'
import AquaSnackbar from './components/AquaSnackbar.vue'
import AquaSpacer from './components/AquaSpacer.vue'
import AquaTab from './components/AquaTab.vue'
import AquaTable from './components/AquaTable.vue'
import AquaTabs from './components/AquaTabs.vue'
import AquaText from './components/AquaText.vue'
import AquaTextInput from './components/AquaTextInput.vue'
import AquaTextArea from './components/AquaTextArea.vue'
import AquaToggle from './components/AquaToggle.vue'
import AquaToolbar from './components/AquaToolbar.vue'
import AquaToolbarButton from './components/AquaToolbarButton.vue'
import AquaTooltip from './components/AquaTooltip.vue'
import AquaTreeView from './components/AquaTreeView.vue'
import AquaTreeViewItem from './components/AquaTreeViewItem.vue'
import AquaEditableLabel from './components/AquaEditableLabel.vue'
import AquaCheckboxGroup from './components/AquaCheckboxGroup.vue'
import AquaAlphaScroller from './components/AquaAlphaScroller.vue'

const AquaComponentLibrary = {
  install(Vue) {
    Vue.component(AquaLayout.name, AquaLayout)
    Vue.component(AquaFlex.name, AquaFlex)
    Vue.component(AquaSpacer.name, AquaSpacer)
    Vue.component(AquaAccordion.name, AquaAccordion)
    Vue.component(AquaButton.name, AquaButton)
    Vue.component(AquaButtonBar.name, AquaButtonBar)
    Vue.component(AquaChip.name, AquaChip)
    Vue.component(AquaChips.name, AquaChips)
    Vue.component(AquaCard.name, AquaCard)
    Vue.component(AquaTextInput.name, AquaTextInput)
    Vue.component(AquaTextArea.name, AquaTextArea)
    Vue.component(AquaDropdown.name, AquaDropdown)
    Vue.component(AquaProgressCircular.name, AquaProgressCircular)
    Vue.component(AquaProgressLinear.name, AquaProgressLinear)
    Vue.component(AquaCheckbox.name, AquaCheckbox)
    Vue.component(AquaRadioGroup.name, AquaRadioGroup)
    Vue.component(AquaRadio.name, AquaRadio)
    Vue.component(AquaToggle.name, AquaToggle)
    Vue.component(AquaNavbar.name, AquaNavbar)
    Vue.component(AquaMenuItem.name, AquaMenuItem)
    Vue.component(AquaTabs.name, AquaTabs)
    Vue.component(AquaTab.name, AquaTab)
    Vue.component(AquaDialog.name, AquaDialog)
    Vue.component(AquaSheet.name, AquaSheet)
    Vue.component(AquaTooltip.name, AquaTooltip)
    Vue.component(AquaSnackbar.name, AquaSnackbar)
    Vue.component(AquaBreadcrumbs.name, AquaBreadcrumbs)
    Vue.component(AquaToolbar.name, AquaToolbar)
    Vue.component(AquaToolbarButton.name, AquaToolbarButton)
    Vue.component(AquaIcon.name, AquaIcon)
    Vue.component(AquaPopover.name, AquaPopover)
    Vue.component(AquaBanner.name, AquaBanner)
    Vue.component(AquaCircularFocusIndicator.name, AquaCircularFocusIndicator)
    Vue.component(AquaButtonRow.name, AquaButtonRow)
    Vue.component(AquaTable.name, AquaTable)
    Vue.component(AquaPagination.name, AquaPagination)
    Vue.component(AquaMenu.name, AquaMenu)
    Vue.component(AquaSlider.name, AquaSlider)
    Vue.component(AquaRangeSlider.name, AquaRangeSlider)
    Vue.component(AquaCarousel.name, AquaCarousel)
    Vue.component(AquaText.name, AquaText)
    Vue.component(AquaDotIndicator.name, AquaDotIndicator)
    Vue.component(AquaSearchbar.name, AquaSearchbar)
    Vue.component(AquaSimpleSearchbar.name, AquaSimpleSearchbar)
    Vue.component(AquaMobileSearchbar.name, AquaMobileSearchbar)
    Vue.component(AquaNumberInput.name, AquaNumberInput)
    Vue.component(AquaTreeView.name, AquaTreeView)
    Vue.component(AquaTreeViewItem.name, AquaTreeViewItem)
    Vue.component(AquaScroller.name, AquaScroller)
    Vue.component(AquaEditableLabel.name, AquaEditableLabel)
    Vue.component(AquaFileInput.name, AquaFileInput)
    Vue.component(AquaPaginationControls.name, AquaPaginationControls)
    Vue.component(AquaCheckboxGroup.name, AquaCheckboxGroup)
    Vue.component(AquaAlphaScroller.name, AquaAlphaScroller)
    Vue.component('DynamicScroller', DynamicScroller)
    Vue.component('DynamicScrollerItem', DynamicScrollerItem)
    Vue.component('RecycleScroller', RecycleScroller)
  }
}

export default AquaComponentLibrary

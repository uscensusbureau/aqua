import { defineStore } from 'pinia'

export type FocusID = number

export interface FocusState {
  focusStack: Array<FocusID>
  currentID: FocusID
}

export const useFocusStore = defineStore('focus', {
  state: (): FocusState => ({
    focusStack: [] as Array<FocusID>,
    currentID: 1
  }),
  actions: {
    requestFocus(): FocusID {
      this.focusStack.push(this.currentID)
      return this.currentID++
    },
    releaseFocus(id: FocusID): void {
      const index = this.focusStack.indexOf(id)
      if (index > -1) {
        this.focusStack.splice(index, 1)
      }
    },
    hasFocus(id: FocusID): boolean {
      return this.focusStack[this.focusStack.length - 1] === id
    }
  }
})

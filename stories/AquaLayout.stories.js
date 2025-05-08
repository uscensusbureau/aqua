export default {
  title: 'AquaLayout',
  excludeStories: /.*Data$/
}

export const actionsData = {
  // onPinTask: action('onPinTask')
  // onArchiveTask: action('onArchiveTask')
}

export const HorizontalLayout = () => ({
  template: `
    <aqua-layout horizontal align="stretch" justify="center" style="height: 120px;">
      <aqua-flex center-content class="block"></aqua-flex>
      <aqua-flex center-content class="block"></aqua-flex>
      <aqua-flex center-content class="block"></aqua-flex>
      <aqua-flex center-content class="block"></aqua-flex>
    </aqua-layout>
  `
})

export const VerticalLayout = () => ({
  template: `
    <aqua-layout vertical align="stretch" justify="center" style="height: 120px;">
      <aqua-flex class="block"></aqua-flex>
      <aqua-flex class="block"></aqua-flex>
      <aqua-flex class="block"></aqua-flex>
      <aqua-flex class="block"></aqua-flex>
    </aqua-layout>
  `
})

export const AquaSpacerDemo = () => ({
  template: `
    <aqua-layout horizontal align="stretch" justify="center" style="height: 50px;">
      <aqua-flex center-content flex="0" class="block" style="padding: 8px"></aqua-flex>
      <aqua-spacer></aqua-spacer>
      <aqua-flex center-content flex="0" class="block" style="padding: 8px"></aqua-flex>
      <aqua-flex center-content flex="0" class="block" style="padding: 8px"></aqua-flex>
      <aqua-flex center-content flex="0" class="block" style="padding: 8px"></aqua-flex>
    </aqua-layout>
  `
})

export const VerticalLayoutsNestedWithinAHorizontalLayout = () => ({
  template: `
    <aqua-layout horizontal>
      <aqua-layout vertical>
        <aqua-flex class="block"></aqua-flex>
        <aqua-flex class="block"></aqua-flex>
        <aqua-flex class="block"></aqua-flex>
        <aqua-flex class="block"></aqua-flex>
      </aqua-layout>
      <aqua-layout vertical>
        <aqua-flex class="block"></aqua-flex>
        <aqua-flex class="block"></aqua-flex>
        <aqua-flex class="block"></aqua-flex>
        <aqua-flex class="block"></aqua-flex>
      </aqua-layout>
      <aqua-layout vertical>
        <aqua-flex class="block"></aqua-flex>
        <aqua-flex class="block"></aqua-flex>
        <aqua-flex class="block"></aqua-flex>
        <aqua-flex class="block"></aqua-flex>
      </aqua-layout>
    </aqua-layout>
  `
})

export const TwelveColumnLayout = () => ({
  template: `
    <div>
      <h4>4 COLUMNS MEDIUM</h4>
      <aqua-layout horizontal>
        <aqua-flex class="block" md4></aqua-flex>
        <aqua-flex class="block" md4></aqua-flex>
        <aqua-flex class="block" md4></aqua-flex>
        <aqua-flex class="block" md4></aqua-flex>
      </aqua-layout>
      <br><br>

      <h4>6 COLUMNS MEDIUM, 12 COLUMNS EXTRA SMALL</h4>
      <aqua-layout horizontal>
        <aqua-flex class="block" md6 xs12></aqua-flex>
        <aqua-flex class="block" md6 xs12></aqua-flex>
      </aqua-layout>
    </div>
  `
})

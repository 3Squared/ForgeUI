<template>
    <div>
      <forge-page-header title="Tabs"/>
      <p>Further documentation and examples can be found in the <a class="link" target="_blank" href="https://bootstrap-vue.org/docs/components/tabs"><strong>Bootstrap Vue documentation</strong></a>.</p>
      <playground :options="options" :config="config.value" @reset="reset" :code="code">
        <template #header>
          <b-form-radio-group v-model="mode" :options="optionType" button-variant="outline-primary" buttons />
        </template>
        <template #component>
          <component :is="BTabs" v-bind="tabsConfig.options.value" class="w-75">
            <component :is="BTab" v-bind="tabConfig.options.value"><p>Tab Content</p></component>
            <component :is="BTab" v-bind="tabConfig.options.value"><p>Tab Content</p></component>
          </component>
        </template>
      </playground>
    </div>
</template>

<script setup lang="ts">
import { BFormRadioGroup, BTabs, BTab } from "bootstrap-vue";
import { ForgePageHeader } from "@3squared/forge-ui";
import { computed, ref } from "vue";
import { Playground, usePlayground } from '@3squared/forge-playground';

const mode = ref('b-tabs')
const optionType = ['b-tabs', 'b-tab']
const alignOptions = ['start', 'center', 'end']

const options = computed(() => mode.value === 'b-tabs' ? tabsConfig.options : tabConfig.options)
const config = computed(() => mode.value === 'b-tabs' ? tabsConfig.config : tabConfig.config)
const reset = computed(() => mode.value === 'b-tabs' ? tabsConfig.reset : tabConfig.reset)


const tabsConfig = usePlayground({
  activeNavItemsClass: '',
  activeTabClass: '',
  align: alignOptions[0],
  card: false,
  contentClass: '',
  end: false,
  fill: false,
  id: '',
  justified: false,
  lazy: false,
  navClass: '',
  navWrapperClass: '',
  noFade: false,
  noKeyNav: false,
  noNavStyle: false,
  pills: false,
  small: false,
  tag: 'div',
  vertical: false
}, {
  align: { type: 'select', options: alignOptions },
  pills: { disabled: (): boolean => tabsConfig.options.value.noNavStyle }
})

const tabConfig = usePlayground({
  active: false,
  buttonId: '',
  disabled: false,
  id: '',
  lazy: false,
  noBody: false,
  tag: 'div',
  title: 'Tab',
  titleItemClass: '',
  titleLinkClass: ''
}, {
  title: { required: true },
  noBody: { disabled: () => !tabsConfig.options.value.card}
})

const code = computed(() => `<b-tabs${tabsConfig.propVals.value.length > 0 ? ' ' + tabsConfig.propVals.value.join(' ') : ''}>
  <b-tab ${tabConfig.propVals.value.join(' ')}>Tab Content</b-tab>
</b-tabs>`)
</script>
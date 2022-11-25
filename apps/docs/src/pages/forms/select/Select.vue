<template>
  <div>
    <forge-page-header title="Select"/>
    <p>Further documentation and examples can be found in the <a class="link" target="_blank" href="https://bootstrap-vue.org/docs/components/form-select"><strong>Bootstrap Vue documentation</strong></a>.</p>
    <playground :options="options" :config="config" :code="code" @reset="reset">
      <template #component>
        <component :is="BFormSelect" v-bind="options" class="w-75"/>
      </template>
      <template #options>
        <label>add option</label>
        <div class="d-flex mb-2">
          <b-form-input v-model="optionToAdd" placeholder="option..." @keydown.enter="addOption"></b-form-input>
          <b-button @click="addOption" variant="primary" class="ml-2">Add</b-button>
        </div>
      </template>
    </playground>
    Here is an example of an options array
    <code-block :code="optionsArrayExample" />
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader } from "@3squared/forge-ui";
import { BFormSelect, BFormInput, BButton } from "bootstrap-vue";
import { computed, ref } from "vue";
import { usePlayground, Playground, CodeBlock } from '@3squared/forge-playground';
import { sizes, validationStates } from '../../../composables/playgroundOptions';

const optionToAdd = ref('')

const { options, propVals, config, reset } = usePlayground({
  options: ['Option A', 'Option B', 'Option C'],
  vModel: 'yourVariable',
  ariaInvalid: false,
  autofocus: false,
  disabled: false,
  id: '',
  multiple: false,
  name: '',
  plain: false,
  required: false,
  selectSize: 0,
  size: sizes[1].value,
  state: validationStates[0].value,
  labelField: 'label',
  disabledField: 'disabled',
  optionsField: 'options',
  textField: 'text',
  valueField: 'value'
}, {
  options: { required: true },
  size: {type: 'select', options: sizes, required: true},
  state: { type: 'select', options: validationStates, required: true},
  vModel: { required: true }
}, () => {
  options.value.options = ['Option A', 'Option B', 'Option C']
  optionToAdd.value = ''
})

const addOption = () => {
  options.value.options.push(optionToAdd.value)
  optionToAdd.value = ''
}

const code = computed(() => `<b-form-select ${propVals.value.join(' ')}/>`)
const optionsArrayExample = computed(() => `<script setup lang="ts">
/* Here are all the different ways you can create an option for a select */
 const optionsArray = ref([
   { text: 'Option 1', value: 'option 1', disabled: false},
   { text: 'Option 2', value: { a: 'a', b: 'b' }, disabled: true},
   { html: '<b>Option 3</b>', value: 'option 3' },
   'Option 4'
 ])
\<\/script>`)
</script>
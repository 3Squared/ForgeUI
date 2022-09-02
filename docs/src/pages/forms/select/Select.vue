<template>
  <div>
    <forge-page-header title="Select"/>
    <p>Further documentation and examples can be found in the <a class="link" target="_blank" href="https://saforgestyleguide.z33.web.core.windows.net/#/forms/select/select"><strong>Forge.UI documentation</strong></a>.</p>
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
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader } from "@3squared/forge-ui";
import { BFormSelect, BFormInput, BButton } from "bootstrap-vue";
import { computed, ref } from "vue";
import { usePlayground, Playground } from '@3squared/forge.playground';
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

const code = computed(() => `<b-form-select ${propVals.value.join(' ')} />`)
</script>
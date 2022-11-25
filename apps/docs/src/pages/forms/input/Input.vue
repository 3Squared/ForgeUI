<template>
  <div>
    <forge-page-header title='Input' />
    <p>Further documentation and examples can be found in the <a class='link' href='https://bootstrap-vue.org/docs/components/form-input' target='_blank'><strong>Bootstrap Vue documentation</strong></a>.</p>
    <playground :code='code' :config='config' :options='options' @reset='reset'>
      <template #component>
        <component :is='BFormInput' class='w-75' v-bind='options' />
      </template>
    </playground>
  </div>
</template>

<script lang='ts' setup>
import { ForgePageHeader } from '@3squared/forge-ui';
import {  BFormInput } from 'bootstrap-vue';
import { computed } from 'vue';
import { usePlayground, Playground } from '@3squared/forge-playground';
import { autoCompleteStates, inputTypes, sizes, validationStates } from '../../../composables/playgroundOptions';

const { options, propVals, config, reset } = usePlayground({
    type: inputTypes[0],
    disabled: false,
    ariaInvalid: '',
    autofocus: false,
    debounce: 0,
    id: '',
    lazy: false,
    list: '',
    autoComplete: autoCompleteStates[0],
    max: 0,
    min: 0,
    name: '',
    noWheel: false,
    number: false,
    placeholder: '',
    plaintext: false,
    readonly: false,
    required: false,
    size: sizes[1].value,
    state: validationStates[0].value,
    step: '',
    trim: false,
    vModel: 'yourVariable'
  },
  {
    min: { disabled: (): boolean => options.value.type !== 'number' },
    max: { disabled: (): boolean=> options.value.type !== 'number' },
    number: { disabled: () => options.value.type !== 'number' },
    step: { disabled: (): boolean => options.value.type !== 'number' },
    noWheel: { disabled: (): boolean => options.value.type !== 'number' },
    autoComplete: { disabled: () : boolean => options.value.id !== '' },
    type: { type: 'select', options: inputTypes, required: true },
    vModel: { required: true },
    state: { type: 'select', options: validationStates, required: false }
  }, () => {
  });

const code = computed(() => `<b-form-input ${propVals.value.join(' ')}/>`);
</script>
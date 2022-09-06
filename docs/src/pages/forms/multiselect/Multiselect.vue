<template>
  <div>
    <forge-page-header title='Multiselect' />
    <p>Further documentation and examples can be found in the <a class='link'
                                                                 href='https://saforgestyleguide.z33.web.core.windows.net/#/forms/multiselect/multiselect'
                                                                 target='_blank'><strong>Forge.UI
      documentation</strong></a>.</p>
    <OPTIONS></OPTIONS>
    <playground :code='code' :config="config" :options='options' @reset='reset'>
      <template #component>
        <component :is='ForgeMultiSelect' v-model='selected' class='w-75' v-bind='options' />
      </template>
    </playground>
  </div>
</template>

<script lang='ts' setup>
import OPTIONS from './OPTIONS.md';
import { ForgeMultiSelect, ForgePageHeader } from '@3squared/forge-ui';
import { Playground, usePlayground } from '@3squared/forge-playground';
import { computed, ref, watchEffect } from 'vue';
import { baseVariants, validationStates } from '../../../composables/playgroundOptions';

const multiSelectOptions = ref([
  { id: 'option-1', label: 'Option 1' },
  { id: 'option-2', label: 'Option 2' },
  { id: 'option-3', label: 'Option 3' },
  { id: 'option-4', label: 'Option 4' },
  { id: 'option-5', label: 'Option 5' },
  { id: 'option-6', label: 'Option 6' }
]);

const selected = ref<object[] | null | Object>(multiSelectOptions.value[0]);
const tagPositions = ['top', 'bottom'];


const { options, propVals, config, reset } = usePlayground({
  options: multiSelectOptions,
  variant: baseVariants[0],
  label: 'label',
  state: validationStates[0],
  showSelectAll: true,
  showClearSelection: true,
  expandLeft: true,
  multiple: false,
  searchable: true,
  clearOnSelect: true,
  hideSelected: false,
  placeholder: 'Select...',
  allowEmpty: true,
  resetAfter: false,
  closeOnSelect: true,
  taggable: false,
  tagPlaceholder: 'Please enter to create a tag',
  tagPosition: tagPositions[0],
  max: 9999,
  optionsLimit: 1000,
  groupValues: '',
  groupLabel: '',
  groupSelect: false,
  internalSearch: true,
  preserveSearch: false,
  preselectFirst: false
}, {
  variant: { type: 'select', options: baseVariants },
  state: { type: 'select', options: validationStates },
  label: { type: 'select', options: Object.keys(multiSelectOptions.value[0]) },
  showSelectAll: { disabled: (): boolean => !options.value.multiple },
  showClearSelection: { disabled: (): boolean => !options.value.multiple },
  options: { required: true }
});

watchEffect(() => {
  if (options.value.multiple) {
    selected.value = [];
  } else {
    selected.value = null;
  }
});

const code = computed(() => `<forge-multi-select ${propVals.value.join(' ')}/>`);
</script>
<template>
  <div>
    <forge-page-header title="Multiselect Preview"/>
    <p>Further documentation and examples can be found in the <a class="link" target="_blank" href="https://saforgestyleguide.z33.web.core.windows.net/#/forms/multiselect-preview/multiselectpreview"><strong>Forge.UI documentation</strong></a>.</p>
    <OPTIONS />
    <playground :options="options" :config="config" :code="code">
      <template #component>
        <component :is="ForgeMultiSelectPreview" v-bind="options" v-model="selectedItems" class="w-100"/>
      </template>
    </playground>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader, ForgeMultiSelectPreview } from "@3squared/forge-ui";
import OPTIONS from './OPTIONS.md'
import { computed, ref } from "vue";
import { usePlayground, Playground } from '@3squared/forge.playground';

let selectedItems = ref([])

const items = [
  { id: 1, label: 'Option 1' },
  { id: 2, label: 'Option 2' },
  { id: 3, label: 'Option 3' }
]

const orientations = ['horizontal', 'vertical', 'horizontal-reversed']

const { options, propVals, config, reset } = usePlayground({
  items: items,
  selectedItems: selectedItems,
  vModel: 'selectedItemsArray',
  title: 'Selected Items',
  orientation: orientations[0],
  height: '200px',
  canRemoveItemFromPreview: true,
  multiple: true,
  trackBy: 'id',
  label: 'label'
}, {
  vModel: { required: true, disabled: () => true },
  items: { required: true },
  orientation: { type: 'select', options: orientations },
  label: { type: 'select', options: Object.keys(items[0]) },
})

const code = computed(() => `<forge-multi-select-preview ${propVals.value.join(' ')}/>`)
</script>
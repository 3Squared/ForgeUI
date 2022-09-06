<template>
  <div>
    <forge-page-header title="Filter Header" />
    <p>Further documentation and examples can be found in the <a class="link" target="_blank" href="https://saforgestyleguide.z33.web.core.windows.net/#/tables/filter-header/filterheader"><strong>Forge.UI documentation</strong></a>.</p>
    <OPTIONS />
    <playground :options="options" :config="config" :code="code" @reset="reset">
      <template #component>
        <forge-table :fields="fields">
          <template #head(column)>
            <component :is="ForgeFilterHeader" v-bind="options" />
          </template>
        </forge-table>
      </template>
    </playground>
  </div>
</template>

<script setup lang="ts">
import OPTIONS from './OPTIONS.md'
import { ForgePageHeader, ForgeTable, ForgeFilterHeader, ForgeColumnBuilder } from "@3squared/forge-ui";
import { computed } from "vue";
import { baseVariants } from '../../../composables/playgroundOptions';
import { usePlayground, Playground } from '@3squared/forge-playground';

const inputTypes = ['string', 'number', 'select', 'multiSelect', 'date', 'dateRange', 'time']

const { options, propVals, config, reset } = usePlayground({
  name: 'Column',
  type: inputTypes[0],
  value: null,
  options: ['option 1', 'option 2'],
  debounceTimer: 750,
  variant: baseVariants[0],
  placeholder: '',
  hideLabel: false
}, {
  type: { type: 'select', options: inputTypes, required: true },
  variant: { type: 'select', options: baseVariants },
  options: { required: true }
})

const fields = computed(() => {
  return new ForgeColumnBuilder()
      .addMiscColumn('column')
      .build();
})



const code = computed(() => `<forge-table :items="items" :fields="fields">
  <template #head(column)>
    <forge-filter-header ${propVals.value.join(' ')}/> 
  </template>
</forge-table>`)
</script>

<template>
  <div>
    <forge-page-header title='Table' />
    <p>Further documentation and examples can be found in the <a class='link' href='https://saforgestyleguide.z33.web.core.windows.net/#/tables/table/table' target='_blank'><strong>Forge.UI
      documentation</strong></a>.</p>
    <OPTIONS></OPTIONS>
    <playground :code='code' :config='config' :options='options' @reset='reset'>
      <template #component>
        <component :is='ForgeTable' v-bind='options' />
      </template>
    </playground>
  </div>
</template>

<script lang='ts' setup>
import OPTIONS from './OPTIONS.md';
import { ForgeColumnBuilder, ForgePageHeader, ForgeTable } from '@3squared/forge-ui';
import { computed } from 'vue';
import { usePlayground, Playground } from '@3squared/forge.playground';
import { Person } from '../../../models/Person';

const fields = computed(() => {
  return new ForgeColumnBuilder<Person>()
    .addColumn('id', col => col.enableAutoFilter('number'))
    .addColumn('firstName', col => col.setLabel('First Name').enableAutoFilter())
    .addColumn('age', col => col.enableAutoFilter('number'))
    .addColumn('dateJoined')
    .addColumn('actions', col => col.disableSorting())
    .build();
});

const columnNames = computed(() => fields.value.map((field) => field.key));

const items = computed(() => [
  { id: 1, firstName: 'Jake', age: 22, dateJoined: new Date('3/7/2022').toLocaleDateString() },
  { id: 2, firstName: 'Bob', age: 32, dateJoined: new Date('3/2/2009').toLocaleDateString() }
]);

const theming = [{ text: 'No Theming', value: null }, { text: 'Light Theming', value: 'light' }, { text: 'Dark Theming', value: 'dark' }];
const selectModes = ['multi', 'single', 'range'];
const sortDirections = ['asc', 'desc', 'last'];

const { options, propVals, config, reset } = usePlayground({
  total: -1,
  stickToPage: true,
  fields: fields.value,
  items: items.value,
  showColumnCustomiser: false,
  showExporter: false,
  filters: {},
  tableError: null,
  clearColumn: columnNames.value[4],
  stacked: false,
  legacyPaginationFooter: false,
  autoColumnWidth: false,
  apiUrl: '',
  bordered: false,
  borderless: false,
  busy: false,
  caption: '',
  captionTop: false,
  dark: false,
  emptyFilteredText: 'There are no records matching your request',
  emptyText: 'There are no records to show.',
  fixed: false,
  footClone: false,
  footVariant: theming[0].value,
  headVariant: theming[0].value,
  hover: false,
  id: '',
  labelSortAsc: 'Click to sort ascending',
  labelSortClear: 'Click to clear sorting',
  labelSortDesc: 'Click to sort descending',
  noBorderCollapse: false,
  noFooterSorting: false,
  noProviderFiltering: false,
  noProviderPaging: false,
  noProviderSorting: false,
  noSortReset: false,
  outlined: false,
  primaryKey: '',
  responsive: false,
  selectable: false,
  selectMode: selectModes[0],
  showEmpty: false,
  small: false,
  sortIconLeft: false,
  sortBy: selectModes[0],
  sortDesc: false,
  sortDirection: sortDirections[0],
  sortNullLast: false,
  striped: false
}, {
  fields: { required: true },
  items: { required: true },
  clearColumn: { type: 'select', options: columnNames.value, required: false },
  footVariant: { type: 'select', options: theming, disabled: (): boolean => !options.value.footClone },
  headVariant: { type: 'select', options: theming },
  bordered: { disabled: (): boolean => options.value.borderless },
  borderless: { disabled: (): boolean => options.value.bordered },
  legacyPaginationFooter: { disabled: (): boolean => options.value.total === -1 },
  captionTop: { disabled: () => options.value.caption.length === 0 },
  selectMode: { type: 'select', options: selectModes, disabled: (): boolean => !options.value.selectable },
  sortBy: { type: 'select', options: selectModes },
  sortDirection: { type: 'select', options: sortDirections }
});

const code = computed(() => `<forge-table ${propVals.value.join(' ')}></forge-table>`);
</script>

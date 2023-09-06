<template>
  <div>
    <forge-page-header title="Table" />
    <OPTIONS></OPTIONS>
    <playground :code="code" :config="config" :options="options" @reset="reset">
      <template #component>
        <component :is="ForgeTable" v-bind="options">
          <template v-if="showAboveTableSlot" #above-table>
            <forge-action-button :action="true">This is next to the pagination</forge-action-button>
          </template>
        </component>
      </template>
      <template #additionalOptions>
        <b-form-checkbox v-model="showAboveTableSlot" class="mb-2">Show slot above table</b-form-checkbox>
      </template>
    </playground>
    Columns for the table can be created programmatically using the ForgeColumnBuilder method as shown below
    <code-block :code="columnExample" />
  </div>
</template>

<script lang="ts" setup>
import OPTIONS from "./OPTIONS.md";
import { ForgeColumnBuilder, ForgePageHeader, ForgeActionButton, ForgeTable } from "@3squared/forge-ui";
import { BFormCheckbox } from "bootstrap-vue";
import { computed, ref } from "vue";
import { usePlayground, Playground, CodeBlock } from "@3squared/forge-playground";
import { Person } from "../../../models/Person";

const showAboveTableSlot = ref(false);

const fields = computed(() => {
  return new ForgeColumnBuilder<Person>()
    .addColumn("id", (col) => col.enableAutoFilter("number"))
    .addColumn("firstName", (col) => col.setLabel("First Name").enableAutoFilter())
    .addColumn("age", (col) => col.enableAutoFilter("number"))
    .addColumn("dateJoined")
    .addColumn("actions", (col) => col.disableSorting())
    .build();
});

const columnNames = computed(() => fields.value.map((field) => field.key));

const items = computed(() => [
  { id: 1, firstName: "Jake", age: 22, dateJoined: new Date("3/7/2022").toLocaleDateString() },
  { id: 2, firstName: "Bob", age: 32, dateJoined: new Date("3/2/2009").toLocaleDateString() },
  { id: 3, firstName: "Alice", age: 28, dateJoined: new Date("5/15/2015").toLocaleDateString() },
  { id: 4, firstName: "Sarah", age: 26, dateJoined: new Date("8/9/2020").toLocaleDateString() },
  { id: 5, firstName: "Tom", age: 35, dateJoined: new Date("2/14/2013").toLocaleDateString() },
  { id: 6, firstName: "Emma", age: 24, dateJoined: new Date("11/11/2018").toLocaleDateString() },
  { id: 7, firstName: "David", age: 29, dateJoined: new Date("9/3/2016").toLocaleDateString() },
  { id: 8, firstName: "Olivia", age: 31, dateJoined: new Date("6/20/2014").toLocaleDateString() },
  { id: 9, firstName: "Sophia", age: 27, dateJoined: new Date("4/1/2020").toLocaleDateString() },
  { id: 10, firstName: "James", age: 30, dateJoined: new Date("7/25/2011").toLocaleDateString() },
  { id: 11, firstName: "Grace", age: 23, dateJoined: new Date("10/5/2019").toLocaleDateString() },
  { id: 12, firstName: "Ethan", age: 34, dateJoined: new Date("12/12/2012").toLocaleDateString() },
  { id: 13, firstName: "Lily", age: 25, dateJoined: new Date("1/8/2017").toLocaleDateString() },
  { id: 14, firstName: "Matthew", age: 33, dateJoined: new Date("2/22/2010").toLocaleDateString() },
  { id: 15, firstName: "Ava", age: 29, dateJoined: new Date("6/7/2015").toLocaleDateString() },
  { id: 16, firstName: "Benjamin", age: 27, dateJoined: new Date("4/19/2021").toLocaleDateString() },
  { id: 17, firstName: "Lucy", age: 26, dateJoined: new Date("8/18/2018").toLocaleDateString() },
  { id: 18, firstName: "Daniel", age: 32, dateJoined: new Date("3/16/2013").toLocaleDateString() },
  { id: 19, firstName: "Mia", age: 30, dateJoined: new Date("7/30/2016").toLocaleDateString() },
  { id: 20, firstName: "Liam", age: 25, dateJoined: new Date("1/14/2019").toLocaleDateString() },
  { id: 21, firstName: "Chloe", age: 28, dateJoined: new Date("5/4/2017").toLocaleDateString() },
  { id: 22, firstName: "Henry", age: 33, dateJoined: new Date("2/8/2014").toLocaleDateString() },
  { id: 23, firstName: "Zoe", age: 24, dateJoined: new Date("11/28/2020").toLocaleDateString() },
  { id: 24, firstName: "William", age: 31, dateJoined: new Date("6/13/2012").toLocaleDateString() },
  { id: 25, firstName: "Ella", age: 26, dateJoined: new Date("8/27/2017").toLocaleDateString() }
]);

const theming = [
  { text: "No Theming", value: null },
  { text: "Light Theming", value: "light" },
  { text: "Dark Theming", value: "dark" }
];
const selectModes = ["multi", "single", "range"];
const sortDirections = ["asc", "desc", "last"];

const { options, propVals, config, reset } = usePlayground(
  {
    total: -1,
    stickToPage: true,
    fields: fields.value,
    items: items.value,
    showColumnCustomiser: false,
    showExporter: false,
    showClearButton: false,
    filters: {},
    tableError: null,
    clearColumn: columnNames.value[4],
    stacked: false,
    legacyPaginationFooter: false,
    autoColumnWidth: false,
    apiUrl: "",
    bordered: false,
    borderless: false,
    busy: false,
    caption: "",
    captionTop: false,
    dark: false,
    emptyFilteredText: "There are no records matching your request",
    emptyText: "There are no records to show.",
    fixed: false,
    footClone: false,
    footVariant: theming[0].value,
    headVariant: theming[0].value,
    hover: false,
    id: "",
    labelSortAsc: "Click to sort ascending",
    labelSortClear: "Click to clear sorting",
    labelSortDesc: "Click to sort descending",
    noBorderCollapse: false,
    noFooterSorting: false,
    noProviderFiltering: false,
    noProviderPaging: false,
    noProviderSorting: false,
    noSortReset: false,
    outlined: false,
    primaryKey: "",
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
    striped: false,
    perPage: 20,
    pageSizes: [10, 20, 50, 100]
  },
  {
    fields: { required: true },
    items: { required: true },
    clearColumn: { type: "select", options: columnNames.value, required: false },
    footVariant: { type: "select", options: theming, disabled: (): boolean => !options.value.footClone },
    headVariant: { type: "select", options: theming },
    bordered: { disabled: (): boolean => options.value.borderless },
    borderless: { disabled: (): boolean => options.value.bordered },
    legacyPaginationFooter: { disabled: (): boolean => options.value.total === -1 },
    captionTop: { disabled: () => options.value.caption.length === 0 },
    selectMode: { type: "select", options: selectModes, disabled: (): boolean => !options.value.selectable },
    sortBy: { type: "select", options: selectModes },
    sortDirection: { type: "select", options: sortDirections }
  },
  function () {
    showAboveTableSlot.value = false;
  }
);

const code = computed(
  () =>
    `<forge-table ${propVals.value.join(" ")}>${
      !showAboveTableSlot.value
        ? ""
        : `
    <template #above-table>
      <forge-action-button :action="true">This is next to the pagination</forge-action-button>
    </template>
`
    }</forge-table>`
);

const columnExample = `<script setup lang='ts'>
import { ForgeColumnBuilder } from '@3squared/forge-ui';
import { computed } from 'vue';
import { Person } from './Person';


const fields = computed(() => {
  return new ForgeColumnBuilder<Person>()
    .addColumn('id', col => col.enableAutoFilter('number'))
    .addColumn('firstName', col => col.setLabel('First Name').enableAutoFilter())
    .addColumn('age', col => col.enableAutoFilter('number'))
    .addColumn('dateJoined')
    .addColumn('actions', col => col.disableSorting())
    .build();
});
<\/script>`;
</script>

<template>
  <div>
    <forge-page-header title="Filter Header" />
    <OPTIONS />
    <playground :options="options" :config="config" :code="code" @reset="reset">
      <template #component>
        <forge-table :fields="fields">
          <template #head(column)>
            <component :is="ForgeFilterHeader" v-model="value" v-bind="options" />
          </template>
        </forge-table>
      </template>
    </playground>
  </div>
</template>

<script setup lang="ts">
import OPTIONS from "./OPTIONS.md";
import { ForgePageHeader, ForgeTable, ForgeFilterHeader, ForgeColumnBuilder } from "@3squared/forge-ui";
import { computed, ref } from "vue";
import { baseVariants } from "../../../composables/playgroundOptions";
import { Playground, usePlayground } from "@3squared/forge-playground";

const inputTypes = ["string", "number", "select", "multiSelect", "date", "dateRange", "time"];
const value = ref(null);
const { options, propVals, config, reset } = usePlayground(
  {
    name: "Column",
    type: inputTypes[0],
    options: ["option 1", "option 2"],
    debounceTimer: 750,
    variant: baseVariants[0],
    placeholder: "",
    hideLabel: false
  },
  {
    type: { type: "select", options: inputTypes, required: true },
    variant: { type: "select", options: baseVariants },
    options: { required: true }
  }
);

const fields = computed(() => {
  return new ForgeColumnBuilder().addMiscColumn("column").build();
});

const code = computed(
  () => `<forge-table :items="items" :fields="fields">
  <template #head(column)>
    <forge-filter-header ${propVals.value.join(" ")}/> 
  </template>
</forge-table>`
);
</script>

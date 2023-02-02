<template>
  <div>
    <forge-page-header title="Multiselect Preview" />
    <OPTIONS />
    <playground :options="options" :config="config" :code="code">
      <template #component>
        <component :is="ForgeMultiSelectPreview" v-bind="options" v-model="selectedItems" class="w-100" />
      </template>
    </playground>
    Here is an example of an options array and selected options array
    <code-block :code="optionsArrayExample" />
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader, ForgeMultiSelectPreview } from "@3squared/forge-ui";
import { items, selectedItems } from "./examples/example-data";
import OPTIONS from "./OPTIONS.md";
import { computed } from "vue";
import { usePlayground, Playground, CodeBlock } from "@3squared/forge-playground";

const orientations = ["horizontal", "vertical", "horizontal-reversed"];

const { options, propVals, config } = usePlayground(
  {
    vModel: "selectedItemsArray",
    items: items,
    title: "Selected Items",
    orientation: orientations[0],
    height: "200px",
    canRemoveItemFromPreview: true,
    multiple: true,
    trackBy: "id",
    label: "label"
  },
  {
    vModel: { required: true, disabled: () => true },
    items: { required: true },
    orientation: { type: "select", options: orientations },
    label: { type: "select", options: Object.keys(items[0]) }
  }
);

const code = computed(() => `<forge-multi-select-preview ${propVals.value.join(" ")}/>`);
const optionsArrayExample = computed(
  () => `<script setup lang="ts">
 const optionsArray = ref([
   { id: 1, label: 'option 1', value: 'opt_1'},
   { id: 2, label: 'option 2', value: 'opt_2'}
 ])
 
 const selectedOptions = ref([])
<\/script>`
);
</script>

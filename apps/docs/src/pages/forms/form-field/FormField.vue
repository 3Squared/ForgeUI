<template>
  <div>
    <forge-page-header title="Form Field" />
    <OPTIONS />
    <playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <component :is="ForgeFormField" v-bind="options" class="w-75"></component>
      </template>
      <template #rules>
        <forge-form-field v-model="options.rules" label="rules (vee-validate)" type="text" />
      </template>
    </playground>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader, ForgeFormField } from "@3squared/forge-ui";
import { computed } from "vue";
import OPTIONS from "./OPTIONS.md";
import { usePlayground, Playground } from "@3squared/forge-playground";
import { inputTypes } from "../../../composables/playgroundOptions";

const { options, propVals, config, reset } = usePlayground(
  {
    label: "Form Field Label",
    rules: "",
    value: "",
    type: inputTypes[0],
    disabled: false,
    vid: "",
    placeholder: "Placeholder",
    groupClass: "",
    labelCols: "true"
  },
  {
    label: { required: true },
    placeholder: { required: true },
    labelCols: { required: true },
    type: { type: "select", options: inputTypes, required: false }
  }
);

const code = computed(() => {
  return `<forge-form-field ${propVals.value.join(" ")} />`;
});
</script>

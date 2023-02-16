<template>
  <div>
    <forge-page-header title="Form" />
    <OPTIONS />
    <playground :options="options" :config="config" :code="code" @reset="reset">
      <template #component>
        <component :is="ForgeForm" v-bind="options" class="w-75" />
      </template>
      <template #loadingText>
        <label>loadingText</label>
        <b-form-input v-model="loadingText" />
      </template>
    </playground>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader, ForgeForm, useForgeToasts } from "@3squared/forge-ui";
import { BFormInput } from "bootstrap-vue";
import { computed, ref, watch } from "vue";
import OPTIONS from "./OPTIONS.md";
import { usePlayground, Playground } from "@3squared/forge-playground";

const { forgeToast } = useForgeToasts();

const loadingText = ref("");

const { options, propVals, config, reset } = usePlayground(
  {
    onSubmit: async () => {
      if (loadingText.value.length > 0) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      forgeToast("success", "Form submitted!");
    },
    showTitle: true,
    title: "Forge Form Title",
    hideCancel: false,
    submitText: "Submit",
    loadingText: loadingText.value,
    titleClass: ""
  },
  {
    onSubmit: { required: true }
  },
  () => {
    loadingText.value = "";
  }
);

watch(
  () => loadingText.value,
  (loadingText) => (options.value.loadingText = loadingText)
);

const code = computed(() => {
  return `<forge-form ${propVals.value.join(" ")}/>`;
});
</script>

<template>
  <div>
    <forge-page-header title="Inline Editor" />
    <OPTIONS />
    <playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <component :is="ForgeInlineEditor" v-bind="options" v-model="text" />
      </template>
    </playground>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader, useForgeToasts, ForgeInlineEditor } from "@3squared/forge-ui";
import { computed, ref, watch } from "vue";
import OPTIONS from "./OPTIONS.md";
import { usePlayground, Playground } from "@3squared/forge-playground";

const { forgeToast } = useForgeToasts();

const text = ref("");

const { options, propVals, config, reset } = usePlayground(
  {
    value: "",
    completeAction: () => forgeToast("success", "Successfully updated!"),
    params: ["CompleteActionParameters"],
    readonly: false,
    isValid: () => {}
  },
  {
    completeAction: { required: true },
    isValid: { required: true }
  }
);

watch(
  () => text.value,
  (newText) => (options.value.value = newText)
);
watch(
  () => options.value.value,
  (newText) => (text.value = newText)
);

const code = computed(() => {
  return `<forge-inline-editor ${propVals.value.join(" ")}>
  <template #editor>Custom Input</template>
</forge-inline-editor>`;
});
</script>

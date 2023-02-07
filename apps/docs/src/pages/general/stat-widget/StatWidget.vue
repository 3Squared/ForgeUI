<template>
  <div>
    <forge-page-header title="Stat Widget" />
    <OPTIONS />
    <playground :code="code" :config="config" :options="options" @reset="reset">
      <template #component>
        <!-- Remove bg-${variant} once the widget has been refactored to accept a variant. -->
        <component :is="ForgeStatWidget" v-bind="options">{{ widgetContent }}</component>
      </template>
      <template #additionalOptions>
        <div class="mb-2">
          <label>widget content</label>
          <b-form-input v-model="widgetContent" />
        </div>
      </template>
    </playground>
  </div>
</template>

<script lang="ts" setup>
import { ForgePageHeader, ForgeStatWidget } from "@3squared/forge-ui";
import { BFormInput } from "bootstrap-vue";
import { computed, ref } from "vue";
import OPTIONS from "./OPTIONS.md";
import { baseVariants, sizes } from "../../../composables/playgroundOptions";
import { usePlayground, Playground } from "@3squared/forge-playground";

const widgetContent = ref("Widget");

const { options, propVals, config, reset } = usePlayground(
  {
    size: sizes[1].value,
    variant: baseVariants[0]
  },
  {
    size: { type: "select", options: sizes },
    variant: { type: "select", options: baseVariants }
  },
  () => {
    widgetContent.value = "Widget";
  }
);

const code = computed(() => {
  // Remove bg-${variant.value} once the component has been refactored to accept a variant.
  return `<forge-stat-widget ${propVals.value.join(" ")}>${widgetContent.value}</forge-stat-widget>`;
});
</script>

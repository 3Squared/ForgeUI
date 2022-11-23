<template>
  <div>
    <forge-page-header title="Action Button"/>
    <OPTIONS />
    <playground :options="options" :config="config" :code="code" @reset="reset">
      <template #component>
        <component :is="ForgeActionButton" v-bind="options">{{ content }}</component>
      </template>
      <template #additionalOptions>
        <template>
          <label>Button Content</label>
          <b-form-input v-model="content" class="mb-2"></b-form-input>
        </template>
        <b-form-checkbox v-model="throwError" class="mb-2">Throw Error</b-form-checkbox>
        <b-form-checkbox v-model="hideSpinner" class="mb-2">Hide Spinner</b-form-checkbox>
      </template>
    </playground>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader, ForgeActionButton } from "@3squared/forge-ui";
import { BFormCheckbox, BFormInput } from "bootstrap-vue";
import { computed, ref, watch } from "vue";
import { useForgeToasts } from "@3squared/forge-ui"; 
import OPTIONS from "./OPTIONS.md";
import { usePlayground, Playground } from "@3squared/forge-playground";
import { buttonVariants } from "../../../composables/playgroundOptions";
const { forgeToast } = useForgeToasts();

const throwError = ref(false);
const hideSpinner = ref(false);
const errorMessage = ref("This action failed");
const content = ref("Action Button");


const { options, propVals, config, reset } = usePlayground({
  action: async () => {
    if (!hideSpinner.value) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    if (throwError.value) {
      throw errorMessage.value;
    } else {
      forgeToast("success", "Action completed successfully!");
    }
  },
  disabled: false,
  params: ["ArrayOfActionParams"],
  variant: buttonVariants[0],
  "error-message": errorMessage.value
},
{
  variant: { type: "select", options: buttonVariants, required: true },
  action: { required: true }
}, 
() => {
  content.value = "Action Button";
  throwError.value = false;
  hideSpinner.value = false;
}
);

watch(() => options.value["error-message"], (message) => errorMessage.value = message);

const code = computed(() => `<forge-action-button ${propVals.value.join(" ")}>${content.value}</forge-action-button>`);
</script>
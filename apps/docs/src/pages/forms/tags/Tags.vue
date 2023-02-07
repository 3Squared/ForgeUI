<template>
  <div>
    <forge-page-header title="Tags" />
    <p>
      Further documentation and examples can be found in the
      <a class="link" target="_blank" href="https://bootstrap-vue.org/docs/components/form-tags"><strong>Bootstrap Vue documentation</strong></a>
      .
    </p>
    <playground :options="options" :config="config" :code="code" @reset="reset">
      <template #component>
        <component :is="BFormTags" v-bind="options" v-model="tags" class="w-75" />
      </template>
    </playground>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader } from "@3squared/forge-ui";
import { BFormTags } from "bootstrap-vue";
import { computed, ref } from "vue";
import { usePlayground, Playground } from "@3squared/forge-playground";
import { baseVariants, buttonVariants, sizes, validationStates } from "../../../composables/playgroundOptions";

const inputTypes = ["text", "number", "email", "tel", "url"];

const tags = ref(["tag"]);

const { options, propVals, config, reset } = usePlayground(
  {
    addButtonText: "Add",
    addButtonVariant: buttonVariants[0],
    addOnChange: false,
    autoFocus: false,
    disabled: false,
    duplicatedTagText: "Duplicate tag(s)",
    feedbackAriaText: "assertive",
    id: "",
    ignoreInputFocusSelector: ".b-form-tag button input select",
    inputAttrs: {},
    inputClass: {},
    inputId: "",
    inputType: inputTypes[0],
    invalidTagText: "Invalid tag(s)",
    limit: 10,
    limitTagsText: "Tag limit reached",
    name: "",
    noAddOnEnter: false,
    noOuterFocus: false,
    noTagRemove: false,
    placeholder: "Add tag...",
    removeOnDelete: false,
    required: false,
    separator: "",
    size: sizes[1].value,
    state: validationStates[0].value,
    tagClass: "",
    tagPills: false,
    tagRemoveLabel: "Remove tag",
    tagRemovedLabel: "Tag removed",
    tagVariant: baseVariants[0],
    vModel: tags
  },
  {
    vModel: { required: true },
    inputType: { type: "select", options: inputTypes },
    size: { type: "select", options: sizes },
    state: { type: "select", options: validationStates },
    tagVariant: { type: "select", options: baseVariants },
    addButtonVariant: { type: "select", options: buttonVariants }
  },
  () => {
    tags.value = ["tags"];
  }
);

const code = computed(() => `<b-form-tags ${propVals.value.join(" ")} />`);
</script>

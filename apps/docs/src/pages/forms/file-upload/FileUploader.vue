<template>
  <div>
    <forge-page-header title="File Uploader" />
    <OPTIONS />
    <playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <component :is="ForgeFileUpload" v-bind="options" class="w-100 p-2">
          <template #message>{{ message }}</template>
        </component>
      </template>
      <template #additionalOptions>
        <label>message</label>
        <b-form-input v-model="message" />
      </template>
    </playground>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader, ForgeFileUpload, useForgeToasts } from "@3squared/forge-ui";
import { BFormInput } from "bootstrap-vue";
import { computed, ref } from "vue";
import OPTIONS from "./OPTIONS.md";
import { usePlayground, Playground } from "@3squared/forge-playground";
import { ValidationResult } from "@3squared/forge-ui/src/helpers";

const { forgeToast } = useForgeToasts();

const message = ref("Please upload your file.");

const { options, propVals, config, reset } = usePlayground(
  {
    autoUploadToBlob: true,
    multiple: true,
    getFileUrlAction: (fileName: string) => forgeToast("success", `${fileName} has been uploaded!`),
    validateFileName: (fileName: string) => {
      if (fileName.length == 0) {
        return { errors: ["Enter name"], valid: false } as ValidationResult;
      }

      if (fileName.length > 501) {
        return { errors: ["Enter name under 500 characters"], valid: false } as ValidationResult;
      }

      return { errors: [], valid: true } as ValidationResult;
    },
    placeholder: "Browse your computer",
    acceptedFileTypes: "image/jpg, image/jpeg, image/png, image/gif, application/pdf, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-xpsdocument,video/mp4,video/x-ms-wmv,video/x-m4v,video/quicktime",
    maxFileSize: 52428800,
    maxFileInput: 2,
    editableFileName: false
  },
  {
    getFileUrlAction: { required: true },
    maxFileInput: { disabled: () => !options.value.multiple }
  },
  () => {
    message.value = "Please upload your file.";
  }
);

const code = computed(() => {
  return `<forge-file-upload ${propVals.value.join(" ")}>
  <template #message>${message.value}</template>
</forge-file-upload>`;
});
</script>

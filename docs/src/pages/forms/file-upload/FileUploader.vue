<template>
  <div>
    <forge-page-header title="File Uploader" />
    <p>Further documentation and examples can be found in the <a class="link" target="_blank" href="https://saforgestyleguide.z33.web.core.windows.net/#/forms/file-upload/fileuploader"><strong>Forge.UI documentation</strong></a>.</p>
    <OPTIONS/>
    <playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <component :is="ForgeFileUpload" v-bind="options" class="w-100 p-2">
          <template #message>{{message}}</template>
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
import OPTIONS from './OPTIONS.md'
import { usePlayground, Playground } from '@3squared/forge.playground';

const { forgeToast } = useForgeToasts()

const message = ref('Please upload your file.')

const { options, propVals, config, reset } = usePlayground({
    autoUploadToBlob: true,
    multiple: true,
    getFileUrlAction: (fileName: string) => forgeToast('success', `${fileName} has been uploaded!`),
    placeholder: 'Browse your computer',
    acceptedFileTypes: '',
    maxFileSize: 52428800,
    maxFileInput: 2
  },
  {
    getFileUrlAction: { required: true },
    maxFileInput: { disabled: () => !options.value.multiple}
  },
  () => {
    message.value = "Please upload your file."
  }
)

const code = computed(() => {
  return `<forge-file-upload ${propVals.value.join(' ')}>
  <template #message>${message.value}</template>
</forge-file-upload>`;
})
</script>
<template>
  <div>
    <forge-page-header title="Modal" />
    <OPTIONS />
    <playground :code="code" :options="options" :config="config" @reset="reset">
      <template #component>
        <b-button v-b-modal.modal>Show Modal</b-button>
        <component :is="ForgeModal" v-bind="options" id="modal">
          <template #modal-header>
            {{ modalTitle }}
          </template>
          {{ modalContent}}
          <template #loader>
            <div class="forge-loader">Loading...</div>
          </template>
        </component>
      </template>
      <template #additionalOptions>
        <b-form-checkbox v-model="showLoader" class="mb-2">Show loader</b-form-checkbox>
        <template>
          <label>Modal Title</label>
          <b-form-input v-model="modalTitle" class="mb-2"></b-form-input>
        </template>
        <template>
          <label>Modal Content</label>
          <b-form-input v-model="modalContent"></b-form-input>
        </template>
      </template>
    </playground>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader, ForgeToasts, ForgeModal } from "@3squared/forge-ui";
import { computed, ref } from "vue";
import { useForgeToasts } from "@3squared/forge-ui";
import { BButton, BFormCheckbox, BFormInput, VBModal } from 'bootstrap-vue'
import OPTIONS from './OPTIONS.md'
import { usePlayground, Playground } from '@3squared/forge-playground';

const { forgeToast } = useForgeToasts()
const vBModal = VBModal
const showLoader = ref(false)

const modalTitle = ref('Title')
const modalContent = ref('Content')

const { options, propVals, config, reset } = usePlayground({
    onConfirm: async () => {
      if(showLoader.value){
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
      forgeToast('success', 'Modal Confirmed!')
    },
    legacy: false
  }, {
    onConfirm: { required: true }
  }, () => {
    showLoader.value = false
    modalTitle.value = 'Title'
    modalContent.value = 'Content'
  }
)

const code = computed(() => {
  return `<b-button v-b-modal.modal>Show Modal</b-button>
<forge-modal ${propVals.value.join(' ')}>
  <template #modal-header>
    ${modalTitle.value}
  </template>
  ${modalContent.value}${showLoader.value ? `
  <template #loader>
    <div class="forge-loader">Loading...</div>
  </template>` : ``}
</forge-modal>`
})
</script>
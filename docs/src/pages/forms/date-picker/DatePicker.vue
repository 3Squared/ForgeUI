<template>
  <div>
    <forge-page-header title="Date Picker" />
    <p>Further documentation and examples can be found in the <a class="link" target="_blank" href="https://saforgestyleguide.z33.web.core.windows.net/#/forms/date-picker/datepicker"><strong>Forge.UI documentation</strong></a> and the <a class="link" target="_blank" href="https://flatpickr.js.org/options/"><strong>Flatpickr documentation</strong></a>.</p>
    <OPTIONS></OPTIONS>
    <playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <component :is="ForgeDatePicker" v-bind="options" class="w-75">
          <template #before v-if="!hideBefore">
            <b-icon-info-circle-fill id="info" class="forge-date-picker-icon mr-2" :variant="options.variant" data-toggle />
            <b-tooltip target="info">Choose a date</b-tooltip>
          </template>
          <template #after v-if="!hideAfter">
            <b-icon-x-circle-fill class="forge-date-picker-icon ml-2" variant="danger" data-clear />
          </template>
        </component>
      </template>
      <template #additionalOptions>
        <b-form-checkbox v-model="hideBefore" class="mb-2">hide before</b-form-checkbox>
        <b-form-checkbox v-model="hideAfter" class="mb-2">hide after</b-form-checkbox>
      </template>
    </playground>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader, ForgeDatePicker } from '@3squared/forge-ui'
import { BIconInfoCircleFill, BTooltip, BIconXCircleFill, BFormCheckbox } from "bootstrap-vue";
import { computed, ref } from "vue";
import OPTIONS from './OPTIONS.md'
import { baseVariants } from '../../../composables/playgroundOptions';
import { usePlayground, Playground } from '@3squared/forge.playground';

const hideBefore = ref(false)
const hideAfter = ref(false)
const validationStates = [{text: 'No Validation', value: null }, { text: 'Invalid Validation', value: false }]

const { options, propVals, config, reset } = usePlayground({
  vModel: 'yourDateVariable',
  config: {
    altInput: true,
    altFormat: 'F j, Y @ H:i',
    enableTime: true,
    time_24hr: true
  },
  state: validationStates[0].value,
  variant: baseVariants[0],
  hideCalendarIcon: false
}, {
  vModel: { required: true },
  config: { required: true },
  state: { type: 'select', options: validationStates },
  variant: { type: 'select', options: baseVariants },
}, () => {
  hideBefore.value = false
  hideAfter.value = false
})

const code = computed(() => {
  return `<forge-date-picker ${propVals.value.join(' ')}>${hideBefore.value ? '' : `
  <template #before>
    <b-icon-info-circle-fill id="info" class="forge-date-picker-icon mr-2" variant="${options.value.variant}" data-toggle />
    <b-tooltip target="info">Choose a date</b-tooltip>
  </template>`}${hideAfter.value ? '' : `
  <template #after>
    <b-icon-x-circle-fill class="forge-date-picker-icon ml-2" variant="danger" data-clear />
  </template>`}
</forge-date-picker>`;
})
</script>
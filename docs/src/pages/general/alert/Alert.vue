<template>
  <div>
    <forge-page-header title='Alert' />
    <p>Further documentation and examples can be found in the <a class='link' href='https://bootstrap-vue.org/docs/components/alert' target='_blank'><strong>Bootstrap Vue
      documentation</strong></a>.</p>
    <playground :code='code' :options='options' rerender @reset='reset' :config='config'>
      <template #re-render>
        <b-button :disabled='options.show' class='mr-2' variant='primary' @click='options.show = true'>Re-render</b-button>
      </template>
      <template #component>
        <component :is='BAlert' v-model='options.show' v-bind='options'>{{ content }}</component>
      </template>
      <template #show>
        <b-form-checkbox :checked='options.show' class='mb-2' disabled>show</b-form-checkbox>
      </template>
      <template #dismissible>
        <b-form-checkbox v-model='options.dismissible' class='mb-2' @change='setDismissible'>dismissible
        </b-form-checkbox>
      </template>
      <template #additionalOptions>
        <template>
          <label>Alert Content</label>
          <b-form-input v-model='content' class='mb-2'></b-form-input>
        </template>
      </template>
    </playground>
  </div>
</template>

<script lang='ts' setup>
import { BAlert, BButton, BFormCheckbox, BFormInput } from 'bootstrap-vue';
import { ForgePageHeader } from '@3squared/forge-ui';
import { computed, ref } from 'vue';
import { baseVariants } from '../../../composables/playgroundOptions';
import { usePlayground, Playground } from '@3squared/forge-playground';

const content = ref('Alert');

const { options, propVals, config, reset } = usePlayground({
    show: true,
    dismissible: false,
    fade: false,
    variant: baseVariants[0],
    dismissLabel: 'text for aria-label'
  },
  {
    show: { required: true },
    variant: { type: 'select', options: baseVariants, required: true },
    fade: { disabled: () => !options.value.dismissible}
  },
  () => {
    content.value = 'Alert'
  }
);

const setDismissible = () => {
  if (!options.value.dismissible) {
    options.value.fade = false;
  }
};

const code = computed(() => {
  return `<b-alert ${propVals.value.join(' ')}>${content.value}</b-alert>`;
});
</script>

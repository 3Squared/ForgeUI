<template>
  <div>
    <forge-page-header title='Button' />
    <p>Further documentation and examples can be found in the <a class='link' href='https://bootstrap-vue.org/docs/components/button' target='_blank'><strong>Bootstrap Vue
      documentation</strong></a>.</p>
    <playground :code='code' :config='config' :options='options' @reset='reset'>
      <template #component>
        <component :is='BButton' v-bind='options'>{{ content }}</component>
      </template>
      <template #additionalOptions>
        <template>
          <label>Button Content</label>
          <b-form-input v-model='content'></b-form-input>
        </template>
      </template>
    </playground>
  </div>
</template>

<script lang='ts' setup>
import { ForgePageHeader } from '@3squared/forge-ui';
import { BButton, BFormInput } from 'bootstrap-vue';
import { computed, ref, watch } from 'vue';
import { buttonVariants, linkTargets, sizes } from '../../../composables/playgroundOptions';
import { usePlayground, Playground } from '@3squared/forge-playground';

const content = ref('Button');

const { options, propVals, config, reset } = usePlayground({
    disabled: false,
    block: false,
    squared: false,
    pressed: false,
    variant: buttonVariants[0],
    size: sizes[1].value,
    to: '',
    replace: false,
    href: '',
    target: linkTargets[1]
  },
  {
    variant: { type: 'select', options: buttonVariants, required: true},
    size: { type: 'select', options: sizes },
    target: { type: 'select', options: linkTargets },
    replace: { disabled: () => !options.value.to }
  },
  () => content.value = 'Button'
);

const code = computed(() => {
  return `<b-button ${propVals.value.join(' ')}>${content.value}</b-button>`;
});

watch(() => options.value.to, (val) => {
  if (!val) {
    options.value.replace = false;
  }
});
</script>

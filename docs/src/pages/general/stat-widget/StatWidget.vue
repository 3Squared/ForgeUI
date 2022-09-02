<template>
  <div>
    <forge-page-header title='Stat Widget' />
    <p>Further documentation and examples can be found in the <a class='link' href='https://saforgestyleguide.z33.web.core.windows.net/#/general/stat-widget/statwidget' target='_blank'><strong>Forge.UI
      documentation</strong></a>.</p>
    <OPTIONS />
    <playground :code='code' :config='config' :options='options' @reset='reset'>
      <template #component>
        <!-- Remove bg-${variant} once the widget has been refactored to accept a variant. -->
        <component :is='ForgeStatWidget' :class='`bg-${variant}`' v-bind='options'>{{ widgetContent }}</component>
      </template>
      <template #additionalOptions>
        <div class='mb-2'>
          <label>variant</label>
          <b-form-select v-model='variant' :options='baseVariants' />
        </div>
        <div class='mb-2'>
          <label>widget content</label>
          <b-form-input v-model='widgetContent' />
        </div>
      </template>
    </playground>
  </div>
</template>

<script lang='ts' setup>
import { ForgePageHeader, ForgeStatWidget } from '@3squared/forge-ui';
import { BFormInput, BFormSelect } from 'bootstrap-vue';
import { computed, ref } from 'vue';
import OPTIONS from './OPTIONS.md'
import { baseVariants, sizes } from '../../../composables/playgroundOptions';
import { usePlayground, Playground } from '@3squared/forge.playground';

const widgetContent = ref('Widget');
const variant = ref(baseVariants[0]);


const { options, propVals, config, reset } = usePlayground({
    size: sizes[1].value
  },
  {
    size: { type: 'select', options: sizes },
  },
  () => {
    widgetContent.value = 'Widget';
    variant.value = baseVariants[0];
  }
);

const code = computed(() => {
  // Remove bg-${variant.value} once the component has been refactored to accept a variant.
  return `<forge-stat-widget ${propVals.value.join(' ')} class='bg-${variant.value}'>${widgetContent.value}</forge-stat-widget>`;
});

</script>
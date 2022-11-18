<template>
  <div>
    <forge-page-header title='Progress' />
    <p>Further documentation and examples can be found in the <a class='link' href='https://bootstrap-vue.org/docs/components/progress' target='_blank'><strong>Boostrap Vue
      documentation</strong></a>.</p>
    <playground :code='code' :config='config' :options='options' @reset='reset'>
      <template #component>
        <component :is='BProgress' class='w-75' v-bind='options' />
      </template>
    </playground>
  </div>
</template>

<script lang='ts' setup>
import { ForgePageHeader } from '@3squared/forge-ui';
import { BProgress } from 'bootstrap-vue';
import { computed } from 'vue';
import { baseVariants } from '../../../composables/playgroundOptions';
import { usePlayground, Playground } from '@3squared/forge-playground';

const { options, propVals, config, reset } = usePlayground({
    animated: false,
    showProgress: false,
    showValue: false,
    striped: false,
    height: '',
    max: 100,
    precision: 0,
    value: 50,
    variant: baseVariants[0]
  },
  {
    variant: { type: 'select', options: baseVariants, required: true },
    value: { required: true },
    striped: { disabled: ()  : boolean => options.value.animated },
    showValue: { disabled: () : boolean => options.value.showProgress },
    showProgress: { disabled: () => options.value.showValue }
  }
);

const code = computed(() => {
  return `<b-progess class='w-100' ${propVals.value.join(' ')} />`;
});


</script>

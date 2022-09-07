<template>
  <div>
    <forge-page-header title='Loader' />
    <OPTIONS />
    <playground :code='code' :options='options' @reset='reset' :config='config'>
      <template #component>
        <component :is='ForgeLoader' v-bind='options' />
      </template>
    </playground>
  </div>
</template>

<script lang='ts' setup>
import { ForgeLoader, ForgePageHeader } from '@3squared/forge-ui';
import { computed } from 'vue';
import OPTIONS from './OPTIONS.md'
import { usePlayground, Playground } from '@3squared/forge-playground';

const { options, propVals, reset, config } = usePlayground({
  label: 'Loading...'
});

const code = computed(() => {
  return `<forge-loader ${propVals.value.join(' ')}/>`;
});
</script>
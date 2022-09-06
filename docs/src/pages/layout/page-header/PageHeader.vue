<template>
  <div>
    <forge-page-header title="Page Header" />
    <p>Further documentation and examples can be found in the <a class="link" target="_blank" href="https://saforgestyleguide.z33.web.core.windows.net/#/layout/page-header/pageheader"><strong>Forge.UI documentation</strong></a>.</p>
    <OPTIONS></OPTIONS>
    <playground :options="options" :config="config" :code="code" @reset="reset">
      <template #component>
        <component :is="ForgePageHeader" v-bind="options" />
      </template>
    </playground>
  </div>
</template>

<script setup lang="ts">
import OPTIONS from './OPTIONS.md'
import { ForgePageHeader } from "@3squared/forge-ui";
import { computed } from "vue";
import { usePlayground, Playground } from '@3squared/forge-playground';

const { options, propVals, config, reset } = usePlayground({
  title: 'Forge Page Header'
}, {
  title: { required: true }
})

const code = computed(() => `<forge-page-header ${propVals.value.join(' ')} />`)
</script>

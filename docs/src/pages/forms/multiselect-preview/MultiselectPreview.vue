<template>
  <div>
    <forge-page-header title="Multiselect Preview"/>
    <p>Further documentation and examples can be found in the <a class="link" target="_blank" href="https://saforgestyleguide.z33.web.core.windows.net/#/forms/multiselect-preview/multiselectpreview"><strong>Forge.UI documentation</strong></a>.</p>
    <OPTIONS />
    <playground :options="options" :config="config" :code="code">
      <template #component>
        <component :is="ForgeMultiSelectPreview" v-bind="options" class="w-100"/>
      </template>
    </playground>
    <OPTIONS></OPTIONS>
  </div>
<!--  <README>-->
<!--    <template #OPTIONS>-->
<!--      <OPTIONS></OPTIONS>-->
<!--    </template>-->

<!--    -->
<!--    <template #example>-->
<!--      <Demo :code="ExampleCode" :component="Example" />-->
<!--    </template>-->

<!--    <template #example2>-->
<!--      <Demo :code="ExampleCode2" :component="Example2" />-->
<!--    </template>-->

<!--    <template #example3>-->
<!--      <Demo :code="ExampleCode3" :component="Example3" />-->
<!--    </template>-->

<!--    <template #example4>-->
<!--      <Demo :code="ExampleCode4" :component="Example4" />-->
<!--    </template>-->

<!--    <template #example5>-->
<!--      <Demo :code="ExampleCode5" :component="Example5" />-->
<!--    </template>-->
<!--  </README>-->
</template>

<script setup lang="ts">
import { ForgePageHeader, ForgeMultiSelectPreview } from "@3squared/forge-ui";
import OPTIONS from './OPTIONS.md'
import { computed } from "vue";
import { usePlayground } from '@3squared/forge.playground';

const items = [
  { id: 1, label: 'Option 1' },
  { id: 2, label: 'Option 2' },
  { id: 3, label: 'Option 3' }
]

const { options, propVals, config, reset } = usePlayground({
  items: items,
  selectedItems: [{ id: 1, label: 'Option 1'}]
}, {
  items: { required: true },
  selectedItems: { required: true }
})

const code = computed(() => `<forge-multi-select-preview ${propVals.value.join(' ')}/>`)
</script>
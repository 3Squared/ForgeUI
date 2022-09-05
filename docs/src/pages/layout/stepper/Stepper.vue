<template>
  <div>
    <forge-page-header title="Stepper" />
    <p>Further documentation and examples can be found in the <a class="link" href="https://saforgestyleguide.z33.web.core.windows.net/#/layout/stepper/stepper" target="_blank"><strong>Forge.UI
      documentation</strong></a>.</p>
    <OPTIONS></OPTIONS>
    <playground :code="code" :config="config" :options="options" @reset="reset">
      <template #component>
        <component :is="ForgeStepper" v-bind="options" />
      </template>
    </playground>
    The ForgeStepperStep object takes the following format
    <div class="position-relative">
      <pre class="forge-code-block"><code v-html="ForgeStepperStep"></code></pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
import OPTIONS from './OPTIONS.md'
import { ForgePageHeader, ForgeStepper } from "@3squared/forge-ui";
import { computed } from "vue";
import Prism from "prismjs";
import { Playground, usePlayground } from '@3squared/forge-playground';
import { baseVariants } from "../../../composables/playgroundOptions";

const { options, propVals, config, reset } = usePlayground({
  steps: [
    { key: 'A', text: 'Step A' },
    { key: 'B', text: 'Step B' },
    { key: 'C', text: 'Step C' },
    { key: 'D', text: 'Step D' }
  ],
  currentStep: 0,
  variant: baseVariants[0],
}, {
  steps: { required: true },
  variant: { type: 'select', options: baseVariants }
})

const code = computed(() => `<forge-stepper ${propVals.value.join(' ')}/>`)

const ForgeStepperStep = Prism.highlight(`{ key: string, text: string, noBack: boolean }`, Prism.languages.markup, 'typescript')

</script>

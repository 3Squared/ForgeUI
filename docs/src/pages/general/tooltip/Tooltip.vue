<template>
  <div>
    <forge-page-header title="Tooltips"/>
    <p>Further documentation and examples can be found in the <a class="link" target="_blank" href="https://saforgestyleguide.z33.web.core.windows.net/#/general/tooltip/tooltip"><strong>Forge.UI documentation</strong></a>.</p>
    <playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <b-button :id="options.target" variant="primary">Button</b-button>
        <component :is="BTooltip" v-bind="options">{{tooltipContent}}</component>
      </template>
      <template #additionalOptions>
        <label>Tooltip Content</label>
        <b-form-input v-model="tooltipContent" />
      </template>
      <template #placement>
        <div class="mb-2">
          <label>placement</label>
          <b-form-select :options="placement" v-model="options.placement" />
        </div>
      </template>
      <template #boundary>
        <div class="mb-2">
          <label>boundary</label>
          <b-form-select :options="boundary" v-model="options.boundary" />
        </div>
      </template>
      <template #fallback-placement>
        <div class="mb-2">
          <label>fallback-placement</label>
          <b-form-select :options="fallbackPlacement" v-model="options.fallbackPlacement" />
        </div>
      </template>
      <template #triggers>
        <div class="mb-2">
          <label>triggers</label>
          <b-form-select :options="triggers" v-model="options.triggers" />
        </div>
      </template>
    </playground>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader } from "@3squared/forge-ui";
import { BButton, BTooltip, BFormInput, BFormSelect } from "bootstrap-vue";
import { computed, ref } from "vue";
import { baseVariants, boundary, fallbackPlacement, placement, triggers } from '../../../composables/playgroundOptions';
import { usePlayground, Playground } from '@3squared/forge.playground';


const tooltipContent = ref('content')

const { options, propVals, config, reset } = usePlayground({
    noFade: false,
    noninteractive: false,
    target: 'popover-button',
    title: 'Popover Title',
    variant: baseVariants[0],
    id: '',
    placement: placement[0],
    fallbackPlacement: fallbackPlacement[0],
    triggers: triggers[0],
    delay: 50,
    offset: 0,
    container: '',
    boundary: boundary[0],
    boundaryParent: 5,
    customClass: ''
  }, 
  {
    target: { required: true },
    title: { required: true },
    variant: { type: "select", options: baseVariants, required: true },
    placement: { type: "select", options: placement, required: false },
    fallbackPlacement: { type: "select", options: fallbackPlacement, required: false },
    triggers: { type: "select", options: triggers, required: false },
    boundary: { type: "select", options: boundary, required: false },
  }, 
  () => {
      tooltipContent.value = 'content'
  }
)

const code = computed(() => {
  return `<b-button id="${options.value.target}" variant="primary">Button</b-button>
<b-popover ${propVals.value.join(' ')}>
  ${tooltipContent.value}
</b-popover>`;
})
</script>

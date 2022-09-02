<template>
  <div>
    <forge-page-header title="Popover"/>
    <p>Further documentation and examples can be found in the <a class="link" target="_blank" href="https://saforgestyleguide.z33.web.core.windows.net/#/general/popover/popover"><strong>Forge.UI documentation</strong></a>.</p>
    <playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <b-button id="popover-button" variant="primary">Button</b-button>
        <component :is="BPopover" v-bind="options"/>
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
import { BPopover, BButton, BFormSelect } from 'bootstrap-vue'
import { computed } from "vue";
import { usePlayground, Playground } from '@3squared/forge-playground';
import { baseVariants, boundary, fallbackPlacement, placement, triggers } from '../../../composables/playgroundOptions';

const { options, propVals, config, reset } = usePlayground({
  noFade: false,
  disabled: false,
  target: 'popover-button',
  title: 'Popover Title',
  variant: baseVariants[0],
  content: 'Popover Content',
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
}, {
  target: { required: true },
  title: { required: true },
  variant: { type: "select", options: baseVariants, required: true },
  content: { required: true },
  placement: { type: "select", options: placement, required: false },
  fallbackPlacement: { type: "select", options: fallbackPlacement, required: false },
  triggers: { type: "select", options: triggers, required: false },
  boundary: { type: "select", options: boundary, required: false },
})

const code = computed(() => {
  return `<b-button id="${options.value.target}" variant="primary">Button</b-button>
<b-popover ${propVals.value.join(' ')}>
  <template #title>
   ${ options.value.title }
  </template>
  ${ options.value.content }
</b-popover>`;
})
</script>

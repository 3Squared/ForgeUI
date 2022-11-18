<template>
  <div>
    <forge-page-header title="Text area" />
    <p>Further documentation and examples can be found in the <a class="link" target="_blank" href="https://bootstrap-vue.org/docs/components/form-textarea"><strong>Bootstrap Vue documentation</strong></a>.</p>
    <playground :options="options" :config="config" :code="code" @reset="reset">
      <template #component>
        <component :is="BFormTextarea" v-bind="options" class="w-75"/>
      </template>
    </playground>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader } from "@3squared/forge-ui";
import { BFormTextarea } from "bootstrap-vue";
import { computed } from "vue";
import { usePlayground, Playground } from '@3squared/forge-playground';
import { autoCompleteStates, sizes } from '../../../composables/playgroundOptions';

const wrapOptions = ['soft', 'hard']

const { options, propVals, config, reset } = usePlayground({
  vModel: 'YourVariable',
  disabled: false,
  maxRows: 0,
  rows: 2,
  placeholder: '',
  size: sizes[1].value,
  wrap: wrapOptions[0],
  noResize: false,
  plaintext: false,
  readonly: false,
  number: false,
  trim: false,
  ariaInvalid: '',
  autoComplete: autoCompleteStates[0],
  autofocus: false,
  debounce: 0,
  id: '',
  lazy: false,
  lazyFormatter: false,
  name: '',
  noAutoShrink: false,
  required: false,
  state: null as Boolean | null,
}, {
  vModel: { required: true },
  size: { type: 'select', options: sizes },
  autoComplete: { type: 'select', options: autoCompleteStates },
  wrap: { type: 'select', options: wrapOptions }
})

const code = computed(() => `<b-form-textarea ${propVals.value.join(' ')}/>`);

</script>
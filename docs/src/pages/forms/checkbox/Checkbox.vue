<template>
  <div>
    <forge-page-header title="Checkbox" />
    <p>Further documentation and examples can be found in the <a class="link" target="_blank" href="https://saforgestyleguide.z33.web.core.windows.net/#/forms/checkbox/checkbox"><strong>Forge.UI documentation</strong></a>.</p>
    <playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <component :is="BFormCheckbox" v-bind="options">{{ checkboxLabel }}</component>
      </template>
    </playground>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader } from "@3squared/forge-ui";
import { BFormCheckbox } from "bootstrap-vue";
import { computed, ref } from "vue";
import { buttonVariants, sizes } from '../../../composables/playgroundOptions';
import { Playground, usePlayground } from '@3squared/forge.playground'
const checkboxLabel = ref('Checkbox')

const { options, propVals, config, reset } = usePlayground({
    value: 'true',
    uncheckedValue: 'false',
    autofocus: false,
    button: false,
    buttonVariant: buttonVariants[0],
    disabled: false,
    form: '',
    id: '',
    indeterminate: false,
    inline: false,
    name: 'name',
    plain: false,
    required: false,
    size: sizes[1].value,
    switch: false,
    ariaLabel: '',
    ariaLabelledby: ''
  },
  {
    buttonVariant: { type: "select", options: buttonVariants, required: false, disabled: () => !options.value.button },
    size: { type: "select", options: sizes, required: false },
  },
  () => {
    checkboxLabel.value = "Checkbox"
  }
)

const code = computed(() => {
  return `<b-form-checkbox${propVals.value.length > 0 ? ' ' + propVals.value.join(' ') : ''}>${checkboxLabel.value}</b-form-checkbox>`;
})

</script>
<template>
  <div class='d-flex flex-column'>
    <div class='d-flex flex-row mb-2'>
      <b-card class='w-75 mr-2'>
        <div class='d-flex h-100 align-items-center justify-content-center'>
          <slot ref='component' name='component' />
        </div>
      </b-card>
      <b-card class='w-50 vh-60'>
        <template #header>
          <div class="d-flex justify-content-between pb-2">
            <h1 class="h3">Options</h1>
            <div class="d-flex align-items-center">
              <slot name='re-render'>
                <b-button v-if='rerender' class='mr-2' variant='primary' @click="$emit('re-render')">Re-render
                </b-button>
              </slot>
              <b-button variant='primary' @click="$emit('reset')">Reset</b-button>
            </div>
          </div>
          <slot name="header" />
        </template>
        <template #default>
          <div class='scroll p-3'>
            <template v-for='(option, key) in props.options'>
              <slot :name='key' v-bind='props.options'>
                <div v-if='isSelect(getConfig(key))'>
                  <label>{{ key }}</label>
                  <b-form-select v-model='props.options[key]' :options='getOptions(key)' class='mb-3'
                                 :disabled='isDisabled(key)' />
                </div>
                <b-form-checkbox v-else-if="typeof option === 'boolean'" v-model='props.options[key]' class='mb-2'
                                 :disabled='isDisabled(key)'>
                  {{ key }}
                </b-form-checkbox>
                <template v-else-if="typeof option === 'number'">
                  <label>{{ key }}</label>
                  <b-form-input v-model.number='props.options[key]' class='mb-2' type="number"
                                :disabled='isDisabled(key)' />
                </template>
                <template v-else-if="typeof option === 'string'">
                  <label>{{ key }}</label>
                  <b-form-input v-model='props.options[key]' class='mb-2'
                                :disabled='isDisabled(key)' />
                </template>
              </slot>
            </template>
            <slot name='additionalOptions'></slot>
          </div>
        </template>
      </b-card>
    </div>
    <code-block :code="code" />
  </div>
</template>

<script lang='ts' setup>
import { BButton, BCard, BFormCheckbox, BFormInput, BFormSelect } from "bootstrap-vue";
import { defineProps } from "vue";
import CodeBlock from "./components/CodeBlock.vue";
import { PropDefs, SelectPropDef } from "./composables/useMapProp";

const props = defineProps({
  code: { type: String, default: "", required: true },
  options: { type: Object, required: true },
  rerender: { type: Boolean, default: false },
  config: { type: Object as () => Partial<Record<string, PropDefs>>, required: true }
});

function getConfig(key: string): PropDefs {
  return props.config![key]! ?? {};
}

function isDisabled(key: string) {
  const config = getConfig(key);
  if (config.disabled) {
    return config.disabled();
  }
  return false;
}

function isSelect(config: PropDefs): config is SelectPropDef {
  return (config as SelectPropDef)?.type === "select" ?? false;
}

function getOptions(key: string) {
  const config = getConfig(key);
  if (isSelect(config)) {
    return config.options;
  }
  return [];
}

</script>

<style scoped>
.scroll {
  max-height: 100%;
  overflow-y: auto;
}
</style>
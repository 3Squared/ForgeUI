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
                <div v-if='config[key] && config[key].type && config[key].type === "select"'>
                  <label>{{ key }}</label>
                  <b-form-select v-model='props.options[key]' :options='config[key].options' class='mb-3'
                                 :disabled='config[key] && config[key].disabled &&  config[key].disabled()' />
                </div>
                <b-form-checkbox v-else-if="typeof option === 'boolean'" v-model='props.options[key]' class='mb-2'
                                 :disabled='config[key] && config[key].disabled &&  config[key].disabled()'>
                  {{ key }}
                </b-form-checkbox>
                <template v-else-if="typeof option === 'number'">
                  <label>{{ key }}</label>
                  <b-form-input v-model.number='props.options[key]' class='mb-2' type="number"
                                :disabled='config[key] && config[key].disabled &&  config[key].disabled()' />
                </template>
                <template v-else-if="typeof option === 'string'">
                  <label>{{ key }}</label>
                  <b-form-input v-model='props.options[key]' class='mb-2'
                                :disabled='config[key] && config[key].disabled &&  config[key].disabled()' />
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
import { BButton, BCard, BFormCheckbox, BFormInput, BFormSelect } from 'bootstrap-vue';
import { defineProps } from 'vue';
import CodeBlock from './components/CodeBlock.vue'
import { PropDefs } from './composables/useMapProp';

const props = defineProps({
  code: { type: String, default: '', required: true },
  options: { type: Object, required: true },
  rerender: { type: Boolean, default: false },
  config: { type: Object as () => Partial<Record<string, PropDefs>>, required: true}
});


</script>

<style scoped>
.scroll {
  max-height: 100%;
  overflow-y: auto;
}
</style>
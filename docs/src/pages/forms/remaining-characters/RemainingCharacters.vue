<template>
  <div>
    <forge-page-header title="Remaining Characters"/>
    <p>Further documentation and examples can be found in the <a class="link" target="_blank" href="https://saforgestyleguide.z33.web.core.windows.net/#/forms/remaining-characters/remainingcharacters"><strong>Forge.UI documentation</strong></a>.</p>
    <OPTIONS />
    <playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <div class="d-flex flex-column w-75">
          <div class="d-flex justify-content-between">
            <label>{{ textboxLabel }}</label>
            <forge-remaining-characters v-bind="options" />
          </div>
          <b-form-textarea v-model="text" rows="4" />
        </div>
      </template>
      <template #currentCount>
        <label>current count:</label> {{ options.currentCount }}
      </template>
    </playground>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader, ForgeRemainingCharacters } from "@3squared/forge-ui";
import { BFormTextarea } from "bootstrap-vue";
import { computed, ref, watch } from "vue";
import OPTIONS from './OPTIONS.md'
import { usePlayground, Playground } from '@3squared/forge.playground';
const text = ref('Hello')
const textboxLabel = ref('Textbox Label')

const { options, propVals, config, reset } = usePlayground({
    maxCount: 300,
    currentCount: text.value.length
  }, {
    maxCount: { required: true },
    currentCount: { required: true }
  },
  () => {
    text.value = 'Hello'
  }
)

watch(() => text.value, (text) => options.value.currentCount = text.length)

const code = computed(() => {
  return `<div class="d-flex flex-column w-100">
  <div class="d-flex justify-content-between">
    <label>${textboxLabel.value}</label>
    <forge-remaining-characters ${propVals.value.join(' ')} />
  </div>
  <b-form-textarea v-model="textVariable" rows="4" />
</div>`;
})

</script>
<template>
  <div>
    <forge-page-header title="Toast" />
    <p>Further documentation and examples can be found in the <a class="link" target="_blank" href="https://saforgestyleguide.z33.web.core.windows.net/#/general/toast/toast"><strong>Forge.UI documentation</strong></a>.</p>
    <playground @reset="reset" :code="code" :options="options" :config="config">
      <template #component>
        <component :is="BButton" @click="createToast" variant="primary">{{ buttonContent }}</component>
      </template>
    </playground>
    Dont forget to import ForgeToast in your main.ts file using <div class="position-relative">
    <pre class="forge-code-block"><code v-html="formattedCode"></code></pre>
  </div>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader, useForgeToasts } from "@3squared/forge-ui";
import { BButton } from 'bootstrap-vue'
import { computed } from "vue";
import Prism from 'prismjs'
import { usePlayground, Playground } from '@3squared/forge-playground';
import { ForgeToastType } from '@3squared/forge-ui/dist/types/src/helpers/types';
const { forgeToast } = useForgeToasts()

const toastTypes = computed(() => ['success', 'error'] as ForgeToastType[])


const { options, config, reset } = usePlayground({
  toastType: toastTypes.value[0],
  toastContent: 'toast content'
}, {
  toastType: { type: 'select', options: toastTypes.value, required: true}
})

const buttonContent = computed(() => `${options.value.toastType.charAt(0).toUpperCase()}${options.value.toastType.slice(1)} Toast`)

const createToast = () => {
  forgeToast(options.value.toastType, options.value.toastContent)
}

const code = computed(() => `<template>
  <div>
    <b-button variant="primary" @click="createToast">${buttonContent.value}</b-button>
  </div>
</template>

\<script setup lang="ts">
import { BButton } from 'bootstrap-vue'
import { useForgeToasts } from "@3squared/forge-ui"
const { forgeToast } = useForgeToasts()
  
const createToast = () => {
  forgeToast('${options.value.toastType}', '${options.value.toastContent}')
}
\<\/script>
`)

const formattedCode = computed(() => Prism.highlight(`import Vue from 'vue'
import { ForgeToasts } from "@3squared/forge-ui";

Vue.use(ForgeToasts)`, Prism.languages.markup, 'typescript'))
</script>

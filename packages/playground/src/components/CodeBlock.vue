﻿<template>
  <div class="position-relative mt-2">
    <b-button class="copy-code position-absolute text-white" variant="link" @click="copyToClipboard">
      Copy
      <b-icon-files />
    </b-button>
    <pre class="position-relative p-3 pt-4 rounded-lg code-block"><code class="text-white" v-html='formattedCode' /></pre>
  </div>
</template>

<script setup lang="ts">
import { BIconFiles, BButton } from "bootstrap-vue";
import { useForgeToasts } from "@3squared/forge-ui";
import { computed } from "vue";
import Prism from "prismjs";

const props = defineProps({
  code: {
    type: String,
    required: true
  }
});
const { forgeToast } = useForgeToasts();

const formattedCode = computed(() => Prism.highlight(props.code, Prism.languages.markup, "vue"));

const copyToClipboard = () => {
  navigator.clipboard.writeText(props.code!);
  forgeToast("success", "Copied!");
};
</script>

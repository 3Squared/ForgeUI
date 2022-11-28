<template>
  <div class="mb-5">
    <div class="bg-light p-4 border shadow">
      <component :is="component"></component>
    </div>
    <div v-if="code">
      <b-button class="mt-2" :variant="codeVisible ? 'primary' : 'outline-primary'" @click="codeVisible = !codeVisible"> View Code </b-button>
      <b-collapse v-model="codeVisible" class="mt-2 position-relative">
        <b-button class="copy-code text-white" variant="link">
          Copy
          <b-icon-clipboard @click="copyCode" />
        </b-button>
        <pre class="forge-code-block"><code v-html="formattedCode"></code></pre>
      </b-collapse>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { BButton, BCollapse, BIconClipboard } from "bootstrap-vue";
import Prism from "prismjs";

export default defineComponent({
  name: "Demo",
  components: { BButton, BCollapse, BIconClipboard },
  props: {
    component: {
      type: [Function, String, Object],
      required: true
    },
    code: {
      type: String,
      required: true
    }
  },
  computed: {
    formattedCode() {
      const html = Prism.highlight(this.code, Prism.languages.markup, "vue");
      return html;
    }
  },
  methods: {
    copyCode() {
      navigator.clipboard.writeText(this.code);
      this.$forgeToast("success", "Example Successfully Copied");
    }
  },
  data() {
    return {
      codeVisible: false
    };
  }
});
</script>

<style lang="scss">
.forge-code-block {
  position: relative;
  background-color: #282c34;
  border-radius: 6px;
  line-height: 1.4;
  padding: 1.25rem 1.5rem;
  margin: 0.85rem 0;
  overflow: auto;

  code {
    color: white;
  }
}

.copy-code {
  position: absolute;
  z-index: 10;
  right: 0;
}
</style>

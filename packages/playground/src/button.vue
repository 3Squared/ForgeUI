<template>
  <div>
    <h3>Button</h3>
    <p>
      Further documentation and examples can be found in the
      <a class="link" href="https://saforgestyleguide.z33.web.core.windows.net/#/general/button/button" target="_blank"
        ><strong>Forge.UI documentation</strong></a
      >.
    </p>
    <playground :code="code" :config="config" :options="options" @reset="reset">
      <template #component>
        <component :is="BButton" v-bind="options">{{ content }}</component>
      </template>
      <template #additionalOptions>
        <template>
          <label>Button Content</label>
          <b-form-input v-model="content"></b-form-input>
        </template>
      </template>
    </playground>
  </div>
</template>

<script lang="ts" setup>
import { BButton, BFormInput } from "bootstrap-vue";
import Playground from "./Playground.vue";
import { computed, ref, watch } from "vue";
import { usePlayground } from "./composables/useMapProp";

const content = ref("Button");

const { options, propVals, config, reset } = usePlayground(
  {
    disabled: false,
    block: false,
    squared: false,
    pressed: false,
    to: "",
    replace: false,
    href: ""
  },
  {
    replace: { disabled: () => !options.value.to }
  },
  () => (content.value = "Button")
);

const code = computed(() => {
  return `<b-button ${propVals.value.join(" ")}>${content.value}</b-button>`;
});

watch(
  () => options.value.to,
  (val) => {
    if (!val) {
      options.value.replace = false;
    }
  }
);
</script>

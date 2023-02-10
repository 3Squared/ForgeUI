<template>
  <div>
    <forge-page-header title="Collapse" />
    <p>
      Further documentation and examples can be found in the
      <a class="link" target="_blank" href="https://bootstrap-vue.org/docs/components/collapse">
        <strong>Bootstrap Vue documentation</strong>
      </a>
      .
    </p>
    <playground :options="options" :config="config" :code="code" @reset="reset">
      <template #component>
        <div class="d-flex flex-column">
          <b-button v-b-toggle.collapse>Toggle Collapse</b-button>
          <component :is="BCollapse" id="collapse" v-bind="options">
            <b-card>Collapse Content</b-card>
          </component>
        </div>
      </template>
    </playground>
    Dont forget to register the b-toggle directive in your script setup section using
    <code-block :code="vBToggleExample" />
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader } from "@3squared/forge-ui";
import { BCollapse, BButton, BCard, VBToggle } from "bootstrap-vue";
import { computed } from "vue";
import { Playground, usePlayground, CodeBlock } from "@3squared/forge-playground";

const vBToggle = VBToggle;

const { options, propVals, config, reset } = usePlayground({
  accordion: "",
  appear: false,
  isNav: false,
  tag: "div"
});

const code = computed(() => {
  return `<b-button v-b-toggle.collapse>Toggle Collapse</b-button>
<b-collapse ${propVals.value.join(" ")}>
  Hello
</b-collapse>`;
});

const vBToggleExample = `<script setup lang="ts">
import { VBToggle } from "bootstrap-vue";

const vBToggle = VBToggle;
<\/script>`;
</script>

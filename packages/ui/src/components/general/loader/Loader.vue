<template>
  <div class="forge-loader">
    <b-spinner :variant="variant" :label="label" />
  </div>
</template>

<script lang="ts">
import { BSpinner } from "bootstrap-vue";
import Vue from "vue";
/**
 * @displayName Loader
 **/
export const ForgeLoader = /*#__PURE__*/ Vue.extend({
  name: "ForgeLoader",
  components: { BSpinner },
  props: {
    label: {
      type: String,
      default: "Loading..."
    },
    variant: {
      type: String,
      default: () => Vue.prototype?.ForgeSettings?.StatWidget?.variant ?? "primary"
    }
  }
});

export default ForgeLoader;
</script>

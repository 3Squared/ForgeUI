<template>
  <div class="forge-loader">
    <b-spinner variant="primary" :label="label" />
  </div>
</template>

<script lang="ts">
import { BSpinner } from 'bootstrap-vue';
import Vue from "vue";
/**
 * @displayName Loader
 **/
export const ForgeLoader = /*#__PURE__*/ Vue.extend({
  name: 'ForgeLoader',
  props: {
    label: {
      type: String,
      default: "Loading..."
    }
  },
  components: { BSpinner }
})

export default ForgeLoader;
</script>

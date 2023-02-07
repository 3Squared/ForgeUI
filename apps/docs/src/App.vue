<template>
  <div id="app">
    <TheNavBar></TheNavBar>
    <main id="main-content" class="forge-layout">
      <div class="container">
        <router-view />
      </div>
    </main>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import pkg from "../package.json";
import TheNavBar from "./components/TheNavBar.vue";
import { VBTooltip } from "bootstrap-vue";
export default Vue.extend({
  name: "Home",
  components: {
    TheNavBar
  },
  directives: { "b-tooltip": VBTooltip },

  computed: {
    pkg() {
      return pkg;
    }
  }
});
</script>

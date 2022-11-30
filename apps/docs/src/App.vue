<template>
  <div id="app">
    <TheNavBar></TheNavBar>
    <main class="forge-layout" id="main-content">
      <div class="container">
        <router-view/>
      </div>
    </main>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import pkg from "../package.json";
import Changelog from "./components/Changelog.vue";
import TheNavBar from "./components/TheNavBar.vue";
import {BNavItemDropdown, BDropdownItem, BButton, BTooltip, VBTooltip, BNavItem } from "bootstrap-vue";
export default Vue.extend({
  name: "Home",
  components: {
    Changelog,
    BNavItemDropdown,
    BDropdownItem,
    BButton,
    BTooltip,
    BNavItem,
    TheNavBar
  },
  directives: {"b-tooltip": VBTooltip},

  computed: {
    pkg() {
      return pkg;
    },
  },
});

</script>
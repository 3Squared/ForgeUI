<template>
  <div>
    <forge-multi-select-preview v-model="selectedItems" title="Selected User(s)" :items="users" />
  </div>
</template>

<script lang="ts">
import { items, selectedItems } from "./example-data";
import { ForgeMultiSelectPreview } from "@3squared/forge-ui";
import Vue from "vue";

export default Vue.extend({
  components: { ForgeMultiSelectPreview },
  data() {
    return {
      users: items,
      selectedItems: selectedItems
    };
  }
});
</script>

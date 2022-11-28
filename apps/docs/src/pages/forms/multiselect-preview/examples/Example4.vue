<template>
  <div>
    <forge-multi-select-preview title="Selected User(s)" :items="users" v-model="selectedItems" height="400px" :can-remove-item-from-preview="false" />
  </div>
</template>

<script lang="ts">
import { items } from "./example-data";
import { ForgeMultiSelectPreview } from "@3squared/forge-ui";
import Vue from "vue";

export default defineComponent({
  components: { ForgeMultiSelectPreview },
  data() {
    return {
      users: items,
      selectedItems: []
    };
  }
});
</script>

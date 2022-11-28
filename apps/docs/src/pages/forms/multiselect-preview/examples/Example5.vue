<template>
  <div>
    <forge-multi-select-preview title="Selected User(s)" :items="users" v-model="selectedItems">
      <template #option-label="{ node }">
        <span v-b-tooltip title="Online!"> Customised Label {{ node.label }} </span>
      </template>
    </forge-multi-select-preview>
  </div>
</template>

<script lang="ts">
import { items, selectedItems } from "./example-data";
import { ForgeMultiSelectPreview } from "@3squared/forge-ui";
import Vue from "vue";

export default defineComponent({
  components: { ForgeMultiSelectPreview },
  data() {
    return {
      users: items,
      selectedItems: selectedItems
    };
  }
});
</script>

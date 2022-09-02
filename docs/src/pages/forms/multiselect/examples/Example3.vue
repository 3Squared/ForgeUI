<template>
  <div>
    <forge-multi-select v-model="selectedValues" :options="options" :state="false" />
    {{ selectedValues }}
  </div>
</template>

<script lang="ts">
import { ForgeMultiSelect } from '@3squared/forge-ui'
import Vue from "vue";
export default Vue.extend({
  components: { ForgeMultiSelect },
  data() {
    return {
      selectedValues: []
    };
  },
  computed: {
    options() {
      return ['Anna', 'Bob', 'Charlie', 'Daniel', 'Ellie', 'Frank', 'George', 'Harry', 'Isaac', 'Jemma', 'Kelly', 'Lucas'].map((v, i) => ({
        id: i,
        label: v
      }));
    }
  }
})
</script>
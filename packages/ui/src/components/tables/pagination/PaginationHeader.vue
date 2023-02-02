<template>
  <div class="d-flex justify-content-start align-items-baseline">
    <span class="input-group w-auto align-items-baseline">
      <span class="input-group-prepend mr-2">Number of results per page</span>
      <b-form-select data-cy="table-count-selector" :value="perPage" :options="pageSizes" size="sm" @input="$emit('update:perPage', $event)" />
    </span>

    <span class="mx-2">|</span>

    <span class="w-auto" data-cy="table-page-count">{{ total }} {{ pluralize(total, "result") }} across {{ pageText }}</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { BFormSelect } from "bootstrap-vue";

export const ForgePaginationHeader = /*#__PURE__*/ Vue.extend({
  name: "ForgePaginationHeader",
  components: { BFormSelect },
  props: {
    total: {
      type: Number,
      required: true
    },
    pageSizes: {
      type: Array,
      required: false,
      default: () => [5, 10, 25, 50, 100]
    },
    perPage: {
      type: Number,
      required: false,
      default: 10
    }
  },
  computed: {
    pageText(): string {
      const pages = Math.ceil(this.total / this.perPage);
      return `${pages} ${this.pluralize(pages, "page")}`;
    }
  },
  methods: {
    pluralize(count: number, text: string) {
      if (count > 1) {
        return text + "s";
      }
      return text;
    }
  }
});

export default ForgePaginationHeader;
</script>

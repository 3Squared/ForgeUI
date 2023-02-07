<template>
  <div
    class="d-flex align-items-baseline"
    :class="{ 'justify-content-center': !includePageSizeAndPageCount, 'justify-content-between': includePageSizeAndPageCount }"
  >
    <span v-if="includePageSizeAndPageCount" class="input-group w-auto align-items-baseline">
      <span class="input-group-prepend mr-2">Page Size:</span>
      <b-form-select :value="perPage" :options="pageSizes" size="sm" @input="$emit('update:perPage', $event)" />
    </span>

    <b-pagination :value="page" :total-rows="total" :per-page="perPage" aria-controls="table-example" @input="$emit('update:page', $event)" />

    <span v-if="includePageSizeAndPageCount" class="w-auto" data-cy="table-page-count">{{ total }} {{ pluralize(total, "item") }} in {{ pageText }}</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { BFormSelect, BPagination } from "bootstrap-vue";

/**
 * @displayName Pagination Footer
 **/
export const ForgePaginationFooter = /*#__PURE__*/ Vue.extend({
  name: "ForgePaginationFooter",
  components: { BFormSelect, BPagination },
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
    },
    page: {
      type: Number,
      required: false,
      default: 1
    },
    includePageSizeAndPageCount: {
      type: Boolean,
      required: true
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

export default ForgePaginationFooter;
</script>

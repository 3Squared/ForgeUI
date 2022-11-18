import t from "vue";
import { BFormSelect as a, BPagination as o } from "bootstrap-vue";
const p = /* @__PURE__ */ t.extend({
  name: "ForgePaginationFooter",
  components: { BFormSelect: a, BPagination: o },
  props: {
    total: {
      type: Number,
      required: !0
    },
    pageSizes: {
      type: Array,
      required: !1,
      default: () => [5, 10, 25, 50, 100]
    },
    perPage: {
      type: Number,
      required: !1,
      default: 10
    },
    page: {
      type: Number,
      required: !1,
      default: 1
    },
    includePageSizeAndPageCount: {
      type: Boolean,
      required: !0
    }
  },
  methods: {
    pluralize(e, r) {
      return e > 1 ? r + "s" : r;
    }
  },
  computed: {
    pageText() {
      const e = Math.ceil(this.total / this.perPage);
      return `${e} ${this.pluralize(e, "page")}`;
    }
  }
});
export {
  p as ForgePaginationFooter,
  p as default
};

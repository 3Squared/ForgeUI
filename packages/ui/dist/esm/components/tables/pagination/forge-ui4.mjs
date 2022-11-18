import t from "vue";
import { BFormSelect as a, BPagination as o } from "bootstrap-vue";
const u = /* @__PURE__ */ t.extend({
  name: "ForgePaginationHeader",
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
  u as ForgePaginationHeader,
  u as default
};

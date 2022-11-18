import o from "vue";
import { getColumnKey as s } from "../table-column-customiser/forge-ui.mjs";
import { BTable as i, BAlert as a, BButton as n, BCollapse as u, BIcon as m, BIconArrowRepeat as h, BSpinner as d } from "bootstrap-vue";
import { BIconForgeFilter as p } from "../../../icons/forge-ui.mjs";
import f from "./components/forge-ui.mjs";
import c from "../table-column-customiser/forge-ui2.mjs";
import g from "../filter-header/forge-ui.mjs";
import F from "../pagination/forge-ui.mjs";
import b from "../pagination/forge-ui3.mjs";
import { parseError as y } from "../../../helpers/forge-ui.mjs";
const w = /* @__PURE__ */ o.extend({
  name: "ForgeTable",
  components: {
    ForgeTableExporter: f,
    ForgeTableColumnCustomiser: c,
    ForgeFilterHeader: g,
    ForgePaginationFooter: F,
    ForgePaginationHeader: b,
    BTable: i,
    BAlert: a,
    BButton: n,
    BCollapse: u,
    BIcon: m,
    BIconArrowRepeat: h,
    BSpinner: d,
    BIconForgeFilter: p
  },
  props: {
    total: {
      type: Number,
      default: -1
    },
    stickToPage: {
      type: Boolean,
      default: !0
    },
    fields: {
      type: Array,
      required: !0
    },
    showColumnCustomiser: {
      type: Boolean,
      default: () => !1
    },
    showExporter: {
      type: Boolean,
      default: () => !1
    },
    filters: {
      type: Object,
      default: () => {
      }
    },
    tableError: {
      type: [String, Object],
      default: () => null
    },
    clearColumn: {
      type: String,
      default: () => "actions"
    },
    exportItemsFunc: {
      type: Function,
      default: null
    },
    legacyPaginationFooter: {
      type: Boolean,
      required: !1,
      default: !1
    },
    autoColumnWidth: {
      type: Boolean,
      default: !1
    }
  },
  data() {
    return {
      pageSizes: [10, 20, 50, 100],
      perPage: 20,
      page: 1,
      customisedFields: [],
      localFilters: {},
      localTableErrorMessage: null,
      localTableErrorDetails: [],
      errorDetailsOpen: !1
    };
  },
  methods: {
    updateFilters() {
      this.$emit("update:filters", this.localFilters), this.refreshTable();
    },
    refreshTable() {
      this.$root.$emit("bv::refresh::table", this.$attrs.id);
    },
    clearFilters() {
      for (const e in this.localFilters) {
        const t = this.localFilters[e];
        typeof t == "string" || typeof t == "number" ? this.localFilters[e] = null : Array.isArray(t) && (this.localFilters[e] = []);
      }
      this.$emit("update:filters", this.localFilters), this.$emit("clearFilters"), this.refreshTable();
    },
    getHeadSlot(e) {
      return `head(${e})`;
    },
    getColumnKey: s,
    async itemsWrapper(e) {
      if (typeof this.$attrs.items == "function") {
        this.localTableErrorMessage = null, this.localTableErrorDetails = null;
        const t = this.$attrs.items;
        try {
          return await t(e);
        } catch (r) {
          const l = y(r);
          this.localTableErrorMessage = l.errorMessage, this.localTableErrorDetails = l.errorDetails, this.$emit("update:tableError", r);
        }
      } else
        return this.$attrs.items;
    },
    getItemsForExport() {
      return this.exportItemsFunc == null ? this.$refs.table.localItems : this.exportItemsFunc();
    }
  },
  computed: {
    mergedAttrs() {
      let e = {
        showEmpty: !0,
        striped: !0,
        hover: !0,
        fixed: !this.autoColumnWidth,
        bordered: !0,
        noSortReset: !0
      };
      return this.total != -1 && (e = { ...e, perPage: this.perPage, currentPage: this.page }), {
        ...e,
        ...this.$attrs,
        items: typeof this.$attrs.items == "function" ? this.itemsWrapper : this.$attrs.items,
        fields: this.customisedFields
      };
    },
    filtersConfig() {
      return this.fields.map((e) => typeof e == "object" && e.autoFilter ? (this.$scopedSlots[this.getHeadSlot(e.key)] && console.warn(
        `You have declared the field '${e.key}' on table ${this.$attrs.id} as an autofilter column, but have also overridden the table header slot for this field. Please either remove the slot override, or remove autofilter on this column`
      ), e) : null).filter((e) => e !== null);
    }
  },
  watch: {
    filters: {
      immediate: !0,
      deep: !0,
      handler(e) {
        this.localFilters = { ...e };
      }
    },
    tableError: {
      immediate: !0,
      deep: !0,
      handler(e) {
        this.localTableErrorMessage = e;
      }
    },
    fields: {
      immediate: !0,
      deep: !0,
      handler(e) {
        this.customisedFields = e;
      }
    }
  }
});
export {
  w as ForgeTable,
  w as default
};

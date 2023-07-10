<template>
  <div>
    <div class="d-flex align-items-end mb-2" :class="{ 'justify-content-end': legacyPaginationFooter, 'justify-content-between': !legacyPaginationFooter }">
      <span v-if="!legacyPaginationFooter">
        <forge-pagination-header v-if="total != -1" :per-page.sync="perPage" :page-sizes="pageSizes" :total="total" />
      </span>
      <span>
        <b-button v-if="showClearButton" variant="outline-primary" class="mr-2" @click="clearFilters">
          <b-icon-forge-filter class="mr-1" />
          Clear
        </b-button>
        <forge-table-exporter v-if="showExporter" :customised-fields="customisedFields" :items="getItemsForExport" :name="$attrs.id" />
        <forge-table-column-customiser v-if="showColumnCustomiser" :id="$attrs.id" v-model="customisedFields" />
        <slot name="above-table" />
      </span>
    </div>
    <div class="forge-table" :class="{ 'forge-table-sticky-page': stickToPage }">
      <b-table ref="table" v-bind="mergedAttrs" v-on="$listeners">
        <template v-for="field in filtersConfig" #[getHeadSlot(getColumnKey(field))]="{ label }">
          <forge-filter-header
            :key="getColumnKey(field)"
            v-model="localFilters[getColumnKey(field)]"
            :name="label"
            :type="field.filterType"
            @input="updateFilters"
          />
        </template>
        <template #empty>
          <h5 v-if="localTableErrorMessage == null && (localTableErrorDetails == null || localTableErrorDetails.length === 0)" class="text-center">
            No records to display
          </h5>
          <b-alert
            class="text-center m-n2"
            variant="danger"
            :show="localTableErrorMessage != null || (localTableErrorDetails != null && localTableErrorDetails.length > 0)"
          >
            Unable to load data.
            <b-button variant="link" size="sm" @click="refreshTable">
              <b-icon-arrow-repeat />
              Retry
            </b-button>
            <div>
              <b-button variant="link" class="p-0" size="sm" @click="errorDetailsOpen = !errorDetailsOpen">
                Show
                {{ errorDetailsOpen ? "less" : "more" }}
              </b-button>
              <b-collapse id="error-details" v-model="errorDetailsOpen" class="mt-2">
                <p>{{ localTableErrorMessage }}</p>
                <ul v-if="localTableErrorDetails != null" class="list-inline">
                  <li v-for="detail in localTableErrorDetails" :key="detail">
                    {{ detail }}
                  </li>
                </ul>
              </b-collapse>
            </div>
          </b-alert>
        </template>
        <template #table-busy>
          <div class="text-center text-brand my-2">
            <b-spinner class="align-middle" />
          </div>
        </template>
        <template #[getHeadSlot(clearColumn)]="{ label }">
          <div class="forge-filter-header">
            <label>{{ label }}</label>
            <div id="clear-filters" class="d-flex align-items-center position-relative" style="height: 38px" @click="clearFilters">
              <b-icon-forge-filter class="mr-1" variant="primary" />
              <button class="btn btn-link p-0" type="button">
                <u>Clear</u>
              </button>
            </div>
          </div>
        </template>
        <template v-for="(_, slot) of $scopedSlots" #[slot]="scope">
          <slot :name="slot" v-bind="scope" />
        </template>
      </b-table>
    </div>
    <forge-pagination-footer
      v-if="total != -1"
      :page.sync="page"
      :per-page.sync="perPage"
      :page-sizes="pageSizes"
      :total="total"
      :include-page-size-and-page-count="legacyPaginationFooter"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropType, VueConstructor } from "vue";
import { ForgeTableFieldArray, ForgeTableField } from "../../../helpers/types";
import { getColumnKey } from "../table-column-customiser/column-customiser-helper";
import { BvTableCtxObject, BTable, BAlert, BButton, BCollapse, BIconArrowRepeat, BSpinner } from "bootstrap-vue";
import { BIconForgeFilter } from "../../../icons/icons";
import ForgeTableExporter from "./components/TableExporter.vue";
import ForgeTableColumnCustomiser from "../table-column-customiser/TableColumnCustomiser.vue";
import ForgeFilterHeader from "../filter-header/FilterHeader.vue";
import ForgePaginationFooter from "../pagination/PaginationFooter.vue";
import ForgePaginationHeader from "../pagination/PaginationHeader.vue";
import { parseError } from "../../../helpers/index";

/**
 * @displayName Table
 **/
export const ForgeTable = /*#__PURE__*/ (
  Vue as VueConstructor<
    Vue & {
      $refs: {
        table: { localItems: any[] };
      };
    }
  >
).extend({
  name: "ForgeTable",
  components: {
    ForgeTableExporter,
    ForgeTableColumnCustomiser,
    ForgeFilterHeader,
    ForgePaginationFooter,
    ForgePaginationHeader,
    BTable,
    BAlert,
    BButton,
    BCollapse,
    BIconArrowRepeat,
    BSpinner,
    BIconForgeFilter
  },
  props: {
    total: {
      type: Number,
      default: -1
    },
    stickToPage: {
      type: Boolean,
      default: true
    },
    fields: {
      type: Array as () => ForgeTableFieldArray,
      required: true
    },
    /**
     * Enables the column customiser
     */
    showColumnCustomiser: {
      type: Boolean,
      default: () => false
    },
    showExporter: {
      type: Boolean,
      default: () => false
    },
    showClearButton: {
      type: Boolean,
      default: () => false
    },
    filters: {
      type: Object,
      default: () => {}
    },
    tableError: {
      type: [String, Object],
      default: () => null
    },
    /**
     * Allows you to customise which column you want the clear filters button to appear in
     */
    clearColumn: {
      type: String,
      default: () => "actions"
    },
    exportItemsFunc: {
      type: Function as PropType<() => any[]>,
      default: null
    },
    legacyPaginationFooter: {
      type: Boolean,
      required: false,
      default: false
    },
    autoColumnWidth: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pageSizes: [10, 20, 50, 100],
      perPage: 20,
      page: 1,
      customisedFields: [] as ForgeTableFieldArray,
      localFilters: {} as any,
      localTableErrorMessage: null as string | null,
      localTableErrorDetails: [] as string[] | null,
      errorDetailsOpen: false
    };
  },
  computed: {
    mergedAttrs(): object {
      let defaults = {
        showEmpty: true,
        striped: true,
        hover: true,
        fixed: !this.autoColumnWidth,
        bordered: true,
        noSortReset: true
      } as any;
      if (this.total != -1) {
        defaults = { ...defaults, perPage: this.perPage, currentPage: this.page };
      }
      return {
        ...defaults,
        ...this.$attrs,
        items: typeof this.$attrs.items == "function" ? this.itemsWrapper : this.$attrs.items,
        fields: this.customisedFields
      };
    },
    filtersConfig(): ({ key: string } & ForgeTableField)[] {
      return this.fields
        .map((f) => {
          if (typeof f == "object" && f.autoFilter) {
            if (this.$scopedSlots[this.getHeadSlot(f.key)]) {
              //eslint-disable-next-line
              console.warn(
                `You have declared the field '${f.key}' on table ${this.$attrs.id} as an autofilter column, but have also overridden the table header slot for this field. Please either remove the slot override, or remove autofilter on this column`
              );
            }
            return f;
          }
          return null;
        })
        .filter((f) => f !== null) as ({ key: string } & ForgeTableField)[];
    }
  },
  watch: {
    filters: {
      immediate: true,
      deep: true,
      handler(val) {
        this.localFilters = { ...val };
      }
    },
    tableError: {
      immediate: true,
      deep: true,
      handler(val) {
        this.localTableErrorMessage = val;
      }
    },
    fields: {
      immediate: true,
      deep: true,
      handler(val: ForgeTableFieldArray) {
        this.customisedFields = val;
      }
    }
  },

  methods: {
    updateFilters() {
      this.$emit("update:filters", this.localFilters);
      this.refreshTable();
    },
    refreshTable() {
      this.$root.$emit("bv::refresh::table", this.$attrs.id);
    },
    clearFilters() {
      for (const key in this.localFilters) {
        const element = this.localFilters[key];
        if (typeof element == "string" || typeof element == "number") {
          this.localFilters[key] = null;
        } else if (Array.isArray(element)) {
          this.localFilters[key] = [];
        }
      }
      this.$emit("update:filters", this.localFilters);
      this.$emit("clearFilters");
      this.refreshTable();
    },
    getHeadSlot(name: string) {
      return `head(${name})`;
    },
    getColumnKey,
    async itemsWrapper(ctx: BvTableCtxObject) {
      if (typeof this.$attrs.items == "function") {
        this.localTableErrorMessage = null;
        this.localTableErrorDetails = null;
        // eslint-disable-next-line @typescript-eslint/ban-types
        const getItemsFunc = this.$attrs.items as Function;
        try {
          return await getItemsFunc(ctx);
        } catch (e) {
          const result = parseError(e);
          this.localTableErrorMessage = result.errorMessage;
          this.localTableErrorDetails = result.errorDetails;
          this.$emit("update:tableError", e);
        }
      } else {
        return this.$attrs.items;
      }
    },
    getItemsForExport() {
      if (this.exportItemsFunc == null) {
        return this.$refs.table.localItems;
      } else {
        return this.exportItemsFunc();
      }
    }
  }
});

export default ForgeTable;
</script>

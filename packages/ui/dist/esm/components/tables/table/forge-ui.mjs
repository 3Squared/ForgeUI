import { ForgeTable as s } from "./forge-ui2.mjs";
import { ForgeTable as m } from "./forge-ui2.mjs";
import o from "../../../_virtual/forge-ui.mjs";
var n = function() {
  var e = this, t = e._self._c;
  return e._self._setupProxy, t("div", [t("div", { staticClass: "d-flex align-items-end mb-2", class: { "justify-content-end": e.legacyPaginationFooter, "justify-content-between": !e.legacyPaginationFooter } }, [e.legacyPaginationFooter ? e._e() : t("span", [e.total != -1 ? t("forge-pagination-header", { attrs: { "per-page": e.perPage, "page-sizes": e.pageSizes, total: e.total }, on: { "update:perPage": function(a) {
    e.perPage = a;
  }, "update:per-page": function(a) {
    e.perPage = a;
  } } }) : e._e()], 1), t("span", [e.showExporter ? t("forge-table-exporter", { attrs: { "customised-fields": e.customisedFields, items: e.getItemsForExport, name: e.$attrs.id } }) : e._e(), e.showColumnCustomiser ? t("forge-table-column-customiser", { attrs: { id: e.$attrs.id }, model: { value: e.customisedFields, callback: function(a) {
    e.customisedFields = a;
  }, expression: "customisedFields" } }) : e._e()], 1)]), t("div", { staticClass: "forge-table", class: { "forge-table-sticky-page": e.stickToPage } }, [t("b-table", e._g(e._b({ ref: "table", scopedSlots: e._u([e._l(e.filtersConfig, function(a) {
    return { key: e.getHeadSlot(e.getColumnKey(a)), fn: function({ label: r }) {
      return [t("forge-filter-header", { key: e.getColumnKey(a), attrs: { name: r, type: a.filterType }, on: { input: e.updateFilters }, model: { value: e.localFilters[e.getColumnKey(a)], callback: function(l) {
        e.$set(e.localFilters, e.getColumnKey(a), l);
      }, expression: "localFilters[getColumnKey(field)]" } })];
    } };
  }), { key: "empty", fn: function() {
    return [e.localTableErrorMessage == null && (e.localTableErrorDetails == null || e.localTableErrorDetails.length === 0) ? t("h5", { staticClass: "text-center" }, [e._v(" No records to display ")]) : e._e(), t("b-alert", { staticClass: "text-center m-n2", attrs: { variant: "danger", show: e.localTableErrorMessage != null || e.localTableErrorDetails != null && e.localTableErrorDetails.length > 0 } }, [e._v(" Unable to load data. "), t("b-button", { attrs: { variant: "link", size: "sm" }, on: { click: e.refreshTable } }, [t("b-icon-arrow-repeat"), e._v(" Retry ")], 1), t("div", [t("b-button", { staticClass: "p-0", attrs: { variant: "link", size: "sm" }, on: { click: function(a) {
      e.errorDetailsOpen = !e.errorDetailsOpen;
    } } }, [e._v(" Show " + e._s(e.errorDetailsOpen ? "less" : "more") + " ")]), t("b-collapse", { staticClass: "mt-2", attrs: { id: "error-details" }, model: { value: e.errorDetailsOpen, callback: function(a) {
      e.errorDetailsOpen = a;
    }, expression: "errorDetailsOpen" } }, [t("p", [e._v(e._s(e.localTableErrorMessage))]), e.localTableErrorDetails != null ? t("ul", { staticClass: "list-inline" }, e._l(e.localTableErrorDetails, function(a) {
      return t("li", { key: a }, [e._v(" " + e._s(a) + " ")]);
    }), 0) : e._e()])], 1)], 1)];
  }, proxy: !0 }, { key: "table-busy", fn: function() {
    return [t("div", { staticClass: "text-center text-brand my-2" }, [t("b-spinner", { staticClass: "align-middle" })], 1)];
  }, proxy: !0 }, { key: e.getHeadSlot(e.clearColumn), fn: function({ label: a }) {
    return [t("div", { staticClass: "forge-filter-header" }, [t("label", [e._v(e._s(a))]), t("div", { staticClass: "d-flex align-items-center position-relative", staticStyle: { height: "38px" }, attrs: { id: "clear-filters" }, on: { click: e.clearFilters } }, [t("b-icon-forge-filter", { staticClass: "mr-1", attrs: { variant: "primary" } }), t("button", { staticClass: "btn btn-link p-0", attrs: { type: "button" } }, [t("u", [e._v("Clear")])])], 1)])];
  } }, e._l(e.$scopedSlots, function(a, r) {
    return { key: r, fn: function(l) {
      return [e._t(r, null, null, l)];
    } };
  })], null, !0) }, "b-table", e.mergedAttrs, !1), e.$listeners))], 1), e.total != -1 ? t("forge-pagination-footer", { attrs: { page: e.page, "per-page": e.perPage, "page-sizes": e.pageSizes, total: e.total, "include-page-size-and-page-count": e.legacyPaginationFooter }, on: { "update:page": function(a) {
    e.page = a;
  }, "update:perPage": function(a) {
    e.perPage = a;
  }, "update:per-page": function(a) {
    e.perPage = a;
  } } }) : e._e()], 1);
}, i = [], c = /* @__PURE__ */ o(
  s,
  n,
  i,
  !1,
  null,
  null,
  null,
  null
);
const d = c.exports;
export {
  m as ForgeTable,
  d as default
};

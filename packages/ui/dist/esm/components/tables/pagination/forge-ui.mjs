import { ForgePaginationFooter as n } from "./forge-ui2.mjs";
import { ForgePaginationFooter as d } from "./forge-ui2.mjs";
import o from "../../../_virtual/forge-ui.mjs";
var i = function() {
  var e = this, t = e._self._c;
  return e._self._setupProxy, t("div", { staticClass: "d-flex align-items-baseline", class: { "justify-content-center": !e.includePageSizeAndPageCount, "justify-content-between": e.includePageSizeAndPageCount } }, [e.includePageSizeAndPageCount ? t("span", { staticClass: "input-group w-auto align-items-baseline" }, [t("span", { staticClass: "input-group-prepend mr-2" }, [e._v("Page Size:")]), t("b-form-select", { attrs: { value: e.perPage, options: e.pageSizes, size: "sm" }, on: { input: function(a) {
    return e.$emit("update:perPage", a);
  } } })], 1) : e._e(), t("b-pagination", { attrs: { value: e.page, "total-rows": e.total, "per-page": e.perPage, "aria-controls": "table-example" }, on: { input: function(a) {
    return e.$emit("update:page", a);
  } } }), e.includePageSizeAndPageCount ? t("span", { staticClass: "w-auto", attrs: { "data-cy": "table-page-count" } }, [e._v(e._s(e.total) + " " + e._s(e.pluralize(e.total, "item")) + " in " + e._s(e.pageText))]) : e._e()], 1);
}, r = [], s = /* @__PURE__ */ o(
  n,
  i,
  r,
  !1,
  null,
  null,
  null,
  null
);
const g = s.exports;
export {
  d as ForgePaginationFooter,
  g as default
};

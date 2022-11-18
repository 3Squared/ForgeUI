import { ForgePaginationHeader as s } from "./forge-ui4.mjs";
import { ForgePaginationHeader as m } from "./forge-ui4.mjs";
import r from "../../../_virtual/forge-ui.mjs";
var n = function() {
  var e = this, t = e._self._c;
  return e._self._setupProxy, t("div", { staticClass: "d-flex justify-content-start align-items-baseline" }, [t("span", { staticClass: "input-group w-auto align-items-baseline" }, [t("span", { staticClass: "input-group-prepend mr-2" }, [e._v("Number of results per page")]), t("b-form-select", { attrs: { "data-cy": "table-count-selector", value: e.perPage, options: e.pageSizes, size: "sm" }, on: { input: function(a) {
    return e.$emit("update:perPage", a);
  } } })], 1), t("span", { staticClass: "mx-2" }, [e._v("|")]), t("span", { staticClass: "w-auto", attrs: { "data-cy": "table-page-count" } }, [e._v(e._s(e.total) + " " + e._s(e.pluralize(e.total, "result")) + " across " + e._s(e.pageText))])]);
}, o = [], i = /* @__PURE__ */ r(
  s,
  n,
  o,
  !1,
  null,
  null,
  null,
  null
);
const c = i.exports;
export {
  m as ForgePaginationHeader,
  c as default
};

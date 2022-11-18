import { ForgeForm as n } from "./forge-ui2.mjs";
import { ForgeForm as b } from "./forge-ui2.mjs";
import o from "../../../_virtual/forge-ui.mjs";
var a = function() {
  var r = this, t = r._self._c;
  return r._self._setupProxy, t("b-form", { staticClass: "position-relative shadow-sm border p-4 bg-white", attrs: { novalidate: "" }, on: { submit: function(e) {
    return e.preventDefault(), r.submit.apply(null, arguments);
  } } }, [r.showTitle ? [t("h3", { attrs: { "data-cy": "form-title" } }, [r._v(" " + r._s(r.title) + " ")]), t("hr")] : r._e(), t("b-alert", { attrs: { variant: "danger" }, model: { value: r.error.hasError, callback: function(e) {
    r.$set(r.error, "hasError", e);
  }, expression: "error.hasError" } }, [r._t("error", function() {
    return [r._v(" " + r._s(r.error.message) + " ")];
  }, { error: r.error.message })], 2), r._t("default"), t("div", { staticClass: "d-flex justify-content-between" }, [r._t("cancel", function() {
    return [r.hideCancel ? r._e() : t("b-button", { attrs: { "data-cy": "cancel-btn", type: "reset", variant: "outline-secondary" }, on: { click: function(e) {
      return r.$emit("cancel");
    } } }, [r._v(" Cancel ")])];
  }), r._t("submit", function() {
    return [t("b-button", { attrs: { "data-cy": "submit-btn", type: "submit", variant: "primary" } }, [r._v(" " + r._s(r.submitText) + " ")])];
  }, { submit: r.submit })], 2), r.loading ? t("forge-loader", [r._v(r._s(r.loadingText))]) : r._e()], 2);
}, s = [], i = /* @__PURE__ */ o(
  n,
  a,
  s,
  !1,
  null,
  null,
  null,
  null
);
const m = i.exports;
export {
  b as ForgeForm,
  m as default
};

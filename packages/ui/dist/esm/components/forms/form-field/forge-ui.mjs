import { ForgeFormField as t } from "./forge-ui2.mjs";
import { ForgeFormField as b } from "./forge-ui2.mjs";
import o from "../../../_virtual/forge-ui.mjs";
var s = function() {
  var e = this, r = e._self._c;
  return e._self._setupProxy, r("b-form-group", { class: e.groupClass, attrs: { label: e.type == "checkbox" ? "" : e.label, "label-for": e.fieldName, "label-cols": e.labelCols } }, [r("ValidationProvider", { attrs: { vid: e.fieldName, rules: e.rules, name: e.fieldName }, scopedSlots: e._u([{ key: "default", fn: function(a) {
    return [e._t("default", function() {
      return [e.type == "checkbox" ? r("div", { staticClass: "d-flex" }, [e._v(" " + e._s(e.label) + " "), r("b-form-checkbox", { staticClass: "pb-2 ml-2", model: { value: e.currentValue, callback: function(l) {
        e.currentValue = l;
      }, expression: "currentValue" } })], 1) : e.type == "textarea" ? r("b-form-textarea", { attrs: { state: e.getValidationState(a) }, model: { value: e.currentValue, callback: function(l) {
        e.currentValue = l;
      }, expression: "currentValue" } }) : r("b-form-input", { attrs: { id: e.fieldName, state: e.getValidationState(a), type: e.type, disabled: e.disabled, placeholder: e.placeholder, trim: "" }, model: { value: e.currentValue, callback: function(l) {
        e.currentValue = l;
      }, expression: "currentValue" } })];
    }, { state: e.getValidationState(a) }), r("b-form-invalid-feedback", [e._v(e._s(a.errors[0]))])];
  } }], null, !0) })], 1);
}, u = [], n = /* @__PURE__ */ o(
  t,
  s,
  u,
  !1,
  null,
  null,
  null,
  null
);
const f = n.exports;
export {
  b as ForgeFormField,
  f as default
};

import { ForgeTableColumnCustomiser as l } from "./forge-ui3.mjs";
import { ForgeTableColumnCustomiser as C } from "./forge-ui3.mjs";
import a from "../../../_virtual/forge-ui.mjs";
var n = function() {
  var e = this, t = e._self._c;
  return e._self._setupProxy, t("b-dropdown", { ref: "dropdown", staticClass: "forge-table-customise-columns-button", attrs: { variant: e.hasChanges ? "primary" : "outline-primary" }, on: { hide: e.revert }, scopedSlots: e._u([{ key: "button-content", fn: function() {
    return [t("span", [e._v(" Customise Columns "), e.hasChanges ? t("span", [e._v(" (" + e._s(e.changesCount.selectedCount) + "/" + e._s(e.changesCount.availableCount) + ") ")]) : e._e()]), t("b-icon-forge-columns", { staticClass: "ml-2 mr-2" })];
  }, proxy: !0 }]) }, [t("b-form-checkbox-group", { staticClass: "mt-3", attrs: { id: "selectedColumns-group", name: "selectedColumns" }, model: { value: e.selectedFields, callback: function(s) {
    e.selectedFields = s;
  }, expression: "selectedFields" } }, [t("b-list-group", [t("draggable", { attrs: { group: "columns", handle: ".handle", "ghost-class": "ghost" }, model: { value: e.availableFields, callback: function(s) {
    e.availableFields = s;
  }, expression: "availableFields" } }, e._l(e.availableFields.filter((s) => e.canFieldBeHidden(s)), function(s) {
    return t("b-list-group-item", { key: e.getColumnKey(s), staticClass: "p-2 d-flex align-items-center" }, [t("b-button", { staticClass: "p-0 mr-2 text-secondary", attrs: { variant: "link" } }, [t("b-icon-justify", { staticClass: "handle" })], 1), t("b-form-checkbox", { attrs: { disabled: e.selectedFields.length == 1 && e.selectedFields[0] == e.getColumnKey(s), value: e.getColumnKey(s) } }, [e._v(" " + e._s(e.getLabel(s)) + " ")])], 1);
  }), 1)], 1)], 1), t("div", { staticClass: "mt-3 d-flex justify-content-between" }, [t("b-button", { attrs: { variant: "outline-secondary" }, on: { click: e.reset } }, [e._v(" Reset ")]), t("b-button", { attrs: { variant: "primary" }, on: { click: e.confirm } }, [e._v(" Confirm ")])], 1)], 1);
}, o = [], r = /* @__PURE__ */ a(
  l,
  n,
  o,
  !1,
  null,
  null,
  null,
  null
);
const m = r.exports;
export {
  C as ForgeTableColumnCustomiser,
  m as default
};

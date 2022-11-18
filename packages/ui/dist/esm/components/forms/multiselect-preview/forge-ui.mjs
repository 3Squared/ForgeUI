import { ForgeMultiSelectPreview as s } from "./forge-ui2.mjs";
import { ForgeMultiSelectPreview as f } from "./forge-ui2.mjs";
import n from "../../../_virtual/forge-ui.mjs";
var i = function() {
  var e = this, t = e._self._c;
  return e._self._setupProxy, t("div", { class: e.orientation === "horizontal-reversed" ? "row flex-row-reverse" : "row" }, [t("div", { class: e.orientation === "vertical" ? "col-12 mb-1" : "col" }, [t("forge-multi-select", { attrs: { multiple: !0, limitText: e.limitText, value: e.selectedItems, options: e.items }, on: { input: e.update }, scopedSlots: e._u([{ key: "tag", fn: function() {
    return [e._v(e._s(""))];
  }, proxy: !0 }, { key: "selection", fn: function() {
    return [e.selectedItems.length > 0 ? t("span", { staticClass: "pl-1" }, [e._v(e._s(e.selectedItems.length) + " items selected")]) : e._e()];
  }, proxy: !0 }, e._l(Object.keys(e.$scopedSlots), function(l) {
    return { key: l, fn: function(r) {
      return [e._t(l, null, null, r)];
    } };
  })], null, !0) }, [e._l(e.$slots, function(l, r) {
    return e._t(r, null, { slot: r });
  })], 2), e._t("after-multi-select")], 2), t("div", { class: e.orientation === "vertical" ? "col-12" : "col" }, [t("div", { staticClass: "overflow-auto", style: { height: e.height } }, [t("div", { staticClass: "border alternating-item-list" }, [e.title ? t("div", { staticClass: "bg-selected-info p-2 border-top border-bottom shadow-sm bg-brand-dark" }, [e.selectedItems.length === 0 ? t("span", [e._v("No ")]) : e._e(), t("span", [e._v(e._s(e.title))])]) : e._e(), e._l(e.selectedItems, function(l) {
    return t("div", { key: l.id, staticClass: "p-2 item d-flex justify-content-between align-items-center" }, [e._t("list-item", function() {
      return [t("span", { staticClass: "d-inline-block" }, [e._v(e._s(l.shortLabel ? l.shortLabel : l.label))])];
    }, { item: l }), e.canRemoveItemFromPreview == !0 ? t("b-button", { staticClass: "m-0 p-0 d-flex align-items-center", attrs: { variant: "link" }, on: { click: function(r) {
      return e.removeSelectedItem(l.id);
    } } }, [t("b-icon-x", { attrs: { variant: "Secondary" } })], 1) : e._e()], 2);
  })], 2)])])]);
}, o = [], a = /* @__PURE__ */ n(
  s,
  i,
  o,
  !1,
  null,
  null,
  null,
  null
);
const d = a.exports;
export {
  f as ForgeMultiSelectPreview,
  d as default
};

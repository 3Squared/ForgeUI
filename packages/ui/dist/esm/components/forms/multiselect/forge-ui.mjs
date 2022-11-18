import { ForgeMultiSelect as n } from "./forge-ui2.mjs";
import { ForgeMultiSelect as d } from "./forge-ui2.mjs";
import s from "../../../_virtual/forge-ui.mjs";
var r = function() {
  var e = this, l = e._self._c;
  return e._self._setupProxy, l("multiselect", e._g(e._b({ on: { remove: e.toggleSelectAll, input: e.checkAllSelected }, scopedSlots: e._u([{ key: "caret", fn: function({ toggle: o }) {
    return [e.shouldShowClearSelection ? l("i", { staticClass: "multiselect__clear-icon", on: { mousedown: function(t) {
      return t.preventDefault(), t.stopPropagation(), e.clearSelected();
    } } }) : e._e(), l("div", { staticClass: "multiselect__select", on: { mousedown: function(t) {
      return t.preventDefault(), t.stopPropagation(), o.apply(null, arguments);
    } } })];
  } }, e.mergedAttrs.multiple && e.showSelectAll && !e.mergedAttrs.async ? { key: "beforeList", fn: function() {
    return [l("li", { staticClass: "multiselect__element", on: { click: e.selectAll, mouseover: e.onMouseOver, mouseleave: e.onMouseLeave } }, [l("span", { class: e.optionHighlight }, [l("input", { staticClass: "multiselect__option--checkbox", attrs: { name: "selected", type: "checkbox" }, domProps: { checked: e.isAllSelected } }), l("span", [e._v(" Toggle all")])])])];
  }, proxy: !0 } : null, e.mergedAttrs.multiple ? { key: "option", fn: function(o) {
    return [l("span", [l("input", { staticClass: "multiselect__option--checkbox", attrs: { name: "selected", type: "checkbox" }, domProps: { checked: e.$attrs.value.indexOf(e.selectValue ? o.option[e.selectValue] : o.option) !== -1 } }), e._v(" " + e._s(o.option[e.mergedAttrs.label]) + " ")])];
  } } : null, e._l(Object.keys(e.$scopedSlots), function(o) {
    return { key: o, fn: function(t) {
      return [e._t(o, null, null, t)];
    } };
  })], null, !0) }, "multiselect", e.mergedAttrs, !1), e.mergedListeners), [e._l(e.$slots, function(o, t) {
    return e._t(t, null, { slot: t });
  })], 2);
}, c = [], u = /* @__PURE__ */ s(
  n,
  r,
  c,
  !1,
  null,
  null,
  null,
  null
);
const m = u.exports;
export {
  d as ForgeMultiSelect,
  m as default
};

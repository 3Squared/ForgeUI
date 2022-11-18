import { ForgeFilterHeader as r } from "./forge-ui2.mjs";
import { ForgeFilterHeader as m } from "./forge-ui2.mjs";
import l from "../../../_virtual/forge-ui.mjs";
var n = function() {
  var e = this, t = e._self._c;
  return e._self._setupProxy, t("div", { staticClass: "forge-filter-header" }, [t("label", { staticClass: "pl-2", class: { "forge-filter-header-hidden": e.hideLabel } }, [e._v(e._s(e.name) + " ")]), t("div", { staticClass: "d-flex justify-content-between align-items-center position-relative", on: { click: function(a) {
    a.stopPropagation(), a.preventDefault();
  } } }, [e.type == "number" ? t("b-form-input", e._b({ class: { "input-no-spinner": e.hideSpinnerWheel }, attrs: { value: e.value, type: "number", debounce: e.debounceTimer, placeholder: e.placeHolderText }, on: { update: e.update } }, "b-form-input", e.$attrs, !1)) : e.type == "string" ? t("b-form-input", e._b({ attrs: { value: e.value, type: "text", debounce: e.debounceTimer, placeholder: e.placeHolderText }, on: { update: e.update } }, "b-form-input", e.$attrs, !1)) : e.type == "select" ? t("forge-multiselect", e._b({ staticStyle: { width: "100%" }, attrs: { value: e.value, multiple: !1, options: e.options, variant: e.variant }, on: { input: e.update } }, "forge-multiselect", e.$attrs, !1)) : e.type == "multiSelect" ? t("forge-multiselect", e._b({ staticStyle: { width: "100%" }, attrs: { multiple: !0, value: e.multiSelectValue, searchable: !0, options: e.options, "select-label": "Add", "deselect-label": "Remove", variant: e.variant }, on: { input: e.update } }, "forge-multiselect", e.$attrs, !1)) : e.type == "date" ? t("forge-date-picker", e._g(e._b({ attrs: { value: e.value, config: {
    altInput: !0,
    dateFormat: "Y-m-d",
    altFormat: "d/m/Y",
    enableTime: "false",
    ...e.config
  }, placeholder: e.placeHolderText, "hide-calendar-icon": !!(e.value && e.value.length > 0), variant: e.variant }, on: { input: e.update, reset: e.reset } }, "forge-date-picker", e.$attrs, !1), e.$listeners)) : e.type == "dateRange" ? t("forge-date-picker", e._g(e._b({ attrs: { value: e.value, config: {
    mode: "range",
    altInput: !0,
    dateFormat: "Y-m-d",
    altFormat: "d/m/Y",
    enableTime: "false",
    ...e.config
  }, "hide-calendar-icon": !!(e.value && e.value.length > 0), placeholder: e.placeHolderText, variant: e.variant }, on: { "on-change": e.updateDateRange, reset: e.reset } }, "forge-date-picker", e.$attrs, !1), e.$listeners)) : e.type == "time" ? t("forge-date-picker", e._g(e._b({ attrs: { value: e.value, config: {
    noCalendar: !0,
    enableTime: !0,
    time_24hr: !0,
    dateFormat: "H:i",
    ...e.config
  }, placeholder: e.placeHolderText, "hide-calendar-icon": !!(e.value && e.value.length > 0), variant: e.variant }, on: { input: e.update, reset: e.reset } }, "forge-date-picker", e.$attrs, !1), e.$listeners)) : e._e(), e.renderClearButton ? t("b-icon-x-circle", { staticClass: "search-clear-icon", attrs: { tabindex: "0" }, on: { keypress: function(a) {
    return !a.type.indexOf("key") && e._k(a.keyCode, "enter", 13, a.key, "Enter") ? null : e.reset.apply(null, arguments);
  }, click: e.reset } }) : e._e()], 1)]);
}, i = [], o = /* @__PURE__ */ l(
  r,
  n,
  i,
  !1,
  null,
  null,
  null,
  null
);
const d = o.exports;
export {
  m as ForgeFilterHeader,
  d as default
};

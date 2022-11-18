import { ForgeDatePicker as r } from "./forge-ui2.mjs";
import { ForgeDatePicker as _ } from "./forge-ui2.mjs";
import a from "../../../_virtual/forge-ui.mjs";
var s = function() {
  var t = this, e = t._self._c;
  return t._self._setupProxy, e("div", { staticClass: "d-flex align-items-center forge-date-picker", class: { "is-invalid": t.state === !1 } }, [e("div", { staticClass: "order-0 flex-shrink-0" }, [t._t("before")], 2), e("input", t._b({ staticClass: "form-control flatpickr-input order-1", attrs: { type: "text", "data-input": "" }, on: { input: t.onInput } }, "input", t.$attrs, !1)), t.hideCalendarIcon ? t._e() : e("div", { staticClass: "order-2" }, [e("b-icon-calendar3", { staticClass: "forge-date-picker-icon ml-2", attrs: { variant: t.variant, "data-toggle": "" } })], 1), e("div", { staticClass: "order-3 flex-shrink-0" }, [t._t("after")], 2)]);
}, i = [], n = /* @__PURE__ */ a(
  r,
  s,
  i,
  !1,
  null,
  null,
  null,
  null
);
const d = n.exports;
export {
  _ as ForgeDatePicker,
  d as default
};

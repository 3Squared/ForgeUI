import { ForgeModal as a } from "./forge-ui3.mjs";
import { ForgeModal as g } from "./forge-ui3.mjs";
import s from "../../../_virtual/forge-ui.mjs";
var u = function() {
  var r = this, e = r._self._c;
  return r._self._setupProxy, e("b-modal", r._g(r._b({ ref: "modal", staticClass: "position-relative", on: { ok: r.success, hidden: function(t) {
    r.reset(t), r.preventBackgroundScroll(!1);
  }, show: function(t) {
    return r.preventBackgroundScroll(!0);
  } }, scopedSlots: r._u([r._l(r.$scopedSlots, function(t, o) {
    return { key: o, fn: function(l) {
      return [e("div", { key: o, staticClass: "w-100" }, [o === "default" ? [e("b-alert", { attrs: { variant: "danger" }, model: { value: r.error.hasError, callback: function(n) {
        r.$set(r.error, "hasError", n);
      }, expression: "error.hasError" } }, [e("p", [r._v(r._s(r.error.header))]), e("ul", r._l(r.error.message, function(n) {
        return e("li", { key: n }, [r._v(" " + r._s(n) + " ")]);
      }), 0)])] : r._e(), r._t(o, null, null, l), o === "default" ? [r.loading ? r._t("loader", function() {
        return [e("forge-loader")];
      }) : r._e()] : r._e()], 2)];
    } };
  })], null, !0) }, "b-modal", r.mergedAttrs, !1), r.$listeners));
}, _ = [], c = /* @__PURE__ */ s(
  a,
  u,
  _,
  !1,
  null,
  null,
  null,
  null
);
const m = c.exports;
export {
  g as ForgeModal,
  m as default
};

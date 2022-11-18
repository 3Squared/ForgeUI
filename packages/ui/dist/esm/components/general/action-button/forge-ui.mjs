import { ForgeActionButton as o } from "./forge-ui2.mjs";
import { ForgeActionButton as f } from "./forge-ui2.mjs";
import r from "../../../_virtual/forge-ui.mjs";
var e = function() {
  var t = this, n = t._self._c;
  return t._self._setupProxy, n("b-button", { ref: "button", style: { width: t.width }, attrs: { variant: t.variant, disabled: t.loading || t.$attrs.disabled }, on: { click: t.performAction } }, [t.loading ? n("b-spinner", { attrs: { small: "" } }) : n("span", [t._t("default")], 2)], 1);
}, a = [], l = /* @__PURE__ */ r(
  o,
  e,
  a,
  !1,
  null,
  null,
  null,
  null
);
const u = l.exports;
export {
  f as ForgeActionButton,
  u as default
};

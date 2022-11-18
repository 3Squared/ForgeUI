import { ForgeStepper as a } from "./forge-ui2.mjs";
import { ForgeStepper as S } from "./forge-ui2.mjs";
import i from "../../../_virtual/forge-ui.mjs";
var n = function() {
  var t = this, e = t._self._c;
  return t._self._setupProxy, e("div", { staticClass: "w-100", class: [`forge-stepper-${t.variant}`] }, [t.showSteps ? e("div", [e("div", { staticClass: "d-flex align-items-center bg-white" }, [e("b-button", { staticClass: "rounded-circle ml-2 px-2", attrs: { disabled: t.isBackButtonDisabled }, on: { click: t.previousStep } }, [e("b-icon-chevron-left")], 1), e("div", { staticClass: "stepper" }, [e("hr", { staticClass: "divider" }), t._l(t.computedSteps, function(r, s) {
    return e("div", { key: r.key, staticClass: "step-block", class: { "step-active": s === t.currentStepLocal, "step-inactive": t.computedSteps[s].isDisabled, link: !t.computedSteps[s].isDisabled }, on: { click: function(p) {
      return t.changeStep(s);
    } } }, [e("div", { staticClass: "step" }, [e("div", { staticClass: "step-circle" }, [t._v(t._s(s + 1))])]), e("span", { staticClass: "h5" }, [t._v(t._s(r.text))])]);
  })], 2)], 1), e("hr")]) : t._e(), t._l(t.computedSteps, function(r, s) {
    return e("div", { key: r.key, staticClass: "w-100" }, [s === t.currentStepLocal ? t._t(r.key, function() {
      return [e("b-alert", { attrs: { show: "", variant: "info" } }, [t._v(" Please add Slot Content for the key " + t._s(r.key) + " "), e("b-button", { attrs: { variant: "outline-primary" }, on: { click: t.nextStep } }, [t._v("Next")])], 1)];
    }, { nextStep: t.nextStep, previousStep: t.previousStep }) : t._e()], 2);
  })], 2);
}, o = [], c = /* @__PURE__ */ i(
  a,
  n,
  o,
  !1,
  null,
  null,
  null,
  null
);
const _ = c.exports;
export {
  S as ForgeStepper,
  _ as default
};

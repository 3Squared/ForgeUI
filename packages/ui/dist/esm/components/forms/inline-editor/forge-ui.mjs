import { ForgeInlineEditor as i } from "./forge-ui2.mjs";
import { ForgeInlineEditor as _ } from "./forge-ui2.mjs";
import l from "../../../_virtual/forge-ui.mjs";
var r = function() {
  var e = this, n = e._self._c;
  return e._self._setupProxy, n("div", { staticClass: "forge-inline-editor" }, [e.readonly ? n("div", [e._t("default", function() {
    return [e._v(" " + e._s(e.value) + " ")];
  })], 2) : n("div", [e.editing ? n("div", [n("div", { staticClass: "d-flex justify-content-between align-items-center editor position-relative", class: { "is-invalid": !e.valid } }, [e._t("editor", function() {
    return [n("b-form-input", { ref: "input", attrs: { state: e.validationState }, on: { keypress: [function(t) {
      return !t.type.indexOf("key") && e._k(t.keyCode, "enter", 13, t.key, "Enter") ? null : e.editFinished.apply(null, arguments);
    }, function(t) {
      return !t.type.indexOf("key") && e._k(t.keyCode, "esc", 27, t.key, ["Esc", "Escape"]) ? null : e.cancel.apply(null, arguments);
    }], blur: e.editFinished, input: e.validate }, model: { value: e.localValue, callback: function(t) {
      e.localValue = typeof t == "string" ? t.trim() : t;
    }, expression: "localValue" } })];
  }, { editFinished: e.editFinished, val: e.localValue, update: e.update, cancel: e.cancel, state: e.validationState }), n("b-icon-x-circle", { staticClass: "clear-icon", on: { click: e.reset } })], 2), n("b-form-invalid-feedback", [e._v(e._s(e.validationErrors[0]))])], 1) : n("div", { on: { click: e.beginEdit, focus: e.beginEdit } }, [e.value ? n("span", { staticClass: "value" }, [e._t("default", function() {
    return [e._v(" " + e._s(e.value) + " ")];
  }), n("b-button", { staticClass: "forge-inline-editor--edit-icon", attrs: { variant: "link" }, on: { keypress: function(t) {
    return !t.type.indexOf("key") && e._k(t.keyCode, "enter", 13, t.key, "Enter") ? null : e.beginEdit.apply(null, arguments);
  } } }, [n("b-icon-pencil")], 1)], 2) : n("span", { staticClass: "text-muted" }, [e._v(" Click to enter "), n("b-button", { staticClass: "forge-inline-editor--edit-icon", attrs: { variant: "link" }, on: { keypress: function(t) {
    return !t.type.indexOf("key") && e._k(t.keyCode, "enter", 13, t.key, "Enter") ? null : e.beginEdit.apply(null, arguments);
  } } }, [n("b-icon-pencil")], 1)], 1)])])]);
}, a = [], o = /* @__PURE__ */ l(
  i,
  r,
  a,
  !1,
  null,
  null,
  null,
  null
);
const d = o.exports;
export {
  _ as ForgeInlineEditor,
  d as default
};

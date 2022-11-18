import { nameof as n } from "ts-simple-nameof";
function c(e, t) {
  return t == null ? !0 : e ? e.toLowerCase().includes(t.toLowerCase()) : !1;
}
function f(e) {
  return typeof e == "string" ? e : n(e);
}
const o = /_/g, a = /([a-z])([A-Z])/g, l = /(\s|^)(\w)/g, g = (e) => e.replace(o, " ").replace(a, (t, r, s) => r + " " + s).replace(l, (t, r, s) => r + s.toUpperCase());
function p(e, t) {
  if (e === t)
    return !0;
  if (e == null || t == null || e.length !== t.length)
    return !1;
  for (let r = 0; r < e.length; ++r)
    if (e[r] !== t[r])
      return !1;
  return !0;
}
function m(e) {
  const t = {
    errorMessage: "",
    errorDetails: []
  };
  if (e.exception && (t.errorMessage = e.exception), e.message && (Array.isArray(e.message) ? t.errorDetails = e.message : t.errorMessage = e.message), e.response) {
    const r = JSON.parse(e.response);
    r.errors && (t.errorDetails = Object.values(r.errors).flat()), r.message && (t.errorDetails = r.message);
  }
  return t.errorMessage === "" && t.errorDetails.length === 0 && (t.errorMessage = e), t;
}
function C(e, t) {
  return e.map((r) => ({ value: r, text: t ? t(r) : `${r}` }));
}
function R(e, t) {
  return e.map((r) => ({ id: r, label: t ? t(r) : `${r}` }));
}
const i = (e) => {
  var t, r;
  return ((r = (t = e[0]) == null ? void 0 : t.toUpperCase()) != null ? r : "") + e.substring(1);
}, _ = (e) => {
  const t = e.split("-");
  return t.length > 1 ? t[0] + t.splice(1).map(i).join("") : e;
};
function y(e) {
  return getComputedStyle(document.body).getPropertyValue(`--${e}`).trim();
}
export {
  p as arraysEqual,
  i as capitalize,
  R as enumToMultiSelectList,
  C as enumToSelectList,
  y as getColour,
  _ as kebabToCamel,
  f as nameof,
  m as parseError,
  g as startCase,
  c as stringFilterMatch
};

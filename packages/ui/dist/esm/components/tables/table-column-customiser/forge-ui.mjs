function e(o) {
  return typeof o == "string" ? o : o.key;
}
function s(o, n) {
  window.localStorage.setItem(o, JSON.stringify(n.map((t) => e(t))));
}
function u(o) {
  const n = window.localStorage.getItem(o);
  return n == null ? null : JSON.parse(n);
}
export {
  e as getColumnKey,
  u as loadCustomisedColumns,
  s as saveCustomisedColumns
};

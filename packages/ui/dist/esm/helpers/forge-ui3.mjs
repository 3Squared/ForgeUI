var l = Object.defineProperty;
var n = (r, t, s) => t in r ? l(r, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[t] = s;
var u = (r, t, s) => (n(r, typeof t != "symbol" ? t + "" : t, s), s);
import { nameof as o } from "./forge-ui.mjs";
class a {
  constructor() {
    u(this, "columns", []);
  }
  addColumn(t, s) {
    return this.addMiscColumn(o(t), s);
  }
  addMiscColumn(t, s) {
    const i = { key: t, sortable: !0 }, e = new h(i);
    return s && s(e), this.columns.push(e), this;
  }
  disableSorting() {
    return this.columns.forEach((t) => {
      t.disableSorting();
    }), this;
  }
  build() {
    return this.columns.map((t) => t.build());
  }
}
class h {
  constructor(t) {
    this.column = t;
  }
  addFormatter(t, s) {
    return this.column.formatter = t, s && (this.column.sortByFormatted = s), this;
  }
  enableAutoFilter(t = "string") {
    return this.column.autoFilter = !0, this.column.filterType = t, this;
  }
  disableSorting() {
    return this.column.sortable = !1, this;
  }
  setLabel(t) {
    return this.column.label = t, this;
  }
  setThStyle(t) {
    return this.column.thStyle = t, this;
  }
  setThClass(t) {
    return this.column.thClass = t, this;
  }
  setTdClass(t) {
    return this.column.tdClass = t, this;
  }
  setTdAttr(t) {
    return this.column.tdAttr = t, this;
  }
  setRequired() {
    return this.column.required = !0, this;
  }
  build() {
    return this.column;
  }
}
export {
  a as ForgeColumnBuilder
};

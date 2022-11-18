var n = Object.defineProperty;
var r = (s, t, i) => t in s ? n(s, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : s[t] = i;
var o = (s, t, i) => (r(s, typeof t != "symbol" ? t + "" : t, i), i);
class p {
  constructor(t, i, e) {
    o(this, "options", {
      centered: !0
    });
    this.options.id = t, this.options.title = i, this.options.onConfirm = e;
  }
  setLegacyMode() {
    return this.options.static = !0, this;
  }
  setOkOnly(t, i) {
    return this.options.okOnly = !0, this.options.okTitle = t, this.options.okVariant = i, this;
  }
  setSize(t) {
    return this.options.size = t, this;
  }
  setExtraProps(t) {
    return this.options = { ...this.options, ...t }, this;
  }
  build() {
    return this.options;
  }
}
export {
  p as ForgeModalBuilder
};

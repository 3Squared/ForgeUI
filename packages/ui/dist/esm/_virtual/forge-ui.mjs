function v(r, a, d, u, i, t, f, h) {
  var e = typeof r == "function" ? r.options : r;
  a && (e.render = a, e.staticRenderFns = d, e._compiled = !0), u && (e.functional = !0), t && (e._scopeId = "data-v-" + t);
  var o;
  if (f ? (o = function(n) {
    n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), i && i.call(this, n), n && n._registeredComponents && n._registeredComponents.add(f);
  }, e._ssrRegister = o) : i && (o = h ? function() {
    i.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : i), o)
    if (e.functional) {
      e._injectStyles = o;
      var l = e.render;
      e.render = function(p, _) {
        return o.call(_), l(p, _);
      };
    } else {
      var s = e.beforeCreate;
      e.beforeCreate = s ? [].concat(s, o) : [o];
    }
  return {
    exports: r,
    options: e
  };
}
export {
  v as default
};

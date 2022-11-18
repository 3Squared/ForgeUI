import h, { getCurrentInstance as w } from "vue";
import { ModalPlugin as M, BModal as $, BAlert as g } from "bootstrap-vue";
function y(o, n, t) {
  const r = n.map((s) => typeof s == "function" ? s(o) : s), e = o("div", { slot: "default" }, r);
  return t ? o(
    g,
    {
      props: {
        variant: t,
        show: !0
      },
      class: `font-weight-bold border-${t}`
    },
    [e]
  ) : e;
}
function f(o, n, {
  body: t,
  options: r,
  bAlertVariant: e,
  modalId: s,
  appendTo: c
}) {
  const d = "modalInstance", p = {
    static: !0,
    lazy: !0,
    okOnly: n,
    ...r,
    id: s
  }, l = new h({
    render: (u) => u($, { attrs: p, ref: d }, [y(u, t, e)])
  }), a = c ? document.querySelector(c) : o.$el;
  if (!a)
    throw new Error("appendTo element was not found");
  const i = document.createElement("div");
  return a.appendChild(i), l.$mount(i), { component: l, modal: l.$refs[d] };
}
class P {
  constructor(n) {
    this.vm = n;
  }
  ok(n) {
    return new Promise((t) => {
      const { component: r, modal: e } = f(this.vm, !0, n);
      e.$once("hide", () => t(!0)), e.$once("hidden", () => r.$destroy()), e.show();
    });
  }
  confirm(n) {
    return new Promise((t) => {
      const { component: r, modal: e } = f(this.vm, !1, n);
      e.$once("hide", ({ trigger: s }) => t(s === "ok" ? !0 : s === "cancel" ? !1 : null)), e.$once("hidden", () => r.$destroy()), e.show();
    });
  }
}
const v = "$forgeModal", m = "_forgeModalHelper", O = {
  install(o) {
    o.use(M), o.mixin({
      beforeCreate() {
        Object.defineProperty(this, m, {
          value: new P(this),
          writable: !1,
          configurable: !1,
          enumerable: !1
        });
      }
    }), Object.defineProperty(o.prototype, v, {
      get() {
        return this[m];
      }
    });
  }
};
function k() {
  var r;
  const o = (r = w()) == null ? void 0 : r.proxy;
  function n(e) {
    if (o)
      return o.$forgeModal.ok(e);
    console.warn("method can only be used inside setup() or functional components");
  }
  function t(e) {
    if (o)
      return o.$forgeModal.confirm(e);
    console.warn("method can only be used inside setup() or functional components");
  }
  return { forgeOkModal: n, forgeConfirmModal: t };
}
export {
  O as default,
  k as useForgeModal
};

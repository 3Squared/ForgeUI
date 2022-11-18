import { getCurrentInstance as u } from "vue";
import { ToastPlugin as p, BIconstack as r, BIconCheck as a, BIconXCircleFill as i, BIconCircleFill as l } from "bootstrap-vue";
const f = {
  install(t) {
    t.use(p), t.mixin({
      components: { BIconstack: r, BIconCheck: a, BIconXCircleFill: i, BIconCircleFill: l },
      methods: {
        $forgeToast(o, s, n) {
          const e = {
            title: [d(this.$createElement, o, s)],
            solid: !0,
            bodyClass: "d-none"
          };
          this.$bvToast.toast([], {
            ...e,
            ...n
          });
        }
      }
    });
  }
};
function I() {
  var s;
  const t = (s = u()) == null ? void 0 : s.proxy;
  function o(n, c, e) {
    t && t.$forgeToast(n, c, e), console.warn("method can only be used inside setup() or functional components");
  }
  return { forgeToast: o };
}
const k = f;
function d(t, o, s) {
  return t(
    "div",
    { class: "d-flex flex-grow-1 align-items-center p-2" },
    [
      o == "success" ? m(t) : g(t),
      t("span", s)
    ]
  );
}
function m(t) {
  return t(
    r,
    { class: "mr-2", props: { fontScale: 2.5 } },
    [
      t(l, { props: { variant: "success", stacked: !0 } }),
      t(a, { props: { variant: "white", stacked: !0, scale: 0.75, shiftV: -0.25 } })
    ]
  );
}
function g(t) {
  return t(
    r,
    { class: "mr-2", props: { fontScale: 2.5 } },
    [
      t(i, { props: { variant: "danger", stacked: !0 } })
    ]
  );
}
export {
  k as default,
  I as useForgeToasts
};

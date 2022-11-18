import { defineComponent as n, computed as u } from "vue";
const m = /* @__PURE__ */ n({
  __name: "RemainingCharacters",
  props: {
    maxCount: {
      type: Number,
      required: !0
    },
    currentCount: {
      type: Number,
      required: !0
    }
  },
  setup(r) {
    const e = r, t = u(() => e.maxCount - e.currentCount);
    return { __sfc: !0, props: e, remainingCount: t };
  }
});
export {
  m as default
};

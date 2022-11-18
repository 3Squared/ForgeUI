import i from "vue";
const g = /* @__PURE__ */ i.extend({
  name: "ForgeStatWidget",
  props: {
    size: {
      type: String,
      default: "md",
      validator(t) {
        return ["sm", "md", "lg"].indexOf(t) !== -1;
      }
    },
    variant: {
      type: String,
      default: () => {
        var t, e, r, a;
        return (a = (r = (e = (t = i.prototype) == null ? void 0 : t.ForgeSettings) == null ? void 0 : e.StatWidget) == null ? void 0 : r.variant) != null ? a : "primary";
      }
    }
  },
  computed: {
    classes() {
      return `widget--${this.size} bg-${this.variant}`;
    }
  }
});
export {
  g as ForgeStatWidget,
  g as default
};

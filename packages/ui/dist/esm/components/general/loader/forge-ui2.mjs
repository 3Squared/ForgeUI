import { BSpinner as e } from "bootstrap-vue";
import o from "vue";
const n = /* @__PURE__ */ o.extend({
  name: "ForgeLoader",
  props: {
    label: {
      type: String,
      default: "Loading..."
    }
  },
  components: { BSpinner: e }
});
export {
  n as ForgeLoader,
  n as default
};

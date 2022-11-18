import t from "vue";
import { BButton as r, BForm as o, BAlert as a } from "bootstrap-vue";
import s from "../../general/loader/forge-ui.mjs";
const n = /* @__PURE__ */ t.extend({
  name: "ForgeForm",
  components: { BButton: r, BForm: o, BAlert: a, ForgeLoader: s },
  props: {
    onSubmit: {
      type: Function,
      required: !0
    },
    showTitle: {
      type: Boolean,
      default: !0
    },
    title: {
      type: String,
      default: "Forge Form Title"
    },
    hideCancel: {
      type: Boolean,
      default: !1
    },
    submitText: {
      type: String,
      default: "Submit"
    },
    loadingText: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      loading: !1,
      error: {
        hasError: !1,
        message: ""
      }
    };
  },
  methods: {
    async submit() {
      this.loading = !0, this.error.hasError = !1;
      try {
        await this.onSubmit();
      } catch (e) {
        this.error.hasError = !0, e.message && (this.error.message = e.message);
      }
      this.loading = !1;
    }
  }
});
export {
  n as ForgeForm,
  n as default
};

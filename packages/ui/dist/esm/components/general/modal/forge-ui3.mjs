import { defineComponent as s } from "vue";
import { BModal as a, BAlert as i } from "bootstrap-vue";
import n from "../loader/forge-ui.mjs";
import { parseError as l } from "../../../helpers/forge-ui.mjs";
import t from "lodash/cloneDeep";
const p = /* @__PURE__ */ s({
  name: "ForgeModal",
  components: { BModal: a, BAlert: i, ForgeLoader: n },
  inheritAttrs: !1,
  props: {
    onConfirm: {
      type: Function,
      default: null
    },
    legacy: {
      type: Boolean,
      default: !1
    }
  },
  data() {
    return {
      loading: !1,
      error: {},
      emptyError: {
        hasError: !1,
        header: "",
        message: []
      }
    };
  },
  created() {
    this.error = t(this.emptyError);
  },
  methods: {
    async success(r) {
      if (this.onConfirm) {
        r.preventDefault(), this.loading = !0, this.error.hasError = !1;
        try {
          const e = await this.onConfirm();
          (e || e == null) && this.$refs.modal.hide();
        } catch (e) {
          this.error.hasError = !0;
          const o = l(e);
          this.error.header = o.errorMessage, this.error.message = o.errorDetails;
        }
        this.loading = !1;
      }
    },
    async reset(r) {
      this.error = this.error = t(this.emptyError), this.loading = !1, this.$emit("hidden", r);
    },
    preventBackgroundScroll(r) {
      this.legacy && (r ? document.body.classList.add("modal-open") : document.body.classList.remove("modal-open"));
    }
  },
  computed: {
    mergedAttrs() {
      return {
        centered: !0,
        cancelVariant: "outline-secondary modal-cancel",
        hideHeaderClose: !0,
        ...this.$attrs
      };
    }
  }
});
export {
  p as ForgeModal,
  p as default
};

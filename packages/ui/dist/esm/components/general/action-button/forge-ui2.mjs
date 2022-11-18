import e from "vue";
import { BButton as r, BSpinner as i } from "bootstrap-vue";
const a = /* @__PURE__ */ e.extend({
  name: "ForgeActionButton",
  components: { BButton: r, BSpinner: i },
  props: {
    action: {
      type: Function,
      required: !0
    },
    params: {
      type: Array,
      default: () => []
    },
    variant: {
      type: String,
      default: "primary"
    },
    errorMessage: {
      type: String,
      default: () => "This action failed"
    }
  },
  data() {
    return {
      loading: !1,
      buttonWidth: null
    };
  },
  computed: {
    width() {
      return this.loading ? this.buttonWidth + "px" : "auto";
    }
  },
  methods: {
    async performAction() {
      this.buttonWidth = this.$refs.button.clientWidth, this.loading = !0;
      try {
        await this.action.apply(this, this.params);
      } catch (t) {
        this.$forgeToast("error", typeof t == "string" ? t : this.errorMessage);
      }
      this.loading = !1;
    }
  }
});
export {
  a as ForgeActionButton,
  a as default
};

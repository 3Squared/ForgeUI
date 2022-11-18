import { getValidationState as e } from "../../../helpers/forge-ui2.mjs";
import i from "vue";
import { BFormInput as a, BIconXCircle as l, BFormInvalidFeedback as s, BButton as n, BIconPencil as o } from "bootstrap-vue";
const c = /* @__PURE__ */ i.extend({
  name: "ForgeInlineEditor",
  components: { BFormInput: a, BIconXCircle: l, BFormInvalidFeedback: s, BButton: n, BIconPencil: o },
  props: {
    value: {
      type: [Object, String, Number, Date],
      default: () => null
    },
    completeAction: {
      type: Function,
      default: () => {
      }
    },
    params: {
      type: Array,
      default: () => []
    },
    readonly: {
      type: Boolean,
      default: () => !1
    },
    isValid: {
      type: Function,
      default: () => {
      }
    }
  },
  data() {
    return {
      localValue: null,
      editing: !1,
      valid: null,
      validationErrors: []
    };
  },
  computed: {
    validationState() {
      return this.valid == !1 ? !1 : null;
    }
  },
  methods: {
    async validate() {
      if (this.isValid) {
        const t = await this.isValid(this.localValue);
        if (t && (this.valid = t.valid, this.validationErrors = t.errors, !this.valid))
          return !1;
      }
      return !0;
    },
    async editFinished() {
      if (!await this.validate())
        return !1;
      if (this.localValue != this.value) {
        if (this.$emit("input", this.localValue), this.completeAction)
          try {
            await this.completeAction.apply(this, this.params), this.editing = !1;
          } catch (t) {
            this.$forgeToast("error", "Failed to update " + t);
          }
      } else
        this.editing = !1;
    },
    beginEdit() {
      this.editing = !0, this.localValue = this.value, this.$nextTick(() => {
        this.$refs.input ? this.$refs.input.focus() : setTimeout(() => {
          var t = this.$el.querySelector('input:not([type="hidden"]');
          t && t.focus();
        }, 100);
      });
    },
    cancel() {
      this.localValue = this.value, this.editing = !1;
    },
    reset() {
      this.localValue = null;
    },
    async update(t) {
      this.localValue = t, await this.validate();
    },
    getValidationState: e
  }
});
export {
  c as ForgeInlineEditor,
  c as default
};

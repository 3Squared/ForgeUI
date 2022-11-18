import n from "vue";
import { BIconXCircle as o, BFormInput as p } from "bootstrap-vue";
import s from "../../forms/date-picker/forge-ui.mjs";
import h from "../../forms/multiselect/forge-ui.mjs";
const c = /* @__PURE__ */ n.extend({
  name: "ForgeFilterHeader",
  components: { BIconXCircle: o, BFormInput: p, ForgeDatePicker: s, ForgeMultiselect: h },
  props: {
    name: {
      type: String,
      required: !1,
      default: null
    },
    type: {
      type: String,
      required: !0,
      default: "string",
      validator(e) {
        return ["string", "number", "select", "multiSelect", "date", "dateRange", "time"].indexOf(e) !== -1;
      }
    },
    value: {
      type: [String, Array, Object, Number],
      required: !1,
      default: null
    },
    options: {
      type: Array,
      required: !1,
      default: function() {
        return [];
      }
    },
    debounceTimer: {
      type: Number,
      default: 750
    },
    config: {
      type: Object,
      default: () => {
      }
    },
    variant: {
      type: String,
      default: () => {
        var e, l, r, t;
        return (t = (r = (l = (e = n.prototype) == null ? void 0 : e.ForgeSettings) == null ? void 0 : l.FilterHeader) == null ? void 0 : r.variant) != null ? t : "primary";
      }
    },
    placeholder: {
      type: String,
      default: null
    },
    hideLabel: {
      type: Boolean,
      default: !1
    }
  },
  methods: {
    update(e) {
      switch (this.type) {
        case "mulitSelect":
          this.$emit("input", this.multiSelectValue);
          break;
        default: {
          this.$emit("input", e ? this.type === "number" && typeof e == "string" ? parseFloat(e) : e : null);
          break;
        }
      }
    },
    updateDateRange(e, l, r) {
      var a, u;
      let t = ((a = this.value) == null ? void 0 : a.length) !== e.length;
      for (let i = 0; i < e.length; ++i)
        t = t || e[i].getTime() !== ((u = this.value[i]) == null ? void 0 : u.getTime());
      (e.length === 0 || e.length === 2) && t && (this.update(e), r.close());
    },
    reset() {
      this.value != null && (this.update(null), this.$emit("reset"));
    }
  },
  computed: {
    dateValue() {
      var e;
      return ((e = this.value) == null ? void 0 : e.length) === 2 ? `${this.value[0]} to ${this.value[1]}` : "";
    },
    multiSelectValue() {
      return this.type == "multiSelect" && !this.value ? [] : this.value;
    },
    renderClearButton() {
      var e;
      return this.type != "select" && this.type != "multiSelect" && (this.type == "dateRange" && ((e = this.value) == null ? void 0 : e.length) > 0 || this.value != null && this.type != "dateRange");
    },
    placeHolderText() {
      return this.placeholder || this.name;
    },
    hideSpinnerWheel() {
      return !!this.$attrs.noWheel || this.$attrs["no-wheel"] !== void 0;
    }
  }
});
export {
  c as ForgeFilterHeader,
  c as default
};

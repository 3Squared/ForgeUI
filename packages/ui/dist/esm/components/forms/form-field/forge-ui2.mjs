import { ValidationProvider as t } from "vee-validate";
import r from "vue";
import { BFormGroup as a, BFormTextarea as l, BFormInput as o, BFormInvalidFeedback as i, BFormCheckbox as u } from "bootstrap-vue";
import { getValidationState as d } from "../../../helpers/forge-ui2.mjs";
const f = /* @__PURE__ */ r.extend({
  name: "ForgeFormField",
  components: {
    ValidationProvider: t,
    BFormGroup: a,
    BFormTextarea: l,
    BFormInput: o,
    BFormInvalidFeedback: i,
    BFormCheckbox: u
  },
  props: {
    label: {
      type: String,
      required: !0
    },
    rules: {
      type: String,
      default: () => ""
    },
    value: {
      type: [String, Number, Object],
      default: () => null
    },
    type: {
      type: String,
      default: () => "text",
      validator: (e) => ["text", "number", "email", "password", "search", "url", "tel", "date", "time", "range", "color", "checkbox", "textarea"].indexOf(e) !== -1
    },
    disabled: {
      type: Boolean,
      default: () => !1
    },
    vid: {
      type: String,
      required: !1,
      default: () => null
    },
    placeholder: {
      type: String,
      required: !1,
      default: () => ""
    },
    groupClass: {
      type: String,
      default: () => ""
    },
    labelCols: {
      type: [String, Boolean],
      default: () => !1
    }
  },
  data() {
    return {
      currentValue: this.value
    };
  },
  watch: {
    value(e) {
      this.currentValue = e;
    },
    currentValue(e) {
      this.$emit("input", e);
    }
  },
  computed: {
    fieldName() {
      var e;
      return (e = this.vid) != null ? e : this.label.replace(/\s+/g, "-").replace(":", "").toLowerCase();
    }
  },
  methods: {
    getValidationState: d
  }
});
export {
  f as ForgeFormField,
  f as default
};

import n from "vue";
import { ValidationObserver as a, ValidationProvider as i } from "vee-validate";
function r({ dirty: t, validated: e, valid: o }) {
  return t || e ? o ? null : !1 : null;
}
const m = /* @__PURE__ */ n.extend({
  components: {
    ValidationObserver: a,
    ValidationProvider: i
  },
  methods: {
    getValidationState: r
  }
});
export {
  m as ValidateableComponent,
  r as getValidationState
};

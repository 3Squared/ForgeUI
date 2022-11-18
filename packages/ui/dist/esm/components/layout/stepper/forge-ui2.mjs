import p from "vue";
import { BButton as i, BIconChevronLeft as c, BAlert as o } from "bootstrap-vue";
const a = /* @__PURE__ */ p.extend({
  name: "ForgeStepper",
  components: { BButton: i, BIconChevronLeft: c, BAlert: o },
  props: {
    variant: {
      type: String,
      default: () => {
        var t, r, e, s;
        return (s = (e = (r = (t = p.prototype) == null ? void 0 : t.ForgeSettings) == null ? void 0 : r.Stepper) == null ? void 0 : e.variant) != null ? s : "primary";
      }
    },
    steps: {
      type: Array,
      required: !0
    },
    currentStep: {
      type: Number,
      default: 0
    },
    showSteps: {
      type: Boolean,
      default: !0
    }
  },
  data() {
    return {
      currentStepLocal: this.currentStep
    };
  },
  computed: {
    computedSteps() {
      const t = this.steps.findIndex((r, e) => r.noBack == !0 && this.currentStepLocal <= e);
      return this.steps.map((r, e) => ({
        ...r,
        isDisabled: this.currentStepLocal >= t && t != -1 ? e < t || e > this.currentStepLocal : e > this.currentStepLocal || r.isDisabled
      }));
    },
    isBackButtonDisabled() {
      return !(this.computedSteps.findIndex((t) => !t.isDisabled) < this.currentStepLocal && this.computedSteps.findIndex((t) => !t.isDisabled) > -1);
    }
  },
  methods: {
    changeStep(t) {
      t < this.currentStepLocal && !this.computedSteps[t].isDisabled && (this.currentStepLocal = t, this.$emit("update:currentStep", t));
    },
    nextStep() {
      if (this.currentStepLocal < this.computedSteps.length - 1) {
        do
          this.currentStepLocal++;
        while (this.computedSteps[this.currentStepLocal].isDisabled);
        this.$emit("update:currentStep", this.currentStepLocal);
      }
    },
    previousStep() {
      do
        this.currentStepLocal--;
      while (this.computedSteps[this.currentStepLocal].isDisabled);
      this.$emit("update:currentStep", this.currentStepLocal);
    }
  },
  watch: {
    currentStep() {
      this.currentStepLocal = this.currentStep;
    }
  }
});
export {
  a as ForgeStepper,
  a as default
};

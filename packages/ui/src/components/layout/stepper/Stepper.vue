<template>
  <div :class="[`forge-stepper-${variant}`]" class="w-100">
    <div v-if="showSteps">
      <div class="d-flex align-items-center bg-white">
        <b-button :variant="variant" :disabled="isBackButtonDisabled" class="rounded-circle ml-2 px-2" @click="previousStep">
          <b-icon-chevron-left />
        </b-button>
        <div class="stepper">
          <hr class="divider" />
          <div
              v-for="(step, index) in computedSteps"
              :key="step.key"
              :class="{ 'step-active': index === currentStepLocal, 'step-inactive': computedSteps[index].isDisabled, link: !computedSteps[index].isDisabled }"
              class="step-block"
              @click="changeStep(index)"
          >
            <div class="step">
              <div class="step-circle">{{ index + 1 }}</div>
            </div>
            <span class="h5">{{ step.text }}</span>
          </div>
        </div>
      </div>
      <hr />
    </div>
    <div class="w-100" v-for="(step, index) in computedSteps" :key="step.key">
      <slot v-if="index === currentStepLocal" :name="step.key" :nextStep="nextStep" :previousStep="previousStep">
        <b-alert show variant="info">
          Please add Slot Content for the key {{ step.key }}
          <b-button variant="outline-primary" @click="nextStep">Next</b-button>
        </b-alert>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { ForgeStepperStep } from "../../../helpers/index";
import Vue, { PropType } from "vue";
import { BAlert, BButton, BIconChevronLeft } from "bootstrap-vue";

/**
 * @displayName Stepper
 **/
export const ForgeStepper = /*#__PURE__*/ Vue.extend({
  name: "ForgeStepper",
  components: { BButton, BIconChevronLeft, BAlert },
  props: {
    variant: {
      type: String,
      default : () => Vue.prototype?.ForgeSettings?.Stepper?.variant ?? "primary"
    },
    steps: {
      type: Array as PropType<ForgeStepperStep[]>,
      required: true
    },
    currentStep: {
      type: Number,
      default: 0
    },
    showSteps: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currentStepLocal: this.currentStep
    };
  },
  computed: {
    computedSteps(): ForgeStepperStep[] {
      const noBackIndex = this.steps.findIndex((x, i) => x.noBack == true && this.currentStepLocal <= i);
      return this.steps.map((x, i) => ({
        ...x,
        isDisabled:
            this.currentStepLocal >= noBackIndex && noBackIndex != -1 ? i < noBackIndex || i > this.currentStepLocal : i > this.currentStepLocal || x.isDisabled
      }));
    },
    isBackButtonDisabled(): boolean {
      return !(this.computedSteps.findIndex(x => !x.isDisabled) < this.currentStepLocal && this.computedSteps.findIndex(x => !x.isDisabled) > -1);
    }
  },
  methods: {
    changeStep(newStep: number) {
      if (newStep < this.currentStepLocal && !this.computedSteps[newStep].isDisabled) {
        this.currentStepLocal = newStep;
        this.$emit("update:currentStep", newStep);
      }
    },
    nextStep() {
      if (this.currentStepLocal < this.computedSteps.length - 1) {
        do {
          this.currentStepLocal++;
        } while (this.computedSteps[this.currentStepLocal].isDisabled);
        this.$emit("update:currentStep", this.currentStepLocal);
      }
    },
    previousStep() {
      do {
        this.currentStepLocal--;
      } while (this.computedSteps[this.currentStepLocal].isDisabled);
      this.$emit("update:currentStep", this.currentStepLocal);
    }
  },
  watch: {
    currentStep() {
      this.currentStepLocal = this.currentStep;
    }
  }
});

export default ForgeStepper;
</script>

<template>
  <b-form-group :label="type == 'checkbox' ? '' : label" :label-for="fieldName" :class="groupClass" :label-cols="labelCols">
    <ValidationProvider v-slot="validationContext" :vid="fieldName" :rules="rules" :name="fieldName">
      <slot :state="getValidationState(validationContext)">
        <div v-if="type == 'checkbox'" class="d-flex">
          {{ label }}
          <b-form-checkbox v-model="currentValue" class="pb-2 ml-2"></b-form-checkbox>
        </div>
        <b-form-textarea v-else-if="type == 'textarea'" v-model="currentValue" :state="getValidationState(validationContext)" />
        <b-form-input
          v-else
          :id="fieldName"
          v-model="currentValue"
          :state="getValidationState(validationContext)"
          :type="type"
          :disabled="disabled"
          :placeholder="placeholder"
          trim
        ></b-form-input>
      </slot>
      <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
    </ValidationProvider>
  </b-form-group>
</template>

<script lang="ts">
import { ValidationProvider } from "vee-validate";
import Vue from "vue";
import { BFormGroup, BFormTextarea, BFormInput, BFormInvalidFeedback, BFormCheckbox } from "bootstrap-vue";
import { getValidationState } from "../../../helpers/index";

/**
 * @displayName Form Field
 **/
export const ForgeFormField = /*#__PURE__*/ Vue.extend({
  name: "ForgeFormField",
  components: {
    ValidationProvider,
    BFormGroup,
    BFormTextarea,
    BFormInput,
    BFormInvalidFeedback,
    BFormCheckbox
  },
  props: {
    label: {
      type: String,
      required: true
    },
    /**
     * A list of rules that you want applied to the input from vee-validate
     */
    rules: {
      type: String,
      default: () => ""
    },
    value: {
      type: [String, Number, Object],
      default: () => null
    },
    /**
     * The input type e.g ['text', 'number', 'email', 'password', 'search', 'url', 'tel', 'date', 'time', 'range', 'color', 'checkbox', 'textarea']
     */
    type: {
      type: String,
      default: () => "text",
      validator: (value: string) => {
        // The value must match one of these strings
        return ["text", "number", "email", "password", "search", "url", "tel", "date", "time", "range", "color", "checkbox", "textarea"].indexOf(value) !== -1;
      }
    },
    disabled: {
      type: Boolean,
      default: () => false
    },
    /**
     * You can override the id of the element if you need it for server side validation
     */
    vid: {
      type: String,
      required: false,
      default: () => null
    },
    placeholder: {
      type: String,
      required: false,
      default: () => ""
    },
    groupClass: {
      type: String,
      default: () => ""
    },
    labelCols: {
      type: [String, Boolean],
      default: () => false
    }
  },
  data() {
    return {
      currentValue: this.value
    };
  },
  computed: {
    fieldName(): string {
      return (this.vid ?? this.label.replace(/\s+/g, "-").replace(":", "").toLowerCase()) as string;
    }
  },
  watch: {
    value(val) {
      this.currentValue = val;
    },
    currentValue(val) {
      this.$emit("input", val);
    }
  },
  methods: {
    getValidationState
  }
});

export default ForgeFormField;
</script>

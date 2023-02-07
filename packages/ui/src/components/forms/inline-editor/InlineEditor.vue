<template>
  <div class="forge-inline-editor">
    <div v-if="!readonly">
      <div v-if="editing">
        <div class="d-flex justify-content-between align-items-center editor position-relative" :class="{ 'is-invalid': !valid }">
          <slot name="editor" :edit-finished="editFinished" :val="localValue" :update="update" :cancel="cancel" :state="validationState">
            <b-form-input
              ref="input"
              v-model.trim="localValue"
              :state="validationState"
              @keypress.enter="editFinished"
              @keypress.esc="cancel"
              @blur="editFinished"
              @input="validate"
            />
          </slot>
          <b-icon-x-circle class="clear-icon" @click="reset" />
        </div>
        <b-form-invalid-feedback>{{ validationErrors[0] }}</b-form-invalid-feedback>
      </div>
      <div v-else @click="beginEdit" @focus="beginEdit">
        <span v-if="value" class="value">
          <slot>
            {{ value }}
          </slot>
          <b-button variant="link" class="forge-inline-editor--edit-icon" @keypress.enter="beginEdit">
            <b-icon-pencil />
          </b-button>
        </span>
        <span v-else class="text-muted">
          Click to enter
          <b-button variant="link" class="forge-inline-editor--edit-icon" @keypress.enter="beginEdit">
            <b-icon-pencil />
          </b-button>
        </span>
      </div>
    </div>
    <div v-else>
      <slot>
        {{ value }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { getValidationState, ValidationResult } from "../../../helpers/validation";
import Vue from "vue";
import { BFormInput, BIconXCircle, BFormInvalidFeedback, BButton, BIconPencil } from "bootstrap-vue";

/**
 * @displayName Inline Editor
 **/
export const ForgeInlineEditor = /*#__PURE__*/ Vue.extend({
  name: "ForgeInlineEditor",
  components: { BFormInput, BIconXCircle, BFormInvalidFeedback, BButton, BIconPencil },
  props: {
    value: {
      type: [Object, String, Number, Date],
      default: () => null
    },
    completeAction: {
      type: Function,
      default: () => {}
    },
    params: {
      type: Array,
      default: () => []
    },
    readonly: {
      type: Boolean,
      default: () => false
    },
    isValid: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      localValue: null,
      editing: false,
      valid: null as boolean | null,
      validationErrors: [] as string[]
    };
  },
  computed: {
    validationState(): boolean | null {
      return this.valid == false ? false : null;
    }
  },
  methods: {
    async validate() {
      if (this.isValid) {
        const result = (await this.isValid(this.localValue)) as ValidationResult;
        if (result) {
          this.valid = result.valid;
          this.validationErrors = result.errors;
          if (!this.valid) {
            return false;
          }
        }
      }
      return true;
    },
    async editFinished() {
      if (!(await this.validate())) {
        return false;
      }
      if (this.localValue != this.value) {
        this.$emit("input", this.localValue);
        if (this.completeAction) {
          try {
            await this.completeAction.apply(this, this.params);
            this.editing = false;
          } catch (error) {
            this.$forgeToast("error", "Failed to update " + error);
          }
        }
      } else {
        this.editing = false;
      }
    },
    beginEdit() {
      this.editing = true;
      this.localValue = this.value as any;
      this.$nextTick(() => {
        if (this.$refs.input) {
          (this.$refs.input as HTMLInputElement).focus();
        } else {
          setTimeout(() => {
            var childInput = this.$el.querySelector('input:not([type="hidden"]') as HTMLInputElement;
            if (childInput) {
              childInput.focus();
            }
          }, 100);
        }
      });
    },
    cancel() {
      this.localValue = this.value;
      this.editing = false;
    },
    reset() {
      this.localValue = null;
    },
    async update(v: any) {
      this.localValue = v;
      await this.validate();
    },
    getValidationState
  }
});

export default ForgeInlineEditor;
</script>

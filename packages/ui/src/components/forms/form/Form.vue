<template>
  <b-form @submit.prevent="submit" novalidate class="position-relative shadow-sm border p-4 bg-white">
    <template v-if="showTitle">
      <h3 data-cy="form-title">
        {{ title }}
      </h3>
      <hr />
    </template>

    <b-alert v-model="error.hasError" variant="danger">
      <slot name="error" :error="error.message">
        {{ error.message }}
      </slot>
    </b-alert>

    <slot />

    <div class="d-flex justify-content-between">
      <slot name="cancel">
        <!--
        Triggered when the cancel button is clicked
        @event cancel
        -->
        <b-button data-cy="cancel-btn" v-if="!hideCancel" @click="$emit('cancel')" type="reset" variant="outline-secondary"> Cancel </b-button>
      </slot>
      <slot name="submit" :submit="submit">
        <b-button data-cy="submit-btn" type="submit" variant="primary">
          {{ submitText }}
        </b-button>
      </slot>
    </div>
    <forge-loader v-if="loading">{{ loadingText }}</forge-loader>
  </b-form>
</template>

<script lang="ts">
import Vue from "vue";
import { BButton, BForm, BAlert } from "bootstrap-vue";
import ForgeLoader from "../../general/loader/Loader.vue";

/**
 * The Forge Form provides the following features:
 * 
  - Automatic Loading state handling
  - Automatic error handling
  - Title Slot
  - Default Cancel and Submit button
 * @displayName Form
 **/
export const ForgeForm = /*#__PURE__*/ defineComponent({
  name: "ForgeForm",
  components: { BButton, BForm, BAlert, ForgeLoader },
  props: {
    /**
     * Pass a function to call when the form is submited so Forge form can display a loading spinner and handle errors
     */
    onSubmit: {
      type: Function,
      required: true
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: "Forge Form Title"
    },
    hideCancel: {
      type: Boolean,
      default: false
    },
    submitText: {
      type: String,
      default: "Submit"
    },
    loadingText: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      loading: false,
      error: {
        hasError: false,
        message: ""
      }
    };
  },
  methods: {
    async submit() {
      this.loading = true;
      this.error.hasError = false;
      try {
        await this.onSubmit();
      } catch (e: Error | any) {
        this.error.hasError = true;
        if (e.message) {
          this.error.message = e.message;
        }
      }
      this.loading = false;
    }
  }
});

export default ForgeForm;
</script>

<template>
  <b-form novalidate class="position-relative shadow-sm border p-4 bg-white" @submit.prevent="submit">
    <template v-if="showTitle">
      <slot name="title">
        <h3 :class="titleClass" data-cy="form-title">{{ title }}</h3>
      </slot>
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
        <b-button v-if="!hideCancel" data-cy="cancel-btn" type="reset" variant="outline-secondary" @click="$emit('cancel')">Cancel</b-button>
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

<script lang="ts" setup>
import { BForm, BButton, BAlert } from "bootstrap-vue";
import { ForgeLoader } from "@/components/general/loader/Loader.vue";
import { ref } from "vue";

const props = defineProps({
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
  },
  titleClass: {
    type: String,
    default: ""
  }
});

const loading = ref(false);
const error = ref({
  hasError: false,
  message: ""
});

async function submit() {
  loading.value = true;
  error.value.hasError = false;
  try {
    await props.onSubmit();
  } catch (e: Error | any) {
    error.value.hasError = true;
    if (e.message) {
      error.value.message = e.message;
    }
  }
  loading.value = false;
}
</script>

<template>
  <b-button :style="{ width: width }" ref="button" :variant="variant" :disabled="loading || $attrs.disabled" @click="performAction">
    <b-spinner v-if="loading" small></b-spinner>
    <span v-else>
      <slot></slot>
    </span>
  </b-button>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue';
import { BButton, BSpinner } from 'bootstrap-vue';

/**
 * The Forge Action button is design to provide an easy way to perform async actions that do not require much UI,
 * when the button is clicked the action button will display a spinner and then remove if the operation is successful otherwise it will display a forge toast error
 * It is for perfoming some kind of event to the server that doesnt require a form or modal, so for normal buttons use a b-button.
 *
 - Automatic loading and disabled state for button
 - Automatic error handling
 - Customisable content
 * @displayName Action Button
 **/
export const ForgeActionButton = /*#__PURE__*/ (Vue as VueConstructor<Vue & { $refs: { button: HTMLButtonElement } }>).extend({
  name: 'ForgeActionButton',
  components: { BButton, BSpinner },
  props: {
    /**
     * This is a callback function that you want to happen when the button is clicked
     */
    action: {
      type: Function,
      required: true
    },
    /**
     * If the action that you want to perform needs data then you can pass the values in as an array
     */
    params: {
      type: Array,
      default: () => []
    },
    /**
     * One of the standard theme variants e.g primary, secondary brand
     */
    variant: {
      type: String,
      default: 'primary'
    },
    /**
     * The error message you want to display if the action fails
     */
    errorMessage: {
      type: String,
      default: () => 'This action failed'
    }
  },
  data() {
    return {
      loading: false,
      buttonWidth: null as number | null
    };
  },
  computed: {
    width(): string {
      if (this.loading) {
        return this.buttonWidth + 'px';
      } else {
        return 'auto';
      }
    }
  },
  methods: {
    async performAction() {
      this.buttonWidth = this.$refs.button.clientWidth;
      this.loading = true;
      try {
        await this.action.apply(this, this.params);
      } catch (e) {
        this.$forgeToast('error', typeof e == 'string' ? e : this.errorMessage);
      }
      this.loading = false;
    }
  }
});
export default ForgeActionButton;
</script>

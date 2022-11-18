<template>
  <div class="d-flex shadow m-2 align-items-center" :class="classes">
    <span class="value text-light w-100 text-center">
      <!-- @slot Use this slot to place the value for the stat -->
      <slot />
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

/**
 * @displayName Stat Widget
 **/
export const ForgeStatWidget = /*#__PURE__*/ Vue.extend({
  name: 'ForgeStatWidget',
  props: {
    /** A Prop to show the size of the widget sm, md or lg */
    size: {
      type: String,
      default: 'md',
      validator(value : string) {
        return ['sm', 'md', 'lg'].indexOf(value) !== -1;
      }
    },
    variant: {
      type: String,
      default: () => Vue.prototype?.ForgeSettings?.StatWidget?.variant ?? 'primary'
    }
  },
  computed: {
    classes() : string {
      return `widget--${this.size} bg-${this.variant}`;
    }
  }
});

export default ForgeStatWidget;
</script>

<style lang="scss"></style>

<template>
  <div class="d-flex justify-content-between pb-2">
    <h1 class="h3">{{ title }}</h1>
    <div class="d-flex align-items-center">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
/**
 *   The Forge Page Header is a component that you can put at the top of every page with the title on the left and the buttons on the right
 * @displayName Page Header
 **/
export const ForgePageHeader = /*#__PURE__*/ defineComponent({
  name: 'ForgePageHeader',
  props: {
    title: {
      type: String,
      required: true
    }
  }
});

export default ForgePageHeader;
</script>

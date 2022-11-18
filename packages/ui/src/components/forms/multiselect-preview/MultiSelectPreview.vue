<template>
  <div :class="orientation === 'horizontal-reversed' ? 'row flex-row-reverse' : 'row'">
    <div :class="orientation === 'vertical' ? 'col-12 mb-1' : 'col'">
      <forge-multi-select :multiple="true" :limitText="limitText" :value="selectedItems" @input="update" :options="items">
        <template #tag>{{ '' }}</template>
        <template #selection><span class="pl-1" v-if="selectedItems.length > 0">{{ selectedItems.length }} items selected</span></template>
        <slot v-for="(_, name) in $slots" :name="name" :slot="name" />
        <!-- Pass on all scoped slots -->
        <template v-for="slot in Object.keys($scopedSlots)" v-slot:[slot]="scope"><slot :name="slot" v-bind="scope"/></template>
      </forge-multi-select>
      <!-- @slot If you need to display some content below the multi select such as validation content-->
      <slot name="after-multi-select" />
    </div>
    <div :class="orientation === 'vertical' ? 'col-12' : 'col'">
      <div :style="{ height: height }" class="overflow-auto">
        <div class="border alternating-item-list">
          <div v-if="title" class="bg-selected-info p-2 border-top border-bottom shadow-sm bg-brand-dark">
            <span v-if="selectedItems.length === 0">No </span><span>{{ title }}</span>
          </div>
          <div v-for="item in selectedItems" :key="item.id" class="p-2 item d-flex justify-content-between align-items-center">
            <!-- @slot Use this slot if the default labels is not enough, maybe for a b-link to redirect the user to the item -->
            <slot name="list-item" :item="item">
              <span class="d-inline-block">{{ item.shortLabel ? item.shortLabel : item.label }}</span>
            </slot>
            <b-button v-if="canRemoveItemFromPreview == true" variant="link" class="m-0 p-0 d-flex align-items-center" @click="removeSelectedItem(item.id)">
              <b-icon-x variant="Secondary" />
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { BButton, BIconX } from 'bootstrap-vue';
import { MultiSelectOption } from '../../../helpers/types';
import ForgeMultiSelect from '../multiselect/MultiSelect.vue.js';

export type MultiSelectPreviewOrientationType = 'horizontal' | 'vertical' | 'horizontal-reversed';

/**
 * Multi Select with Preview component
 * This can be ordered horizontal(default), horizontal-reversed or vertical
 * @displayName MultiSelect Preview
 **/
export const ForgeMultiSelectPreview = /*#__PURE__*/ Vue.extend({
  name: 'ForgeMultiSelectPreview',
  components: { BButton, BIconX, ForgeMultiSelect },
  // binds to v-model
  model: {
    prop: 'selectedItems'
  },
  props: {
    /**
     * The header text for the preview part
     */
    title: { type: String, required: false, default: 'Selected Items' },
    /**
     * The orientation of the multi select and preview part
     * @values horizontal, vertical, horizontal-reversed
     */
    orientation: { type: String as () => MultiSelectPreviewOrientationType, default: 'horizontal' },
    /**
     * The hight that you want the preview part to be
     */
    height: { type: String, default: '200px' },
    /**
     * The list of items to be displayed in the multi-select
     */
    items: { type: Array as () => MultiSelectOption<unknown>[], required: true },
    /**
     * The list of items that have been selected in the multi-select and hence also displayed in the preview part
     */
    selectedItems: { type: Array as () => MultiSelectOption<any>[], required: true },
    /**
     * If set to false it will hide the cross in the preview part
     */
    canRemoveItemFromPreview: { type: Boolean, default: true, required: false }
  },
  computed: {
    limitText() {
      return (count : number) => `${count} selected`
    }
  },
  methods: {
    /**
     * Remove the selected MultiSelectOption from the list of selectedItems
     * Also fire the method that emits the change for the v-model linked list of items
     */
    removeSelectedItem(id: unknown) {
      this.update(this.selectedItems.filter(x => x.id != id));
    },
    update(items: MultiSelectOption<unknown>[]) {
      this.$emit('input', items);
    }
  }
});

export default ForgeMultiSelectPreview;
</script>

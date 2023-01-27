<template>
  <multiselect v-bind='mergedAttrs' v-on='mergedListeners' @remove='toggleSelectAll' @input='checkAllSelected'>
    <template #caret='{toggle}'>
      <i v-if='shouldShowClearSelection'
         @mousedown.prevent.stop='clearSelected()' class='multiselect__clear-icon'
      />
      <div @mousedown.prevent.stop='toggle' class='multiselect__select'></div>
    </template>
    <template #beforeList v-if='mergedAttrs.multiple && showSelectAll && !mergedAttrs.async'>
      <li class='multiselect__element' @click='selectAll' @mouseover='onMouseOver' @mouseleave='onMouseLeave'>
        <span :class='optionHighlight'>
          <input :checked='isAllSelected' name='selected' type='checkbox' class='multiselect__option--checkbox' />
          <span>            Toggle all</span>
        </span>
      </li>
    </template>
    <template #option='props' v-if='mergedAttrs.multiple'>
      <span>
        <input :checked='$attrs.value.indexOf(selectValue ? props.option[selectValue] : props.option) !== -1'
               name='selected' type='checkbox' class='multiselect__option--checkbox' />
        {{ props.option[mergedAttrs.label] }}
      </span>
    </template>
    <slot v-for='(_, name) in $slots' :name='name' :slot='name' />
    <!-- Pass on all scoped slots -->
    <template v-for='slot in Object.keys($scopedSlots)' v-slot:[slot]='scope'>
      <slot :name='slot' v-bind='scope' />
    </template>
  </multiselect>
</template>

<script lang='ts'>
import Vue from 'vue';
import { Multiselect } from 'vue-multiselect';

/**
 * @displayName MultiSelect
 **/
export const ForgeMultiSelect = /*#__PURE__*/ Vue.extend({
  name: 'ForgeMultiSelect',
  components: {
    Multiselect
  },
  props: {
    variant: {
      type: String,
      default: /*#__PURE__*/ () => Vue.prototype?.ForgeSettings?.MultiSelect?.variant ?? 'primary'
    },
    /**
     * When set to false will show a validation icon similar to boostrap form controls
     */
    state: {
      type: Boolean,
      default: true
    },
    /**
     * Whether to show the 'select all' list option
     */
    showSelectAll: {
      type: Boolean,
      default: true
    },
    /**
     * Whether or not to show the little X to clear the current selection
     */
    showClearSelection: {
      type: Boolean,
      default: true
    },
    /**
     * Whether to have the dropdown expand to the left or right when displaying lengthy options
     */
    expandLeft: {
      type: Boolean,
      default: false
    },
    selectValue: {
      type: String
    }
  },
  data() {
    return {
      selectAllHighlighted: false,
      isAllSelected: false
    };
  },
  computed: {
    theme(): string {
      return `forge-multi-select-${this.variant}`;
    },
    multiSelectDefaults(): object {
      return this.$attrs.multiple == null || this.$attrs.multiple ? {
        'close-on-select': false,
        'clear-on-select': false,
        'preserve-search': true
      } : {};
    },
    shouldShowClearSelection(): boolean {
      return !!((this.$attrs.allowEmpty == null || this.$attrs.allowEmpty) &&
        this.showClearSelection &&
        ((this.$attrs.multiple == null || this.$attrs.multiple) ? this.$attrs.value.length > 0 : this.$attrs.value));
    },
    mergedListeners(): Object {
      const allListeners = this.$listeners;
      if (this.selectValue) {
        allListeners.input = this.testFunc;
      }
      return allListeners;
    },
    mergedAttrs(): any {
      const options = this.$attrs.options as unknown as any[];
      return {
        class: `${this.theme} ${this.state == false ? 'is-invalid' : ''} ${this.expandLeft ? 'multiselect--left' : ''} ${this.shouldShowClearSelection ? 'multiselect--showClearSelection' : ''}`,
        multiple: true,
        label: 'label',
        trackBy: 'id',
        showPointer: !this.selectAllHighlighted,
        placeholder: 'Select...',
        allowEmpty: true,
        ...this.multiSelectDefaults,
        ...this.$attrs,
        value: this.selectValue ? options.filter(o => this.$attrs.value && this.$attrs.value.includes(o[this.selectValue])) : this.$attrs.value
      };
    },
    optionHighlight(): string {
      return 'multiselect__option' +
        (this.selectAllHighlighted ? ' multiselect__option--highlight' : '') +
        (this.isAllSelected ? ' multiselect__option--selected' : '');
    }
  },
  methods: {
    testFunc(values: any[] | Record<string, any>) {
      if (Array.isArray(values)) {
        this.$emit('input', values.map(v => v[this.selectValue]));
      } else {
        this.$emit('input', values[this.selectValue]);
      }
    },
    onMouseOver() {
      this.selectAllHighlighted = true;
    },
    onMouseLeave() {
      this.selectAllHighlighted = false;
    },
    clearSelected() {
      this.$emit('input', (this.mergedAttrs as any).multiple ? [] : null);
      this.checkAllSelected([]);
    },
    toggleSelectAll() {
      if (!(this.mergedAttrs as any).multiple || !this.showSelectAll || (this.mergedAttrs as any).async) {
        return;
      }
      this.isAllSelected = false;
    },
    checkAllSelected(event: any[]) {
      if (!(this.mergedAttrs as any).multiple || !this.showSelectAll || (this.mergedAttrs as any).async) {
        return;
      }
      this.isAllSelected = event.length >= this.$attrs.options.length;
    },
    selectAll() {
      if (this.isAllSelected) {
        this.clearSelected();
      } else {
        const selection = [...this.$attrs.options];
        this.$emit('input', selection);
        this.isAllSelected = true;
      }
    }
  }
});

export default ForgeMultiSelect;
</script>

import i from "vue";
import { Multiselect as r } from "vue-multiselect";
const o = /* @__PURE__ */ i.extend({
  name: "ForgeMultiSelect",
  components: {
    Multiselect: r
  },
  props: {
    variant: {
      type: String,
      default: () => {
        var t, e, l, s;
        return (s = (l = (e = (t = i.prototype) == null ? void 0 : t.ForgeSettings) == null ? void 0 : e.MultiSelect) == null ? void 0 : l.variant) != null ? s : "primary";
      }
    },
    state: {
      type: Boolean,
      default: !0
    },
    showSelectAll: {
      type: Boolean,
      default: !0
    },
    showClearSelection: {
      type: Boolean,
      default: !0
    },
    expandLeft: {
      type: Boolean,
      default: !1
    },
    selectValue: {
      type: String
    }
  },
  data() {
    return {
      selectAllHighlighted: !1,
      isAllSelected: !1
    };
  },
  computed: {
    theme() {
      return `forge-multi-select-${this.variant}`;
    },
    multiSelectDefaults() {
      return this.$attrs.multiple == null || this.$attrs.multiple ? {
        "close-on-select": !1,
        "clear-on-select": !1,
        "preserve-search": !0
      } : {};
    },
    shouldShowClearSelection() {
      return !!((this.$attrs.allowEmpty == null || this.$attrs.allowEmpty) && this.showClearSelection && (this.$attrs.multiple == null || this.$attrs.multiple ? this.$attrs.value.length > 0 : this.$attrs.value));
    },
    mergedListeners() {
      const t = this.$listeners;
      return this.selectValue && (t.input = this.testFunc), t;
    },
    mergedAttrs() {
      const t = this.$attrs.options;
      return {
        class: `${this.theme} ${this.state == !1 ? "is-invalid" : ""} ${this.expandLeft ? "multiselect--left" : ""} ${this.shouldShowClearSelection ? "multiselect--showClearSelection" : ""}`,
        multiple: !0,
        label: "label",
        trackBy: "id",
        showPointer: !this.selectAllHighlighted,
        placeholder: "Select...",
        allowEmpty: !0,
        ...this.multiSelectDefaults,
        ...this.$attrs,
        value: this.selectValue ? t.filter((e) => this.$attrs.value && this.$attrs.value.includes(e[this.selectValue])) : this.$attrs.value
      };
    },
    optionHighlight() {
      return "multiselect__option" + (this.selectAllHighlighted ? " multiselect__option--highlight" : "") + (this.isAllSelected ? " multiselect__option--selected" : "");
    }
  },
  methods: {
    testFunc(t) {
      Array.isArray(t) ? this.$emit("input", t.map((e) => e[this.selectValue])) : this.$emit("input", t[this.selectValue]);
    },
    onMouseOver() {
      this.selectAllHighlighted = !0;
    },
    onMouseLeave() {
      this.selectAllHighlighted = !1;
    },
    clearSelected() {
      this.$emit("input", this.mergedAttrs.multiple ? [] : null), this.checkAllSelected([]);
    },
    toggleSelectAll() {
      !this.mergedAttrs.multiple || !this.showSelectAll || this.mergedAttrs.async || (this.isAllSelected = !1);
    },
    checkAllSelected(t) {
      !this.mergedAttrs.multiple || !this.showSelectAll || this.mergedAttrs.async || (this.isAllSelected = t.length >= this.$attrs.options.length);
    },
    selectAll() {
      if (this.isAllSelected)
        this.clearSelected();
      else {
        const t = [...this.$attrs.options];
        this.$emit("input", t);
      }
      this.isAllSelected = !this.isAllSelected;
    }
  }
});
export {
  o as ForgeMultiSelect,
  o as default
};

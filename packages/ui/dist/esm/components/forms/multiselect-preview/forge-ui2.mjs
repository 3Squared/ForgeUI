import r from "vue";
import { BButton as i, BIconX as o } from "bootstrap-vue";
import l from "../multiselect/forge-ui.mjs";
const p = /* @__PURE__ */ r.extend({
  name: "ForgeMultiSelectPreview",
  components: { BButton: i, BIconX: o, ForgeMultiSelect: l },
  model: {
    prop: "selectedItems"
  },
  props: {
    title: { type: String, required: !1, default: "Selected Items" },
    orientation: { type: String, default: "horizontal" },
    height: { type: String, default: "200px" },
    items: { type: Array, required: !0 },
    selectedItems: { type: Array, required: !0 },
    canRemoveItemFromPreview: { type: Boolean, default: !0, required: !1 }
  },
  computed: {
    limitText() {
      return (e) => `${e} selected`;
    }
  },
  methods: {
    removeSelectedItem(e) {
      this.update(this.selectedItems.filter((t) => t.id != e));
    },
    update(e) {
      this.$emit("input", e);
    }
  }
});
export {
  p as ForgeMultiSelectPreview,
  p as default
};

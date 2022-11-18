import n from "vue";
import { BDropdown as a, BFormCheckboxGroup as u, BListGroup as h, BListGroupItem as c, BButton as m, BIconJustify as F, BFormCheckbox as C } from "bootstrap-vue";
import { BIconForgeColumns as g } from "../../../icons/forge-ui.mjs";
import { startCase as d, arraysEqual as r } from "../../../helpers/forge-ui.mjs";
import f from "vuedraggable";
import { loadCustomisedColumns as p, getColumnKey as l, saveCustomisedColumns as b } from "./forge-ui.mjs";
const K = /* @__PURE__ */ n.extend({
  name: "ForgeTableColumnCustomiser",
  components: {
    draggable: f,
    BDropdown: a,
    BFormCheckboxGroup: u,
    BListGroup: h,
    BListGroupItem: c,
    BButton: m,
    BIconJustify: F,
    BFormCheckbox: C,
    BIconForgeColumns: g
  },
  model: {
    prop: "fields",
    event: "change"
  },
  props: {
    id: {
      type: String,
      required: !0
    },
    fields: {
      type: Array,
      required: !0
    }
  },
  data() {
    return {
      lastSelectedFields: [],
      selectedFields: [],
      orignalFields: [],
      availableFields: []
    };
  },
  mounted() {
    var s;
    this.selectedFields = ((s = p(this.id)) != null ? s : this.fields).map(l);
    const e = [...this.fields].sort((t, o) => this.selectedFields.indexOf(this.getColumnKey(t)) - this.selectedFields.indexOf(this.getColumnKey(o)));
    this.availableFields = [...e], this.orignalFields = [...e], this.lastSelectedFields = [...this.selectedFields];
    const i = this.availableFields.filter((t) => this.selectedFields.includes(l(t))).map((t) => t != null ? t : { key: t });
    this.$emit("change", i);
  },
  computed: {
    hasChanges() {
      return this.changesCount.availableCount != this.changesCount.selectedCount;
    },
    changesCount() {
      const e = this.availableFields.filter((s) => this.canFieldBeHidden(s));
      return { selectedCount: e.filter((s) => this.lastSelectedFields.includes(this.getColumnKey(s))).length, availableCount: e.length };
    },
    newColumns() {
      return this.availableFields.filter((e) => this.selectedFields.includes(this.getColumnKey(e))).map((e) => e != null ? e : { key: e });
    }
  },
  methods: {
    getColumnKey: l,
    getLabel(e) {
      var i;
      return typeof e == "string" ? d(e) : (i = e.label) != null ? i : d(e.key);
    },
    revert() {
      r(this.selectedFields, this.lastSelectedFields) || (this.selectedFields = [...this.lastSelectedFields]), r(this.availableFields, this.fields) || (this.availableFields = [...this.orignalFields]);
    },
    reset() {
      this.selectedFields = this.orignalFields.map(l), this.saveAndClose(this.orignalFields);
    },
    confirm() {
      this.saveAndClose(this.newColumns);
    },
    saveAndClose(e) {
      this.lastSelectedFields = [...this.selectedFields], b(this.id, e), this.$emit("change", e), this.$refs.dropdown.hide(!0);
    },
    canFieldBeHidden(e) {
      return typeof e == "string" ? !0 : e.required != !0;
    }
  }
});
export {
  K as ForgeTableColumnCustomiser,
  K as default
};

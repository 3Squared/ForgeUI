<template>
  <b-dropdown ref="dropdown" :variant="hasChanges ? 'primary' : 'outline-primary'" class="forge-table-customise-columns-button" @hide="revert">
    <template #button-content>
      <span>
        Customise Columns
        <span v-if="hasChanges">({{ changesCount.selectedCount }}/{{ changesCount.availableCount }})</span>
      </span>
      <b-icon-forge-columns class="ml-2 mr-2" />
    </template>
    <b-form-checkbox-group id="selectedColumns-group" v-model="selectedFields" name="selectedColumns" class="mt-3">
      <b-list-group>
        <draggable v-model="availableFields" group="columns" handle=".handle" ghost-class="ghost">
          <b-list-group-item
            v-for="field in availableFields.filter((f) => canFieldBeHidden(f))"
            :key="getColumnKey(field)"
            class="p-2 d-flex align-items-center"
          >
            <b-button variant="link" class="p-0 mr-2 text-secondary">
              <b-icon-justify class="handle" />
            </b-button>
            <b-form-checkbox :disabled="selectedFields.length == 1 && selectedFields[0] == getColumnKey(field)" :value="getColumnKey(field)">
              {{ getLabel(field) }}
            </b-form-checkbox>
          </b-list-group-item>
        </draggable>
      </b-list-group>
    </b-form-checkbox-group>
    <div class="mt-3 d-flex justify-content-between">
      <b-button variant="outline-secondary" @click="reset">Reset</b-button>
      <b-button variant="primary" @click="confirm">Confirm</b-button>
    </div>
  </b-dropdown>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
import { BDropdown, BFormCheckboxGroup, BListGroup, BListGroupItem, BButton, BIconJustify, BFormCheckbox } from "bootstrap-vue";
import { BIconForgeColumns } from "../../../icons/icons";
import { startCase, arraysEqual } from "../../../helpers/index";
import { ForgeTableFieldArray, ForgeTableField } from "../../../helpers/types";
import draggable from "vuedraggable";
import { getColumnKey, loadCustomisedColumns, saveCustomisedColumns } from "./column-customiser-helper";

/**
 * @displayName Column Customiser
 **/
export const ForgeTableColumnCustomiser = /*#__PURE__*/ (Vue as VueConstructor<Vue & { $refs: { dropdown: { hide(returnFocus: boolean): void } } }>).extend({
  name: "ForgeTableColumnCustomiser",
  components: {
    draggable,
    BDropdown,
    BFormCheckboxGroup,
    BListGroup,
    BListGroupItem,
    BButton,
    BIconJustify,
    BFormCheckbox,
    BIconForgeColumns
  },
  model: {
    prop: "fields",
    event: "change"
  },
  props: {
    id: {
      type: String,
      required: true
    },
    fields: {
      type: Array as () => ForgeTableFieldArray,
      required: true
    }
  },
  data() {
    return {
      lastSelectedFields: [] as string[],
      selectedFields: [] as string[],
      orignalFields: [] as ForgeTableFieldArray,
      availableFields: [] as ForgeTableFieldArray
    };
  },
  computed: {
    hasChanges(): boolean {
      return this.changesCount.availableCount != this.changesCount.selectedCount;
    },
    changesCount(): { selectedCount: number; availableCount: number } {
      const availableFieldsThatCount = this.availableFields.filter((f) => this.canFieldBeHidden(f));
      const selectedFieldCount = availableFieldsThatCount.filter((s) => {
        return this.lastSelectedFields.includes(this.getColumnKey(s));
      });
      return { selectedCount: selectedFieldCount.length, availableCount: availableFieldsThatCount.length };
    },
    newColumns(): ForgeTableFieldArray {
      return this.availableFields.filter((q) => this.selectedFields.includes(this.getColumnKey(q))).map((s) => s ?? { key: s });
    }
  },
  mounted() {
    this.selectedFields = (loadCustomisedColumns(this.id) ?? this.fields).map(getColumnKey);
    const orderedfields = [...this.fields].sort((a, b) => {
      return this.selectedFields.indexOf(this.getColumnKey(a)) - this.selectedFields.indexOf(this.getColumnKey(b));
    });
    this.availableFields = [...orderedfields];
    this.orignalFields = [...orderedfields];
    this.lastSelectedFields = [...this.selectedFields];
    const newColumns = this.availableFields.filter((q) => this.selectedFields.includes(getColumnKey(q))).map((s) => s ?? { key: s });
    this.$emit("change", newColumns);
  },
  methods: {
    getColumnKey,
    getLabel(field: string | ({ key: string } & ForgeTableField)) {
      if (typeof field == "string") {
        return startCase(field);
      } else {
        return field.label ?? startCase(field.key);
      }
    },
    revert() {
      //Revert the selected columns back to how they were before the dropdown was opened
      if (!arraysEqual(this.selectedFields, this.lastSelectedFields)) {
        this.selectedFields = [...this.lastSelectedFields];
      }

      //Revert the options back to the order they were before the dropdown was opened
      if (!arraysEqual(this.availableFields, this.fields)) {
        this.availableFields = [...this.orignalFields];
      }
    },
    reset() {
      this.selectedFields = this.orignalFields.map(getColumnKey);
      this.saveAndClose(this.orignalFields);
    },
    confirm() {
      this.saveAndClose(this.newColumns);
    },
    saveAndClose(newColumns: ForgeTableFieldArray) {
      this.lastSelectedFields = [...this.selectedFields];
      saveCustomisedColumns(this.id, newColumns);
      this.$emit("change", newColumns);
      this.$refs.dropdown.hide(true);
    },
    canFieldBeHidden(field: string | ({ key: string } & ForgeTableField)): boolean {
      if (typeof field == "string") {
        return true;
      } else if (field.required == true) {
        return false;
      }
      return true;
    }
  }
});

export default ForgeTableColumnCustomiser;
</script>

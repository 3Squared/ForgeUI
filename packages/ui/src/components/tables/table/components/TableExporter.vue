<template>
  <b-button class="mr-2" variant="outline-primary" @click="exportData">
    <b-icon-forge-export class="mr-1" />
    Export
  </b-button>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { BButton } from "bootstrap-vue";
import { BIconForgeExport } from "../../../../icons/icons";
import { ForgeTableFieldArray, startCase } from "../../../../helpers/index";

export const ForgeTableExporter = /*#__PURE__*/ Vue.extend({
  name: "ForgeTableExporter",
  components: { BButton, BIconForgeExport },
  props: {
    customisedFields: {
      type: Array as PropType<ForgeTableFieldArray>,
      required: true
    },
    items: {
      type: Function as PropType<() => any[]>,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  methods: {
    async exportData() {
      const headers = [...this.customisedFields.map((f) => (typeof f === "string" ? { label: f, key: f } : { label: f.label ?? f.key, key: f.key }))];
      const items = typeof this.items == "function" ? await this.items() : this.items;
      const rows = [
        headers.map((h) => startCase(h.label)),
        ...items.map((row: { [s: string]: unknown }) => {
          const records = headers.map((header) => {
            return { [header.key]: row[header.key] };
          });

          return Object.values(
            records.reduce(function (acc, x) {
              for (const key in x) acc[key] = x[key];
              return acc;
            }, {})
          );
        })
      ];
      let csvContent = "data:text/csv;charset=utf-8," + rows.map((e: any[]) => e.join(",")).join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `${this.name}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
});

export default ForgeTableExporter;
</script>

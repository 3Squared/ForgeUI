import d from "vue";
import { BButton as u } from "bootstrap-vue";
import { BIconForgeExport as p } from "../../../../icons/forge-ui.mjs";
import { startCase as l } from "../../../../helpers/forge-ui.mjs";
const x = /* @__PURE__ */ d.extend({
  name: "ForgeTableExporter",
  components: { BButton: u, BIconForgeExport: p },
  props: {
    customisedFields: {
      type: Array,
      required: !0
    },
    items: {
      type: Function,
      required: !0
    },
    name: {
      type: String,
      required: !0
    }
  },
  methods: {
    async exportData() {
      const n = [...this.customisedFields.map((e) => {
        var r;
        return typeof e == "string" ? { label: e, key: e } : { label: (r = e.label) != null ? r : e.key, key: e.key };
      })], a = typeof this.items == "function" ? await this.items() : this.items;
      let m = "data:text/csv;charset=utf-8," + [
        n.map((e) => l(e.label)),
        ...a.map((e) => {
          const r = n.map((o) => ({ [o.key]: e[o.key] }));
          return Object.values(
            r.reduce(function(o, s) {
              for (const i in s)
                o[i] = s[i];
              return o;
            }, {})
          );
        })
      ].map((e) => e.join(",")).join(`
`);
      const c = encodeURI(m), t = document.createElement("a");
      t.setAttribute("href", c), t.setAttribute("download", `${this.name}.csv`), document.body.appendChild(t), t.click(), document.body.removeChild(t);
    }
  }
});
export {
  x as ForgeTableExporter,
  x as default
};

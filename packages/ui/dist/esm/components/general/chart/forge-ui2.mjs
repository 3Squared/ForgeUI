import { Chart as r } from "chart.js";
import a from "vue";
const n = /* @__PURE__ */ a.extend({
  name: "ForgeChart",
  props: {
    chartConfig: {
      type: Object,
      required: !0
    }
  },
  data() {
    return {
      chartId: ""
    };
  },
  mounted() {
    const t = new r(this.$el, this.chartConfig);
    this.chartId = t.id;
  },
  watch: {
    chartConfig: {
      deep: !0,
      handler: function() {
        const t = r.instances[this.chartId];
        t.data = this.chartConfig.data, t.options = this.chartConfig.options, t.update("none");
      }
    }
  }
});
export {
  n as ForgeChart,
  n as default
};

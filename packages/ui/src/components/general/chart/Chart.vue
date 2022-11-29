<template>
  <canvas />
</template>

<script lang="ts">
import { Chart, ChartConfiguration } from "chart.js";
import Vue, { defineComponent, PropType } from "vue";

/**
 * The Forge Chart is a minimalist wrapper around the ChartJS Library full options can be found on [here](https://www.chartjs.org/docs/latest/)
 *  @displayName Chart
 **/
export const ForgeChart = /*#__PURE__*/ defineComponent({
  name: "ForgeChart",
  props: {
    chartConfig: {
      type: Object as PropType<ChartConfiguration<any, any, any>>,
      required: true
    }
  },
  data() {
    return {
      chartId: ""
    };
  },
  mounted() {
    const chart = new Chart(this.$el as HTMLCanvasElement, this.chartConfig);
    this.chartId = chart.id;
  },
  watch: {
    chartConfig: {
      deep: true,
      handler: function () {
        const chart = Chart.instances[this.chartId];
        chart.data = this.chartConfig.data;
        chart.options = this.chartConfig.options;
        chart.update("none");
      }
    }
  }
});

export default ForgeChart;
</script>

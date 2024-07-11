<template>
  <div>
    <canvas ref="MyChart"></canvas>
  </div>
</template>

<script>
import { Chart } from "chart.js";

export default {
  name: "BaseChart",
  props: {
    type: String,
    data: Object,
    options: Object,
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.MyChart.getContext("2d");
      new Chart(ctx, {
        type: this.type,
        data: this.data,
        options: this.options,
      });
    },
    destroyChart() {
      const chartInstance = this.$refs.MyChart._chart;
      if (chartInstance) {
        chartInstance.destroy();
      }
    },
  },
};
</script>

<style scoped>
</style>

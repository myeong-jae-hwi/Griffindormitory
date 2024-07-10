<template>
  <div>
    <canvas ref="MyChart"></canvas>
  </div>
</template>

<script>
import { Chart } from 'chart.js';

export default {
  name: 'BaseChart',
  props: {
    type: String, // Chart.js chart type (e.g., 'bar', 'line', etc.)
    data: Object,
    options: Object
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.MyChart.getContext('2d');
      new Chart(ctx, {
        type: this.type,
        data: this.data,
        options: this.options
      });
    }
  }
};
</script>

<style scoped>
/* Add any scoped styles if needed */
</style>

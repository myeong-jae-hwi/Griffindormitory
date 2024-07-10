<template>
  <div>
    <students-license></students-license>
    <base-card>
      <base-chart
        ref="chartComponent"
        :type="type"
        :data="data"
        :options="options"
      ></base-chart>
    </base-card>

    <h3>게시판</h3>
    <board-item
      v-for="board in boards"
      :key="board.id"
      :id="board.id"
      :name="board.name"
      :title="board.title"
    ></board-item>
  </div>
</template>

<script>
import StudentsLicense from '../../components/UI/StudentsLicense.vue';
import BoardItem from '../../components/board/BoardItem.vue';
import BaseChart from '../../components/chart/BaseChart.vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  name: 'InfoPage',
  components: {
    StudentsLicense,
    BoardItem,
    BaseChart,
  },
  data() {
    return {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
      boards: [
        {
          id: 'b1',
          name: 'MJ',
          title: 'This is Board Test',
          description: 'Hello ?',
        },
        {
          id: 'b2',
          name: 'SW',
          title: 'I like Pubao',
          description: 'I miss pubao',
        },
      ],
    };
  },
};
</script>

<style scoped></style>

<template>
  <h4>이번 학기 성적</h4>
  <base-card>
    <base-chart
      ref="chartComponent"
      :type="allScores.type"
      :data="allScores.data"
      v-if="allScores.data.datasets[0].data.length > 0"
    ></base-chart>
    <p v-else>학점을 입력해 주세요</p>
  </base-card>
  <h4>전체 성적</h4>
  <base-card>
    <base-chart
      ref="chartComponent"
      :type="thisScores.type"
      :data="thisScores.data"
    ></base-chart>
  </base-card>
  <h4>학점입력</h4>
  
  <base-card>

  </base-card>
</template>

<script>
import BaseChart from "../components/chart/BaseChart.vue";
import { Chart, registerables } from "chart.js";
import BaseCard from '../components/UI/BaseCard.vue';
Chart.register(...registerables);

export default {
  components: {
    BaseChart,
    BaseCard,
  },
  data() {
    return {
      allScores: {
        type: "bar",
        data: {
          labels: [
            "과목명1",
            "과목명2",
            "과목명3",
            "과목명4",
            "과목명5",
            "과목명6",
          ],
          datasets: [
            {
              label: "이번학기 성적",
              data: [3.5, 3, 3.5, 4, 3, 4],
              backgroundColor: ["rgba(255, 99, 132, 0.2)"],
              borderColor: ["rgba(255, 99, 132, 1)"],
              borderWidth: 1,
            },
          ],
        },
      },
      thisScores: {
        type: "line",
        data: {
          labels: [
            "1학년 1학기",
            "1학년 2학기",
            "2학년 1학기",
            "2학년 2학기",
            "3학년 1학기",
            "3학년 2학기",
            "4학년 1학기",
            "4학년 2학기",
          ],
          datasets: [
            {
              label: "전체 성적",
              data: [2.8, 1.5, 3.3, 3.7, 4, 3.8, 4.2, 4.5],
              backgroundColor: ["rgba(255, 99, 132, 0.2)"],
              borderColor: ["rgba(255, 99, 132, 1)"],
              borderWidth: 1,
            },
          ],
        },
      },
    };
  },
  methods: {
    addScore(){

    }
  }
};
</script>

<style scoped>
</style>
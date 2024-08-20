<!--
<template>
  <div>
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
    <base-card class="horizontal">
      <form @submit.prevent="submitForm">
        <div v-for="(item, index) in scoreItems" :key="index">
          <score-item
            :item="item"
            @remove="removeScoreItem(index)"
          ></score-item>
        </div>
        <button type="button" @click="addScoreItem">Plus</button>
        <button type="submit">Submit</button>
      </form>
    </base-card>
  </div>
</template>

<script>
import BaseChart from '../components/chart/BaseChart.vue';
import { Chart, registerables } from 'chart.js';
import BaseCard from '../components/UI/BaseCard.vue';
import ScoreItem from '../components/score/ScoreItem.vue';
import StudentCalender from '../components/timetable/StudentCalender.vue';
Chart.register(...registerables);

export default {
  components: {
    BaseChart,
    BaseCard,
    ScoreItem,
    StudentCalender,
  },
  data() {
    return {
      allScores: {
        type: 'bar',
        data: {
          labels: [],
          datasets: [
            {
              label: '이번학기 성적',
              data: [],
              backgroundColor: ['rgba(255, 99, 132, 0.2)'],
              borderColor: ['rgba(255, 99, 132, 1)'],
              borderWidth: 1,
            },
          ],
        },
      },
      thisScores: {
        type: 'line',
        data: {
          labels: [],
          datasets: [
            {
              label: '전체 성적',
              data: [],
              backgroundColor: ['rgba(255, 99, 132, 0.2)'],
              borderColor: ['rgba(255, 99, 132, 1)'],
              borderWidth: 1,
            },
          ],
        },
      },
      scoreItems: [],
    };
  },
  created() {
    this.fetchScores();
    console.log('제발좀!!!' + this.scoreItems);
    this.fetchSchedules();
  },
  methods: {
    async fetchSchedules() {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_FIREBASE_DATABASE_URL}/schedules.json`
        );
        const data = await response.json();

        this.scoreItems = Object.values(data).map((schedule) => ({
          subject: schedule.title,
          score: null,
        }));
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    },
    addScoreItem() {
      this.scoreItems.push({ subject: '', score: null });
    },
    removeScoreItem(index) {
      this.scoreItems.splice(index, 1);
    },
    async submitForm() {
      try {
        await fetch(
          `${process.env.VUE_APP_FIREBASE_DATABASE_URL}/scores.json`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.scoreItems),
          }
        );
        this.fetchScores(); // 데이터 저장 후 최신 데이터를 다시 가져옴
        this.scoreItems = [{ subject: '', score: null }];
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
    async fetchScores() {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_FIREBASE_DATABASE_URL}/scores.json`
        );
        const data = await response.json();

        // 데이터 처리 및 차트 업데이트
        const subjects = [];
        const scores = [];
        for (const key in data) {
          for (const item of data[key]) {
            subjects.push(item.subject);
            scores.push(item.score);
          }
        }

        this.allScores.data.labels = subjects;
        this.allScores.data.datasets[0].data = scores;
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    },
  },
};
</script>

<style scoped>
.horizontal {
  vertical-align: middle;
  display: table-cell;
}
</style>
-->
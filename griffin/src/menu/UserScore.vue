<template>
  <div>
    <h4>이번 학기 성적</h4>
    <base-card>
      <base-chart
        ref="chartComponent"
        :type="allScores.type"
        :data="allScores.data"
        v-if="allScores.data.labels.length > 0"
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
      <div v-for="(item, index) in scoreItems" :key="index" class="score-item">
        <score-item
          :initial-subject="item.subject"
          :initial-grade="item.grade"
          @update-subject="updateSubject(index, $event)"
          @update-grade="updateGrade(index, $event)"
          @remove="removeScoreItem(index)"
        ></score-item>
      </div>
      <button @click="addScoreItem">Plus</button>
      <button @click="submitScores">확인</button>
    </base-card>
  </div>
</template>

<script>
import BaseChart from "../components/chart/BaseChart.vue";
import { Chart, registerables } from "chart.js";
import BaseCard from "../components/UI/BaseCard.vue";
import ScoreItem from "../components/score/ScoreItem.vue";

Chart.register(...registerables);

export default {
  components: {
    BaseChart,
    BaseCard,
    ScoreItem,
  },
  data() {
    return {
      allScores: {
        type: "bar",
        data: {
          labels: [],
          datasets: [
            {
              label: "이번학기 성적",
              data: [],
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
          labels: [],
          datasets: [
            {
              label: "전체 성적",
              data: [],
              backgroundColor: ["rgba(255, 99, 132, 0.2)"],
              borderColor: ["rgba(255, 99, 132, 1)"],
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
  },
  methods: {
    addScoreItem() {
      this.scoreItems.push({ subject: "", grade: "A+" });
      console.log(this.allScores)
      console.log(this.allScores.data.datasets[0].data.length)
    },
    removeScoreItem(index) {
      this.scoreItems.splice(index, 1);
    },
    updateSubject(index, newSubject) {
      this.scoreItems[index].subject = newSubject;
    },
    updateGrade(index, newGrade) {
      this.scoreItems[index].grade = newGrade;
    },
    async submitScores() {
      try {
        const scoresArray = this.scoreItems.map(item => [item.subject, this.convertGradeToPoint(item.grade)]);
        await fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/scores.json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(scoresArray),
        });
        this.fetchScores();  // 데이터 저장 후 최신 데이터를 다시 가져옴
        this.scoreItems = [];  // 제출 후 입력 필드 초기화
      } catch (error) {
        console.error("Error submitting scores:", error);
      }
    },
    async fetchScores() {
      try {
        const response = await fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/scores.json`);
        const data = await response.json();
        
        // 데이터 처리 및 차트 업데이트
        const subjects = [];
        const grades = [];

        for (const key in data) {
          const item = data[key];

          for (const value in item) {
            subjects.push(item[value][0]);
            grades.push(item[value][1]);
          }
          console.log("item: "+ item.length )
        }
        console.log("subjects:" + subjects)
        console.log("grades:" + grades)

        this.allScores.data.labels = subjects;
        this.allScores.data.datasets[0].data = grades;
      } catch (error) {
        console.error("Error fetching scores:", error);
      }
    },
    convertGradeToPoint(grade) {
      const gradeMap = {
        "A+": 4.5,
        "A0": 4.0,
        "B+": 3.5,
        "B0": 3.0,
        "C+": 2.5,
        "C0": 2.0,
        "D+": 1.5,
        "D0": 1.0,
        "F": 0.0,
        "P": 0.0,
        "NP": 0.0
      };
      return gradeMap[grade] || 0;
    }
  },
};
</script>

<style scoped>
.horizontal {
  vertical-align: middle;
  display: table-cell;
}

.score-item {
  margin-bottom: 10px;
}

.score-item input {
  margin-right: 10px;
}

.score-item button {
  margin-right: 5px;
}
</style>

<template>
  <div>
    <select v-model="selectedGrade" class="semesterchoise">
      <option value="1grade_1semester">1학년 1학기</option>
      <option value="1grade_2semester">1학년 2학기</option>
      <option value="2grade_1semester">2학년 1학기</option>
      <option value="2grade_2semester">2학년 2학기</option>
      <option value="3grade_1semester">3학년 1학기</option>
      <option value="3grade_2semester">3학년 2학기</option>
      <option value="4grade_1semester">4학년 1학기</option>
      <option value="4grade_2semester">4학년 2학기</option>
    </select>
    <h2 class="semesterhead">성적</h2>
    <base-btn type="submit" @click="submitGrade">확인</base-btn>
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
import BaseChart from '../chart/BaseChart.vue';
import { Chart, registerables } from 'chart.js';
import BaseCard from '../UI/BaseCard.vue';
import ScoreItem from '../score/ScoreItem.vue';
import { mapGetters } from 'vuex';
import BaseBtn from '../UI/BaseBtn.vue';

Chart.register(...registerables);

export default {
  components: {
    BaseChart,
    BaseCard,
    ScoreItem,
    BaseBtn,
  },
  computed: {
    ...mapGetters('users', ['currentUser']),
    userId() {
      return this.$store.state.users.userID;
    },
  },
  data() {
    return {
      allScores: {
        type: 'bar',
        data: {
          labels: [],
          grades: [],
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
          grades: [],
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
      selectedGrade: '',
    };
  },
  created() {
    if (this.userId) {
      this.$store.dispatch('users/fetchUserInitialData', {
        uid: this.userId,
      });
    }
    // this.fetchScores();
  },
  methods: {
    submitGrade() {
      this.fetchScores();
      console.log('레이블: ', this.allScores.data.labels);
      console.log('데이터: ', this.allScores.data.datasets[0].data);
    },
    addScoreItem() {
      const subjects = this.allScores.data.labels;
      const grades = this.allScores.data.points;
      console.log('aaaa', subjects);
      console.log('bbbb', grades);
      this.scoreItems.push({ subject: this.subjects, grade: grades });
      console.log('이게머누', this.allScores.data.labels);
    },
    removeScoreItem(index) {
      this.scoreItems.splice(index, 1);
    },
    updateSubject(index, newSubject) {
      this.scoreItems[index].subject = newSubject;
    },
    updateGrade(index, newGrade) {
      console.log('aa', newGrade);
      console.log('b', this.scoreItems[index].grade);
      this.scoreItems[index].grade = newGrade;
    },
    // async submitScores() {
    //   try {
    //     const scoresArray = this.scoreItems.map((item) => ({
    //       //item.subject,
    //       // this.convertGradeToPoint(item.grade),
    //       subject: item.subject.labels,
    //       grade: this.convertGradeToPoint(item.grade.grades),
    //     }));
    //     console.log(scoresArray);
    //     await fetch(
    //       `${process.env.VUE_APP_FIREBASE_DATABASE_URL}/scores/${this.userId}/semesters/${this.selectedGrade}/.json`,
    //       {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(scoresArray),
    //       }
    //     );
    //     this.scoreItems = [];
    //     this.fetchScores();
    //   } catch (error) {
    //     console.error('Error submitting scores:', error);
    //   }
    // },
    async submitScores() {
      try {
        const scoresArray = this.scoreItems.map((item) => ({
          subject: item.subject,
          grade: this.convertGradeToPoint(item.grade),
        }));
        console.log(scoresArray);
        await fetch(
          `${process.env.VUE_APP_FIREBASE_DATABASE_URL}/scores/${this.userId}/semesters/${this.selectedGrade}/.json`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(scoresArray),
          }
        );
        this.scoreItems = [];
        this.fetchScores();
      } catch (error) {
        console.error('Error submitting scores:', error);
      }
    },

    async fetchScores() {
      try {
        this.allScores.data.labels = [];
        this.allScores.data.datasets[0].data = [];

        const response = await fetch(
          `${process.env.VUE_APP_FIREBASE_DATABASE_URL}/scores/${this.userId}/semesters/${this.selectedGrade}/.json`
        );
        const data = await response.json();

        const subjects = [];
        const grades = [];

        for (let day in data) {
          if (data[day] && data[day].schedules) {
            data[day].schedules.forEach((schedule) => {
              if (schedule.title) {
                subjects.push(schedule.title);
                grades.push(schedule.point);
                console.log('Title:', schedule.title);
                console.log('Point:', schedule.point);
              }
            });
          }
        }

        this.allScores.data.labels = subjects;
        this.allScores.data.datasets[0].data = grades;
        this.scoreItems = subjects.map((subject, index) => ({
          subject,
          grade: grades[index],
        }));
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    },
    convertGradeToPoint(grade) {
      const gradeMap = {
        'A+': 4.5,
        A0: 4.0,
        'B+': 3.5,
        B0: 3.0,
        'C+': 2.5,
        C0: 2.0,
        'D+': 1.5,
        D0: 1.0,
        F: 0.0,
        P: 0.0,
        NP: 0.0,
      };
      return gradeMap[grade] || 0;
    },
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

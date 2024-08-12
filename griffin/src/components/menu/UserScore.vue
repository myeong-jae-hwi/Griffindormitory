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

    <h4>학기별 성적</h4>
    <base-card>
      <base-chart
        ref="chartComponent"
        :type="thisScores.type"
        :data="thisScores.data"
        v-if="thisScores.data.labels.length > 0"
      ></base-chart>
      <p v-else>입력된 학기 별 성적이 없습니다</p>
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
// import BaseBtn from '../UI/BaseBtn.vue';

Chart.register(...registerables);

export default {
  components: {
    BaseChart,
    BaseCard,
    ScoreItem,
    // BaseBtn,
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
          datasets: [
            {
              label: '학기별 평균 성적',
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
      semesterGPAs: [],
    };
  },
  created() {
    if (this.userId) {
      this.$store.dispatch('users/fetchUserInitialData', {
        uid: this.userId,
      });
    }
    this.fetchAndDisplayOverallScores();
  },
  methods: {
    fetchAndDisplayOverallScores() {
      this.fetchAllSemestersScores();
    },
    submitGrade() {
      this.fetchScores();
      console.log('레이블: ', this.allScores.data.labels);
      console.log('데이터: ', this.allScores.data.datasets[0].data);
      this.scoreItems = this.allScores.data.labels.map((subject, index) => ({
        subject,
        grade: this.allScores.data.datasets[0].data[index],
      }));
      this.scoreItems = [...this.scoreItems];

      if (this.$refs.chartComponent && this.$refs.chartComponent.chart) {
        this.$refs.chartComponent.chart.update();
      }
    },
    addScoreItem() {
      const subjects = this.allScores.data.labels;
      const grades = this.allScores.data.datasets[0].data;
      subjects.forEach((subject, index) => {
        this.scoreItems.push({ subject, grade: grades[index] });
      });
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
        const scoresArray = this.scoreItems.map((item) => ({
          subject: item.subject,
          grade: this.convertGradeToPoint(item.grade),
        }));
        console.log('hi', scoresArray);

        const response = await fetch(
          `${process.env.VUE_APP_FIREBASE_DATABASE_URL}/scores/${this.userId}/semesters/${this.selectedGrade}.json`
        );
        const data = await response.json();

        for (let day in data) {
          if (data[day] && data[day].schedules) {
            data[day].schedules.forEach(async (schedule, index) => {
              const matchingScore = scoresArray.find(
                (score) => score.subject === schedule.title
              );
              if (matchingScore) {
                const pointUpdate = { point: matchingScore.grade };

                await fetch(
                  `${process.env.VUE_APP_FIREBASE_DATABASE_URL}/scores/${this.userId}/semesters/${this.selectedGrade}/${day}/schedules/${index}.json`,
                  {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(pointUpdate),
                  }
                );
              }
            });
          }
        }
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
              }
            });
          }
        }

        this.allScores.data.labels = subjects;
        this.allScores.data.datasets[0].data = grades;

        const letterGrades = grades.map((point) =>
          point !== undefined ? this.convertPointToGrade(point) : ''
        );

        this.scoreItems = subjects.map((subject, index) => ({
          subject,
          grade: letterGrades[index],
        }));
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    },

    async fetchAllSemestersScores() {
      try {
        const allSemesters = [
          '1grade_1semester',
          '1grade_2semester',
          '2grade_1semester',
          '2grade_2semester',
          '3grade_1semester',
          '3grade_2semester',
          '4grade_1semester',
          '4grade_2semester',
        ];

        this.semesterGPAs = [];
        const semesterData = {};

        for (let semester of allSemesters) {
          const response = await fetch(
            `${process.env.VUE_APP_FIREBASE_DATABASE_URL}/scores/${this.userId}/semesters/${semester}/.json`
          );
          const data = await response.json();

          const subjects = [];
          const grades = [];

          for (let day in data) {
            if (data[day] && data[day].schedules) {
              data[day].schedules.forEach((schedule) => {
                if (schedule.title && typeof schedule.point === 'number') {
                  subjects.push(schedule.title);
                  grades.push(schedule.point);
                }
              });
            }
          }

          if (grades.length > 0) {
            const totalPoints = grades.reduce((acc, point) => acc + point, 0);
            const gpa = (totalPoints / grades.length).toFixed(2);

            semesterData[semester] = {
              subjects,
              grades,
              gpa,
            };

            this.semesterGPAs.push({ semester, gpa: parseFloat(gpa) });
          }
        }

        console.log('Semester Data:', semesterData);
        console.log('Semester GPAs:', this.semesterGPAs);

        this.updateGPAChart();
      } catch (error) {
        console.error('Error fetching all scores:', error);
      }
    },

    updateGPAChart() {
      this.semesterGPAs.sort((a, b) => {
        const order = [
          '1grade_1semester',
          '1grade_2semester',
          '2grade_1semester',
          '2grade_2semester',
          '3grade_1semester',
          '3grade_2semester',
          '4grade_1semester',
          '4grade_2semester',
        ];
        return order.indexOf(a.semester) - order.indexOf(b.semester);
      });

      this.thisScores.data.labels = this.semesterGPAs.map((item) =>
        this.formatSemesterLabel(item.semester)
      );
      this.thisScores.data.datasets[0].data = this.semesterGPAs.map(
        (item) => item.gpa
      );

      if (this.$refs.chartComponent && this.$refs.chartComponent.chart) {
        this.$refs.chartComponent.chart.update();
      }
    },

    formatSemesterLabel(semester) {
      const [grade, sem] = semester.split('_');
      return `${grade[0]}학년 ${sem[0]}학기`;
    },

    convertPointToGrade(point) {
      if (typeof point !== 'number' || isNaN(point)) {
        console.error('Invalid point value:', point);
        return '';
      }
      const formattedPoint = point.toFixed(1);
      const pointToGradeMap = {
        4.5: 'A+',
        '4.0': 'A0',
        3.5: 'B+',
        '3.0': 'B0',
        2.5: 'C+',
        '2.0': 'C0',
        1.5: 'D+',
        '1.0': 'D0',
        '0.0': 'F',
      };
      return pointToGradeMap[formattedPoint] || '';
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

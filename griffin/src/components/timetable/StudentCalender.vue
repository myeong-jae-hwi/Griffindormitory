<template>
  <div class="calendar">
    <div class="calender-head">
      <select
        class="calender-select"
        v-model="selectedSemesterLocal"
        @change="onSemesterChange"
      >
        <option v-for="semester in semesters" :key="semester" :value="semester">
          {{ semester }}
        </option>
      </select>
      <h2>시간표</h2>
      <button class="add-button" @click="openAddModal">+</button>
    </div>
    <table cellspacing="0" cellpadding="0" border="0">
      <thead>
        <tr class="days">
          <th></th>
          <th>월</th>
          <th>화</th>
          <th>수</th>
          <th>목</th>
          <th>금</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="hour in hoursDisplay" :key="hour">
          <td class="time">{{ hour }}</td>
          <td
            v-for="day in days"
            :key="day"
            :class="[
              'schedule-cell',
              { 'empty-cell': !getSchedulesFor(day, hour).length },
            ]"
          >
            <div
              v-for="(schedule, index) in getSchedulesFor(day, hour)"
              :key="index"
              :class="['schedule-item', getScheduleColor(schedule.title)]"
              @click="showModal(day, schedule)"
            >
              {{ isScheduleStart(schedule, hour) ? schedule.title : '' }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="addModalVisible" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeAddModal">&times;</span>
        <h2>스케줄 추가</h2>
        <form @submit.prevent="handleAddSchedule" class="schedule-form">
          <input
            v-model="newSchedule.title"
            type="text"
            placeholder="수업명"
            required
          />
          <div class="time-select">
            <select
              v-model="newSchedule.startHour"
              @change="updateAmPm('start')"
              required
            >
              <option v-for="hour in hours" :key="hour" :value="hour">
                {{ hour }}시
              </option>
            </select>
            <select v-model="newSchedule.startMinute" required>
              <option v-for="minute in minutes" :key="minute" :value="minute">
                {{ minute }}분
              </option>
            </select>
            <span>{{ newSchedule.startAmPm }}</span>
          </div>
          <div class="time-select">
            <select
              v-model="newSchedule.endHour"
              @change="updateAmPm('end')"
              required
            >
              <option v-for="hour in hours" :key="hour" :value="hour">
                {{ hour }}시
              </option>
            </select>
            <select v-model="newSchedule.endMinute" required>
              <option v-for="minute in minutes" :key="minute" :value="minute">
                {{ minute }}분
              </option>
            </select>
            <span>{{ newSchedule.endAmPm }}</span>
          </div>
          <select v-model="newSchedule.day" required class="day-select">
            <option v-for="day in days" :key="day" :value="day">
              {{ day }}요일
            </option>
          </select>
          <button class="confirm-button" type="submit">추가</button>
        </form>
      </div>
    </div>

    <div v-if="modalVisible" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>상세 일정</h2>
        <p><strong>수업명:</strong> {{ selectedSchedule.title }}</p>
        <p>
          <strong>시간:</strong> {{ selectedSchedule.startTime }} -
          {{ selectedSchedule.endTime }}
        </p>
        <p><strong>요일:</strong> {{ selectedDay }}</p>
        <button @click="handleRemoveSchedule">삭제</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      selectedSemesterLocal: '',
    };
  },
  computed: {
    ...mapState('schedule', [
      'semesters',
      'newSchedule',
      'modalVisible',
      'addModalVisible',
      'selectedSchedule',
      'selectedDay',
      'selectedIndex',
      'selectedSemester',
      'schedules',
    ]),
    ...mapState('users', ['userID']),
    ...mapGetters('users', ['currentUser']),
    ...mapGetters('schedule', ['getSchedulesFor', 'getScheduleColor']),
    hoursDisplay() {
      return [
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
      ];
    },
    days() {
      return ['월', '화', '수', '목', '금'];
    },
    hours() {
      return [
        '09',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
      ];
    },
    minutes() {
      return [
        '00',
        '05',
        '10',
        '15',
        '20',
        '25',
        '30',
        '35',
        '40',
        '45',
        '50',
        '55',
      ];
    },
  },
  methods: {
    ...mapActions('schedule', [
      'loadSchedule',
      'addSchedule',
      'removeSchedule',
      'updateAmPm',
    ]),
    ...mapMutations('schedule', [
      'SET_SELECTED_SEMESTER',
      'SET_NEW_SCHEDULE',
      'SET_MODAL_VISIBLE',
      'SET_ADD_MODAL_VISIBLE',
      'SET_SELECTED_SCHEDULE',
      'SET_SELECTED_DAY',
      'SET_SELECTED_INDEX',
      'SET_SCHEDULE_COLOR',
    ]),
    async handleAddSchedule() {
      const result = await this.addSchedule(this.newSchedule);
      if (result.success) {
        const color = this.getRandomColor();
        this.$store.commit('schedule/SET_SCHEDULE_COLOR', {
          title: this.newSchedule.title,
          color,
        });
        this.closeAddModal();
      } else {
        alert(result.message);
      }
    },
    isScheduleStart(schedule, hour) {
      return schedule.startTime === hour;
    },
    getRandomColor() {
      const colors = [
        'pastel-red',
        'pastel-orange',
        'pastel-yellow',
        'pastel-green',
        'pastel-blue',
        'pastel-indigo',
        'pastel-purple',
        'pastel-pink',
        'pastel-teal',
        'pastel-brown',
      ];

      const scheduleColors = this.$store.state.scheduleColors || {};

      const availableColors = colors.filter(
        (color) => !Object.values(scheduleColors).includes(color)
      );

      return availableColors.length > 0
        ? availableColors[Math.floor(Math.random() * availableColors.length)]
        : 'pastel-gray';
    },
    async showModal(day, schedule) {
      this.SET_SELECTED_SCHEDULE(schedule);
      this.SET_SELECTED_DAY(day);
      this.SET_MODAL_VISIBLE(true);
    },

    async handleRemoveSchedule() {
      await this.removeSchedule({
        day: this.selectedDay,
        schedule: this.selectedSchedule,
      });
      this.closeModal();
    },
    closeModal() {
      this.SET_MODAL_VISIBLE(false);
      this.SET_SELECTED_SCHEDULE({});
      this.SET_SELECTED_DAY('');
      this.SET_SELECTED_INDEX(null);
    },
    openAddModal() {
      this.SET_ADD_MODAL_VISIBLE(true);
    },
    closeAddModal() {
      this.SET_ADD_MODAL_VISIBLE(false);
      this.SET_NEW_SCHEDULE({
        title: '',
        startHour: '09',
        startMinute: '00',
        endHour: '09',
        endMinute: '00',
        startAmPm: '오전',
        endAmPm: '오전',
        day: '월',
      });
    },
    onSemesterChange() {
      this.SET_SELECTED_SEMESTER(this.selectedSemesterLocal);
      this.loadSchedule();
    },
  },
  created() {
    this.selectedSemesterLocal = this.selectedSemester;
    if (this.userID && this.currentUser) {
      this.loadSchedule();
    }
  },
  watch: {
    selectedSemesterLocal(newValue) {
      this.SET_SELECTED_SEMESTER(newValue);
      this.loadSchedule();
    },
    currentUser(newUser) {
      if (newUser) {
        this.loadSchedule();
      }
    },
  },
};
</script>

<style scoped>
.calendar {
  max-width: 95%;
  margin: 0 auto;
  text-align: center;
}

.calender-head {
  align-items: center;
  justify-content: space-between;
  display: flex;
  position: relative;
}

.calender-select {
  flex-grow: 1;
  display: flex;
  justify-content: center;
}

.calender-select select {
  font-size: 1rem;
  padding: 5px 10px;
  width: auto;
  min-width: 10ch;
  max-width: 20ch;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.calender-head h2 {
  flex: 2;
  text-align: left;
}

.add-button {
  flex: 1;
  text-align: right;
  color: black;
  font-size: 2.5rem;
  padding: 5px;
  border: none;
  cursor: pointer;
  background-color: transparent;
}

.add-button:hover {
  color: royalblue;
}

.confirm-button {
  flex: none;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: royalblue;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 10px;
}

.confirm-button:hover {
  background-color: rgb(21, 80, 255);
}

.schedule-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.time-select {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.time-select select {
  margin-right: 5px;
}

.time-select span {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
}

input,
select {
  flex: 1;
  margin: 5px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
}
/*
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1vh;
}
*/
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1vh;
  table-layout: fixed;
  border-spacing: 0;
}

th,
td.time {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

tbody {
  border: 1px solid #ccc;
}

td {
  border-left: 1px solid #ccc;
  padding: 0;
}

.time {
  width: 50px;
}

.schedule-cell {
  height: 50px;
  white-space: normal;
  word-wrap: break-word;
  text-align: left;
  table-layout: fixed;
  border: 0 1px solid #ccc;
}
.empty-cell {
  border: 1px solid #ccc;
}

.schedule-item {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal;
  height: 100%;
  border: none;
}

/*
 .schedule-item:hover {
  background: #e0e0e0;
}
*/

.pastel-red {
  background-color: #ffcccb;
  border: none;
}

.pastel-orange {
  background-color: #ffddcc;
}

.pastel-yellow {
  background-color: #ffffcc;
}

.pastel-green {
  background-color: #ccffcc;
}

.pastel-blue {
  background-color: #cce5ff;
}

.pastel-indigo {
  background-color: #ccccff;
}

.pastel-purple {
  background-color: #e5ccff;
}

.pastel-pink {
  background-color: #ffccff;
}

.pastel-teal {
  background-color: #ccffff;
}

.pastel-brown {
  background-color: #ffebcc;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>

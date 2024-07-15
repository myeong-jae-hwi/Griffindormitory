<template>
  <div class="calendar">
    <div class="calender-head">
      <select
        class="calender-select"
        v-model="selectedSemester"
        @change="loadSchedule"
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
          <td class="time">{{ formatTime(hour) }}</td>
          <td v-for="day in days" :key="day" class="schedule-cell">
            <div
              v-for="(schedule, index) in getSchedulesFor(day, hour)"
              :key="index"
              :class="['schedule-cell', getScheduleColor(schedule.title)]"
              @click="showModal(day, index)"
            >
              {{ schedule.title }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="addModalVisible" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeAddModal">&times;</span>
        <h2>스케줄 추가</h2>
        <form @submit.prevent="addSchedule" class="schedule-form">
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
                {{ hour }}
              </option>
            </select>
            <select v-model="newSchedule.startMinute" required>
              <option v-for="minute in minutes" :key="minute" :value="minute">
                {{ minute }}
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
                {{ hour }}
              </option>
            </select>
            <select v-model="newSchedule.endMinute" required>
              <option v-for="minute in minutes" :key="minute" :value="minute">
                {{ minute }}
              </option>
            </select>
            <span>{{ newSchedule.endAmPm }}</span>
          </div>
          <select v-model="newSchedule.day" required class="day-select">
            <option v-for="day in days" :key="day" :value="day">
              {{ day }}
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
        <button @click="removeSchedule(selectedDay, selectedIndex)">
          삭제
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from '@/firebase/config.js';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, set, get, child } from 'firebase/database';

export default {
  data() {
    return {
      user: null,
      selectedSemester: '1학년 1학기',
      semesters: [
        '1학년 1학기',
        '1학년 2학기',
        '2학년 1학기',
        '2학년 2학기',
        '3학년 1학기',
        '3학년 2학기',
        '4학년 1학기',
        '4학년 2학기',
      ],
      newSchedule: {
        title: '',
        startHour: '08',
        startMinute: '00',
        endHour: '08',
        endMinute: '00',
        startAmPm: '오전',
        endAmPm: '오전',
        day: '월',
      },
      schedules: {
        월: [],
        화: [],
        수: [],
        목: [],
        금: [],
      },
      hours: [
        '08',
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
      ],
      minutes: [
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
      ],
      hoursDisplay: [
        '08:00',
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
      ],
      days: ['월', '화', '수', '목', '금'],
      colors: [
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
      ],
      scheduleColors: {},
      deleteVisibility: {
        월: [],
        화: [],
        수: [],
        목: [],
        금: [],
      },
      modalVisible: false,
      addModalVisible: false,
      selectedSchedule: {},
      selectedDay: '',
      selectedIndex: null,
    };
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.loadUserProfile();
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    async loadUserProfile() {
      if (this.user) {
        try {
          await this.loadSchedule();
        } catch (e) {
          console.error('사용자 프로필 불러오기 중 오류 발생:', e);
        }
      }
    },
    async addSchedule() {
      const {
        title,
        startHour,
        startMinute,
        endHour,
        endMinute,
        startAmPm,
        endAmPm,
        day,
      } = this.newSchedule;

      const startTime = this.convertTo24HourFormat(
        startHour,
        startMinute,
        startAmPm
      );
      const endTime = this.convertTo24HourFormat(endHour, endMinute, endAmPm);

      if (title && startTime && endTime && day) {
        if (this.isScheduleConflict(day, startTime, endTime)) {
          alert('추가하려는 일정이 이미 저장되어 있습니다.');
          return;
        }
        this.schedules[day].push({ title, startTime, endTime });
        this.deleteVisibility[day].push(false);
        this.newSchedule = {
          title: '',
          startHour: '08',
          startMinute: '00',
          endHour: '08',
          endMinute: '00',
          startAmPm: '오전',
          endAmPm: '오전',
          day: '월',
        };
        this.closeAddModal();

        if (this.user) {
          try {
            const encodedSemester = encodeURIComponent(
              this.selectedSemester.replace(/ /g, '_')
            );
            const semesterPath = `users/${this.user.uid}/semesters/${encodedSemester}/${day}`;
            const dbRef = ref(db, semesterPath);
            await set(dbRef, { schedules: this.schedules[day] });
            console.log('시간표가 저장되었습니다.');
          } catch (e) {
            console.error('시간표 저장 중 오류 발생:', e);
          }
        }
      }
    },
    async loadSchedule() {
      if (this.user) {
        try {
          const encodedSemester = encodeURIComponent(
            this.selectedSemester.replace(/ /g, '_')
          );
          const semesterPath = `users/${this.user.uid}/semesters/${encodedSemester}`;
          const dbRef = ref(db, semesterPath);
          const promises = this.days.map(async (day) => {
            const dayRef = child(dbRef, day);
            const snapshot = await get(dayRef);
            if (snapshot.exists()) {
              this.schedules[day] = snapshot.val().schedules || [];
              console.log("1"+ this.schedules[day])

            } else {
              this.schedules[day] = [];
              console.log("2" + this.schedules[day])

            }
          });
          await Promise.all(promises);
          console.log('시간표가 로드되었습니다.');
        } catch (e) {
          console.error('시간표 불러오기 중 오류 발생:', e);
          this.days.forEach((day) => {
            this.schedules[day] = [];
          });
        }
      }
    },
    async removeSchedule(day, index) {
      this.schedules[day].splice(index, 1);
      this.deleteVisibility[day].splice(index, 1);
      this.closeModal();
      if (this.user) {
        try {
          const encodedSemester = encodeURIComponent(
            this.selectedSemester.replace(/ /g, '_')
          );
          const semesterPath = `users/${this.user.uid}/semesters/${encodedSemester}/${day}`;
          const dbRef = ref(db, semesterPath);
          await set(dbRef, { schedules: this.schedules[day] });
          console.log('시간표가 업데이트되었습니다.');
        } catch (e) {
          console.error('시간표 업데이트 중 오류 발생:', e);
        }
      }
    },
    updateAmPm(type) {
      if (type === 'start') {
        const hour = parseInt(this.newSchedule.startHour, 10);
        this.newSchedule.startAmPm = hour < 12 ? '오전' : '오후';
      } else if (type === 'end') {
        const hour = parseInt(this.newSchedule.endHour, 10);
        this.newSchedule.endAmPm = hour < 12 ? '오전' : '오후';
      }
    },
    convertTo24HourFormat(hour, minute, amPm) {
      let hour24 = parseInt(hour, 10);
      if (amPm === '오후' && hour24 !== 12) {
        hour24 += 12;
      }
      if (amPm === '오전' && hour24 === 12) {
        hour24 = 0;
      }
      return `${hour24 < 10 ? '0' : ''}${hour24}:${minute}`;
    },
    isScheduleConflict(day, startTime, endTime) {
      const newStart = new Date(`1970-01-01T${startTime}:00`);
      const newEnd = new Date(`1970-01-01T${endTime}:00`);

      return this.schedules[day].some((schedule) => {
        const scheduleStart = new Date(`1970-01-01T${schedule.startTime}:00`);
        const scheduleEnd = new Date(`1970-01-01T${schedule.endTime}:00`);

        return (
          (newStart < scheduleEnd && newStart >= scheduleStart) ||
          (newEnd > scheduleStart && newEnd <= scheduleEnd) ||
          (newStart <= scheduleStart && newEnd >= scheduleEnd)
        );
      });
    },
    getSchedulesFor(day, hour) {
      return this.schedules[day].filter((schedule) => {
        const scheduleStart = parseInt(schedule.startTime.replace(':', ''), 10);
        const scheduleEnd = parseInt(schedule.endTime.replace(':', ''), 10);
        const currentHour = parseInt(hour.replace(':', ''), 10);
        return scheduleStart <= currentHour && currentHour < scheduleEnd;
      });
    },
    formatTime(hour) {
      return hour;
    },
    showModal(day, index) {
      this.selectedSchedule = this.schedules[day][index];
      this.selectedDay = day;
      this.selectedIndex = index;
      this.modalVisible = true;
    },
    closeModal() {
      this.modalVisible = false;
      this.selectedSchedule = {};
      this.selectedDay = '';
      this.selectedIndex = null;
    },
    openAddModal() {
      this.addModalVisible = true;
    },
    closeAddModal() {
      this.addModalVisible = false;
      this.newSchedule = {
        title: '',
        startHour: '08',
        startMinute: '00',
        endHour: '08',
        endMinute: '00',
        startAmPm: '오전',
        endAmPm: '오전',
        day: '월',
      };
    },
    getScheduleColor(title) {
      if (!this.scheduleColors[title]) {
        const availableColors = this.colors.filter(
          (color) => !Object.values(this.scheduleColors).includes(color)
        );
        const randomColor =
          availableColors[Math.floor(Math.random() * availableColors.length)];
        this.scheduleColors[title] = randomColor;
      }
      return this.scheduleColors[title];
    },
  },
};
</script>

<style scoped>
.calendar {
  max-width: 800px;
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

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1vh;
}

th,
td.time {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

td {
  border: 1px solid #ccc;
  padding: 0;
}

.time {
  width: 50px;
}

.schedule-cell {
  min-height: 50px;
}

.schedule-item {
  display: flex;
  justify-content: space-between;
  margin: 2px 0;
  padding: 5px;
  cursor: pointer;
}

.schedule-item:hover {
  background: #e0e0e0;
}

.pastel-red {
  background-color: #ffcccb;
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

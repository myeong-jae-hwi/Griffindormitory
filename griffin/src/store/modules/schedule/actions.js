import { ref, set, get, child } from 'firebase/database';
import { db } from '@/firebase/config';

export default {
  async loadUserProfile({ state, dispatch }) {
    if (state.user) {
      try {
        console.log('Loading user profile...');
        await dispatch('loadSchedule');
      } catch (e) {
        console.error('사용자 프로필 불러오기 중 오류 발생:', e);
      }
    }
  },
  async addSchedule({ state, commit }, newSchedule) {
    const { title, startHour, startMinute, endHour, endMinute, day } =
      newSchedule;
    const startTime = `${startHour}:${startMinute}`;
    const endTime = `${endHour}:${endMinute}`;

    if (title && startTime && endTime && day) {
      const scheduleConflict = state.schedules[day].some((schedule) => {
        const scheduleStart = new Date(`1970-01-01T${schedule.startTime}:00`);
        const scheduleEnd = new Date(`1970-01-01T${schedule.endTime}:00`);
        const newStart = new Date(`1970-01-01T${startTime}:00`);
        const newEnd = new Date(`1970-01-01T${endTime}:00`);

        return (
          (newStart < scheduleEnd && newStart >= scheduleStart) ||
          (newEnd > scheduleStart && newEnd <= scheduleEnd) ||
          (newStart <= scheduleStart && newEnd >= scheduleEnd)
        );
      });

      if (scheduleConflict) {
        alert('추가하려는 일정이 이미 저장되어 있습니다.');
        return;
      }

      const schedules = [
        ...state.schedules[day],
        { title, startTime, endTime },
      ];
      commit('setSchedules', { day, schedules });

      if (state.user) {
        try {
          const encodedSemester = encodeURIComponent(
            state.selectedSemester
              .replace(/ /g, '_')
              .replace(/학년/g, 'grade')
              .replace(/학기/g, 'semester')
          );
          const tablePath = `users/${state.user.uid}/semesters/${encodedSemester}/${day}`;
          const dbRef = ref(db, tablePath);
          await set(dbRef, { schedules });
          console.log('시간표가 저장되었습니다.');
        } catch (e) {
          console.error('시간표 저장 중 오류 발생:', e);
        }
      }
    }
  },
  async loadSchedule({ state, commit }) {
    if (state.user) {
      try {
        console.log('Loading schedule...');
        const encodedSemester = encodeURIComponent(
          state.selectedSemester
            .replace(/ /g, '_')
            .replace(/학년/g, 'grade')
            .replace(/학기/g, 'semester')
        );
        const tablePath = `users/${state.user.uid}/semesters/${encodedSemester}`;
        const dbRef = ref(db, tablePath);
        const promises = state.days.map(async (day) => {
          const dayRef = child(dbRef, day);
          const snapshot = await get(dayRef);
          console.log(`Snapshot for ${day}:`, snapshot.val());
          const schedules = snapshot.exists()
            ? snapshot.val().schedules || []
            : [];
          commit('setSchedules', { day, schedules });
          console.log(`Schedules for ${day} set to:`, schedules);
        });
        await Promise.all(promises);
        console.log('시간표가 로드되었습니다.');
      } catch (e) {
        console.error('시간표 불러오기 중 오류 발생:', e);
        state.days.forEach((day) => {
          commit('setSchedules', { day, schedules: [] });
        });
      }
    }
  },
  async removeSchedule({ state, commit }, { day, index }) {
    const schedules = [...state.schedules[day]];
    schedules.splice(index, 1);
    commit('setSchedules', { day, schedules });

    if (state.user) {
      try {
        const encodedSemester = encodeURIComponent(
          state.selectedSemester
            .replace(/ /g, '_')
            .replace(/학년/g, 'grade')
            .replace(/학기/g, 'semester')
        );
        const tablePath = `users/${state.user.uid}/semesters/${encodedSemester}/${day}`;
        const dbRef = ref(db, tablePath);
        await set(dbRef, { schedules });
        console.log('시간표가 업데이트되었습니다.');
      } catch (e) {
        console.error('시간표 업데이트 중 오류 발생:', e);
      }
    }
  },
  async updateSchedule({ state, commit }, updatedSchedule) {
    const { title, startHour, startMinute, endHour, endMinute, day, index } =
      updatedSchedule;
    const startTime = `${startHour}:${startMinute}`;
    const endTime = `${endHour}:${endMinute}`;

    if (title && startTime && endTime && day) {
      const scheduleConflict = state.schedules[day].some((schedule, i) => {
        if (i === index) return false;
        const scheduleStart = new Date(`1970-01-01T${schedule.startTime}:00`);
        const scheduleEnd = new Date(`1970-01-01T${schedule.endTime}:00`);
        const newStart = new Date(`1970-01-01T${startTime}:00`);
        const newEnd = new Date(`1970-01-01T${endTime}:00`);

        return (
          (newStart < scheduleEnd && newStart >= scheduleStart) ||
          (newEnd > scheduleStart && newEnd <= scheduleEnd) ||
          (newStart <= scheduleStart && newEnd >= scheduleEnd)
        );
      });

      if (scheduleConflict) {
        alert('수정하려는 일정이 이미 저장되어 있습니다.');
        return;
      }

      const schedules = [...state.schedules[day]];
      schedules[index] = { title, startTime, endTime };
      commit('setSchedules', { day, schedules });

      if (state.user) {
        try {
          const encodedSemester = encodeURIComponent(
            state.selectedSemester
              .replace(/ /g, '_')
              .replace(/학년/g, 'grade')
              .replace(/학기/g, 'semester')
          );
          const tablePath = `users/${state.user.uid}/semesters/${encodedSemester}/${day}`;
          const dbRef = ref(db, tablePath);
          await set(dbRef, { schedules });
          console.log('시간표가 업데이트되었습니다.');
        } catch (e) {
          console.error('시간표 업데이트 중 오류 발생:', e);
        }
      }
    }
  },
};

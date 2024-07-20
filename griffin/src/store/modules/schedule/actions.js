import { db } from '@/firebase/config.js';
import { ref, set, get, child } from 'firebase/database';

export default {
  async loadSchedule({ commit, rootGetters, state }) {
    const currentUser = rootGetters['users/currentUser'];
    if (currentUser) {
      try {
        commit('RESET_SCHEDULES');
        const encodedSemester = encodeURIComponent(
          state.selectedSemester
            .replace(/ /g, '_')
            .replace(/학년/g, 'grade')
            .replace(/학기/g, 'semester')
        );
        const semesterPath = `users/${currentUser.id}/semesters/${encodedSemester}`;
        const dbRef = ref(db, semesterPath);
        const days = ['월', '화', '수', '목', '금'];
        const promises = days.map(async (day) => {
          const dayRef = child(dbRef, day);
          const snapshot = await get(dayRef);
          if (snapshot.exists()) {
            commit('SET_SCHEDULES', {
              day,
              schedules: snapshot.val().schedules || [],
            });
          } else {
            commit('SET_SCHEDULES', { day, schedules: [] });
          }
        });
        await Promise.all(promises);
        console.log('시간표 불러오기 성공~~');
      } catch (e) {
        console.error('시간표 불러오기 중 오류 발생:', e);
        commit('RESET_SCHEDULES');
      }
    }
  },
  async addSchedule({ commit, state, dispatch, rootGetters }, newSchedule) {
    const currentUser = rootGetters['users/currentUser'];
    const { title, startHour, startMinute, endHour, endMinute, day } =
      newSchedule;
    const startTime = `${startHour}:${startMinute}`;
    const endTime = `${endHour}:${endMinute}`;

    if (title && startTime && endTime && day) {
      const conflict = await dispatch('isScheduleConflict', {
        day,
        startTime,
        endTime,
      });
      if (conflict) {
        return {
          success: false,
          message: '추가하려는 일정이 이미 저장되어 있습니다.',
        };
      }
      commit('ADD_SCHEDULE', { day, schedule: { title, startTime, endTime } });

      if (currentUser) {
        try {
          const encodedSemester = encodeURIComponent(
            state.selectedSemester
              .replace(/ /g, '_')
              .replace(/학년/g, 'grade')
              .replace(/학기/g, 'semester')
          );
          const semesterPath = `users/${currentUser.id}/semesters/${encodedSemester}/${day}`;
          const dbRef = ref(db, semesterPath);
          await set(dbRef, { schedules: state.schedules[day] });
          console.log('시간표가 저장되었습니다.');
          return { success: true };
        } catch (e) {
          console.error('시간표 저장 중 오류 발생:', e);
          return {
            success: false,
            message: '시간표 저장 중 오류가 발생했습니다.',
          };
        }
      }
    }
    return { success: false, message: '입력 정보가 올바르지 않습니다.' };
  },

  isScheduleConflict({ state }, { day, startTime, endTime }) {
    const newStart = new Date(`1970-01-01T${startTime}:00`);
    const newEnd = new Date(`1970-01-01T${endTime}:00`);

    return state.schedules[day].some((schedule) => {
      const scheduleStart = new Date(`1970-01-01T${schedule.startTime}:00`);
      const scheduleEnd = new Date(`1970-01-01T${schedule.endTime}:00`);

      return (
        (newStart < scheduleEnd && newStart >= scheduleStart) ||
        (newEnd > scheduleStart && newEnd <= scheduleEnd) ||
        (newStart <= scheduleStart && newEnd >= scheduleEnd)
      );
    });
  },
  updateAmPm({ commit, state }, type) {
    const newSchedule = { ...state.newSchedule };
    if (type === 'start') {
      const hour = parseInt(newSchedule.startHour, 10);
      newSchedule.startAmPm = hour < 12 ? '오전' : '오후';
    } else if (type === 'end') {
      const hour = parseInt(newSchedule.endHour, 10);
      newSchedule.endAmPm = hour < 12 ? '오전' : '오후';
    }
    commit('SET_NEW_SCHEDULE', newSchedule);
  },
};

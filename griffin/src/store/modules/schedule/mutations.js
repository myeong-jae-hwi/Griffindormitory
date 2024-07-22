export default {
  SET_SELECTED_SEMESTER(state, semester) {
    state.selectedSemester = semester;
  },
  SET_SCHEDULES(state, { day, schedules }) {
    state.schedules[day] = schedules;
  },
  ADD_SCHEDULE(state, { day, schedule }) {
    state.schedules[day].push(schedule);
  },
  REMOVE_SCHEDULE(state, { day, index }) {
    if (state.schedules[day]) {
      state.schedules[day].splice(index, 1);
    }
  },
  SET_NEW_SCHEDULE(state, newSchedule) {
    state.newSchedule = newSchedule;
  },
  SET_MODAL_VISIBLE(state, visible) {
    state.modalVisible = visible;
  },
  SET_ADD_MODAL_VISIBLE(state, visible) {
    state.addModalVisible = visible;
  },
  SET_SELECTED_SCHEDULE(state, schedule) {
    state.selectedSchedule = schedule;
  },
  SET_SELECTED_DAY(state, day) {
    state.selectedDay = day;
  },
  SET_SELECTED_INDEX(state, index) {
    state.selectedIndex = index;
  },
  RESET_SCHEDULES(state) {
    state.schedules = {
      월: [],
      화: [],
      수: [],
      목: [],
      금: [],
    };
  },
};

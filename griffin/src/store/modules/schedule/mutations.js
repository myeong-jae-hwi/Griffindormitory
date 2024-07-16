export default {
  setSelectedSemester(state, semester) {
    state.selectedSemester = semester;
  },
  setSchedules(state, { day, schedules }) {
    state.schedules[day] = schedules;
  },
};

export default {
  getSchedulesFor: (state) => (day, hour) => {
    if (!state.schedules || !state.schedules[day]) {
      return [];
    }
    return state.schedules[day].filter((schedule) => {
      const scheduleStart = parseInt(schedule.startTime.replace(':', ''), 10);
      const scheduleEnd = parseInt(schedule.endTime.replace(':', ''), 10);
      const currentHour = parseInt(hour.replace(':', ''), 10);
      return scheduleStart <= currentHour && currentHour < scheduleEnd;
    });
  },
  getScheduleColor: (state) => (title) => {
    console.log(state.scheduleColors[title]);
    return state.scheduleColors[title] || 'default-color-class';
  },
};

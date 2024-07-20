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
    if (!state.scheduleColors[title]) {
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
      const availableColors = colors.filter(
        (color) => !Object.values(state.scheduleColors).includes(color)
      );
      const randomColor =
        availableColors[Math.floor(Math.random() * availableColors.length)];
      state.scheduleColors[title] = randomColor;
    }
    return state.scheduleColors[title];
  },
};

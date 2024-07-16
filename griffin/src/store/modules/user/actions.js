const dbURL = process.env.VUE_APP_FIREBASE_DATABASE_URL;

export default {
  async fetchInitialData(context) {
    try {
      const response = await fetch(`${dbURL}/users.json`);

      if (!response.ok) {
        throw new Error('Failed to fetch initial data');
      }

      const usersData = await response.json();
      const users = [];

      for (const key in usersData) {
        const user = {
          id: key,
          name: usersData[key].name,
          email: usersData[key].email,
          createdAt: usersData[key].createdAt,
          semesters: [], // 여기서 더 아래로 내려가야함
        };

        const semestersData = usersData[key].semesters;
        for (const semesterKey in semestersData) {
          const semester = {
            name: semesterKey,
            days: [],
          };

          const daysData = semestersData[semesterKey];
          for (const dayKey in daysData) {
            const day = {
              name: dayKey,
              titles: [],
            };

            const schedulesData = daysData[dayKey].schedules;
            for (const schedule of schedulesData) {
              day.titles.push(schedule.title);
            }

            semester.days.push(day);
          }

          user.semesters.push(semester);
        }

        users.unshift(user);
      }

      context.commit('setUsers', users);
    } catch (error) {
      console.error('Error fetching initial data:', error.message);
    }
  },

  async registerUser(context, data) {
    const userData = {
      name: data.name,
      email: data.email,
      createdAt: data.createdAt,
      semesters: data.semesters,
    };

    try {
      const response = await fetch(`${dbURL}/users.json`, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to register user');
      }

      const responseData = await response.json();
      context.commit('registerUser', { id: responseData.name, ...userData });

      context.dispatch('fetchInitialData');
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  },
};

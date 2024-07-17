const dbURL = process.env.VUE_APP_FIREBASE_DATABASE_URL;

export default {
  async fetchInitialData(context, {uid}) {
    try {
      const response = await fetch(`${dbURL}/users/${uid}.json`);
      if (!response.ok) {
        throw new Error('Failed to fetch initial data');
      }
      const usersData = await response.json();
      const users = [];

      for (const key in usersData) {
        const user = {
          id: key,
          email: usersData[key].email,
          name: usersData[key].name,
          university: usersData[key].university,
          semester: usersData[key].preferences,

        };
        users.push(user);
      }
      context.commit('setusers', users);
    } catch (error) {
      console.log('Error fetching initial data:', error.message);
    }
  },

  async registierUser(context, data) {
    const userData = {
      email: data.email,
      name: data.name,
      university: data.university,
      semester:[],
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
        throw new Error('Failed to register User');
      }

      const responseData = await response.json();
      context.commit('registerUser', { id: responseData.name, ...userData });

      context.dispatch('fetchInitialData');
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  },
};

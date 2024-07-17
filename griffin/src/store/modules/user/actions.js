const dbURL = process.env.VUE_APP_FIREBASE_DATABASE_URL;

export default {
  async fetchUserInitialData({ commit }, { uid }) {
    try {
      console.log('Fetching data for user:', uid);
      const response = await fetch(`${dbURL}/users/${uid}.json`);
      if (!response.ok) {
        throw new Error('Failed to fetch initial data');
      }
      const userData = await response.json();
      const user = {
        id: uid,
        email: userData.email,
        name: userData.name,
        university: userData.university,
        studentId: userData.studentId,
        semester: userData.semester || [],
      };
      console.log('User data fetched:', user);
      commit('setUsers', [user]);
    } catch (error) {
      console.log('Error fetching initial data:', error.message);
    }
  },

  async registerUser({ commit, dispatch }, data) {
    const userData = {
      email: data.email,
      name: data.name,
      university: data.university,
      studentId: data.studentId,
      semester: [],
    };

    try {
      console.log('Registering user:', userData);
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
      console.log('User registered with ID:', responseData.name);
      commit('registerUser', { id: responseData.name, ...userData });
      commit('setUserId', responseData.name);

      dispatch('fetchUserInitialData', { uid: responseData.name });
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  },
};

const dbURL = process.env.VUE_APP_FIREBASE_DATABASE_URL;

export default {
  async fetchInitialData(context) {
    try {
      const response = await fetch(`${dbURL}/roommates.json`);

      if (!response.ok) {
        throw new Error('Failed to fetch initial data');
      }
      const matesData = await response.json();
      const mates = [];

      for (const key in matesData) {
        const mate = {
          id: key,
          count: matesData[key].count,
          sex: matesData[key].sex,
          location: matesData[key].location,
          etc: matesData[key].etc,
          preferences: matesData[key].preferences,
        };
        mates.unshift(mate);
      }
      context.commit('setMates', mates);
    } catch (error) {
      console.log('Error fetching initial data:', error.message);
    }
  },

  async registerMate(context, data) {
    const mateData = {
      count: data.count,
      sex: data.sex,
      location: data.location,
      etc: data.etc,
      preferences: data.preferences,
    };

    try {
      const response = await fetch(`${dbURL}/roommates.json`, {
        method: 'POST',
        body: JSON.stringify(mateData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to register Mate');
      }

      const responseData = await response.json();
      context.commit('registerMate', { id: responseData.name, ...mateData });

      context.dispatch('fetchInitialData');
    } catch (error) {
      console.error('Error registering mate:', error.message);
    }
  },
};

const dbURL = process.env.VUE_APP_FIREBASE_DATABASE_URL;

export default {
  async fetchInitialData(context) {
    try {
      const response = await fetch(`${dbURL}/mata.json`);

      if (!response.ok) {
        throw new Error('Failed to fetch initial data');
      }
      const matesData = await response.json();
      const mates = [];

      for (const key in matesData) {
        const mate = {
          id: key,
          titile: matesData[key].title,
          content: matesData[key].content,
        };
        mates.push(mate);
      }
      context.commit('setMates', mates);
    } catch (error) {
      console.log('Error fetching initial data:', error.message);
    }
  },

  async registerMate(context, data) {
    const mateData = {
      title: data.title,
      content: data.content,
    };

    try {
      const response = await fetch(`${dbURL}/boards.json`, {
        method: 'POST',
        body: JSON.stringify(mateData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to register Mate board');
      }

      const responseData = await response.json();
      context.commit('registerMate', { id: responseData.name, ...mateData });

      context.dispatch('fetchInitialData');
    } catch (error) {
      console.error('Error registering board:', error.message);
    }
  },
};

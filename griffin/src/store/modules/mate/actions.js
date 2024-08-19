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
          title: matesData[key].title,
          count: Number(matesData[key].count),
          current: Number(matesData[key].current),
          sex: matesData[key].sex,
          location: matesData[key].location,
          besmoke: matesData[key].besmoke,
          preferences: matesData[key].preferences,
          university: matesData[key].university,
          userUid: matesData[key].userUid,
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
      title: data.title,
      count: Number(data.count),
      current: Number(data.current),
      sex: data.sex,
      location: data.location,
      besmoke: data.besmoke,
      preferences: data.preferences,
      university: data.university,
      userUid: data.userUid,
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

  async deleteMate(context, mateId) {
    try {
      const response = await fetch(`${dbURL}/roommates/${mateId}.json`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete roommate');

      context.commit('deleteMate', mateId);
    } catch (error) {
      console.error('Error deleting mate:', error.message);
    }
  },
  async updateMate(context, { mateId, updatedData }) {
    try {
      const response = await fetch(`${dbURL}/roommates/${mateId}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) throw new Error('Failed to update roommate');
      context.commit('incrementCurrent');

      context.commit('updateMate', { mateId, updatedData });
    } catch (error) {
      console.error('Error updating mate:', error.message);
    }
  },
};

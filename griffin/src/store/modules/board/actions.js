const dbURL = process.env.VUE_APP_FIREBASE_DATABASE_URL;

export default {
  async fetchInitialData(context) {
    try {
      const response = await fetch(`${dbURL}/boards.json`);

      if (!response.ok) {
        throw new Error('Failed to fetch initial data');
      }

      const boardsData = await response.json();
      const boards = [];

      for (const key in boardsData) {
        const board = {
          id: key,
          title: boardsData[key].title,
          content: boardsData[key].content,
          time: boardsData[key].time,
        };
        boards.unshift(board);
      }

      context.commit('setBoards', boards);
    } catch (error) {
      console.error('Error fetching initial data:', error.message);
    }
  },

  async registerBoard(context, data) {
    const boardData = {
      title: data.title,
      content: data.content,
      time: new Date().toISOString(),
    };

    try {
      const response = await fetch(`${dbURL}/boards.json`, {
        method: 'POST',
        body: JSON.stringify(boardData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to register board');
      }

      const responseData = await response.json();
      context.commit('registerBoard', { id: responseData.name, ...boardData });

      context.dispatch('fetchInitialData');
    } catch (error) {
      console.error('Error registering board:', error.message);
    }
  },
};

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
          comments: boardsData[key].comments,
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
      comments: [],
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

  async addComment(context, { boardId, comment }) {
    try {
      const response = await fetch(`${dbURL}/boards/${boardId}/comments.json`, {
        method: 'POST',
        body: JSON.stringify({ text: comment, time: new Date().toISOString() }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      context.dispatch('fetchInitialData');
    } catch (error) {
      console.error('Error adding comment:', error.message);
    }
  },
};

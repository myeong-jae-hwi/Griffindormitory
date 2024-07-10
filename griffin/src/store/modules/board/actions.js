export default {
  async fetchInitialData(context) {
    try {
      const response = await fetch(
        `https://gryffindormitor-default-rtdb.asia-southeast1.firebasedatabase.app/boards.json`
      );

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
        };
        boards.push(board);
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
    };

    try {
      const response = await fetch(
        `https://gryffindormitor-default-rtdb.asia-southeast1.firebasedatabase.app/boards.json`,
        {
          method: 'POST',
          body: JSON.stringify(boardData),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to register board');
      }

      const responseData = await response.json();
      context.commit('registerBoard', { id: responseData.name, ...boardData });

      // After registering a board, fetch the updated list
      context.dispatch('fetchInitialData');
    } catch (error) {
      console.error('Error registering board:', error.message);
    }
  },
};

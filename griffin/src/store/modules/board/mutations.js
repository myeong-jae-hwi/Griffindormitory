export default {
  registerBoard(state, payload) {
    state.boards.unshift(payload);
  },
  setBoards(state, payload) {
    state.boards = payload;
  },
};

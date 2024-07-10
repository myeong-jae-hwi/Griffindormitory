export default {
  registerBoard(state, payload) {
    state.boards.push(payload);
  },
  setBoards(state, payload) {
    state.boards = payload;
  },
};

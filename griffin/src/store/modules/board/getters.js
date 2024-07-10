export default {
  boards(state) {
    return state.boards;
  },
  hasBoards(state) {
    return state.boards && state.boards.length > 0;
  },
};

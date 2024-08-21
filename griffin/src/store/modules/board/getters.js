export default {
  boards(state) {
    return state.boards;
  },
  hasBoards(state) {
    return state.boards && state.boards.length > 0;
  },
  hasComments(state) {
    return state.boards.some(
      (board) => board.comments && board.comments.length > 0
    );
  },
  getBoardById: (state) => (id) => {
    return state.boards.find((board) => board.id === id);
  },
};

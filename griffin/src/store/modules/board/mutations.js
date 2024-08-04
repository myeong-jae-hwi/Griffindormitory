export default {
  registerBoard(state, payload) {
    state.boards.unshift(payload);
  },
  setBoards(state, payload) {
    state.boards = payload;
  },
  deleteBoard(state, boardId) {
    state.boards = state.boards.filter((board) => board.id !== boardId);
  },
  addComment(state, { boardId, comment }) {
    const board = state.boards.find((board) => board.id === boardId);
    if (board) {
      board.comments.push(comment);
    }
  },
};

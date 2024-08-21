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
  UPDATE_BOARD(state, updatedBoard) {
    const index = state.boards.findIndex(
      (board) => board.id === updatedBoard.id
    );
    if (index !== -1) {
      state.boards.splice(index, 1, updatedBoard);
    }
  },
  addComment(state, { boardId, comment }) {
    const board = state.boards.find((board) => board.id === boardId);
    if (board) {
      board.comments.push(comment);
    }
  },
};

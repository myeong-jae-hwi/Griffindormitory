export default {
  registerBoard(state, payload) {
    state.boards.unshift(payload);
  },
  setBoards(state, payload) {
    state.boards = payload;
  },
  addComment(state, { boardId, comment }) {
    const board = state.boards.find((board) => board.id === boardId);
    if (board) {
      board.comments.push(comment);      
    }
  },
};

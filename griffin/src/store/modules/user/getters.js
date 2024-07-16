export default {
  users(state) {
    return state.users;
  },
  hasUsers(state) {
    return state.users && state.users.length > 0;
  },
};

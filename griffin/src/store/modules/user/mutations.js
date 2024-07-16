export default {
  registerUser(state, payload) {
    state.users.unshift(payload);
  },
  setUsers(state, payload) {
    state.users = payload;
  },
};

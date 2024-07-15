export default {
  registerMate(state, payload) {
    state.mates.unshift(payload);
  },
  setMates(state, payload) {
    state.mates = payload;
  },
};

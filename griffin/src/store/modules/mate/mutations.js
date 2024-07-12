export default {
  registerMate(state, payload) {
    state.mates.push(payload);
  },
  setMates(state, payload) {
    state.mates = payload;
  },
};

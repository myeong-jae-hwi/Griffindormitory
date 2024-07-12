export default {
  mates(state) {
    return state.mates;
  },
  hasMates(state) {
    return state.mates && state.mates.length > 0;
  },
};

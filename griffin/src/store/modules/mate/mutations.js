export default {
  registerMate(state, payload) {
    state.mates.unshift(payload);
  },
  setMates(state, payload) {
    console.log('Setting mates:', payload);
    state.mates = payload;
  },
};

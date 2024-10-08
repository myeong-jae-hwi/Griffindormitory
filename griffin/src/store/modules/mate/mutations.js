export default {
  registerMate(state, payload) {
    state.mates.unshift(payload);
  },
  setMates(state, payload) {
    console.log('Setting mates:', payload);
    state.mates = payload;
  },
  incrementCurrent(state) {
    state.current += 1;
  },
  deleteMate(state, mateId) {
    state.mates = state.mates.filter((mate) => mate.id !== mateId);
  },
  setUserUid(state, userUid) {
    state.userUid = userUid;
  },
};

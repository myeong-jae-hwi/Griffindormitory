import mutations from './mutations';
import getters from './getters';
import actions from './actions';

export default {
  namesspaced: true,
  state() {
    return {
      mates: [
        {
          id: 'm1',
          title: 'This is Mate Board Test',
          content: 'Hello ?',
        },
        {
          id: 'm2',
          title: 'Mate Mate Mate',
          content: 'ss',
        },
      ],
    };
  },
  mutations,
  getters,
  actions,
};

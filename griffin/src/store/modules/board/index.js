import mutations from './mutations';
import getters from './getters';
import actions from './actions';

export default {
  namespaced: true,
  state() {
    return {
      boards: [
        {
          id: 'b1',
          title: 'This is Board Test',
          content: 'Hello ?',
        },
        {
          id: 'b2',
          title: 'I like Pubao',
          content: 'I miss pubao',
        },
      ],
    };
  },
  mutations,
  getters,
  actions,
};

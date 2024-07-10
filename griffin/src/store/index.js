import { createStore } from 'vuex';

import boardModule from './modules/board/index.js';

const store = createStore({
  modules: {
    boards: boardModule,
  },
});

export default store;

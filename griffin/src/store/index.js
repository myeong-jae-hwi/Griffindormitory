import { createStore } from 'vuex';

import boardModule from './modules/board/index.js';
import mateModule from './modules/mate/index.js';

const store = createStore({
  modules: {
    boards: boardModule,
    mates: mateModule,
  },
});

export default store;

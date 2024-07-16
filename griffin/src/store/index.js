import { createStore } from 'vuex';

import boardModule from './modules/board/index.js';
import mateModule from './modules/mate/index.js';
import scheduleModule from './modules/schedule/index.js';

const store = createStore({
  modules: {
    boards: boardModule,
    mates: mateModule,
    schedule: scheduleModule,
  },
});

export default store;

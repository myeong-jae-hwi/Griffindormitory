import { createStore } from 'vuex';

import boardModule from './modules/board/index.js';
import mateModule from './modules/mate/index.js';
import userModule from './modules/user/index.js';
import scheduleModule from './modules/schedule/index.js';

const store = createStore({
  modules: {
    boards: boardModule,
    mates: mateModule,
    users: userModule
    schedule: scheduleModule,
  },
});

export default store;

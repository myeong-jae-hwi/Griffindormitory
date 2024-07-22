import { createStore } from 'vuex';

import createPersistedState from 'vuex-persistedstate';
import boardModule from './modules/board/index.js';
import mateModule from './modules/mate/index.js';
import userModule from './modules/user/index.js';
import scheduleModule from './modules/schedule/index.js';
import alartModule from './modules/alart/index.js';

const store = createStore({
  modules: {
    boards: boardModule,
    mates: mateModule,
    users: userModule,
    schedule: scheduleModule,
    notifications: alartModule
  },
  plugins: [createPersistedState()],
});

export default store;

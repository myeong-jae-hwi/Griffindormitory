import { createRouter, createWebHistory } from 'vue-router';

import InfoPage from './pages/info/InfoPage.vue';
import BoardList from './pages/board/BoardList.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/info' },
    { path: '/info', component: InfoPage },
    { path: '/boardlist', component: BoardList },
  ],
});

export default router;

import { createRouter, createWebHistory } from 'vue-router';

import InfoPage from './pages/info/InfoPage.vue';
import BoardList from './pages/board/BoardList.vue';
import RoomMateRegisterForm from './pages/RoomMateRegisterForm.vue';
import RegisterForm from './pages/RegisterForm.vue';
import LoginForm from './menu/LoginForm.vue';
import UserScore from './menu/UserScore.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/info' },
    { path: '/info', component: InfoPage },
    {
      path: '/boardlist',
      component: BoardList,
      children: [{ path: 'register', component: RegisterForm }],
    },
    { path: '/roommateboard', component: RoomMateRegisterForm },
    { path: '/login', component: LoginForm },
    { path: '/score', component: UserScore },
  ],
});

export default router;

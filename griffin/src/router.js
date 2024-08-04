import { createRouter, createWebHistory } from 'vue-router';
import store from './store';

import InfoPage from './pages/info/InfoPage.vue';
import BoardList from './pages/board/BoardList.vue';
import MatesList from './pages/roommate/MatesList.vue';
import RoomMateRegisterForm from './pages/roommate/RoomMateRegisterForm.vue';
import RegisterForm from './pages/board/RegisterForm.vue';
import LoginForm from './components/menu/LoginForm.vue';
import UserInfo from './components/menu/UserInfo.vue';
import UserScore from './components/menu/UserScore.vue';
import BoardDetail from './pages/board/BoardDetail.vue';
import MateDetail from './pages/roommate/MateDetail.vue';
import StudentCalender from './components/timetable/StudentCalender.vue';
import AlartList from './pages/alart/AlartList.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/info', component: InfoPage, meta: { requiresAuth: true } },
    {
      path: '/boardlist',
      component: BoardList,
      meta: { requiresAuth: true },
      children: [{ path: 'register', component: RegisterForm }],
    },
    {
      path: '/boardlist/:id',
      component: BoardDetail,
      meta: { requiresAuth: true },
      props: (route) => ({
        id: route.params.id,
        title: decodeURIComponent(route.query.title),
        content: decodeURIComponent(route.query.content),
        time: decodeURIComponent(route.query.time),
        author: decodeURIComponent(route.query.author),
      }),
    },
    {
      path: '/roommateboard',
      component: MatesList,
      meta: { requiresAuth: true },
      children: [{ path: 'register', component: RoomMateRegisterForm }],
    },
    {
      path: '/roommateboard/:id',
      component: MateDetail,
      meta: { requiresAuth: true },
      props: (route) => ({
        id: route.params.id,
        title: route.query.title,
        count: decodeURIComponent(route.query.count),
        sex: route.query.sex,
        location: route.query.location,
        besmoke: route.query.besmoke,
        preferences: route.query.preferences,
      }),
    },
    { path: '/login', component: LoginForm },
    { path: '/userinfo', component: UserInfo, meta: { requiresAuth: true } },
    { path: '/score', component: UserScore, meta: { requiresAuth: true } },
    {
      path: '/timetable',
      component: StudentCalender,
      meta: { requiresAuth: true },
    },
    { path: '/alart', component: AlartList, meta: { requiresAuth: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

router.beforeEach(async (to, from, next) => {
  const userId = store.state.users.userID;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !userId) {
    next('/login');
    return;
  }

  if (userId && !store.getters['users/currentUser']) {
    try {
      await store.dispatch('users/fetchUserInitialData', { uid: userId });
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      next('/login');
      return;
    }
  }

  next();
});

export default router;

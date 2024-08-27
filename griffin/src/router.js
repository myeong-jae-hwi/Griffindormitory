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
import EditBoard from './pages/board/EditBoard.vue';
import MateDetail from './pages/roommate/MateDetail.vue';
import StudentCalender from './components/timetable/StudentCalender.vue';
import AlartList from './pages/alart/AlartList.vue';
import NotFound from './pages/NotFound.vue';
import MainForm from './components/menu/mainForm.vue'
import SignUp from './components/menu/SignUp.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/mainForm' },
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
      path: '/edit-board/:id',
      name: 'EditBoard',
      component: EditBoard,
      meta: { requiresAuth: true },
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
        current: decodeURIComponent(route.query.current),
        sex: route.query.sex,
        location: route.query.location,
        besmoke: route.query.besmoke,
        preferences: route.query.preferences,
      }),
    },
    { path: '/login', component: LoginForm ,meta: {hideFooter: true, hideDarkmode: true}},
    { path: '/userinfo', component: UserInfo, meta: { requiresAuth: true } },
    { path: '/score', component: UserScore, meta: { requiresAuth: true } },
    {
      path: '/timetable',
      component: StudentCalender,
      meta: { requiresAuth: true },
    },
    { path: '/alart', component: AlartList, meta: { requiresAuth: true } },
    { path: '/mainForm', component: MainForm, meta: { requiresAuth: true ,hideFooter: true, hideDarkmode: true} },
    { path: '/signup', component: SignUp, meta: { requiresAuth: true ,hideFooter: true, hideDarkmode: true} },

    { path: '/:pathMatch(.*)*', component: NotFound },
  ],
});

router.beforeEach(async (to, from, next) => {
  const userId = store.state.users.userID;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  // 회원가입 페이지는 인증이 필요하지 않으므로 바로 통과시킵니다.
  if (to.path === '/signup' || to.path === '/mainForm') {
    next();
    return;
  }

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

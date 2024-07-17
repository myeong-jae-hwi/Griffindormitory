import { createRouter, createWebHistory } from 'vue-router';

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

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/info' },
    { path: '/info', component: InfoPage },
    {
      path: '/boardlist',
      component: BoardList,
      children: [
        { path: 'register', component: RegisterForm },
        {
          path: '/boardlist/:id',
          component: BoardDetail,
          props: (route) => ({
            id: route.params.id,
            title: decodeURIComponent(route.query.title),
            content: decodeURIComponent(route.query.content),
          }),
        },
      ],
    },
    {
      path: '/roommateboard',
      component: MatesList,
      children: [{ path: 'register', component: RoomMateRegisterForm }],
    },
    {
      path: '/roommateboard/:id',
      component: MateDetail,
      props: (route) => ({
        id: route.params.id,
        count: decodeURIComponent(route.query.count),
        sex: route.query.sex,
        location: route.query.location,
        besmoke: route.query.besmoke,
        preferences: route.query.preferences,
      }),
    },
    { path: '/login', component: LoginForm },
    { path: '/userinfo', component: UserInfo },
    { path: '/score', component: UserScore },
    { path: '/timetable', component: StudentCalender },
  ],
});

export default router;

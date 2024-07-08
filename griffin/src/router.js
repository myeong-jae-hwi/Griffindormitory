import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: null },
        { path: '/p1', component: null },
        { path: '/p2', component: null },
        { path: '/p3', component: null },
        { path: '/p4', component: null },
    ],
});

export default router;

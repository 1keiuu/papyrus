import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'login',
    component: require('@/components/pages/LoginPage').default,
  },
  {
    path: '/home',
    name: 'home',
    component: require('@/components/pages/HomePage').default,
  },
];

const router = new VueRouter({
  routes,
});

export default router;

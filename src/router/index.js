import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase/app'

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

router.beforeResolve((to, from, next) => {
  console.log(to);
  if (to.path == '/') {
    next();
  } else {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('認証中');
        next();
      } else {
        console.log('未認証');
        next({ path: '/' });
      }
    });
  }
});

export default router;

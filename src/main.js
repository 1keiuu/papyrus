import Vue from 'vue';
import firebase from 'firebase/app';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import vuetify from './plugins/vuetify';
import 'firebase/auth';

Vue.config.productionTip = false;
Vue.use(vuetify);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDSnoEmijXqiwo4YwDRj7CuDYaHqPUKboE',
  authDomain: 'papyrus-a8396.firebaseapp.com',
  databaseURL: 'https://papyrus-a8396.firebaseio.com',
  projectId: 'papyrus-a8396',
  storageBucket: 'papyrus-a8396.appspot.com',
  messagingSenderId: '482248426046',
  appId: '1:482248426046:web:1e25f1f84613f01507076f',
  measurementId: 'G-8VX41BVLVB',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');

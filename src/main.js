import Vue from "vue";
import firebase from "firebase/app";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

Vue.config.productionTip = false;
Vue.use(vuetify);

const firebaseConfig = {
  apiKey: "AIzaSyDSnoEmijXqiwo4YwDRj7CuDYaHqPUKboE",
  authDomain: "papyrus-a8396.firebaseapp.com",
  databaseURL: "https://papyrus-a8396.firebaseio.com",
  projectId: "papyrus-a8396",
  storageBucket: "papyrus-a8396.appspot.com",
  messagingSenderId: "482248426046",
  appId: "1:482248426046:web:1e25f1f84613f01507076f",
  measurementId: "G-8VX41BVLVB"
};

export default firebaseConfig;

firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    store.commit('user', user)
    store.commit('loginStatus', true)
  } else {
    store.commit('user', {})
    store.commit('loginStatus', false)
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");

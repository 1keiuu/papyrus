import Vue from "vue";
import firebase from "./firebase";
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

firebase.init()
firebase.onAuth()

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");

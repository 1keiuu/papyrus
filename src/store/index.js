import Vue from "vue";
import Vuex from "vuex";
// import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    loginStatus: false
  },
  mutations: {
    user(state, user) {
      state.user = user;
    },
    loginStatus(state, loginStatus) {
      state.loginStatus = loginStatus;
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    isSignedIn(state) {
      return state.status;
    }
  },
  actions: {},
  modules: {},
  // plugins: [createPersistedState({ storage: window.sessionStorage, key: "vuex-todo-examples" })]
})

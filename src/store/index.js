import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    loginStatus: false
  },
  mutations: {
    user (state, user) { state.user = user },
    loginStatus (state, loginStatus) { state.loginStatus = loginStatus }
  },
  actions: {
  },
  modules: {
  },
  getters: {
  },
  plugins: [
    createPersistedState({ storage: window.sessionStorage, key: 'vuex-todo-examples' })
  ]
});

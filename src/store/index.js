import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    isSignIn: false
  },
  mutations: {
    setUser(state, user) {
      state.user = user; // firebaseが返したユーザー情報
    },
    setSignIn(state, isSignIn) {
      state.isSignIn = isSignIn; // ログインしてるかどうか true or false
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    isSignIn(state) {
      return state.isSignIn;
    }
  }
});

import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: "",
    userId: "",
    profileImageUrl: "",
    isSignIn: false,
    taskId: 1
  },
  mutations: {
    setSignIn(state, isSignIn) {
      state.isSignIn = isSignIn; // ログインしてるかどうか true or false
    },
    setUserName(state, userName) {
      state.userName = userName;
    },
    setUserId(state, userId) {
      state.userId = userId;
    },
    setProfileImageUrl(state, profileImageUrl) {
      state.profileImageUrl = profileImageUrl;
    },
    setTaskId(state, taskId) {
      state.taskId += taskId;
    }
  },
  getters: {
    userName(state) {
      return state.userName;
    },
    userId(state) {
      return state.userId;
    },
    isSignIn(state) {
      return state.isSignIn;
    },
    profileImageUrl(state) {
      return state.profileImageUrl;
    },
    taskId(state) {
      return state.taskId;
    }
  },
  plugins: [createPersistedState()]
});

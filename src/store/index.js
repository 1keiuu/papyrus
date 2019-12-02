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
    taskId: 1,
    taskData: []
  },
  mutations: {
    setSignIn(state, payload) {
      state.isSignIn = payload; // ログインしてるかどうか true or false
    },
    setUserName(state, payload) {
      state.userName = payload;
    },
    setUserId(state, payload) {
      state.userId = payload;
    },
    setProfileImageUrl(state, payload) {
      state.profileImageUrl = payload;
    },
    setTaskId(state, payload) {
      state.taskId += payload;
    },
    setTaskData(state, taskData) {
      // state.taskData.push(payload)
      Vue.set(state, 'taskData', taskData);
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
    },
    taskData(state) {
      return state.taskData;
    }
  },
  plugins: [createPersistedState()]
});

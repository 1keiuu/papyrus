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
    targetsData: [
      {
        name: "primary",
        description: "",
        deadline: "",
        targetId: "target1"
      },
      {
        name: "secondary",
        description: "",
        deadline: "",
        targetId: "tertiary"
      },
      {
        name: "primary",
        description: "",
        deadline: "",
        targetId: "keep"
      },
      {
        name: "primary",
        description: "",
        deadline: "",
        targetId: "keep"
      }
    ],
    tasksData: []
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
    setTargetsData(state, payload) {
      state.targetsData.push(payload);
    },
    setTasksData(state, payload) {
      state.tasksData.push(payload);
    },
    deleteTasksData(state, payload) {
      if (payload === "all") {
        state.tasksData.length = 0;
      } else {
        console.log('a')
      }
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
    targetsData(state) {
      return state.targetsData;
    },
    tasksData(state) {
      return state.tasksData;
    }
  },
  plugins: [createPersistedState()]
});

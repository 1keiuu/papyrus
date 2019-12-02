const state = {
  userName: "",
  userId: "",
  profileImg: "",
  isSignIn: false,
  taskId: 1
};

/* eslint no-shadow: ["error", { "allow": ["state"] }] */
const mutations = {
  SET_SIGNIN(state, payload) {
    state.isSignIn = payload; // ログインしてるかどうか true or false
  },
  SET_USER_NAME(state, payload) {
    state.userName = payload;
  },
  SET_USER_ID(state, payload) {
    state.userId = payload;
  },
  SET_PROFILE_IMG(state, payload) {
    state.profileImg = payload;
  },
};

const actions = {
  setSignIn({ commit }, isSignIn) {
    commit("SET_SIGNIN", isSignIn);
  },
  setUserName({ commit }, userName) {
    commit("SET_USERNAME", userName);
  },
  setUserId({ commit }, userId) {
    commit("SET_USER_ID", userId);
  },
  setProfileImg({ commit }, profileImg) {
    commit("SET_PROFILE_IMG", profileImg);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

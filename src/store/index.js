import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: '',
    profileImageUrl: '',
    isSignIn: false,
  },
  mutations: {
    setSignIn(state, isSignIn) {
      state.isSignIn = isSignIn; // ログインしてるかどうか true or false
    },
    setUserName(state, userName) {
      state.userName = userName;
    },
    setProfileImageUrl(state, profileImageUrl) {
      state.profileImageUrl = profileImageUrl
    }
  },
  getters: {
    userName(state) {
      return state.userName;
    },
    isSignIn(state) {
      return state.isSignIn;
    },
    profileImageUrl(state) {
      return state.profileImageUrl
    }
  },
  plugins: [createPersistedState()],
});

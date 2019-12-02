

const state = {
  taskIdLatest: 1
};

/* eslint no-shadow: ["error", { "allow": ["state"] }] */
const mutations = {
  SET_TASK_ID_LATEST(state, payload) {
    state.taskId += payload;
  }
};

const actions = {
  setTaskIdLatest({ commit }, taskIdLatest) {
    commit("SET_TASK_ID_LATEST", taskIdLatest);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

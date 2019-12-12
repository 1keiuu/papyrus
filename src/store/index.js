import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

// 削除対象のタスクが所属するtargetのtargetsData内でのindex
const getTargetIndex = payload => {
  switch (payload) {
    case "rank1":
      return 0;
    case "rank2":
      return 1;
    case "rank3":
      return 2;
    case "rank4":
      return 3;
    default:
  }
  return null;
};
const getSelectedTaskIndex = (array, payload) => {
  for (let i = 0; i < array.length; i += 1) {
    if (array[i].taskId === payload.taskId) {
      return i;
    }
  }
  return null;
};

export default new Vuex.Store({
  state: {
    userName: "",
    userId: "",
    profileImageUrl: "",
    isSignIn: false,
    missionState:"",
    taskId: 1,
    targetsData: [
      {
        name: "primary",
        description: "",
        deadline: "",
        targetRank: "rank1"
      },
      {
        name: "secondary",
        description: "",
        deadline: "",
        targetRank: "rank2"
      },
      {
        name: "tertiary",
        description: "",
        deadline: "",
        targetRank: "rank3"
      },
      {
        name: "keep",
        description: "",
        deadline: "",
        targetRank: "rank4"
      }
    ],
    tasksData: [[], [], [], []]
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
    setMissionState(state,payload) {
      state.missionState = payload
    },
    setTaskId(state, payload) {
      state.taskId += payload;
    },
    setTargetsData(state, payload) {
      state.targetsData.push(payload);
    },
    setTasksData(state, payload) {
      // 追加対象のタスクが所属するtargetのtargetsData内でのindex
      const targetIndex = getTargetIndex(payload.targetRank);
      state.tasksData[targetIndex].push(payload);
    },
    editTaskData(state, payload) {
      // 編集には編集前のデータと後のデータが必要
      // 編集前のTargetIndex
      const formerTargetIndex = getTargetIndex(payload.formerTargetRank);
      // 編集後のTargetIndex
      const targetIndex = getTargetIndex(payload.targetRank);
      const selectedTasks = state.tasksData[formerTargetIndex];
      const taskIndex = getSelectedTaskIndex(selectedTasks, payload);
      // 編集前のTaskDataを消して、後のDataを追加
      selectedTasks.splice(taskIndex, 1);
      state.tasksData[targetIndex].push(payload);
    },
    changeTaskStatus(state, payload) {
      // payloadはtaskのデータとstatusの入ったObject
      const targetIndex = getTargetIndex(payload.inputData.targetRank);
      const selectedTasks = state.tasksData[targetIndex];
      const taskIndex = getSelectedTaskIndex(selectedTasks, payload.inputData);
      const DoingTask = {
        targetRank: payload.inputData.targetRank,
        deadline: payload.inputData.deadline,
        taskId: payload.inputData.taskId,
        memo: payload.inputData.memo,
        name: payload.inputData.name,
        status: "doing"
      };
      const ArchivedTask = {
        targetRank: payload.inputData.targetRank,
        deadline: payload.inputData.deadline,
        taskId: payload.inputData.taskId,
        memo: payload.inputData.memo,
        name: payload.inputData.name,
        status: "archived"
      };
      const completedTask = {
        targetRank: payload.inputData.targetRank,
        deadline: payload.inputData.deadline,
        taskId: payload.inputData.taskId,
        memo: payload.inputData.memo,
        name: payload.inputData.name,
        status: "completed"
      };
      switch (payload.status) {
        case "archived":
          state.tasksData[targetIndex].splice(taskIndex, 1, ArchivedTask);
          break;
        case "completed":
          state.tasksData[targetIndex].splice(taskIndex, 1, completedTask);
          break;
        case "doing":
          state.tasksData[targetIndex].splice(taskIndex, 1, DoingTask);
          break;
        default:
      }
      return null;
    },
    deleteTaskData(state, payload) {
      if (payload === "all") {
        // TasksDataの初期化
        state.tasksData.splice(0, 4, [], [], [], []);
      } else if (typeof payload.taskId === "number") {
        // 削除対象のタスクが所属するtargetのtargetsData内でのindex
        const targetIndex = getTargetIndex(payload.targetRank);
        const selectedTasks = state.tasksData[targetIndex];
        const taskIndex = getSelectedTaskIndex(selectedTasks, payload);
        selectedTasks.splice(taskIndex, 1);
      } else {
        console.log("undefined deleteType");
      }
    },
    editTargetData(state, payload) {
      const targetIndex = getTargetIndex(payload.targetRank);
      state.targetsData.splice(targetIndex, 1, payload);
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
    missionState(state) {
      return state.missionState
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

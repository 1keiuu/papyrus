import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import moment from "moment"

Vue.use(Vuex);

// 削除対象のタスクが所属するtargetのindexを取得
const getTargetIndex = payload => {
  switch (payload) {
    case 0:
      return 0;
    case 1:
      return 1;
    case 2:
      return 2;
    case 'keep':
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
    missionState: "",
    taskId: 1,
    targetsData: [
      {
        name: "1番達成したい目標",
        description: "",
        deadline: "",
        targetRank: 0,
        color: "#56A5BF"
      },
      {
        name: "次に達成したい目標",
        description: "",
        deadline: "",
        targetRank: 1,
        color: "#56A5BF"
      },
      {
        name: "3番目に達成したい目標",
        description: "",
        deadline: "",
        targetRank: 2,
        color: "#56A5BF"
      },
      {
        name: "keep",
        description: "",
        deadline: "",
        targetRank: 'keep',
        color: "#56A5BF"
      }
    ],
    tasksData: [[], [], [], []],
    events:[]
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
    setMissionState(state, payload) {
      state.missionState = payload;
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
      const selectedTask = state.tasksData[formerTargetIndex];
      const taskIndex = getSelectedTaskIndex(selectedTask, payload);
      // 編集前のTaskDataを消して、後のDataを追加
      selectedTask.splice(taskIndex, 1);
      state.tasksData[targetIndex].push(payload);
    },
    changeTaskStatus(state, payload) {
      // payloadはtaskのデータとstatusの入ったObject
      const targetIndex = getTargetIndex(payload.inputData.targetRank);
      const selectedTask = state.tasksData[targetIndex];
      const taskIndex = getSelectedTaskIndex(selectedTask, payload.inputData);
      const DoingTask = {
        targetRank: payload.inputData.targetRank,
        deadline: payload.inputData.deadline,
        taskId: payload.inputData.taskId,
        memo: payload.inputData.memo,
        name: payload.inputData.name,
        answer1: payload.inputData.answer1,
        answer2: payload.inputData.answer2,
        answer3: payload.inputData.answer3,
        importanceScore: payload.inputData.importanceScore,
        importanceArea: payload.inputData.importanceArea,
        status: "doing",
      };
      const ArchivedTask = {
        targetRank: payload.inputData.targetRank,
        deadline: payload.inputData.deadline,
        taskId: payload.inputData.taskId,
        memo: payload.inputData.memo,
        name: payload.inputData.name,
        answer1: payload.inputData.answer1,
        answer2: payload.inputData.answer2,
        answer3: payload.inputData.answer3,
        importanceScore: payload.inputData.importanceScore,
        importanceArea: payload.inputData.importanceArea,
        status: "archived"
      };
      const completedTask = {
        targetRank: payload.inputData.targetRank,
        deadline: payload.inputData.deadline,
        taskId: payload.inputData.taskId,
        memo: payload.inputData.memo,
        name: payload.inputData.name,
        answer1: payload.inputData.answer1,
        answer2: payload.inputData.answer2,
        answer3: payload.inputData.answer3,
        importanceScore: payload.inputData.importanceScore,
        importanceArea: payload.inputData.importanceArea,
        status: "completed",
        completedAt:moment(new Date()).format("YYYY年MM月DD日")
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
        state.taskId = 1
      } else if (typeof payload.taskId === "number") {
        // 削除対象のタスクが所属するtargetのtargetsData内でのindex
        const targetIndex = getTargetIndex(payload.targetRank);
        const selectedTask = state.tasksData[targetIndex];
        const taskIndex = getSelectedTaskIndex(selectedTask, payload);
        selectedTask.splice(taskIndex, 1);
      } else {
        console.log("undefined deleteType");
      }
    },
    editTargetData(state, payload) {
      const targetIndex = getTargetIndex(payload.targetRank);
      state.targetsData.splice(targetIndex, 1, payload);
    },
    initializeTargetData(state) {
      const payload1 = {
        name: "1番達成したい目標",
        description: "",
        deadline: "",
        targetRank: 0,
        color: "#56A5BF"
      };
      const payload2 = {
        name: "次に達成したい目標",
        description: "",
        deadline: "",
        targetRank: 1,
        color: "#56A5BF"
      };
      const payload3 = {
        name: "3番目に達成したい目標",
        description: "",
        deadline: "",
        targetRank: 2,
        color: "#56A5BF"
      };
      const payload4 = {
        name: "keep",
        description: "",
        deadline: "",
        targetRank: "keep",
        color: "#56A5BF"
      };
      state.targetsData.splice(0, 4, payload1, payload2, payload3, payload4);
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
      return state.missionState;
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

<template>
  <v-dialog
    class="dialog"
    v-model="dialog"
    max-width="880px"
    overlay-color="black"
    overlay-opacity="0.65"
  >
    <template v-slot:activator="{ on }"> </template>
    <v-card>
      <v-layout align-center justify-space-between class="modal-title__wrapper">
        <v-card-title>アーカイブされたタスク</v-card-title>
      </v-layout>
      <v-tabs v-model="tab" background-color="#7dc0d6" dark>
        <v-tab v-for="(targetTitle, index) in rankedTargetsData" :key="index">
          <v-badge v-if="filteredTasksData[index].length !== 0">
            <template v-slot:badge>{{ filteredTasksData[index].length }}</template>
            {{ targetTitle }}
          </v-badge>
          <p v-else>{{ targetTitle }}</p>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab" class="items__wrapper">
        <v-tab-item v-for="(tasks, index) in filteredTasksData" :key="index">
          <v-expansion-panels v-if="tasks.length >= 1" class="task-panel__wrapper">
            <v-expansion-panel v-for="(task, index) in tasks" :key="index">
              <v-expansion-panel-header>
                <v-row class="task-panel__header-inner">
                  <v-checkbox v-model="selectedTasks" :value="task"></v-checkbox>
                  <v-col>{{ task.name }}</v-col>
                  <v-col>
                    {{ task.deadline }}
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p v-if="task.memo">{{ task.memo }}</p>
                <p class="task-panel__memo">説明がありません</p>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <div v-else class="task-panel--empty">
            <svg height="150pt" viewBox="0 -12 512 512" width="512pt">
              <path d="M279 90.063L99.867 188.425 256 274.16l179.133-98.363zm0 0" fill="#fea02c" />
              <path d="M105.07 393.7l151.04 82.937v-202.48l-151.04-82.938zm0 0" fill="#ffc66c" />
              <path d="M440.93 375.7V184.226L332 331.375l-38-18.5.11 143.445zm0 0" fill="#ffb954" />
              <g fill="#feda9b">
                <path
                  d="M285 261.156l59.184 59.18L502 233.68l-59.184-59.18zm0 0M36.668 247.012l159.11 87.367L256 274.156 96.89 186.79zm0 0M440.93 172.613l60.668-60.66L345.07 26l-60.668 60.668zm0 0M43 98.547l57.766 57.762L256 71.07 198.234 13.31zm0 0"
                />
              </g>
              <path
                d="M455.074 172.613l53.996-53.996a10 10 0 00-2.258-15.836l-64.914-35.644c-4.84-2.657-10.918-.887-13.578 3.953-2.656 4.844-.89 10.922 3.953 13.578l53.235 29.23-46.34 46.336L272.5 68.714l46.336-46.335 46.84 25.723c4.84 2.656 10.922.89 13.578-3.954 2.66-4.84.89-10.921-3.953-13.578L321.883 1.234A9.996 9.996 0 00310 2.93l-54 54-54-54a10.003 10.003 0 00-11.883-1.696L5.187 102.781a9.994 9.994 0 00-5.085 7.356 9.987 9.987 0 002.828 8.48l53.996 53.996L2.93 226.605a9.994 9.994 0 00-2.828 8.485 9.987 9.987 0 005.086 7.351L61.07 273.13v102.57c0 3.653 1.989 7.012 5.188 8.77l184.93 101.543c1.5.824 3.156 1.234 4.812 1.234s3.313-.41 4.813-1.234l184.93-101.543a10.004 10.004 0 005.187-8.77V273.13l55.883-30.684a10 10 0 002.257-15.836zM256 262.746L91.848 172.61 256 82.47l164.152 90.14zM193.168 22.38L239.5 68.715l-166.668 91.52-46.336-46.337zM72.84 184.989l166.668 91.519-46.34 46.34-166.672-91.52zm358.09 184.796L266 460.348V358.125c0-5.523-4.477-10-10-10s-10 4.477-10 10v102.223L81.07 369.785v-85.672l109.047 59.88A10 10 0 00202 342.297l54-54.001 54 54a9.984 9.984 0 007.074 2.93c1.64 0 3.297-.407 4.809-1.235l109.047-59.879zm-112.094-46.937l-46.34-46.344 166.668-91.516 46.344 46.336zm0 0"
              />
              <path
                d="M404.8 68.176c2.63 0 5.2-1.07 7.071-2.934a10.07 10.07 0 002.93-7.066c0-2.633-1.07-5.211-2.93-7.07a10.063 10.063 0 00-7.07-2.93c-2.64 0-5.211 1.066-7.07 2.93a10.023 10.023 0 00-2.93 7.07 10.02 10.02 0 002.93 7.066 10.067 10.067 0 007.07 2.934zm0 0M256 314.926c-2.629 0-5.21 1.066-7.07 2.93a10.087 10.087 0 00-2.93 7.07c0 2.636 1.07 5.207 2.93 7.078 1.86 1.86 4.441 2.922 7.07 2.922s5.21-1.063 7.07-2.922a10.105 10.105 0 002.93-7.078c0-2.633-1.07-5.203-2.93-7.07a10.063 10.063 0 00-7.07-2.93zm0 0"
              />
            </svg>
            <p>アーカイブされているタスクはありません</p>
          </div>
        </v-tab-item>
      </v-tabs-items>
      <v-layout
        v-if="selectedTasks.length"
        justify-space-between
        align-center
        class="selected-tasks__wrapper"
      >
        <p>{{ selectedTasks.length }}件選択中</p>
        <div class="selected-tasks__buttons-wrapper">
          <v-btn color="#8471e2" dark @click="handleDeleteButtonClick" large
            ><v-icon>mdi-trash-can-outline</v-icon>
            削除する
          </v-btn>
          <v-btn color="#ff7e2f" class="return__button" dark @click="handleReturnButtonClick" large
            >タスクに戻す</v-btn
          >
        </div>
      </v-layout>
    </v-card>
  </v-dialog>
</template>
<script>
import store from "../../../store";
export default {
  name: "ArchivedTasksModal",
  data: () => ({
    dialog: false,
    tab: null,
    tasks: [[], [], [], []],
    targetTitles: [],
    selectedTasks: [],
    show: false,
    isOpenedIndex: ""
  }),
  props: ["tasksData", "targetsData"],
  methods: {
    openDialog() {
      this.dialog = true;
    },
    isOpened(index) {
      if (this.isOpenedIndex !== index) {
        this.isOpenedIndex = index;
      } else if (this.isOpenedIndex === index) {
        this.isOpenedIndex = "";
      }
    },
    handleDeleteButtonClick() {
      this.selectedTasks.forEach(function(task) {
        store.commit("deleteTaskData", task);
      });
      this.selectedTasks.splice(0, this.selectedTasks.length);
    },
    handleReturnButtonClick() {
      this.selectedTasks.forEach(function(task) {
        const data = { inputData: task, status: "doing" };
        store.commit("changeTaskStatus", data);
      });
      this.selectedTasks.splice(0, this.selectedTasks.length);
    }
  },
  watch: {},
  computed: {
    rankedTargetsData() {
      const data = [
        this.targetsData[0].name,
        this.targetsData[1].name,
        this.targetsData[2].name,
        this.targetsData[3].name
      ];
      return data;
    },
    filteredTasksData() {
      const rankedTasks = [];
      const archivedTasks1 = this.tasksData[0].filter(function(task) {
        return task.status === "archived";
      });
      const archivedTasks2 = this.tasksData[1].filter(function(task) {
        return task.status === "archived";
      });
      const archivedTasks3 = this.tasksData[2].filter(function(task) {
        return task.status === "archived";
      });
      const archivedTasks4 = this.tasksData[3].filter(function(task) {
        return task.status === "archived";
      });
      rankedTasks.push(archivedTasks1, archivedTasks2, archivedTasks3, archivedTasks4);
      return rankedTasks;
    }
  }
};
</script>
<style lang="scss" scoped>
.modal-title__wrapper {
  background: $secondary;
  color: white;
}

.items__wrapper {
  max-height: 450px;
  overflow-y: scroll;
  height: 450px !important;
  .task-panel__wrapper{
        width: 840px;
    margin:10px 0px 10px 10px;
     .v-expansion-panel-header {
    padding: 5px 25px;
    .task-panel__header-inner {
      align-items: center;
    }
  }
  .task-panel__memo {
    color: black;
    font-size: 15px;
  }
  }
}
  .task-panel--empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 80px;
    p {
      font-size: 18px !important;
      font-weight: bold;
      padding-top: 50px;
    }
  }
.v-card {
  min-height: 500px;
}
.v-application p {
  font-size: 14px;
}

::v-deep .v-input__slot {
  margin-bottom: 0px !important;
}
.selected-tasks__wrapper {
  width: 100%;
  height: 75px;
  padding: 0px 10px;
  background-color: $primary;
  position: absolute;
  bottom: 0;
  z-index: 3;
  p{
    font-size:18px;
    color:white;
    padding-left:5px
  }
}

.return__button {
  margin-left: 20px;
  margin-right: 20px;
}

::v-deep .v-btn__content {
  align-items: flex-end
}
</style>

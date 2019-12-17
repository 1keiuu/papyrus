<template>
  <v-layout class="matrix__container" justify-center>
    <div class="matrix-graph__container">
      <div
        class="matrix__title-wrapper"
        @mouseenter="isCardHover = true"
        @mouseleave="isCardHover = false"
      >
        <v-icon class="matrix__title-icon" color="white" size="23px">mdi-border-all</v-icon>
        <p class="matrix__title">時間管理のマトリックス</p>
        <div class="matrix__help-button" v-if="isCardHover">
          <v-icon class="matrix__help-icon" size="15px">mdi-help</v-icon>
        </div>
      </div>
      <v-card
        class="matrix-graph__card"
        @mouseenter="isCardHover = true"
        @mouseleave="isCardHover = false"
      >
        <div class="matrix-graph__wrapper">
          <MatrixGraph></MatrixGraph>
        </div>
        <div class="matrix-graph__tasks-number-wrapper">
          <div
            class="matrix-graph__tasks-number-item"
            v-for="(item, index) in tasksNumbers"
            :key="index"
          >
            <p class="matrix-graph__tasks-number-title">{{ item.title }}</p>
            <p class="matrix-graph__tasks-number">{{ item.number }}</p>
          </div>
        </div>
      </v-card>
    </div>
    <div class="matrix-tasks-list__container">
      <v-tabs v-model="tab" dark background-color="#56a5bf" class="matrix__title-wrapper">
        <v-tab v-for="(tabName, index) in tabsName" :key="index" :ripple="false">{{
          tabName
        }}</v-tab>
      </v-tabs>
      <v-card class="matrix-tasks-list__card">
        <v-tabs-items v-model="tab">
          <v-tab-item v-for="(tasks, index) in sortedTasks" :key="index">
            <MatrixTaskLists :tasksData="tasks"></MatrixTaskLists>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </div>
  </v-layout>
</template>

<script>
import moment from "moment";
import MatrixGraph from "../parts/MatrixGraph";
import MatrixTaskLists from "../parts/MatrixTaskLists";
import store from "../../store";
export default {
  name: "Matrix",
  components: {
    MatrixGraph,
    MatrixTaskLists
  },
  data() {
    return {
      tasksNumbers: [
        { title: "第一領域のタスク数", number: Number() },
        { title: "第二領域のタスク数", number: Number() },
        { title: "第三領域のタスク数", number: Number() },
        { title: "第四領域のタスク数", number: Number() }
      ],
      tabsName: ["第一領域", "第二領域", "第三領域", "第四領域"],
      isCardHover: false,
      sortedTasks: [
        [{ id: 1, name: "", children: [] },{ id: 2, name: "", children: [] },{ id: 3, name: "", children: [] },{ id: 4, name: "", children: [] }],
        [{ id: 1, name: "", children: [] },{ id: 2, name: "", children: [] },{ id: 3, name: "", children: [] },{ id: 4, name: "", children: [] }],
        [{ id: 1, name: "", children: [] },{ id: 2, name: "", children: [] },{ id: 3, name: "", children: [] },{ id: 4, name: "", children: [] }],
        [{ id: 1, name: "", children: [] },{ id: 2, name: "", children: [] },{ id: 3, name: "", children: [] },{ id: 4, name: "", children: [] }],
      ],
      tab: null
    };
  },
  methods: {
    // culcImportance(tasksData) {
    //   tasksData.forEach(rankedTasksData => {
    //     rankedTasksData.forEach(taskData => {
    //       const taskDeadline = taskData.deadline;
    //       const deadlineDiff = moment(taskDeadline).diff(moment(new Date()), "day");
    //       const data = {
    //         taskId: taskData.taskId,
    //         name: taskData.name,
    //         deadline: taskData.deadline,
    //         targetRank: taskData.targetRank,
    //         memo: taskData.memo,
    //         status: "doing",
    //         answer1: taskData.answer1,
    //         answer2: taskData.answer2,
    //         answer3: taskData.answer3,
    //         importanceScore: taskData.importanceScore,
    //         formerTargetRank: taskData.targetRank,
    //         importanceArea: ""
    //       };
    //       if (deadlineDiff >= 7) {
    //         switch (taskData.importanceScore > 11) {
    //           case true:
    //             data.importanceArea = "secondArea";
    //             break;
    //           case false:
    //             data.importanceArea = "forthArea";
    //             break;
    //           default:
    //         }
    //       } else if (this.deadlineDiff <= 7) {
    //         switch (taskData.importanceScore > 11) {
    //           case true:
    //             data.importanceArea = "firstArea";
    //             break;
    //           case false:
    //             data.importanceArea = "thirdArea";
    //             break;
    //           default:
    //         }
    //       }
    //       store.commit("editTaskData", data);
    //     });
    //   });
    // },
    sortTasksByImportance() {
      this.storedTasksData.forEach((rankedTasksData,index) => {
        const firstAreaTasks = rankedTasksData.filter(
          taskData => taskData.importanceArea === "firstArea"
        );
        const secondAreaTasks = rankedTasksData.filter(
          taskData => taskData.importanceArea === "secondArea"
        );
        const thirdAreaTasks = rankedTasksData.filter(
          taskData => taskData.importanceArea === "thirdArea"
        );
        const forthAreaTasks = rankedTasksData.filter(
          taskData => taskData.importanceArea === "forthArea"
        );
        console.log(firstAreaTasks)
        // sortedTasks[0]は第一領域にはいるタスク全て
        this.sortedTasks[index][0].children = firstAreaTasks;
        this.sortedTasks[index][1].children = secondAreaTasks;
        this.sortedTasks[index][2].children = thirdAreaTasks;
        this.sortedTasks[index][3].children = forthAreaTasks;
      });
    },
    culcTasksNumber() {
      this.sortedTasks.forEach((sortedByImportanceTasks, index) => {
        sortedByImportanceTasks.forEach(tasks => {
          this.tasksNumbers[index].number += tasks.length;
        });
      });
    },
    setTargetsName() {
      for (let i = 0; i <= 3; i += 1) {
        this.sortedTasks[i][0].name = this.storedTargetsData[0].name;
        this.sortedTasks[i][1].name = this.storedTargetsData[1].name;
        this.sortedTasks[i][2].name = this.storedTargetsData[2].name;
        this.sortedTasks[i][3].name = this.storedTargetsData[3].name;
      }
    }
  },
  // watch: {
  //   storedTasksData() {
  //     this.culcImportance(this.storedTasksData);
  //   }
  // },
  created() {
    this.sortTasksByImportance();
    this.culcTasksNumber();
    this.setTargetsName();
  },
  computed: {
    storedTargetsData() {
      return JSON.parse(JSON.stringify(this.$store.getters.targetsData));
    },
    storedTasksData() {
      return JSON.parse(JSON.stringify(this.$store.getters.tasksData));
    }
  }
};
</script>

<style scoped lang="scss">
$primary: #56a5bf;
$secondary: #7dc0d6;
$accent: #ff7e2f;

.v-application p {
  margin-bottom: 0px;
}
.container {
  padding: 0;
}
.matrix__container {
  margin-left: 70px;
}

.matrix-graph__container {
  width: 775px;
  height: 570px;
  margin-right: 35px;
  margin-top: 30px;
  .matrix__title-wrapper {
    width: 360px;
    height: 50px;
    padding-left: 15px;
    padding-right: 10px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    display: flex;
    align-items: center;
    background-color: $primary;
    .matrix__title {
      color: white;
      font-size: 20px;
      font-weight: bold;
      margin-right: 45px;
    }
    .matrix__title-icon {
      margin-right: 15px;
    }
    .matrix__help-button {
      border: 1px solid #ff7e2f;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: ease-in-out all 200ms;
      cursor: pointer;
      .matrix__help-icon {
        padding-bottom: 1px;
        color: #ff7e2f;
      }
    }
  }
  .matrix-graph__card {
    height: 550px;
    border-top-left-radius: 0px;
    .matrix-graph__wrapper {
      display: flex;
      justify-content: center;
      padding-top: 60px;
      margin-bottom: 80px;
      margin-right: 10px;
    }
    .matrix-graph__tasks-number-wrapper {
      width: 100%;
      height: 25px;
      margin-top: 20px;
      margin-bottom: 44px;
      display: flex;
      justify-content: center;
      .matrix-graph__tasks-number-item {
        display: flex;
        align-items: center;
        border-bottom: 1px solid $primary;
        padding: 0px 2px;
        margin-right: 10px;
        &:last-child {
          margin-right: 0px;
        }
        .matrix-graph__tasks-number-title {
          display: inline;
          font-size: 15px;
          margin-right: 10px;
        }
        .matrix-graph__tasks-number {
          color: $primary;
          font-size: 20px;
        }
      }
    }
  }
}

.matrix-tasks-list__container {
  width: 410px;
  height: 100vh;
  margin-top: 30px;
  .matrix__title-wrapper {
    width: 380px;
    height: 50px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    ::v-deep .v-tabs-bar {
      padding-left: 10px;
      height: 50px !important;
    }
    .v-tab {
      font-size: 13px;
      min-width: 70px;
      &.v-tab--active {
        font-size: 18px;
      }
    }

    .v-slide-group-prev {
      display: none;
    }
    .v-slide-group-next {
      display: none;
    }
  }
  .matrix-tasks-list__card {
    border-top-left-radius: 0px;
    height: 550px;
    padding: 0px !important;
  }
}
::v-deep .v-tabs-slider-wrapper {
  display: none !important;
}
</style>

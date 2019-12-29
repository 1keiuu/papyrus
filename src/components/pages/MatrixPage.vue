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
        <div class="matrix-graph__tasks-number-wrapper">
          <div
            class="matrix-graph__tasks-number-item"
            v-for="(item, index) in tasksNumbers"
            :key="index"
            @click="changeListTabIndex(index)"
            :class="{ '--active': tab === index }"
          >
            <p class="matrix-graph__tasks-number-title">{{ item.title }}</p>
            <p class="matrix-graph__tasks-number">{{ item.number }}</p>
          </div>
        </div>
        <div class="matrix-graph__wrapper">
          <MatrixGraph @graphAreaClicked="changeListTabIndex"></MatrixGraph>
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
          <v-tab-item v-for="(task, index) in sortedTasks" :key="index">
            <MatrixTaskLists :tasksData="task"></MatrixTaskLists>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </div>
  </v-layout>
</template>

<script>
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
      sortedTasks: [[], [], [], []],
      tab: null
    };
  },
  methods: {
    sortTasksByImportance() {
      this.storedTasksData.forEach(rankedTasksData => {
        // if (rankedTasksData.status === "doing") {
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
        const subtitle = { name: "タスク名", deadline: "期日", status: "subtitle" };
        firstAreaTasks.unshift(subtitle);
        secondAreaTasks.unshift(subtitle);
        thirdAreaTasks.unshift(subtitle);
        forthAreaTasks.unshift(subtitle);
        // sortedTasks[0]は第一領域にはいるタスク全て
        this.sortedTasks[0].push(firstAreaTasks);
        this.sortedTasks[1].push(secondAreaTasks);
        this.sortedTasks[2].push(thirdAreaTasks);
        this.sortedTasks[3].push(forthAreaTasks);
        // }
      });
    },
    culcTasksNumber() {
      this.sortedTasks.forEach((sortedByImportanceTasks, index) => {
        sortedByImportanceTasks.forEach(tasks => {
          this.tasksNumbers[index].number += tasks.length;
        });
        this.tasksNumbers[index].number -= 4;
      });
    },
    changeListTabIndex(tabIndex) {
      this.tab = tabIndex;
    }
  },
  watch: {
    // storedTasksData() {
    //   this.culcImportance(this.storedTasksData);
    // }
  },
  created() {
    this.sortTasksByImportance();
    this.culcTasksNumber();
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
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: $accent;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: ease-in-out all 200ms;
      cursor: pointer;
      .matrix__help-icon {
        padding-bottom: 1px;
        color: #fff;
      }
    }
  }
  .matrix-graph__card {
    height: 520px;
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
      height: 75px;
      padding-top: 55px;
      display: flex;
      justify-content: center;
      .matrix-graph__tasks-number-item {
        display: flex;
        align-items: center;
        margin-right: 13px;
        cursor: pointer;
        padding: 0 3px 10px 3px;
        &:last-child {
          margin-right: 0px;
        }
        &.--active {
          border-bottom: 1.5px solid $accent;
          .matrix-graph__tasks-number-title {
            color: $accent;
          }
          .matrix-graph__tasks-number {
            color: $accent;
            font-weight: bold;
          }
        }
        .matrix-graph__tasks-number-title {
          display: inline;
          font-size: 15px;
          margin-right: 10px;
        }
        .matrix-graph__tasks-number {
          color: $primary;
          font-size: 25px;
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
    height: 520px;
    padding: 0px !important;
  }
}
::v-deep .v-tabs-slider-wrapper {
  display: none !important;
}
</style>

<template>
  <v-container>
    <v-layout class="matrix__container">
      <v-card class="v-card">
        <v-layout>
          <p class="matrix__title">時間管理のマトリックス</p>
          <v-btn class="matrix__help-button" fab depressed outlined width="20px" height="20px">
            <v-icon class="matrix__help-icon" size="12px">mdi-help</v-icon>
          </v-btn>
        </v-layout>
        <div class="matrix__title-devider"></div>
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
        <div class="matrix-graph__wrapper">
          <matrixGraph></matrixGraph>
        </div>
        <div class="tasks-list__wrapper">
          <v-layout justify-start class="tasks-list__title-wrapper">
            <p class="tasks-list__title">第一領域</p>
          </v-layout>
          <div class="tasks-list__devider"></div>
          <div class="tasks-list__items">
            <v-list v-for="(task, index) in tasksData" :key="index">
              <v-list-item>
                <v-list-item-title>{{ task }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </div>
        </div>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import matrixGraph from "./matrixGraph";
export default {
  name: "Matrix",
  components: {
    matrixGraph
  },
  data() {
    return {
      tasksData: ["task1", "task2", "task3"],
      tasksNumbers: [
        { title: "第一領域のタスク数", number: 6 },
        { title: "第二領域のタスク数", number: 7 },
        { title: "第三領域のタスク数", number: 8 },
        { title: "第四領域のタスク数", number: 14 }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
$primary: #6245ea;
$secondary: #8471e2;

.v-application p {
  margin-bottom: 0px;
}
.container {
  padding: 0;
}
.v-card {
  width: 600px;
  height: 626px;
}
.matrix__container {
  justify-content: flex-end;
  padding-right: 30px;
  .matrix__title {
  color: #434343;
  font-size: 20px;
  margin-top: 17px;
  margin-bottom: 12px;
  margin-left: 20px;
  font-weight: bold;
}
.matrix__title-devider {
  border-bottom: solid 1.5px $secondary;
  width: 580px;
}
}


.matrix-graph__wrapper {
  width: 100%;
  height: 210px;
  display: flex;
  justify-content: center;
  margin-bottom: 35px;
}
.matrix-graph__tasks-number-wrapper {
  width: 100%;
  height: 25px;
  margin-top: 20px;
  margin-bottom: 30px;
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
      font-size: 12px;
      margin-right: 10px;
    }
    .matrix-graph__tasks-number {
      color: $secondary;
      font-size: 18px;
    }
  }
}

.tasks-list__wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  border: 0.3px solid black;
  .tasks-list__title-wrapper {
    width: 100%;
    .tasks-list__title {
      font-size: 15px;
      font-weight: bold;
      margin-bottom: 0px;
      margin-right: 30px;
    }
  }
  .tasks-list__devider {
    border-bottom: solid 1.5px $secondary;
    width: 530px;
  }
  .tasks-list__items {
    width: 475px;
    height: 210px;
    border: 0.3px solid black;
    margin-top: 30px;
    margin-right: 15px;
  }
}

.matrix__help-button {
  color: #707070;
  margin-right: 13px;
}

.matrix__help-icon {
  padding-bottom: 6px;
  padding-left: 1px;
}
</style>

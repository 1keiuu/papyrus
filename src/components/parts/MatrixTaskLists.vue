<template>
    <v-card class="tasks__list">
    <!-- <v-layout justify-start class="tasks-list__title-wrapper"> -->
      <p class="tasks-list__title">第一領域</p>
    <!-- </v-layout> -->
    <div class="tasks-list__items">
      <v-list v-for="(task, index) in tasksData" :key="index">
        <v-list-item>
          <v-list-item-title>{{ task }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </div>
        </v-card>

</template>
<script>
export default {
  name: "MatrixTaskLists",
  data() {
    return {
      tasksData: ["task1", "task2", "task3"],
    };
  }
};
</script>
<style scoped lang="scss">
$primary: #6245ea;
$secondary: #8471e2;
  .tasks__list{
    display: block;
    width:410px;
    height:580px;
  }
  .tasks-list__title-wrapper {
    width: 100%;
    .tasks-list__title {
      font-size: 15px;
      font-weight: bold;
      margin-bottom: 0px;
      margin-right: 30px;
    }
  }
  .tasks-list__items {
    width: 410px;
    height: 210px;
    border: 0.3px solid black;
    margin-top: 30px;
    margin-right: 15px;
  }

</style>

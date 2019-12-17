<template>
  <v-card class="tasks__list">
    <div class="tasks-list__items">
      <!-- <v-list v-for="(tasks, index) in tasksData" :key="index">
              <p class="taksks-list__item-title">
        {{targetsData[index].name}}
      </p>
        <v-list-item v-for="(task,index) in tasks" :key="index">
          <v-list-item-title>{{ task.name }}</v-list-item-title>
        </v-list-item>
      </v-list> -->
      <v-treeview
    hoverable
    :items="tasksData"
  ></v-treeview>
    </div>
  </v-card>
</template>
<script>
import store from "../../store"
export default {
  name: "MatrixTaskLists",
  data() {
    return {};
  },
  props: ["tasksData"],
  created() {
    console.log(this.tasksData)
  }
};
</script>
<style scoped lang="scss">
$primary: #56a5bf;
$secondary: #7dc0d6;
$accent: #ff7e2f;

.tasks__list {
  display: block;
  width: 410px;
  height: 580px;
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
  margin-top: 0px;
  margin-right: 15px;
}
.taksks-list__item-title{
  font-weight: 500;
  font-size: 20px;
}
</style>

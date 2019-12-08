<template>
  <v-dialog class="dialog" v-model="dialog" max-width="800px">
    <template v-slot:activator="{ on }"> </template>
    <v-card>
      <v-layout align-center justify-space-between>
        <v-card-title class="title__wrapper">アーカイブされたタスク</v-card-title>

      </v-layout>
      <v-tabs v-model="tab">
        <v-tab v-for="(targetTitle, index) in targetTitles" :key="index">{{ targetTitle }}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(task, index) in tasks" :key="index">
          <v-list v-if="task.length >= 1" two-line="">
            <v-list-item v-for="(task, index) in task[0]" :key="index">
              <v-checkbox v-model="selectedTasks" :value="task"></v-checkbox>
              <v-list-item-content>
                <v-list-item-title>{{ task.taskName }}</v-list-item-title>
                <v-list-item-subtitle>期日:{{ task.taskDeadline }}</v-list-item-subtitle>
                <v-expand-transition>
                  <div v-show="isOpenedIndex === index">
                    <v-card-text v-if="task.taskMemo">
                      {{ task.taskMemo }}
                    </v-card-text>
                    <v-card-text v-else>
                      説明がありません
                    </v-card-text>
                  </div>
                </v-expand-transition>
              </v-list-item-content>
              <v-btn icon @click="isOpened(index)">
                <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
              </v-btn>
            </v-list-item>
          </v-list>
          <span v-else>アーカイブされているタスクはありません</span>
        </v-tab-item>
      </v-tabs-items>
      <v-layout v-if="selectedTasks.length" justify-space-between align-center class="selected-tasks__wrapper">
        <p>{{selectedTasks.length}}件選択中</p>
        <div>
        <v-btn rounded>元に戻す</v-btn>
        <v-btn>削除する</v-btn>
        </div>
      </v-layout>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "ArchivedTasksModal",
  data: () => ({
    dialog: false,
    tab: null,
    tasks: [[], [], [], []],
    targetTitles: [],
    selectedTasks: [],
    show: false,
    isOpenedIndex:''
  }),
  props: ["tasksData", "targetsData"],
  methods: {
    openDialog() {
      this.dialog = true;
    },
    isOpened(index) {
      if (this.isOpenedIndex !== index) {
        this.isOpenedIndex = index
      } else if (this.isOpenedIndex === index) {
        this.isOpenedIndex = ''
      }
    }
  },
  created() {
    this.targetsData.forEach((target, index) => {
      this.targetTitles.push(target.name);
    });
    this.tasksData.forEach((task, index) => {
      if (task[0]) {
        if (task[0].status === "archived") {
          this.tasks[index].push(task);
        }
      }
    });
    console.log(this.tasks);
  },
  watch: {}
};
</script>
<style lang="scss" scoped>
$primary: #6245ea;
$secondary:#8471E2;

.v-card {
  min-height: 500px;
}
.v-application p{
  margin-bottom:0px;
  font-size: 18px;
    color: #F3F5F9;
}

.selected-tasks__wrapper{
  width:100%;
  height:55px;
  padding:0px 10px;
  background-color:$secondary;
  position: absolute;
  bottom: 0;
}
</style>

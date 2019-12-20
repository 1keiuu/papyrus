<template>
  <v-card class="tasks__list">
    <v-list>
      <v-list-group
        v-for="(targetData, index) in targetsData"
        :key="targetData.name"
        :ripple="false"
        color="#56a5bf"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="targetData.name"></v-list-item-title>
          </v-list-item-content>
        </template>
        <div v-if="tasksData[index].length !== 1">
          <v-list-item v-for="taskItem in tasksData[index]" :key="taskItem.name">
            <v-list-item-content @click="handleTaskListItemClick(taskItem)">
              <v-layout
                class="list-item__wrapper"
                v-if="taskItem.status !== 'subtitle'"
                align-center
              >
                <v-list-item-title v-text="taskItem.name"></v-list-item-title>
                <v-list-item-subtitle v-text="taskItem.deadline"></v-list-item-subtitle>
              </v-layout>
              <v-layout class="list-item__subTitle-wrapper" v-else>
                <v-list-item-subtitle v-text="taskItem.name"></v-list-item-subtitle>
                <v-list-item-subtitle v-text="taskItem.deadline"></v-list-item-subtitle>
              </v-layout>
            </v-list-item-content>
          </v-list-item>
        </div>
        <div v-else>
          <v-list-item>
            <v-layout class="list-item__wrapper">
              <v-list-item-title>該当するタスクはありません</v-list-item-title>
            </v-layout>
          </v-list-item>
        </div>
      </v-list-group>
    </v-list>
    <EditTaskModal
      ref="editTaskModal"
      @store="submitEditTaskData"
      @delete="deleteTaskData"
      @archive="changeTaskStatus"
      @complete="changeTaskStatus"
      :taskData="selectedTaskData"
    ></EditTaskModal>
  </v-card>
</template>
<script>
import firebase from "firebase"
import store from "../../store"
import EditTaskModal from "./modal/EditTaskModal";

export default {
  name: "MatrixTaskLists",
  components: {
    EditTaskModal
  },
  data() {
    return {
      selectedTaskData:[]
    };
  },
  props: ["tasksData"],
  computed: {
    targetsData() {
      return this.$store.getters.targetsData;
    }
  },
  methods: {
    handleTaskListItemClick(taskData) {
      this.selectedTaskData = taskData;
      this.$refs.editTaskModal.openDialog();
    },
    submitEditTaskData(input, formerTargetRank) {
      firebase
        .firestore()
        .collection("tasks")
        .doc(this.userId)
        .set(
          {
            [input.taskId]: {
              taskId: input.taskId,
              name: input.name,
              deadline: input.deadline,
              targetRank: input.targetRank,
              memo: input.memo,
              status: "doing",
              answer1: input.answer1,
              answer2: input.answer2,
              answer3: input.answer3,
              importanceScore: input.importanceScore
            }
          },
          { merge: true }
        );
      const data = {
        taskId: input.taskId,
        name: input.name,
        deadline: input.deadline,
        targetRank: input.targetRank,
        memo: input.memo,
        status: "doing",
        formerTargetRank: formerTargetRank,
        answer1: input.answer1,
        answer2: input.answer2,
        answer3: input.answer3,
        importanceScore: input.importanceScore
      };
      store.commit("editTaskData", data);
    },
    deleteTaskData(targetRank, taskId) {
      const taskData = {
        targetRank: targetRank,
        taskId: taskId
      };
      this.$store.commit("deleteTaskData", taskData);
    },
    changeTaskStatus(inputData, status) {
      const data = { inputData: inputData, status: status };
      store.commit("changeTaskStatus", data);
    },
  },
  created() {}
};
</script>
<style scoped lang="scss">
$primary: #56a5bf;
$secondary: #7dc0d6;
$accent: #ff7e2f;

.tasks__list {
  display: block;
  width: 410px;
  height: 520px;
}
.v-list-item {
  cursor: pointer;
}
.v-list-item__title {
  padding: 0;
  font-weight: 500;
  font-size: 17px;
}
.list-item__wrapper {
  padding-left: 20px;
  .v-list-item__title {
    font-weight: normal;
    font-size: 15px;
  }
  .list-item__edit-icon {
    opacity: 0;
    pointer-events: none;
    &.--active {
      opacity: 1;
      pointer-events: all;
    }
  }
}
.list-item__subTitle-wrapper {
  margin-left: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #b9b8b8;
  .v-list-item__subtitle {
    font-weight: normal;
    color: #707070;
    font-size: 12px;
  }
}
</style>

<template>
  <v-app>
    <v-sheet
      width="325"
      elevation="4"
      class="targetSheet"
      @mouseenter="isHover = true"
      @mouseleave="isHover = false"
    >
      <v-card class="targetSheet__card">
        <div class="targetSheet__thumbnail-wrapper">
          <img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            class="targetSheet__thumbnail"
            height="200px"
            width="100%"
          />
          <div class="targetSheet__title-wrapper">
            <p class="targetSheet__title">{{ targetData.name }}</p>
          </div>
        </div>
        <v-card-actions>
          <v-card-subtitle v-if="DiffDate">期日:{{ this.DiffDate }} </v-card-subtitle>
          <v-card-subtitle v-else>期日未設定</v-card-subtitle>

          <v-spacer></v-spacer>
          <v-tooltip bottom
            ><template v-slot:activator="{ on }">
              <v-btn
                class="targetSheet__edit-button"
                :class="{ '--hover': isHover }"
                fab
                depressed
                outlined
                width="29px"
                height="29px"
                v-on="on"
                color="#707070"
                @click="handleEditTargetButtonClick(targetData)"
              >
                <v-icon size="18"> mdi-file-document-edit-outline</v-icon>
              </v-btn>
            </template>
            <span>編集</span>
          </v-tooltip>

          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="show">
            <v-card-text v-if="targetData.description">
              {{ targetData.description }}
            </v-card-text>
            <v-card-text v-else>
              説明がありません
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
      <v-btn
        color="#417D91"
        outlined
        class="targetSheet__add-button"
        @click="handleAddTaskButtonClick(targetData)"
      >
        <v-icon>
          mdi-plus
        </v-icon>
        追加
      </v-btn>
      <div class="taskCard__container">
        <div
          v-for="(card, index) in taskData"
          :key="index"
          class="taskCard__wrapper"
          @click="handleTaskCardClick(taskData[index])"
        >
          <TaskCard :taskData="taskData[index]" class="taskCard"> </TaskCard>
        </div>
      </div>

      <EditTaskModal
        ref="editTaskModal"
        @store="submitEditTaskData"
        @delete="deleteTaskData"
        @archive="changeTaskStatus"
        @complete="changeTaskStatus"
        :taskData="selectedTaskData"
      ></EditTaskModal>
      <EditTargetModal
        ref="editTargetModal"
        @submit="submitEditTargetData"
        :targetData="selectedTargetData"
      ></EditTargetModal>
      <AddTaskModal
        ref="addTaskModal"
        :targetData="targetData"
        :targetRankProp="targetData.targetRank"
      ></AddTaskModal>
    </v-sheet>
  </v-app>
</template>

<script>
import firebase from "firebase";
import moment from "moment";
import TaskCard from "./TaskCard";
import store from "../../store";
import EditTaskModal from "./modal/EditTaskModal";
import AddTaskModal from "./modal/AddTaskModal";
import EditTargetModal from "./modal/EditTargetModal";

export default {
  name: "TargetSheet",
  components: {
    TaskCard,
    EditTaskModal,
    AddTaskModal,
    EditTargetModal
  },
  data() {
    return {
      show: false,
      isHover: false,
      selectedTaskData: [],
      selectedTargetData: [],
      userId: firebase.auth().currentUser.uid
    };
  },
  props: ["targetData", "taskData"],
  methods: {
    handleTaskCardClick(taskData) {
      this.selectedTaskData = taskData;
      this.openModal("editTask");
    },
    handleAddTaskButtonClick(targetData) {
      this.selectedTargetData = targetData;
      this.openModal("addTask");
    },
    handleEditTargetButtonClick(targetData) {
      this.selectedTargetData = targetData;
      this.openModal("editTarget");
    },
    changeTaskStatus(inputData, status) {
      const data = { inputData: inputData, status: status };
      store.commit("changeTaskStatus", data);
    },
    openModal(target) {
      switch (target) {
        case "editTask":
          this.$refs.editTaskModal.openDialog();
          break;
        case "addTask":
          this.$refs.addTaskModal.openDialog();
          break;
        case "editTarget":
          this.$refs.editTargetModal.openDialog();
          break;
        default:
      }
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
    submitEditTargetData(inputName, inputDeadline, inputDescrition, targetRank) {
      firebase
        .firestore()
        .collection("targets")
        .doc(this.userId)
        .update({
          [targetRank]: {
            name: inputName,
            deadline: inputDeadline,
            description: inputDescrition,
            targetRank: targetRank
          }
        });
      const data = {
        name: inputName,
        deadline: inputDeadline,
        description: inputDescrition,
        targetRank: targetRank
      };

      this.$store.commit("editTargetData", data);
    },
    deleteTaskData(targetRank, taskId) {
      const taskData = {
        targetRank: targetRank,
        taskId: taskId
      };
      this.$store.commit("deleteTaskData", taskData);
    }
  },
  mounted() {
  },
  computed: {
    Deadline() {
      return moment(this.targetData.deadline);
    },
    DiffDate() {
      return this.Deadline.diff(moment(new Date()), "day");
    }
  }
};
</script>
<style scoped lang="scss">
$primary: #56a5bf;
$secondary: #7dc0d6;
$accent: #ff7e2f;
.v-application {
  display: inline;
}
.v-tooltip__content {
  font-size: 12px;
}
.targetSheet__title-wrapper {
  position: absolute;
  width: 235px;
  height: 40px;
  top: 160px;
  left: 90px;
  border-radius: 2px;
  background-color: $primary;
}
.targetSheet__thumbnail-wrapper {
  &:hover {
    opacity: 0.8;
  }
}
.targetSheet__thumbnail {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.targetSheet__edit-button {
  opacity: 0;
  &.--hover {
    opacity: 1;
  }
}
.targetSheet__title {
  margin-bottom: 0;
  position: absolute;
  top: 10px;
  left: 10px;
  color: white;
}
.targetSheet__card {
  box-shadow: 0 0 0 !important;
  border-top-left-radius: 10px !important;
  border-top-right-radius: 10px !important;
}
.targetSheet {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  &:hover {
    cursor: pointer;
  }
}
.targetSheet__add-button {
  height: 30px;
  width: 290px;
  margin-bottom: 10px;
}
.taskCard__container {
  max-height: 310px;
  display: inline;
  overflow-y: scroll;
}
.taskCard__wrapper {
  margin: 10px 0px 10px 10px;
}

.taskCard {
  margin: 5px 0px;
  z-index: 1;
  &:hover {
    background-color: rgb(197, 187, 245, 0.2);
  }
}
</style>

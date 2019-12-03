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
          <v-card-subtitle v-if="targetData.deadline"
            >期日:{{ targetData.deadline }}
          </v-card-subtitle>
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
      <v-btn color="#8471e2" outlined class="targetSheet__add-button">
        <v-icon>
          mdi-plus
        </v-icon>
        追加
      </v-btn>
      <div
        v-for="(card, index) in taskData"
        :key="index"
        class="taskCard__wrapper"
        @click="handleTaskCardClick(taskData[index])"
      >
        <TaskCard :taskData="taskData[index]" class="taskCard"> </TaskCard>
      </div>
      <EditTaskModal ref="editTaskModal" :taskData="selectedTaskData"></EditTaskModal>
    </v-sheet>
  </v-app>
</template>

<script>
import TaskCard from "./TaskCard";
import EditTaskModal from "./modal/EditTaskModal";

export default {
  name: "TargetSheet",
  components: {
    TaskCard,
    EditTaskModal
  },
  data() {
    return {
      show: false,
      isHover: false,
      selectedTaskData: []
    };
  },
  props: ["targetData", "taskData"],
  methods: {
    handleTaskCardClick(taskData) {
      this.selectedTaskData = taskData;
      this.openModal();
    },
    openModal() {
      this.$refs.editTaskModal.openDialog();
    }
  },
  mounted() {
    // console.log(this.taskData);
  }
};
</script>
<style scoped lang="scss">
$primary: #6245ea;
$secondary: #8471e2;

.targetSheet__title-wrapper {
  position: absolute;
  width: 235px;
  height: 40px;
  top: 160px;
  left: 90px;
  border-radius: 2px;
  background-color: $secondary;
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
  padding-bottom: 20px;
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
.taskCard__wrapper {
  margin: 5px 0px;
}

.taskCard {
  z-index: 100;
  &:hover {
    background-color: rgb(197, 187, 245, 0.2);
  }
}
</style>

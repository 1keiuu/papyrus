<template>
  <v-app>
    <p-header
      @logout="handleHeaderMenuLogoutClick"
      @edit="handleHeaderMenuEditProfileClick"
      @archivedTasks="handleHeaderArchivedTasksClick"
      @completedTasks="handleHeaderCompletedTasksClick"
      @addTask="handleHeaderAddTaskButtonClick"
      v-if="$route.name !== 'no_auth/login'"
      v-bind:userName="this.userName"
    ></p-header>
    <p-navigation class="p-navigation" v-if="$route.name !== 'no_auth/login'"></p-navigation>
    <v-content>
      <router-view ref="rv" class="router-view" />
      <ProfileEditModal
        ref="profileEditModal"
        @submit="submitProfileData"
        v-bind:userName="this.userName"
      ></ProfileEditModal>
      <AddTaskModal ref="addTaskModal" @submit="submitTaskData"></AddTaskModal>
      <ArchivedTasksModal
        :tasksData="tasksData"
        :targetsData="targetsData"
        ref="archivedTasksModal"
      ></ArchivedTasksModal>
      <CompletedTasksModal
        :tasksData="tasksData"
        :targetsData="targetsData"
        ref="completedTasksModal"
      ></CompletedTasksModal>
    </v-content>
  </v-app>
</template>

<script>
import moment from "moment";
import firebase from "firebase/app";
import store from "./store";
import Header from "@/components/globals/Header";
import ProfileEditModal from "./components/parts/modal/ProfileEditModal";
import AddTaskModal from "./components/parts/modal/AddTaskModal";
import Navigation from "@/components/globals/Navigation";
import ArchivedTasksModal from "@/components/parts/modal/ArchivedTasksModal";
import CompletedTasksModal from "@/components/parts/modal/CompletedTasksModal";

export default {
  name: "App",
  components: {
    "p-header": Header,
    ProfileEditModal,
    AddTaskModal,
    "p-navigation": Navigation,
    ArchivedTasksModal,
    CompletedTasksModal
  },
  data() {
    return {
      name: "",
      profileImage: "",
      importanceScore: ""
    };
  },
  methods: {
    handleHeaderMenuLogoutClick() {
      this.$refs.rv.logout();
      store.commit("setSignIn", false);
      store.commit("setUserId", "");
    },
    handleHeaderMenuEditProfileClick() {
      this.openProfileEditModal();
    },
    handleHeaderAddTaskButtonClick() {
      this.openAddTaskModal();
    },
    handleHeaderArchivedTasksClick() {
      this.openArchivedTasksModal();
    },
    handleHeaderCompletedTasksClick() {
      this.openCompletedTasksModal();
    },
    openAddTaskModal() {
      this.$refs.addTaskModal.openDialog();
    },
    openProfileEditModal() {
      this.$refs.profileEditModal.openDialog();
    },
    openArchivedTasksModal() {
      this.$refs.archivedTasksModal.openDialog();
    },
    openCompletedTasksModal() {
      this.$refs.completedTasksModal.openDialog();
    },
    submitProfileData(inputName, selectedItems, inputImage) {
      const metadata = {
        contentType: "image/jpeg"
      };
      firebase
        .firestore()
        .collection("user_info")
        .doc(this.userId)
        .set({ name: inputName, interests: selectedItems }, { merge: true });
      if (inputImage !== "") {
        firebase
          .storage()
          .ref()
          .child("profile")
          .child(this.userId)
          .put(inputImage, metadata)
          .then(snapshot => {
            snapshot.ref.getDownloadURL().then(downloadURL => {
              store.commit("setProfileImageUrl", downloadURL);
              firebase
                .firestore()
                .collection("user_info")
                .doc(this.userId)
                .update({ profileImage: downloadURL });
              console.log(downloadURL);
            });
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        console.log();
      }
      store.commit("setUserName", inputName);
    },
    submitTaskData(input) {
      const data = {
        taskId: this.taskId,
        name: input.name,
        deadline: input.deadline,
        targetRank: input.targetRank,
        memo: input.memo,
        answer1: input.answer1,
        answer2: input.answer2,
        answer3: input.answer3,
        importanceScore: input.importanceScore,
        importanceArea: input.importanceArea,
        status: "doing"
      };

      firebase
        .firestore()
        .collection("tasks")
        .doc(this.userId)
        .set(
          {
            [this.taskId]: {
              taskId: this.taskId,
              name: input.name,
              deadline: input.deadline,
              targetRank: input.targetRank,
              memo: input.memo,
              answer1: input.answer1,
              answer2: input.answer2,
              answer3: input.answer3,
              importanceScore: input.importanceScore,
              importanceArea: input.importanceArea,
              status: "doing"
            }
          },
          { merge: true }
        );
      store.commit("setTaskId", 1);
      store.commit("setTasksData", data);
      console.log(data);
    }
  },
  computed: {
    userStatus() {
      return this.$store.getters.isSignIn;
    },
    userName() {
      return this.$store.getters.userName;
    },
    userId() {
      return this.$store.getters.userId;
    },
    taskId() {
      return this.$store.getters.taskId;
    },
    tasksData() {
      return this.$store.getters.tasksData;
    },
    targetsData() {
      return this.$store.getters.targetsData;
    }
  },
  watch: {
    // tasksData:function() {
    // }
  },
  created() {
    console.log(this.$store.state);
  }
};
</script>
<style scoped>
::-webkit-scrollbar {
  display: none;
}

.v-application {
  height: 100vh !important;
  overflow-y: hidden !important;
  background: #f3f5f9;
}

.p-navigation {
  position: absolute;
  z-index: 2;
}

.p-header {
  z-index: 3;
}

.addTaskModal {
  overflow: hidden !important;
}
</style>

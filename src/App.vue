<template>
  <v-app>
    <p-header
      @logout="handleHeaderMenuLogoutClick"
      @edit="handleHeaderMenuEditProfileClick"
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
    </v-content>
  </v-app>
</template>

<script>
import firebase from "firebase/app";
import { mapActions, mapState } from "vuex";
import Header from "@/components/globals/Header";
import ProfileEditModal from "./components/parts/ProfileEditModal";
import AddTaskModal from "./components/parts/AddTaskModal";
import Navigation from "@/components/globals/Navigation";

export default {
  name: "App",
  components: {
    "p-header": Header,
    ProfileEditModal,
    AddTaskModal,
    "p-navigation": Navigation
  },
  data() {
    return {
      name: "",
      profileImage: ""
    };
  },
  methods: {
    ...mapActions("User", ["setSignIn", "setprofileImg", "setUserName"]),
    ...mapActions("Task", ["setTaskId"]),
    handleHeaderMenuLogoutClick() {
      this.$refs.rv.logout();
      this.setSignIn(false);
      this.setUserId("");
    },
    handleHeaderMenuEditProfileClick() {
      this.openProfileEditModal();
    },
    handleHeaderAddTaskButtonClick() {
      this.openAddTaskModal();
    },
    openAddTaskModal() {
      this.$refs.addTaskModal.openDialog();
    },
    openProfileEditModal() {
      this.$refs.profileEditModal.openDialog();
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
              this.setprofileImg(downloadURL);
            });
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        console.log();
      }
      this.setUserName(inputName);
    },
    submitTaskData(inputName, inputDate, selectedCategory, inputMemo) {
      firebase
        .firestore()
        .collection("tasks")
        .doc(this.userId)
        .set(
          {
            [this.taskId]: {
              taskName: inputName,
              taskDate: inputDate,
              category: selectedCategory,
              taskMemo: inputMemo,
              status: "Doing"
            }
          },
          { merge: true }
        );
      this.setTaskId(1);
    }
  },
  computed: {
    ...mapState("User", {
      userStatus: state => state.isSignIn
    }),
    ...mapState("User", {
      userName: state => state.userName
    }),
    ...mapState("User", {
      userId: state => state.userId
    }),
    ...mapState("Task", {
      taskId: state => state.taskIdLatest
    })
  }
};
</script>
<style scoped>
::-webkit-scrollbar {
  display: none;
}

.p-navigation {
  position: absolute;
  z-index: 2;
}

.p-header {
  z-index: 3;
}
</style>

<template>
  <v-app>
    <p-header
      @logout="handleHeaderMenuLogoutClick"
      @edit="handleHeaderMenuEditProfileClick"
      @addTask="handleHeaderAddTaskButtonClick"
      v-if="$route.name.indexOf('no_auth') !== 0"
      v-bind:userName=this.userName
    ></p-header>
    <v-content>
      <router-view ref="rv" />
      <ProfileEditModal ref="profileEditModal" @submit="submitProfileData" v-bind:userName=this.userName
></ProfileEditModal>
      <AddTaskModal ref="addTaskModal" @submit="submitTaskData"></AddTaskModal>
    </v-content>
  </v-app>
</template>

<script>
import firebase from "firebase/app";
import store from "./store";
import Header from "@/components/globals/Header";
import ProfileEditModal from "./components/parts/ProfileEditModal";
import AddTaskModal from "./components/parts/AddTaskModal";

export default {
  name: "App",
  components: {
    "p-header": Header,
    ProfileEditModal,
    AddTaskModal
  },
  data() {
    return {
      name: ""
    };
  },
  methods: {
    handleHeaderMenuLogoutClick() {
      this.$refs.rv.logout();
      store.commit("userStatus", false);
    },
    handleHeaderMenuEditProfileClick() {
      this.openProfileEditModal();
    },
    handleHeaderAddTaskButtonClick() {
      this.openAddTaskModal();
    },
    // handleHeaderSetTargetButtonClick() {
    //   this.$refs.rv.setTarget()
    // },
    openAddTaskModal() {
      this.$refs.addTaskModal.openDialog();
    },
    openProfileEditModal() {
      this.$refs.profileEditModal.openDialog();
    },
    submitProfileData(inputName, selectedItems, inputImage) {
      const user = firebase.auth().currentUser;
      firebase
        .firestore()
        .collection("user_info")
        .doc(user.uid)
        .set({ name: inputName, interests: selectedItems, imageUrl: inputImage }, { merge: true });
      store.commit("setUserName", inputName);
    },
    submitTaskData(inputName, inputDate, selectedCategory) {
      const user = firebase.auth().currentUser;
      firebase
        .firestore()
        .collection("tasks")
        .doc(user.uid)
        .collection("task")
        .doc()
        .set({ taskName: inputName, taskDate: inputDate, category: selectedCategory });
    }
  },
  computed: {
    userStatus() {
      // ログインするとtrue
      return this.$store.getters.isSignIn;
    },
    userName() {
      return this.$store.getters.userName;
    }
  }
};
</script>
<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>

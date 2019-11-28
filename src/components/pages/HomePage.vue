<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout justify-center wrap>
        <div class="inner-left__wrapper"><MissionState></MissionState>
        <Goals></Goals></div>
        <div class="inner-right__wrapper">
          <Matrix></Matrix>
          <div class="matrix__wrapper"></div>
        </div>
      </v-layout>
      <ProfileEditModal ref="profileEdit" @submit="submitProfileData"></ProfileEditModal>
    </v-container>
  </v-content>
</template>

<script>
import firebase from "firebase/app";
import store from "../../store";
import ProfileEditModal from "../parts/ProfileEditModal";
import router from "@/router";
import MissionState from "../parts/MissionState"
import Goals from "../parts/Goals"
import Matrix from "../parts/Matrix"
// import firebaseConfig from "../../main";
// firebase.initializeApp(firebaseConfig);

// const storageRef = firebase
//   .storage()
//   .ref()
//   .child("profile");

export default {
  name: "HelloWorld",
  data: () => ({
    userId: firebase.auth().currentUser.uid
  }),
  components: {
    ProfileEditModal,
    MissionState,
    Goals,
    Matrix
  },
  methods: {
    logout() {
      firebase.auth().signOut();
      console.log("loggedout");
    },
    openProfileEditModal() {
      this.$refs.profileEdit.openDialog();
    },
    submitProfileData(inputName, selectedItems, inputImage) {
      firebase
        .firestore()
        .collection("user_info")
        .doc(this.userId)
        .update({ name: inputName });
      firebase
        .firestore()
        .collection("user_info")
        .doc(this.userId)
        .update({ interests: selectedItems });
    }
  },
  mounted() {
    console.log(store.state);
  }
};
</script>

<style scoped>
.v-content {
  padding: 20px !important;
}
.inner-right__wrapper {
  width: 597px;
  height: 626px;
  margin-left: 30px;
}
.inner-left__wrapper {
  width: 600px;
  height: 200px;
  margin-left: 60px;
}
</style>

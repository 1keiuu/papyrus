<template>
  <v-content class="home__content">
    <v-container fluid fill-height class="home__container">
      <v-layout>
        <div class="inner-left__wrapper">
          <div class="missionState">
          <MissionState></MissionState>
          </div>
          <div class="targets__wrapper">
          <Goals></Goals>
          </div>
        </div>
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
import ProfileEditModal from "../parts/modal/ProfileEditModal";
import router from "@/router";
import MissionState from "../parts/MissionState";
import Goals from "../parts/Goals";
import Matrix from "../parts/Matrix";

// import firebaseConfig from "../../main";
// firebase.initializeApp(firebaseConfig);

// const storageRef = firebase
//   .storage()
//   .ref()
//   .child("profile");

export default {
  name: "HomePage",
  data: () => ({}),
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
  mounted() {},
  computed: {
    userId() {
      return this.$store.getters.userId;
    }
  }
};
</script>

<style scoped>
.v-content {
  padding: 0px !important;
}
.home__container {
  margin-left: 70px;
  padding: 0px;
  padding-top: 30px;
}
.inner-right__wrapper {
  width: 648px;
  height: 100vh;
}
.targets__wrapper{
  margin-top:30px;
}
.inner-left__wrapper {
  width: 648px;
  height: 100vh;
  padding-left: 30px;
}
</style>

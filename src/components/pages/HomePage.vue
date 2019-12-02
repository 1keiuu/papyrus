<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout wrap>
        <div class="inner-left__wrapper"><MissionState></MissionState> <Goals></Goals></div>
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
import { mapState } from 'vuex';
import ProfileEditModal from "../parts/ProfileEditModal";
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
    ...mapState('User',{
      userId: state => state.userId
    })
  }
};
</script>

<style scoped>
.v-content {
  padding: 0px !important;
  overflow: hidden;
}
.container {
  padding: 0px;
}
.inner-right__wrapper {
  width: 510px;
  height: 576px;
  margin-left: 30px;
  padding-top: 30px;
}
.inner-left__wrapper {
  width: 600px;
  height: 200px;
  margin-left: 60px;
  padding-top: 30px;
}
</style>

<template>
  <v-content class="home__content">
    <v-container fluid fill-height class="home__container">
      <v-layout>
        <div class="inner-left__wrapper">
          <div class="missionState">
          <MissionState></MissionState>
          </div>
          <div class="targets__wrapper">
          <TargetList :targetsData="targetsData"></TargetList>
          </div>
        </div>
        <div class="inner-right__wrapper">
          <div class="calender__wrapper">
            <Calender :tasksData="tasksData"></Calender>
          </div>
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
import TargetList from "../parts/TargetList";
import Calender from "../parts/Calender"

export default {
  name: "HomePage",
  data: () => ({}),
  components: {
    ProfileEditModal,
    MissionState,
    TargetList,
    Calender
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
    },
    tasksData() {
      return this.$store.getters.tasksData;
    },
    targetsData() {
      return this.$store.getters.targetsData
    }
  }
};
</script>

<style scoped>
.v-content {
  padding: 0px !important;
    overflow: hidden;
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
  margin-right:30px;
}
.calender__wrapper{
  width:560px;
  height:585px;
}
</style>

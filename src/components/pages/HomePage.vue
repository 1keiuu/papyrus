<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex xs12></v-flex>
      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">MainPage</h1>
        <ProfileEditModal ref="profileEdit" @submit="submitProfileData"></ProfileEditModal>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "firebase/app";
import firestore from "firebase/firestore";
// import storage from 'firebase/storage';
import ProfileEditModal from "../parts/ProfileEditModal";
import router from '@/router'
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
    ProfileEditModal
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
      // storageRef
      //   .put(inputImage)
      //   .then(snapshot => {
      //     console.log("Uploaded a blob or file!");
      //   })
      //   .catch(err => {
      //     console.log("failed");
      //   });
    }
  }
};
</script>

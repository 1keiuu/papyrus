<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex xs12></v-flex>
      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">MainPage</h1>
        <!-- <p>{{user.displayName}}</p> -->
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
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  }
};
</script>

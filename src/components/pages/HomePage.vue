<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex xs12></v-flex>
      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">MainPage</h1>
        <!-- <p>{{user.displayName}}</p> -->
        <!-- <ProfileEditModal ref="profileEdit" @submit="submitProfileData"></ProfileEditModal> -->
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "firebase/app";
import firestore from "firebase/firestore";
// import storage from 'firebase/storage';

// import firebaseConfig from "../../main";
// firebase.initializeApp(firebaseConfig);


// const storageRef = firebase
//   .storage()
//   .ref()
//   .child("profile");

export default {
  name: "HelloWorld",
  data: () => ({
  }),
  components: {
  },
  methods: {
    logout() {
      firebase.auth().signOut();
      console.log("loggedout");
    },
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  }
};
</script>

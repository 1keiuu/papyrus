<template>
  <v-container fluid fill-height>
    <v-layout wrap>
      <v-flex  class="d">
        <v-card class="a">


        </v-card>
        <div class="b">
        </div>
      </v-flex>
      <v-flex>
        <div class="c">
        </div>
      </v-flex>
    </v-layout>
    <ProfileEditModal ref="profileEdit" @submit="submitProfileData"></ProfileEditModal>
  </v-container>
</template>

<script>
import firebase from "firebase/app";
import store from "../../store";
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
    }
  },
  mounted() {
    console.log(store.state)
  }
};
</script>
<style scoped>
  .a{
    width:650px;
    height:165px;
  }
  .b{
        margin-top:40px;
        width:513px;
    height:228px;
    background-color:blue
  }
  .c{
    width:667px;
    height:626px;
    background-color:green;
        margin-top:20px;

  }
  .d{
    margin-left: 95px;
    margin-top:20px;
  }
</style>

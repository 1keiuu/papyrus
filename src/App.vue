<template>
  <v-app>
      <p-header
        @logout="handleHeaderMenuLogoutClick"
        @edit="handleHeaderMenuEditProfileClick"
        @addTask="handleHeaderAddTaskButtonClick"
        @setTarget="handleHeaderSetTargetButtonClick"
        v-if="$route.name.indexOf('no_auth') !== 0"
      ></p-header>
      <ProfileEditModal ref="profileEdit" @submit="submitProfileData"></ProfileEditModal>
      <v-content>
        <router-view ref="rv" />
      </v-content>
  </v-app>
</template>

<script>
import firebase from "firebase/app";
import store from "./store";
import Header from "@/components/globals/Header";
import ProfileEditModal from "./components/parts/ProfileEditModal";

export default {
  name: "App",
  components: {
    "p-header": Header,
    ProfileEditModal
  },
  data() {
    return {
      name: "",
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
    // handleHeaderAddTaskButtonClick() {
    //   this.$refs.rv.openDialog();
    // },
    // handleHeaderSetTargetButtonClick() {
    //   this.$refs.rv.setTarget()
    // },
    openProfileEditModal() {
      this.$refs.profileEdit.openDialog();
    },
    submitProfileData(inputName, selectedItems, inputImage) {
      const user = firebase.auth().currentUser;
      firebase
        .firestore()
        .collection("user_info")
        .doc(user.uid)
        .update({ name: inputName });
      firebase
        .firestore()
        .collection("user_info")
        .doc(user.uid)
        .update({ interests: selectedItems });
    }
  },
  computed: {
    userStatus() {
      // ログインするとtrue
      return this.$store.getters.isSignIn;
    }
  },
};
</script>
<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>

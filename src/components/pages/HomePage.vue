<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex xs12></v-flex>
      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">MainPage</h1>
        <ProfileEditModal ref="profileEdit"></ProfileEditModal>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from 'firebase/app'
import ProfileEditModal from '../parts/ProfileEditModal'

export default {
  name: 'HelloWorld',
  data: () => ({}),
  components: {
    ProfileEditModal
  },
  methods: {
    logout() {
      firebase.auth().signOut()
      console.log("loggedout")
    },
    openProfileEditModal() {
      console.log("a")
      this.$refs.profileEdit.openDialog()
    },
  }
}
</script>

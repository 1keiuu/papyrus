<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex xs12></v-flex>
      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">MainPage</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from 'firebase/app'
// import bus from '../globals/Header'
import bus from '../../main'

export default {
  name: 'HelloWorld',
  data: () => ({}),
  methods: {
    logout() {
      firebase.auth().signOut()
      console.log("loggedout")
    },
    openProfileEditModal() {
    },
  }
}
</script>

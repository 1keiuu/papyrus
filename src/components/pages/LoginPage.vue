<template>
  <v-app>
    <v-content class="body">
      <v-container fill-height>
        <v-layout row wrap justify-end="true">
          <v-flex xs5 class="py-6">
            <div id="app">
              <div class="text-center">
                <v-sheet color="rgba(176, 182, 182, 0.42)" min-width="420" min-height="600">
                  <v-form ref="form" v-model="valid" lazy-validation class="form">
                    <v-text-field v-model="name"
                    :rules="nameRules" label="ユーザー名" required></v-text-field>
                    <v-text-field v-model="password"
                    :rules="passwordRules" label="パスワード" required></v-text-field>
                    <v-checkbox v-model="checkbox" label="ログイン状態を保持する" required></v-checkbox>
                  </v-form>
                  <v-flex xs10 mx-12 px-12 align-self-center="true">
                    <v-btn class="info" min-width="200" @click="emailLogin">ログイン</v-btn>
                  </v-flex>
                </v-sheet>
              </div>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import router from '@/router'

export default {
  data: () => ({
    valid: true,
    email: '',
    password: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    select: null,
    checkbox: false,
    lazy: false,
  }),
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    emailLogin() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(result => {
        console.log(result)
        router.push('/main')
      }).catch(error => {
        console.log(error)
        this.errorMessage = error.message
        this.showError = true
        alert("aaa")
      })
    },
  },
}
</script>

<style scoped>
.body {
  background-image: url('../../assets/login_back.jpg');
  width: 100%;
  height: 100%;
}
.form {
  width: 70%;
}
</style>

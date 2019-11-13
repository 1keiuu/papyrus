<template>
  <v-app class="b">
    <v-content class="content">
      <v-container fluid fill-height>
        <v-layout justify-end align-center>
                <v-sheet color="rgba(256, 256, 256, 0.42)" class="sheet">
                  <v-layout justify-center fill-height>
                  <v-form ref="form" v-model="valid" lazy-validation class="form" >
                    <v-flex px-2>
                    <v-text-field
                      v-model="email"
                      label="メールアドレス"
                      :rules="emailRules"
                      required
                    ></v-text-field>
                    </v-flex>
                    <v-flex px-2>
                    <v-text-field
                      v-model="password"
                      :type="show1 ? 'text' : 'password'"
                      :rules="passwordRules"
                      label="パスワード"
                    ></v-text-field>
                    <v-checkbox
                      v-model="checkbox"
                      label="ログイン状態を保持する"
                      required
                    ></v-checkbox>
                    </v-flex>
<v-card-actions class="justify-center">
                        <v-btn class="button__login primary" min-width="324" @click="emailLogin">ログイン</v-btn>
</v-card-actions>
                  </v-form>
                                    </v-layout>
                </v-sheet>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import firebase from "firebase/app";
import router from "@/router";

export default {
  data: () => ({
    valid: true,
    email: "",
    emailRules: [v => !!v || "E-mail is required", v => /.+@.+/.test(v) || "E-mail must be valid"],
    password: "",
    passwordRules: [
      value => !!value || "Required.",
      v => v.length >= 8 || "Min 8 characters",
      () => "The email and password you entered don't match"
    ],
    select: null,
    checkbox: false,
    lazy: false
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    emailLogin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(result => {
          console.log(result);
          router.push("/home");
        })
        .catch(error => {
          console.log(error);
          this.errorMessage = error.message;
          this.showError = true;
          alert(this.errorMessage);
        });
    }
  }
};
</script>

<style scoped lang="scss">
.content {
  background-image: url("../../assets/login_back.jpg");
  width: 100%;
  height: 100%;
}

.form {
  width: 60%;
  margin-top:120px;
}

.sheet{
  height:560px;
  width:550px;
  margin-right:65px
}

.button__login{
  margin-top:50px
}
</style>

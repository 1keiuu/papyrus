<template>
  <v-app class="b">
    <v-content class="content">
      <v-container fill-height>
        <v-layout row wrap justify-end="true">
          <v-flex xs5 class="py-6">
            <div>
              <div class="text-center">
                <v-sheet color="rgba(176, 182, 182, 0.42)" min-width="420" min-height="550">
                  <v-form ref="form" v-model="valid" lazy-validation class="form">
                    <v-flex px-12 py-12 my-7>
                    <v-text-field
                      v-model="email"
                      label="メールアドレス"
                      :rules="emailRules"
                      required
                    ></v-text-field>
                    </v-flex>
                    <v-flex px-12>
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
                  </v-form>
                  <v-flex  align-self-center="true" py-12 my-10>
                    <v-btn class="info" min-width="324" @click="emailLogin">ログイン</v-btn>
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
import firebase from "firebase/app";
import router from "@/router";

export default {
  data: () => ({
    valid: true,
    email: "",
    emailRules: [v => !!v || "E-mail is required", v => /.+@.+/.test(v) || "E-mail must be valid"],
    password: "",
    passwordRules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters",
      emailMatch: () => "The email and password you entered don't match"
    },
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
  width: 100%;
}
</style>

<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height class="container">
        <v-layout justify-end align-center>
          <v-sheet color="rgba(256, 256, 256, 0.42)" class="form__sheet">
            <v-layout justify-center fill-height>
              <v-form ref="form" v-model="valid" lazy-validation class="form">
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
                    :rules="passwordRules"
                    :type="'password'"
                    label="パスワード"
                  ></v-text-field>
                  <v-checkbox
                    v-model="checkbox"
                    label="ログイン状態を保持する"
                    required
                  ></v-checkbox>
                </v-flex>
                <v-card-actions class="justify-center">
                  <v-btn class="form__button primary" min-width="324" @click="emailLogin"
                    >ログイン</v-btn
                  >
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
    emailRules: [
      v => !!v || "メールアドレスを入力してください",
      v => /.+@.+/.test(v) || "メールアドレス形式で入力してください"
    ],
    password: "",
    passwordRules: [
      value => !!value || "パスワードを入力してください",
      v => v.length >= 8 || "パスワードは８文字以上入力してください"
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

          const errorCode = error.code;

          switch (errorCode) {
            case "auth/invalid-email":
              alert("無効なメールアドレスです");
              break;

            case "auth/user-not-found":
              alert("そのメールアドレスは存在しません");
              break;

            case "auth/wrong-password":
              alert("無効なパスワードです");
              break;

            default:
              alert("ネットワークエラー");
              break;
          }
        });
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  background-image: url("../../assets/login_back.jpg");
  width: 100%;
  height: 100%;
}

.form {
  width: 60%;
  margin-top: 120px;
}

.form__sheet {
  height: 560px;
  width: 550px;
  margin-right: 65px;
}

.form__button {
  margin-top: 50px;
}
</style>

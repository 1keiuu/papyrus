<template>
  <v-app>
    <div class="loading__container" v-show="loading">
      <v-progress-circular :rotate="-90" :value="value" :size="200" :width="15" color="blue-grey">
        <img src="../../assets/loading__icon.png" width="80px" />
      </v-progress-circular>
      <h1 class="loading__title">Papyrus</h1>
    </div>
    <div v-show="!loading">
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
                    <!-- <v-checkbox
                      v-model="checkbox"
                      label="ログイン状態を保持する"
                      required
                    ></v-checkbox> -->
                  </v-flex>
                  <v-card-actions class="justify-center">
                    <v-btn
                      class="form__button primary"
                      min-width="324"
                      @click="handleLoginButtonClick"
                      >ログイン</v-btn
                    >
                  </v-card-actions>
                </v-form>
              </v-layout>
            </v-sheet>
          </v-layout>
        </v-container>
      </v-content>
    </div>
  </v-app>
</template>

<script>
import firebase from "firebase/app";
import router from "@/router";
import store from "../../store";

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
    // checkbox: false,
    lazy: false,
    loading: true,
    value: 0,
    interval: {}
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
    throwLoginError(errorCode) {
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
    },
    handleLoginButtonClick() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(result => {
          store.commit("setUserId", result.user.uid);
          router.push(
            "/",
            () => {},
            () => {}
          );
          // console.log(store.state)
        })
        .catch(error => {
          console.log(error);
          this.throwLoginError(error.code);
        });
    },
    activateLoading() {
      this.interval = setInterval(() => {
        if (this.value === 100) {
          clearInterval(this.interval);
          this.value = 100;
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        } else {
          this.value += 10;
        }
      }, 100);
    }
  },
  computed: {
    userStatus() {
      // ログインするとtrue
      return this.$store.getters.isSignIn;
    }
  },
  mounted() {
    if (this.userStatus) {
      router.push("/");
    } else {
      console.log("not");
    }

    this.activateLoading();
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>

<style scoped lang="scss">
.container {
  background-image: url("../../assets/login_back.jpg");
  width: 100%;
  height: 100vh;
}
.loading__container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.loading__title {
  margin-top: 0px;
  font-size: 60px;
}

.v-application p {
  margin-bottom: 0;
}

.v-progress-circular__p {
  font-size: 40px;
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

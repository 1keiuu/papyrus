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
          <v-layout align-center justify-center>
            <v-sheet color="rgba(256, 256, 256, 0.9)" class="form__sheet">
              <v-layout justify-center fill-height>
                <v-form ref="form" v-model="valid" lazy-validation class="form">
                  <v-flex px-2>
                    <v-text-field
                      v-model="email"
                      label="メールアドレス"
                      :rules="emailRules"
                      required
                      color="#56a5bf"
                      outlined
                    ></v-text-field>
                  </v-flex>
                  <v-flex px-2>
                    <v-text-field
                      v-model="password"
                      :rules="passwordRules"
                      :type="'password'"
                      label="パスワード"
                      color="#56a5bf"
                      outlined
                    ></v-text-field>
                  </v-flex>
                  <v-card-actions class="justify-center">
                    <v-btn
                      class="form__button"
                      color="#56a5bf"
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
      v => /.+@.+/.test(v) || "正しい形式で入力してください"
    ],
    password: "",
    passwordRules: [
      value => !!value || "パスワードを入力してください",
      v => v.length >= 8 || "パスワードは最低８文字です"
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
      console.log("loginStatus is not set");
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
  background:white;
  width: 100%;
  height: 100vh;
}
.loading__container {
    background:white;
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
  padding-top:20px
}

.v-progress-circular__p {
  font-size: 40px;
  color:white
}

.form {
  width: 60%;
  margin-top: 120px;
}

.form__sheet {
  height: 560px;
  width: 750px;
  margin-right: 65px;
}

.form__button {
  margin-top: 50px;
  height:50px !important;
  font-size:15px;
      font-weight: bold;
      color:white
}
</style>

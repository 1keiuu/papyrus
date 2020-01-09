<template>
  <div>
    <div
      class="missionState__title-wrapper"
      @mouseenter="isCardHover = true"
      @mouseleave="isCardHover = false"
    >
      <v-icon class="missionState__title-icon" color="white" size="23px"
        >mdi-compass-outline</v-icon
      >
      <p class="missionState__title">ミッションステート / なりたい理想像</p>
      <div :class="{ '--hover': isCardHover }" class="missionState__btn">
        <v-layout align-center>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                class="missionState__help-button"
                fab
                depressed
                color="#ff7e2f"
                width="25px"
                height="25px"
                v-on="on"
              >
                <v-icon size="12px">mdi-help</v-icon>
              </v-btn>
            </template>
            <span>テキストが入ります</span>
          </v-tooltip>
          <v-tooltip bottom
            ><template v-slot:activator="{ on }">
              <v-btn
                class="missionstate-editButton"
                v-show="!isEditActive"
                fab
                depressed
                @click="handleEditButtonClick"
                color="#ff7e2f"
                width="32px"
                height="32px"
                v-on="on"
              >
                <v-icon size="20"> mdi-file-document-edit-outline</v-icon>
              </v-btn>
            </template>
            <span>編集</span>
          </v-tooltip>
          <v-btn
            class="missionState__cancel-button"
            v-show="isEditActive"
            fab
            depressed
            @click="handleEditButtonClick"
            color="#8471E2"
            width="32px"
            height="32px"
          >
            <v-icon size="20">mdi-cancel</v-icon>
          </v-btn>
        </v-layout>
      </div>
    </div>
    <v-card
      class="missionState"
      @mouseenter="isCardHover = true"
      @mouseleave="isEditActive === true ? (isCardHover = true) : (isCardHover = false)"
    >
      <div class="missionState__textarea">
        <p v-show="!isEditActive">
          {{ inputText }}
        </p>
        <v-layout class="missionState__textarea-edit">
          <v-textarea
            v-show="isEditActive"
            v-model="inputText"
            counter="150"
            no-resize
            height="80px"
            :rules="rules"
            maxlength="150"
          >
          </v-textarea>
          <p class="missionState__textarea-empty" v-if="!inputText && !isEditActive">✏️ミッションステートを設定しよう!</p>
        </v-layout>
      </div>
    </v-card>
    <v-btn
      fab
      class="missionState__save-button"
      :class="{ '--active': isEditActive }"
      height="40px"
      width="40px"
      @click="handlesubmitButtonClick(inputText)"
      color="#ff7e2f"
      ><v-icon>mdi-check</v-icon></v-btn
    >
  </div>
</template>
<script>
import firebase, { firestore } from "firebase/app";
import store from "../../store";

export default {
  name: "MissionState",
  data: () => ({
    isEditActive: false,
    inputText: "",
    user: "",
    isCardHover: false,
    rules: [v => v.length <= 150 || "150文字以内で入力してください"]
  }),
  methods: {
    handleEditButtonClick(inputText) {
      if (this.isEditActive) {
        this.isEditActive = false;
        this.inputText = this.missionState
      } else {
        this.isEditActive = true;
      }
    },
    handlesubmitButtonClick(inputText) {
      const user = firebase.auth().currentUser;
      firebase
        .firestore()
        .collection("targets")
        .doc(user.uid)
        .set({ missionState: inputText }, { merge: true });
      this.isEditActive = false;
      store.commit("setMissionState", inputText);
    }
  },
  created() {
    this.inputText = this.missionState;
  },
  watch: {
    missionState() {
      this.inputText = this.missionState;
    }
  },
  computed: {
    missionState() {
      return store.getters.missionState;
    }
  }
};
</script>

<style lang="scss" scoped>
.missionState {
  width: 600px;
  height: 140px;
  border-top-left-radius: 0px !important;
  border-top-right-radius: 0px !important;
}
.missionState__title-wrapper {
  width: 500px;
  height: 50px;
  padding-left: 15px;
  padding-right: 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  display: flex;
  align-items: center;
  background-color: $primary;
  .missionState__title-icon {
    margin-right: 15px;
  }
  .missionState__title {
    color: white;
    font-size: 20px;
    font-weight: bold;
    width: 100%;
    margin: 0;
  }
  .missionstate-editButton {
    color: #fff;
    margin-right: 7px;
  }

  .missionState__cancel-button {
    color: #fff;
    margin-right: 7px;
  }

  .missionState__help-button {
    color: #fff;
    margin-right: 13px;
  }
}

.missionState__save-button {
  color: white;
  opacity: 0;
  cursor: default;
  background-color: rgb(255, 126, 47);
  position: absolute;
  right: 655px;
  top: 170px;
  &.--active {
    opacity: 1;
    cursor: pointer;
  }
}

.missionState__textarea {
  margin-right: 100px;
  margin-left: 10px;
  height: 110px;
  width: 570px;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.06px;
  padding-top: 13px;
}
::v-deep .v-textarea {
  padding: 0px;
  margin: 0;
}
::v-deep .v-textarea textarea {
  font-size: 14px !important;
  padding-top: 0px;
  margin-bottom: 0px;
  padding-bottom: 0px;
  line-height: 24px !important;
}
::v-deep .v-counter {
  margin-right: 30px;
}
.v-tooltip__content {
  font-size: 12px;
}

.missionState__textarea-edit {
  margin-top: 0px;
  padding-top: 20px;
  margin-bottom: 0px;
  padding-bottom: 0px;
}

.missionState__textarea-empty{
  color:gray;
  font-size: 18px;
}

.missionState__btn {
  align-self: center;
  opacity: 0;
  transition: all 100ms;
  &.--hover {
    transition: all 300ms;
    opacity: 1;
  }
}
</style>

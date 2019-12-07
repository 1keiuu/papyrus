<template>
  <v-app class="v-app">
    <v-container class="container">
      <v-layout>
        <v-card
          class="v-card"
          @mouseenter="isCardHover = true"
          @mouseleave="isEditActive === true ? isCardHover = true: isCardHover = false"
        >
          <v-flex>
            <v-layout wrap>
              <p class="pTitle">ミッションステート / なりたい理想像</p>
              <div :class="{ '--hover': isCardHover }" class="divHover">
                <v-btn
                  tile
                  class="saveButton"
                  :class="{ '--active': isEditActive }"
                  @click="handlesubmitButtonClick(inputText)"
                  width="90px"
                  height="30px"
                  color="#8471e2"
                  >保存</v-btn
                >
                <v-btn class="mdiHelp" fab depressed outlined width="25px" height="25px">
                  <v-icon class="mdiHelpIcon" size="12px">mdi-help</v-icon>
                </v-btn>
                <v-tooltip bottom
                  ><template v-slot:activator="{ on }">
                    <v-btn
                      class="mdiFileDocumentEditOutline"
                      v-show="!isEditActive"
                      fab
                      depressed
                      @click="handleEditButtonClick"
                      outlined
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
                  class="mdiCancel"
                  v-show="isEditActive"
                  fab
                  depressed
                  @click="handleEditButtonClick"
                  outlined
                  width="32px"
                  height="32px"
                >
                  <v-icon size="20">mdi-cancel</v-icon>
                </v-btn>
              </div>
            </v-layout>
            <div class="divCenterLine"></div>
            <div class="divTextArea">
              <p v-show="!isEditActive">
                {{ inputText }}
              </p>
              <v-layout class="layoutTextarea">
                <v-textarea
                  v-show="isEditActive"
                  class="v-textarea"
                  v-model="inputText"
                  counter="150"
                  no-resize
                  height="80px"
                >
                </v-textarea>
              </v-layout>
            </div>
          </v-flex>
        </v-card>
      </v-layout>
    </v-container>
  </v-app>
</template>
<script>
import firebase, { firestore } from "firebase/app";

export default {
  name: "MissionState",
  data: () => ({
    isEditActive: false,
    inputText: "",
    user: "",
    isCardHover: false
  }),
  methods: {
    handleEditButtonClick(inputText) {
      if (this.isEditActive) {
        this.isEditActive = false;
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
    },
    getMissionStateData() {
      const user = firebase.auth().currentUser;
      firebase
        .firestore()
        .collection("targets")
        .doc(user.uid)
        .get()
        .then(doc => {
          this.inputText = doc.data().missionState;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created: function() {
    this.getMissionStateData();
  }
};
</script>

<style lang="scss" scoped>
$primary: #8471e2;
$secondary: #707070;

.v-app {
  height: 200px;
}

.container {
  margin-left: 30px;
  box-sizing: content-box;
}

.pTitle {
  color: #434343;
  font-size: 20px;
  margin-top: 17px;
  margin-bottom: 12px;
  margin-left: 20px;
  font-weight: bold;
}

.v-card {
  width: 600px;
  height: 200px;
}

.divCenterLine {
  border: solid $primary;
  border-width: 1.2px;
  width: 550px;
}

.divTextArea {
  margin-top: 10px;
  margin-right: 100px;
  margin-left: 10px;
  height: 110px;
  width: 540px;
  font-size: 14px;
}

.v-textarea {
  font-size: 14px;
  margin-top: 7px;
  padding-top: 0px;
  margin-bottom: 0px;
  padding-bottom: 0px;
}

.v-tooltip__content{
    font-size: 12px;
}

.layoutTextarea {
  margin-top: 0px;
  padding-top: 0px;
  margin-bottom: 0px;
  padding-bottom: 0px;
}

.mdiFileDocumentEditOutline {
  color: $secondary;
  margin-bottom: 10px;
  margin-right: 7px;
}

.saveButton {
  margin:0px 18px;
  color: white;
  opacity: 0;
  touch-action: none;
  &.--active {
    opacity: 1;
  }
}

.mdiCancel {
  color: $secondary;
  margin-bottom: 10px;
  margin-right: 7px;
}

.mdiHelp {
  color: $secondary;
  margin-right: 13px;
    margin-bottom: 3px
}

.mdiHelpIcon {
}

.divHover {
  align-self: center;
  opacity: 0;
  transition: all 100ms;
  &.--hover {
    transition: all 300ms;
    opacity: 1;
  }
}
</style>

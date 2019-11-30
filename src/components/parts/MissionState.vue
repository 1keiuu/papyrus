<template>
  <v-app class="v-app">
    <v-container>
      <v-layout>
        <v-card class="v-card">
          <v-flex>
            <v-layout wrap>
              <p class="pTitle">ミッションステート / なりたい理想像</p>
              <v-row justify="end" align="center" no-gutters>
                <v-btn class="mdiHelp" fab depressed outlined width="20px" height="20px">
                  <v-icon class="mdiHelpIcon" size="12px">mdi-help</v-icon>
                </v-btn>
                <v-tooltip bottom
                  ><template v-slot:activator="{ on }">
                    <v-btn
                      class="mdiFileDocumentEditOutline"
                      v-show="!editActive"
                      fab
                      depressed
                      @click="handleEditButtonClick"
                      outlined
                      width="28px"
                      height="28px"
                      v-on="on"
                    >
                      <v-icon size="17"> mdi-file-document-edit-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>編集</span>
                </v-tooltip>
                <v-btn
                  class="mdiCancel"
                  v-show="editActive"
                  fab
                  depressed
                  @click="handleEditButtonClick"
                  outlined
                  width="28px"
                  height="28px"
                >
                  <v-icon size="17">mdi-cancel</v-icon>
                </v-btn>
              </v-row>
            </v-layout>
            <div class="divCenterLine"></div>
            <div class="divTextArea">
              <p v-show="!editActive">
                {{ inputText }}
              </p>
              <v-layout class="layoutTextarea">
                <v-textarea
                  v-show="editActive"
                  class="v-textarea"
                  v-model="inputText"
                  counter="150"
                  no-resize
                >
                </v-textarea>
                <v-btn v-show="editActive" @click="handlesubmitButtonClick(inputText)">保存</v-btn>
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
    editActive: false,
    inputText: "",
    user: ""
  }),
  methods: {
    handleEditButtonClick(inputText) {
      if (this.editActive) {
        this.editActive = false;
      } else {
        this.editActive = true;
      }
    },
    handlesubmitButtonClick(inputText) {
      const user = firebase.auth().currentUser;
      firebase
        .firestore()
        .collection("targets")
        .doc(user.uid)
        .set({ missionState: inputText }, { merge: true });
      this.editActive = false;
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
  height: 160px;
  margin-left: 30px;
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
  height: 110px;
  width: 550px;
  font-size: 14px;
  margin-top: 0px;
  padding-top: 0px;
  margin-bottom: 0px;
  padding-bottom: 0px;
}

.layoutTextarea {
  height: 190px;
  width: 550px;
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

.mdiCancel {
  color: $secondary;
  margin-bottom: 10px;
  margin-right: 7px;
}

.mdiHelp {
  color: $secondary;
  margin-right: 13px;
}

.mdiHelpIcon {
  padding-bottom: 6px;
}

</style>

<template>
  <v-app class="v-app">
    <v-container>
      <v-layout>
        <v-card class="v-card">
          <v-flex mb-4>
            <v-layout wrap>
              <p class="pTitle">ミッションステート / なりたい理想像</p>
              <v-row justify="end" align="center" no-gutters>
                <v-btn
                  class="mdiHelp"
                  fab
                  depressed
                  outlined
                  width="15px"
                  height="15px"
                >
                  <v-icon class="mdiHelpIcon" size="7px">mdi-help</v-icon>
                </v-btn>
                <template>
                <v-btn
                  class="mdiFileDocumentEditOutline"
                  v-show="!editActive"
                  fab
                  depressed
                  @click="handleEditButtonClick"
                  outlined
                  width="28px"
                  height="28px"
                >
                  <v-icon size="17"> mdi-file-document-edit-outline</v-icon>
                </v-btn>
                </template>
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
                <v-textarea v-show="editActive" class="v-textarea" v-model="inputText">
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

.v-app{
  height: 220px;
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
  color: black;
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
  height: 150px;
}

.v-textarea {
  font-size: 12px;
  letter-spacing: 1px;
  padding-top: 0px;
}

.layoutTextarea{
  height: 120px;
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
  padding-bottom: 10px;
}
</style>

<template>
  <v-app>
    <v-container>
      <v-layout>
        <v-card class="v-card">
          <v-flex mb-4>
            <v-layout>
              <p class="title">ミッションステート / なりたい理想像</p>
              <v-btn v-show="!editActive" fab @click="handleEditButtonClick">
                <v-icon>mdi-home</v-icon>
              </v-btn>
              <v-btn v-show="editActive" fab @click="handleEditButtonClick">
                <v-icon>mdi-cancel</v-icon>
              </v-btn>
            </v-layout>
            <div class="divCenterLine"></div>
            <div class="divTextArea">
              <p v-show="!editActive">
                {{ inputText }}
              </p>
              <v-layout>
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
    this.getMissionStateData()
  }
};
</script>

<style lang="scss" scoped>
$primary: #8471e2;

.title {
  color: #434343;
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
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
  margin-bottom: 17px;
  margin-right: 100px;
  margin-left: 10px;
}

.v-textarea {
  font-size: 12px;
  letter-spacing: 1px;
}
</style>

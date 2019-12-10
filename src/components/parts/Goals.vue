<template>
  <v-container class="containa">
    <v-layout>
      <v-card class="goals">
        <p class="goals-title">
          短中期目標
        </p>
        <div class="goals-centarLine"></div>
        <v-expansion-panels>
          <v-expansion-panel v-for="(item, i) in items" :key="i">
            <v-hover v-slot:default="{ hover }">
              <v-expansion-panel-header>
                <v-list-item-subtitle>{{ item.name }}</v-list-item-subtitle>
                <v-layout justify-end>
                  <div class="goals-btn" :class="{ 'on-hover': hover }" :elevation="hover ? 12 : 2">
                    <v-btn
                      class="goals-editButton"
                      fab
                      depressed
                      outlined
                      width="28px"
                      height="28px"
                      @click="GoalsEditModalClick(item.name)"
                    >
                      <v-icon size="17"> mdi-file-document-edit-outline</v-icon>
                    </v-btn>
                  </div>
                </v-layout>
                <v-dialog v-model="dialogFirst" scrollable max-width="880px">
                  <v-card height="514px" class="goalsFirst-dialog_card">
                    <v-divider></v-divider>
                    <v-container fluid class="pa-12">
                      <v-layout>
                        <div class="iconsFirstOptions-div">
                          <v-select
                            :items="iconsOptions"
                            label="アイコン"
                            class="iconsFirstOptions__input"
                          >
                          </v-select>
                        </div>
                        <v-text-field
                          label="目標名"
                          class="goalsFirst-name__input"
                          counter="15"
                          maxlength="15"
                          :rules="nameRules"
                          v-model="goalsFirstName"
                          ><p>{{ goalsFirstName }}</p>
                        </v-text-field>
                      </v-layout>
                      <v-text-field
                        label="期日"
                        type="date"
                        class="goalsFirst-Date__input"
                      ></v-text-field>
                      <v-textarea
                        label="説明"
                        class="goalsFirst-text__input"
                        counter="300"
                        no-resize
                        height="200px"
                        :rules="rules"
                        maxlength="300"
                        outlined
                        v-model="goalsFirstText"
                        ><p>{{ goalsFirstText }}</p></v-textarea
                      >
                      <v-layout justify-end>
                        <v-btn
                          @click="handleGoalsFirstButtonClick()"
                          class="goalsFirstSaveButton"
                          color="#71B1F2"
                          >保存</v-btn
                        >
                      </v-layout>
                    </v-container>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogSecond" scrollable max-width="880px">
                  <v-card height="514px" class="goalsSecond-dialog_card" color="blue">
                    <v-divider></v-divider>
                    <v-container fluid class="pa-12">
                      <v-layout>
                        <div class="iconsSecondOptions-div">
                          <v-select
                            :items="iconsOptions"
                            label="アイコン"
                            class="iconsSecondOptions__input"
                          >
                          </v-select>
                        </div>
                        <v-text-field
                          label="目標名"
                          class="goalsSecond-name__input"
                          counter="15"
                          maxlength="15"
                          :rules="nameRules"
                          v-model="goalsSecondName"
                          ><p>{{ goalsSecondName }}</p>
                        </v-text-field>
                      </v-layout>
                      <v-text-field
                        label="期日"
                        type="date"
                        class="goalsSecond-Date__input"
                      ></v-text-field>
                      <v-textarea
                        label="説明"
                        class="goalsSecond-text__input"
                        counter="300"
                        no-resize
                        height="200px"
                        :rules="rules"
                        maxlength="300"
                        outlined
                        v-model="goalsSecondText"
                        ><p>{{ goalsSecondText }}</p></v-textarea
                      >
                      <v-layout justify-end>
                        <v-btn
                          @click="handleGoalsSecondButtonClick()"
                          class="goalsSecondSaveButton"
                          color="#71B1F2"
                          >保存</v-btn
                        >
                      </v-layout>
                    </v-container>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogThird" scrollable max-width="880px">
                  <v-card height="514px" class="goalsThird-dialog_card" color="red">
                    <v-divider></v-divider>
                    <v-container fluid class="pa-12">
                      <v-layout>
                        <div class="iconsThirdOptions-div">
                          <v-select
                            :items="iconsOptions"
                            label="アイコン"
                            class="iconsThirdOptions__input"
                          >
                          </v-select>
                        </div>
                        <v-text-field
                          label="目標名"
                          class="goalsThird-name__input"
                          counter="15"
                          maxlength="15"
                          :rules="nameRules"
                          v-model="goalsThirdName"
                          ><p>{{ goalsThirdName }}</p>
                        </v-text-field>
                      </v-layout>
                      <v-text-field
                        label="期日"
                        type="date"
                        class="goalsThird-Date__input"
                      ></v-text-field>
                      <v-textarea
                        label="説明"
                        class="goalsThird-text__input"
                        counter="300"
                        no-resize
                        height="200px"
                        :rules="rules"
                        maxlength="300"
                        outlined
                        v-model="goalsThirdText"
                        ><p>{{ goalsThirdText }}</p></v-textarea
                      >
                      <v-layout justify-end>
                        <v-btn
                          @click="handleGoalsThirdButtonClick()"
                          class="goalsThirdSaveButton"
                          color="#71B1F2"
                          >保存</v-btn
                        >
                      </v-layout>
                    </v-container>
                  </v-card>
                </v-dialog>
              </v-expansion-panel-header>
            </v-hover>
            <v-expansion-panel-content
              ><p>{{ goalsFirstText }}</p>
              <v-text-field label="期日" type="date" class="goalsFirst-Date__input"></v-text-field
            ></v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import firebase, { firestore } from "firebase/app";

export default {
  name: "Goals",
  components: {},

  data: () => ({
    dialogFirst: false,
    dialogSecond: false,
    dialogThird: false,
    user: "",
    inputDate: "",
    inputText: "",
    goalsFirstName: "",
    goalsFirstText: "",
    goalsSecondName: "",
    goalsSecondText: "",
    goalsThirdName: "",
    goalsThirdText: "",
    nameRules: [v => v.length <= 14 || "15文字以内で入力してください"],
    rules: [v => v.length <= 299 || "300文字以内で入力してください"],
    iconsOptions: ["あいこんが入ります", "あいこんが入りま~す", "あいこんが入ります?"],
    items: [
      {
        title: "目標名が入ります",
        name: "dialogFirst"
      },
      {
        title: "目標名が入ります",
        name: "dialogSecond"
      },
      {
        title: "目標名が入ります",
        name: "dialogThird"
      }
    ]
  }),
  methods: {
    GoalsEditModalClick: function(target) {
      switch (target) {
        case "dialogFirst":
          this.dialogFirst = true;
          break;
        case "dialogSecond":
          this.dialogSecond = true;
          break;
        case "dialogThird":
          this.dialogThird = true;
          break;
        default:
      }
    },
    handleGoalsFirstButtonClick() {
      const user = firebase.auth().currentUser;
      firebase
        .firestore()
        .collection("targets")
        .doc(user.uid)
        .set(
          { goalsFirstText: this.goalsFirstText, goalsFirstName: this.goalsFirstName },
          { merge: true }
        );
    },
    handleGoalsSecondButtonClick() {
      const user = firebase.auth().currentUser;
      firebase
        .firestore()
        .collection("targets")
        .doc(user.uid)
        .set(
          { goalsSecondText: this.goalsSecondText, goalsSecondName: this.goalsSecondName },
          { merge: true }
        );
    },
    handleGoalsThirdButtonClick() {
      const user = firebase.auth().currentUser;
      firebase
        .firestore()
        .collection("targets")
        .doc(user.uid)
        .set(
          { goalsThirdText: this.goalsThirdText, goalsThirdName: this.goalsThirdName },
          { merge: true }
        );
    },
    getGoalsData() {
      const user = firebase.auth().currentUser;
      firebase
        .firestore()
        .collection("targets")
        .doc(user.uid)
        .get()
        .then(doc => {
          this.goalsFirstText = doc.data().goalsFirstText;
          this.goalsFirstName = doc.data().goalsFirstName;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.goals-title {
  opacity: 1;
  color: #434343;
  font-size: 20px;
  margin-top: 17px;
  margin-bottom: 12px;
  margin-left: 20px;
  font-weight: bold;
  transition: all 100ms;
}

.goals-centarLine {
  border: solid #8471e2;
  border-width: 1.2px;
  width: 490px;
}

.goals {
  width: 520px;
  height: 230px;
  margin-left: 42px;
  margin-top: 30px;
}

.goals-editButton {
  color: #707070;
  margin-right: 13px;
}

.goals-btn {
  align-self: center;
  opacity: 1;
  transition: all 100ms;
}

.goals-btn:not(.on-hover) {
  align-self: center;
  opacity: 0;
  transition: all 300ms;
}

.iconsFirstOptions__input {
  width: 52px;
  height: 52px;
}

.goalsFirstSaveButton {
  color: white;
  width: 150px;
  height: 52px;
}

.iconsFirstOptions-div {
  width: 80px;
}

.goalsFirst-Date__input {
  width: 180px;
}
</style>

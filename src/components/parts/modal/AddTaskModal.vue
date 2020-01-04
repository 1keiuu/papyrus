<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      class="modal"
      max-width="880px"
      overlay-color="black"
      overlay-opacity="0.65"
      @click:outside="handleClickModalOutside"
    >
      <template v-slot:activator="{ on }"> </template>
      <v-card class="dialog__card">
        <v-card-title class="title__wrapper">
          <p class="title">タスクを追加</p>
          <span class="title__line"></span>
        </v-card-title>
        <v-stepper v-model="currentStep">
          <v-stepper-header :class="{ '--disabled': this.input.targetRank === 'keep' }">
            <v-stepper-step color="#56a5bf" :complete="currentStep > 1" step="1"></v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step color="#56a5bf" :complete="currentStep > 2" step="2"></v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-container fluid>
                <v-form ref="first_form">
                  <v-text-field
                    v-model="input.name"
                    label="タスク名"
                    class="name__input"
                    maxlength="30"
                    counter="30"
                    :rules="nameRules"
                    color="#56a5bf"
                  ></v-text-field>
                  <v-select
                    :disabled="input.targetRank === 'keep'"
                    :items="targetRankOptions"
                    item-text="name"
                    item-value="rank"
                    v-model="input.targetRank"
                    label="目標名"
                    :rules="targetRankRules"
                    class="targetRankOptions__input"
                    color="#56a5bf"
                    ><v-icon slot="prepend" :class="{ '--filled': input.targetRank !== '' }"
                      >mdi-bullseye-arrow</v-icon
                    ></v-select
                  >
                  <div class="keep-switch__wrapper">
                    <v-switch v-model="input.targetRank" color="#56a5bf" value="keep"></v-switch>
                    <v-tooltip right>
                      <template v-slot:activator="{ on }">
                        <p v-on="on" class="keep-switch__text">Keepに追加</p>
                      </template>
                      <span
                        >質問に答えずにタスクを追加できます<br />質問には後から答えることも可能です</span
                      >
                    </v-tooltip>
                  </div>
                  <v-menu
                    ref="startMenu"
                    v-model="startMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="input.deadline"
                    transition="scale-transition"
                    min-width="290px"
                    offset-y
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="input.deadline"
                        label="期日"
                        readonly
                        v-on="on"
                        :rules="deadlineRules"
                        class="expirationDate__input"
                        color="#56a5bf"
                        ><v-icon slot="prepend" :class="{ '--filled': input.deadline !== '' }"
                          >mdi-calendar-clock</v-icon
                        ></v-text-field
                      >
                    </template>
                    <v-date-picker
                      v-model="input.deadline"
                      scrollable
                      class="expirationDate__input"
                      locale="ja"
                      color="#56a5bf"
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="#56a5bf" @click="startMenu = false">
                        キャンセル
                      </v-btn>
                      <v-btn dark color="#ff7e2f" @click="$refs.startMenu.save(input.deadline)">
                        保存
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                  <v-textarea
                    v-model="input.memo"
                    label="メモ"
                    counter
                    auto-grow=""
                    :rules="memoRules"
                    no-resize
                    class="memo__input"
                    outlined
                    maxlength="150"
                    color="#56a5bf"
                    ><v-icon slot="prepend" :class="{ '--filled': input.memo !== '' }"
                      >mdi-file-document-outline</v-icon
                    ></v-textarea
                  >
                </v-form>
              </v-container>

              <v-row class="nextButton__wrapper">
                <v-btn
                  v-if="this.input.targetRank !== 'keep'"
                  color="#ff7e2f"
                  dark
                  class="nextButton"
                  fab
                  @click="handleNextButtonClick"
                >
                  <v-icon class="nextButton__icon">mdi-chevron-right</v-icon>
                </v-btn>
                <v-btn
                  v-if="this.input.targetRank === 'keep'"
                  color="#ff7e2f"
                  dark
                  class="submitButton"
                  @click="handleSubmitButtonClick"
                  >追加</v-btn
                >
              </v-row>
            </v-stepper-content>

            <v-stepper-content step="2">
              <QuestionGroup :answersProp="answers" @changedAnswers="changeAnswers"></QuestionGroup>
              <v-card-actions>
                <v-row class="buttonGroup__wrapper">
                  <v-btn fab class="backButton"  color="#ff7e2f"
                  dark @click="currentStep = 1">
                    <v-icon class="backButton__icon">mdi-chevron-left</v-icon>
                    </v-btn
                  >
                  <v-btn color="#ff7e2f" dark class="submitButton" @click="handleSubmitButtonClick"
                    >追加</v-btn
                  >
                </v-row>
              </v-card-actions>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import moment from "moment";
import QuestionGroup from "../QuestionGroup";

export default {
  name: "AddTaskModal",
  components: { QuestionGroup },
  data: () => ({
    dialog: false,
    input: {
      name: "",
      deadline: "",
      targetRank: "",
      memo: "",
      importanceScore: "",
      importanceArea: ""
    },
    answers: {
      answer1: "3",
      answer2: "3",
      answer3: "3"
    },
    targetRankOptions: [],
    currentStep: 0,
    nameRules: [
      v => v.length <= 30 || "30文字以内で入力してください",
      v => v.length >= 1 || "タスク名を入力してください"
    ],
    targetRankRules: [v => (v && v.length >= 1) || "目標を設定してください"],
    deadlineRules: [v => (v && v.length >= 1) || "期日を設定してください"],
    memoRules: [v => !v || v.length <= 150 || ""],
    startMenu: ""
  }),
  props: ["targetData", "targetRankProp"],
  methods: {
    openDialog() {
      this.dialog = true;
    },
    handleNextButtonClick() {
      if (this.$refs.first_form.validate()) {
        this.currentStep = 2;
      }
    },
    changeAnswers(answers) {
      this.input.answer1 = answers.answer1;
      this.input.answer2 = answers.answer2;
      this.input.answer3 = answers.answer3;
    },
    handleSubmitButtonClick() {
      if (
        (this.input.answer1 !== "" && this.input.answer2 !== "" && this.input.answer3 !== "") || this.input.targetRank === "keep"
      ) {
        const calculateRation = payload => {
          switch (payload) {
            case "rank1":
              return 1.5;
            case "rank2":
              return 1.3;
            case "rank3":
              return 1.2;
            case "keep":
              return null;
            default:
              return null;
          }
        };

        this.input.answer1 = Number(this.input.answer1);
        this.input.answer2 = Number(this.input.answer2);
        this.input.answer3 = Number(this.input.answer3);
        const targetRankRatio = calculateRation(this.input.targetRank);
        this.input.importanceScore = targetRankRatio * (this.input.answer1 + this.input.answer2 - this.input.answer3);
        const deadlineDiff = moment(this.input.deadline).diff(moment(new Date()), "day");
        if (deadlineDiff >= 7) {
          if (this.input.importanceScore > 3) {
            this.input.importanceArea = "secondArea";
          } else {
            this.input.importanceArea = "forthArea";
          }
        } else if (deadlineDiff <= 7) {
          if (this.input.importanceScore > 3) {
            this.input.importanceArea = "firstArea";
          } else {
            this.input.importanceArea = "thirdArea";
          }
        }
        this.$emit("submit", this.input);

        this.currentStep = 1;
        this.$refs.first_form.reset();
        this.input = {
          name: "",
          deadline: "",
          targetRank: "",
          memo: "",
          answer1: "",
          answer2: "",
          answer3: "",
          importanceScore: "",
          importanceArea: ""
        };
        this.dialog = false;
      } else {
        alert("全ての質問に回答してください");
      }
    },
    handleClickModalOutside() {
      this.$refs.first_form.resetValidation();
    }
  },
  watch: {
    targetsData() {
      this.targetRankOptions.splice(0,3)
      this.targetsData.forEach(targetData => {
        if (targetData.targetRank !== "keep") {
          this.targetRankOptions.push({
            name: targetData.name,
            rank: targetData.targetRank
          });
        }
      });
    }
  },
  created() {
    this.input.targetRank = this.targetRankProp;
    // targetRankOptionsにstore内のtargetDataを入れる
    this.targetsData.forEach(targetData => {
      if (targetData.targetRank !== "keep") {
        this.targetRankOptions.push({
          name: targetData.name,
          rank: targetData.targetRank
        });
      }
    });
  },
  computed: {
    taskId() {
      return this.$store.getters.taskId;
    },
    targetsData() {
      return this.$store.getters.targetsData;
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog__card {
  height: 670px;
}

::v-deep .container{
  width:730px;
}
::v-deep .v-label {
  font-size: 14px !important;
}
.v-stepper {
  box-shadow: 0 0 0 !important;
}
.v-stepper__header {
  width: 564px;
  box-shadow: 0 0 0 !important;
  height: 50px !important;
  margin-left: 118px;
  margin-top: 25px;
  &.--disabled {
    opacity: 0.2;
  }
}
.v-stepper__content {
  padding: 0px;
}
.v-stepper__step {
  padding: 0px 24px;
}

.title__wrapper {
  justify-content: center;
  padding-top: 35px !important;
  flex-direction: column;
}
.v-application .title {
  font-size: 30px !important;
  margin-bottom: 11px;
}

.title__line {
  width: 150px;
  border-bottom: 2px solid $primary;
}

.name__input {
  width: 620px;
  &.v-input {
    font-size: 24px !important;
    ::v-deep .v-text-field__slot {
      padding: 4px 0px 4px 12px;
    }
  }
}
.targetRankOptions__input {
  width: 300px;
}
.keep-switch__wrapper {
  display: flex;
  align-items: center;
  .keep-switch__text {
    cursor: pointer;
    margin-bottom: 7px;
    margin-left: 5px;
  }
  .help-button {
    margin-left: 10px;
    margin-bottom: 5px;
  }
}

.expirationDate__input {
  width: 300px;
}
::v-deep .v-icon {
  &.--filled {
    color: $primary !important;
  }
}

.memo__input {
  padding-top: 50px;
  ::v-deep .v-text-field__slot {
    height: 100px;
  }
}

.nextButton__wrapper {
  position: absolute;
  right:30px;
  top:140px
}
.nextButton {
  width: 50px;
  height:50px;
}

.backButton {
      width:50px;
    height:50px;
    position: absolute;
    left:15px;
    top: 140px;
}
.buttonGroup__wrapper {
  margin-top: 100px;
  margin-right: 20px;
  margin-bottom: 20px;
  justify-content: flex-end;
}
.submitButton {
  width: 110px;
}
.answer-guide__line {
  border-bottom: 1px solid gray;
}
</style>

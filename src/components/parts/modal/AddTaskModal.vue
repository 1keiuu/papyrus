<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      class="modal"
      max-width="880px"
      overlay-color="black"
      overlay-opacity="0.65"
    >
      <template v-slot:activator="{ on }"> </template>
      <v-card>
        <v-card-title class="title__wrapper">
          <p class="title">タスクを追加</p>
          <span class="title__line"></span>
        </v-card-title>
        <v-stepper v-model="currentStep">
          <v-stepper-header>
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
                    :items="targetRankOptions"
                    v-model="input.targetRank"
                    label="目標名"
                    :rules="targetRankRules"
                    class="targetRankOptions__input"
                    color="#56a5bf"
                    ><v-icon slot="prepend" :class="{ '--filled': input.targetRank !== '' }"
                      >mdi-bullseye-arrow</v-icon
                    ></v-select
                  >
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
                    maxlength='150'
                    color="#56a5bf"
                    ><v-icon slot="prepend" :class="{ '--filled': input.memo !== '' }"
                      >mdi-file-document-outline</v-icon
                    ></v-textarea
                  >
                </v-form>
              </v-container>

              <v-row class="nextButton__wrapper">
                <v-btn color="#56a5bf" class="nextButton" outlined @click="handleNextButtonClick">
                  次へ
                  <v-icon class="nextButton__icon">mdi-arrow-right</v-icon>
                </v-btn>
              </v-row>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-layout class="question__answer-guide">
              <p>当てはまらない</p>
              <div class="answer-guide__line"></div>
              <p>当てはまる</p>
              </v-layout>
              <v-card-text>
                <v-container>
                  <v-row class="question__wrapper">
                    <div class="question__icon">1</div>
                    <div class="question__textArea">
                      <p>このタスクは目標の達成にどれほど貢献しますか？</p>
                    </div>
                    <v-btn-toggle
                      v-model="input.answer1"
                      tile
                      class="question__buttonGroup"
                      color="cyan darken-3"
                      group
                      mandatory
                    >
                      <v-btn value="1">
                        1
                      </v-btn>
                      <v-btn value="2">
                        2
                      </v-btn>
                      <v-btn value="3">
                        3
                      </v-btn>
                      <v-btn value="4">
                        4
                      </v-btn>
                      <v-btn value="5">
                        5
                      </v-btn>
                    </v-btn-toggle>
                  </v-row>
                  <v-divider></v-divider>
                  <v-row class="question__wrapper">
                    <div class="question__icon">2</div>
                    <div class="question__textArea">
                      <p>
                        このタスクを終えることで私生活や他の活動、周りの人々に良い影響を与えますか？
                      </p>
                    </div>
                    <v-btn-toggle
                      v-model="input.answer2"
                      tile
                      class="question__buttonGroup"
                      color="cyan darken-3"
                      group
                      mandatory
                    >
                      <v-btn value="1">
                        1
                      </v-btn>
                      <v-btn value="2">
                        2
                      </v-btn>
                      <v-btn value="3">
                        3
                      </v-btn>
                      <v-btn value="4">
                        4
                      </v-btn>
                      <v-btn value="5">
                        5
                      </v-btn>
                    </v-btn-toggle>
                  </v-row>
                  <v-divider></v-divider>
                  <v-row class="question__wrapper">
                    <div class="question__icon">3</div>
                    <div class="question__textArea">
                      <p>このタスクは人から頼まれたものですか？</p>
                    </div>
                    <v-btn-toggle
                      v-model="input.answer3"
                      tile
                      class="question__buttonGroup"
                      color="cyan darken-3"
                      group
                      mandatory
                    >
                      <v-btn value="1">
                        1
                      </v-btn>
                      <v-btn value="2">
                        2
                      </v-btn>
                      <v-btn value="3">
                        3
                      </v-btn>
                      <v-btn value="4">
                        4
                      </v-btn>
                      <v-btn value="5">
                        5
                      </v-btn>
                    </v-btn-toggle>
                  </v-row>
                  <v-divider></v-divider>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-row class="buttonGroup__wrapper">
                  <v-btn color="#56a5bf" outlined class="backButton" @click="currentStep = 1">
                    <v-icon class="backButton__icon">mdi-arrow-left</v-icon>
                    戻る</v-btn
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
export default {
  name: "AddTaskModal",
  data: () => ({
    dialog: false,
    input: {
      name: "",
      deadline: "",
      targetRank: "",
      memo: "",
      answer1: "3",
      answer2: "3",
      answer3: "3",
      importanceScore: "",
      importanceArea: ""
    },
    targetRankOptions: ["rank1", "rank2", "rank3", "rank4"],
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
    handleSubmitButtonClick() {
      if (this.input.answer1 !== "" && this.input.answer2 !== "" && this.input.answer3 !== "") {
        const calculateRation = payload => {
          switch (payload) {
            case "rank1":
              return 1.5;
            case "rank2":
              return 1.3;
            case "rank3":
              return 1.2;
            case "rank4":
              return 1.1;
            default:
              return null;
          }
        };

        this.input.answer1 = Number(this.input.answer1);
        this.input.answer2 = Number(this.input.answer2);
        this.input.answer3 = Number(this.input.answer3);
        const targetRankRatio = calculateRation(this.input.targetRank);
        this.input.importanceScore = (targetRankRatio * (this.input.answer1 + this.input.answer2 - this.input.answer3))
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
          answer1: "3",
          answer2: "3",
          answer3: "3",
          importanceScore: "",
          importanceArea: ""
        };
        this.dialog = false;
      } else {
        alert("全ての質問に回答してください");
      }
    }
  },
  watch: {},
  created() {
    this.input.targetRank = this.targetRankProp;
  },
  computed: {
    taskId() {
      return this.$store.getters.taskId;
    }
  }
};
</script>

<style lang="scss" scoped>


.modal {
  height: 680px;
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
  padding-bottom: 50px;
  ::v-deep .v-text-field__slot {
    height: 100px;
  }
}

.nextButton__wrapper {
  justify-content: flex-end;
  margin-bottom: 20px;
}
.nextButton {
  width: 110px;
  margin-right: 25px;
}
.nextButton__icon {
  padding-left: 5px;
}
.backButton {
  width: 110px;
  margin-right: 30px;
}
.buttonGroup__wrapper {
  margin-top: 30px;
  margin-right: 20px;
  margin-bottom: 20px;
  justify-content: flex-end;
}
.submitButton {
  width: 110px;
}
.backButton__icon {
  padding-right: 5px;
}
.question__wrapper {
  flex-wrap: unset;
  margin-top: 70px;
  margin-bottom: 5px;
  align-items: center;
  &:first-child {
    margin-top: 10px;
  }
}
.question__textArea {
  width: 430px;
  font-size: 15px;
  padding-left: 10px;
}
.question__icon {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: $secondary;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 13px;
}

.question__buttonGroup {
  width: 250px;
  height: 33px;
  border: 0.3px solid #707070;
  .v-btn {
    min-width: auto !important;
    padding: 0;
    margin: 0 !important;
    height: 33px !important;
    width: 50px !important;
    border-left: 0.3px solid #707070 !important;
  }
}
.question__answer-guide{
      margin-top: 15px;
  p{
    position:absolute;
    font-size: 10px;
    right: 50px;
    color:gray;
    &:first-child{
      right: 290px;
    }
  }
}
.answer-guide__line{
  border-bottom: 1px solid gray;
}
</style>

<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" class="modal" max-width="880px" overlay-color="black" overlay-opacity="0.65">
      <template v-slot:activator="{ on }"> </template>
      <v-card>
        <v-card-title class="title__wrapper">
          <p class="title">タスクを追加</p>
          <span class="title__line"></span>
        </v-card-title>
        <v-stepper v-model="currentStep">
          <v-stepper-header>
            <v-stepper-step :complete="currentStep > 1" step="1"></v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="currentStep > 2" step="2"></v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card-text>
                <v-container fluid>
                  <v-text-field
                    v-model="input.name"
                    label="タスク名"
                    class="name__input"
                  ></v-text-field>
                  <v-select
                    :items="targetRankOptions"
                    v-model="input.targetRank"
                    label="目標名"
                    class="targetRankOptions__input"
                  ></v-select>
                  <v-text-field
                    v-model="input.deadline"
                    label="期日"
                    type="date"
                    class="expirationDate__input"
                  ></v-text-field>
                  <v-textarea
                    v-model="input.memo"
                    label="メモ"
                    counter
                    auto-grow=""
                    :rules="memoRules"
                    no-resize
                    class="memo__input"
                  ></v-textarea>
                </v-container>
              </v-card-text>

              <v-row class="nextButton__wrapper">
                <v-btn color="#6245ea" class="nextButton" outlined @click="handleNextButtonClick">
                  次へ
                  <v-icon class="nextButton__icon">mdi-arrow-right</v-icon>
                </v-btn>
              </v-row>
            </v-stepper-content>

            <v-stepper-content step="2">
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
                      color="deep-purple accent-4"
                      group
                    >
                      <v-btn value=1>
                        1
                      </v-btn>
                      <v-btn value=2>
                        2
                      </v-btn>
                      <v-btn value=3>
                        3
                      </v-btn>
                      <v-btn value=4>
                        4
                      </v-btn>
                      <v-btn value=5>
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
                      color="deep-purple accent-4"
                      group
                    >
                      <v-btn value=1>
                        1
                      </v-btn>
                      <v-btn value=2>
                        2
                      </v-btn>
                      <v-btn value=3>
                        3
                      </v-btn>
                      <v-btn value=4>
                        4
                      </v-btn>
                      <v-btn value=5>
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
                      color="deep-purple accent-4"
                      group
                    >
                      <v-btn value=1>
                        1
                      </v-btn>
                      <v-btn value=2>
                        2
                      </v-btn>
                      <v-btn value=3>
                        3
                      </v-btn>
                      <v-btn value=4>
                        4
                      </v-btn>
                      <v-btn value=5>
                        5
                      </v-btn>
                    </v-btn-toggle>
                  </v-row>
                  <v-divider></v-divider>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-row class="buttonGroup__wrapper">
                  <v-btn color="#6245ea" outlined class="backButton" @click="currentStep = 1">
                    <v-icon class="backButton__icon">mdi-arrow-left</v-icon>
                    戻る</v-btn
                  >
                  <v-btn color="#6245ea" dark class="submitButton" @click="handleSubmitButtonClick"
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
export default {
  name: "AddTaskModal",
  data: () => ({
    dialog: false,
    // tabs: ["プロフィール", "個人情報"],
    input: {
      name: "",
      deadline: "",
      targetRank: "",
      memo: "",
      answer1: "",
      answer2: "",
      answer3: "",
      importanceScore: ""
    },
    targetRankOptions: ["rank1", "rank2", "rank3", "rank4"],
    currentStep: 0,
    memoRules: [v => v.length <= 150 || ""]
  }),
  props: ["targetData", "targetRankProp"],
  methods: {
    openDialog() {
      this.dialog = true;
    },
    // cancelDialog() {
    //   const obj = this.input;
    //   this.currentStep = 1;
    //   Object.keys(obj).forEach(function(key) {
    //     obj[key] = "";
    //   });
    // },
    handleNextButtonClick() {
      if (this.input.name === "" || this.input.targetRank === "") {
        alert("insufficient form ");
      } else {
        this.currentStep = 2;
      }
    },
    handleSubmitButtonClick() {
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
      this.input.answer1 = Number(this.input.answer1)
      this.input.answer2 = Number(this.input.answer2)
      this.input.answer3 = Number(this.input.answer3)
      const targetRankRatio = calculateRation(this.input.targetRank)
      this.input.importanceScore = targetRankRatio * (this.input.answer1 + this.input.answer2 + this.input.answer3)
      this.dialog = false;
      this.$emit(
        "submit",
        this.input
      );
      const obj = this.input;
      this.currentStep = 1;
      Object.keys(obj).forEach(function(key) {
        obj[key] = "";
      });
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
$primary: #6245ea;
$secondary: #8471e2;

.modal {
  height: 680px;
}
.v-application p {
  margin-bottom: 0;
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
  width: 200px;
}
.memo__input {
  ::v-deep .v-text-field__slot {
    height: 50px;
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
}
.buttonGroup__wrapper {
  margin-top: 50px;
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
</style>

<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      max-width="880px"
      overlay-color="black"
      overlay-opacity="0.65"
      @click:outside="resetModal"
    >
      <template v-slot:activator="{ on }"> </template>
      <v-card class="dialog__card">
        <v-card-title class="title__wrapper">
          <p class="title">タスクを編集</p>
          <span class="title__line"></span>
        </v-card-title>

        <v-stepper v-model="currentStep">
          <v-stepper-header :class="{ '--disabled': isKeep }">
            <v-stepper-step color="#56a5bf" :complete="currentStep > 1" step="1"></v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step color="#56a5bf" :complete="currentStep > 2" step="2"></v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-container fluid>
                <v-text-field
                  v-model="input.name"
                  counter="30"
                  maxlength="30"
                  label="タスク名"
                  class="name__input"
                  color="#56a5bf"
                >
                </v-text-field>
                <v-select
                  :disabled="isKeep"
                  :items="targetRankOptions"
                  :hint="targetRankOptions.rank"
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
                <v-menu
                  ref="startMenu"
                  v-model="startMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="input.deadline"
                  transition="scale-transition"
                  min-width="290px"
                  offset-y
                  absolute
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="input.deadline"
                      label="期日"
                      readonly
                      v-on="on"
                      :rules="deadlineRules"
                      class="deadline__input"
                      color="#56a5bf"
                      ><v-icon slot="prepend" :class="{ '--filled': input.deadline !== '' }"
                        >mdi-calendar-clock</v-icon
                      ></v-text-field
                    >
                  </template>
                  <v-date-picker
                    v-model="input.deadline"
                    scrollable
                    class="deadline__calender-input"
                    locale="ja"
                    color="#56a5bf"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="#56a5bf" @click="startMenu = false">
                      キャンセル
                    </v-btn>
                    <v-btn color="#ff7e2f" dark @click="$refs.startMenu.save(input.deadline)">
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
                  outlined
                  maxlength="150"
                  class="memo__input"
                  color="#56a5bf"
                  ><v-icon slot="prepend" :class="{ '--filled': input.memo !== '' }"
                    >mdi-file-document-outline</v-icon
                  ></v-textarea
                >
              </v-container>
            </v-stepper-content>
            <v-stepper-content step="2">
              <QuestionGroup :taskData="taskData" @changedAnswers="changeAnswers"></QuestionGroup>
            </v-stepper-content>

            <v-row class="button__wrapper">
              <v-layout justify-space-between>
                <div>
                  <v-btn
                    dark
                    color="#56A5BF"
                    @click="handleCompleteButtonClick"
                    class="button__complete"
                    ><v-icon>mdi-check</v-icon>タスクを完了する</v-btn
                  >
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        fab
                        outlined
                        color="#56a5bf"
                        v-on="on"
                        height="36"
                        width="36"
                        @click="handleArchiveButtonClick"
                        class="button__archive"
                        ><v-icon>mdi-history</v-icon></v-btn
                      >
                    </template>
                    <span>アーカイブにする</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        fab
                        dark
                        color="#8471e2"
                        height="36"
                        width="36"
                        v-on="on"
                        class="button__delete"
                        @click="handleDeleteButtonClick"
                        ><v-icon>mdi-trash-can-outline</v-icon></v-btn
                      >
                    </template>
                    <span>削除する</span>
                  </v-tooltip>
                  <v-btn
                    color="#ff7e2f"
                    class="button__submit"
                    dark
                    v-if="isKeep === false && currentStep === 1"
                    @click="currentStep = 2"
                  >
                    次
                  </v-btn>
                  <v-btn
                    color="#ff7e2f"
                    class="button__submit"
                    dark
                    v-if="isKeep === false && currentStep === 2"
                    @click="currentStep = 1"
                  >
                    戻る
                  </v-btn>
                  <v-btn
                    color="#ff7e2f"
                    dark
                    v-if="isKeep && currentStep === 1"
                    @click="isKeep = false"
                  >
                    タスクを目標に割り振る
                  </v-btn>
                </div>
                <v-btn color="#ff7e2f" class="button__submit" dark @click="handleStoreButtonClick">
                  保存
                </v-btn>
              </v-layout>
            </v-row>
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
  name: "EditTaskModal",
  components: {
    QuestionGroup
  },
  data: () => ({
    dialog: false,
    input: {
      name: "",
      deadline: "",
      targetRank: "",
      memo: "",
      taskId: "",
      status: "",
      answer1: "",
      answer2: "",
      answer3: "",
      importanceScore: "",
      importanceArea: ""
    },
    formerTargetRank: "",
    targetRankOptions: [],
    currentStep: 1,
    nameRules: [
      v => v.length <= 30 || "30文字以内で入力してください",
      v => v.length >= 1 || "タスク名を入力してください"
    ],
    targetRankRules: [v => v.length >= 1 || "目標を設定してください"],
    deadlineRules: [v => v.length >= 1 || "期日を設定してください"],
    memoRules: [v => v.length <= 150 || ""],
    startMenu: "",
    isKeep: false
  }),
  computed: {
    targetsData() {
      return this.$store.getters.targetsData;
    }
  },
  props: ["taskData"],
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    changeAnswers(answers) {
      this.input.answer1 = answers.answer1;
      this.input.answer2 = answers.answer2;
      this.input.answer3 = answers.answer3;
    },
    handleStoreButtonClick() {
      if (this.input.answer1 !== "" && this.input.answer2 !== "" && this.input.answer3 !== "") {
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
      } else {
        alert("全ての質問に回答してください");
      }

      this.dialog = false;
      this.$emit("store", this.input, this.formerTargetRank);
      this.resetModal();
    },
    handleArchiveButtonClick() {
      this.$emit("archive", this.input, "archived");
      this.closeDialog();
      this.resetModal();
    },
    handleCompleteButtonClick() {
      this.$emit("complete", this.input, "completed");
      this.closeDialog();
      this.resetModal();
    },
    handleDeleteButtonClick() {
      if (window.confirm("タスクを削除してよろしいですか?")) {
        this.$emit("delete", this.input.targetRank, this.input.taskId);
        this.dialog = false;
      }
    },
    checkKeep() {
      if (this.taskData.targetRank === "keep") {
        this.isKeep = true;
      }
    },
    resetModal() {
      this.checkKeep();
      this.currentStep = 1;
    }
  },
  created() {
    this.input = this.taskData;
    this.checkKeep();
    this.targetsData.forEach(targetData => {
      if (targetData.targetRank !== "keep") {
        this.targetRankOptions.push({
          name: targetData.name,
          rank: targetData.targetRank
        });
      }
    });
  },
  watch: {
    taskData: function() {
      this.input = this.taskData;
      this.formerTargetRank = this.taskData.targetRank;
    }
  }
};
</script>

<style lang="scss" scoped>
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

.container {
  width: 620px;
}
.dialog__card {
  width: 880px;
  height: 680px;
}
::v-deep .v-label {
  font-size: 14px !important;
}
::v-deep .v-icon {
  &.--filled {
    color: $primary !important;
  }
}

.v-tooltip__content {
  font-size: 12px;
}

.v-btn--outlined {
  border: 1.5px solid;
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

.v-tooltip__content {
  font-size: 12px;
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

.deadline__input {
  width: 300px;
  height: 60px;
}
.deadline__calender-input {
  height: 430px;
}
.memo__input {
  ::v-deep .v-text-field__slot {
    height: 100px;
  }
}

.button__wrapper {
  justify-content: flex-end;
  width: 100%;
  margin-top: 50px;
  padding-bottom: 25px;
  .button__complete {
    margin-right: 20px;
    margin-left: 80px;
  }
  .button__archive {
    margin-right: 20px;
  }
  .button__delete {
    margin-right: 20px;
  }
  .button__submit {
    width: 110px;
    margin-right: 30px;
  }
}

::v-deep .v-select-list {
  display: inline !important;
}
</style>

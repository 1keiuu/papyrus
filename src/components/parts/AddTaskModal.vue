<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="800px">
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
                    :items="categoryOptions"
                    v-model="input.category"
                    label="目標名"
                    class="categoryOptions__input"
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
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="input.name" label="タスク名"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="input.deadline"
                        label="期日"
                        type="deadline"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-col cols="12" sm="6">
                    <v-select
                      :items="categoryOptions"
                      v-model="input.category"
                      label="目標もしくはカテゴリ"
                    ></v-select>
                  </v-col>
                </v-container>
                <small>*反映に時間がかかることがございます</small>
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
      category: "",
      memo: ""
    },
    categoryOptions: ["目標が入ります", "目標が入りま~す", "目標が入ります?"],
    currentStep: 0,
    memoRules: [v => v.length <= 150 || ""]
  }),
  methods: {
    openDialog() {
      this.dialog = true;
    },
    handleNextButtonClick() {
      if (this.input.name === "" || this.input.category === "") {
        alert("insufficient form ");
      } else {
        this.currentStep = 2;
      }
    },
    handleSubmitButtonClick() {
      this.dialog = false;
      this.$emit(
        "submit",
        this.input.name,
        this.input.deadline,
        this.input.category,
        this.input.memo,
      );
      const obj = this.input;
      this.currentStep = 1;
      Object.keys(obj).forEach(function(key) {
        obj[key] = "";
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$primary: #6245ea;

.container {
  width: 620px;
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
.categoryOptions__input {
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
</style>

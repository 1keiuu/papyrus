<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      max-width="750px"
      overlay-color="black"
      overlay-opacity="0.65"
      click:outside="resetInput"
    >
      <template v-slot:activator="{ on }"> </template>
      <v-card class="dialog__card">
        <v-card-title class="title__wrapper">
          <p class="title">タスクを編集</p>
          <span class="title__line"></span>
        </v-card-title>
        <v-container fluid>
          <v-text-field
            v-model="input.name"
            counter="15"
            maxlength="15"
            label="タスク名"
            class="name__input"
          >
          </v-text-field>
          <v-select
            :items="targetRankOptions"
            v-model="input.targetRank"
            label="目標名"
            :rules="targetRankRules"
            class="targetRankOptions__input"
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
                class="expirationDate__input"
                ><v-icon slot="prepend" :class="{ '--filled': input.deadline !== '' }"
                  >mdi-calendar-clock</v-icon
                ></v-text-field
              >
            </template>
            <v-date-picker
              v-model="input.deadline"
              scrollable
              class="expirationDate__calender-input"
              locale="ja"
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="startMenu = false">
                キャンセル
              </v-btn>
              <v-btn text color="primary" @click="$refs.startMenu.save(input.deadline)">
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
            ><v-icon slot="prepend" :class="{ '--filled': input.memo !== '' }"
              >mdi-file-document-outline</v-icon
            ></v-textarea
          >
        </v-container>

        <v-row class="button__wrapper">
          <v-layout justify-space-between>
            <div>
              <v-btn
                outlined
                color="#F25151"
                @click="handleCompleteButtonClick"
                class="button__complete"
                ><v-icon>mdi-check</v-icon>タスクを完了する</v-btn
              >
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    fab
                    outlined
                    color="indigo lighten-2"
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
                    outlined
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
            </div>
            <v-btn color="#6245ea" class="button__submit" outlined @click="handleStoreButtonClick">
              保存
            </v-btn>
          </v-layout>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "EditTaskModal",
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
      importanceScore: ""
    },
    formerTargetRank: "",
    targetRankOptions: ["rank1", "rank2", "rank3", "rank4"],
    currentStep: 0,
    nameRules: [
      v => v.length <= 15 || "15文字以内で入力してください",
      v => v.length >= 1 || "タスク名を入力してください"
    ],
    targetRankRules: [v => v.length >= 1 || "目標を設定してください"],
    deadlineRules: [v => v.length >= 1 || "期日を設定してください"],
    memoRules: [v => v.length <= 150 || ""],
    startMenu: ""
  }),
  props: ["taskData"],
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    resetInput() {},
    handleStoreButtonClick() {
      this.dialog = false;
      this.$emit("store", this.input, this.formerTargetRank);
    },
    handleArchiveButtonClick() {
      this.$emit("archive", this.input, "archived");
      this.closeDialog();
    },
    handleCompleteButtonClick() {
      this.$emit("complete", this.input, "completed");
      this.closeDialog();
    },

    handleDeleteButtonClick() {
      if (window.confirm("タスクを削除してよろしいですか?")) {
        this.$emit("delete", this.input.targetRank, this.input.taskId);
        this.dialog = false;
      }
    }
  },
  created() {},
  watch: {
    taskData: function() {
      this.input = this.taskData;
      this.formerTargetRank = this.taskData.targetRank;
    }
  }
};
</script>

<style lang="scss" scoped>
$primary: #56a5bf;
$secondary: #7dc0d6;
$accent: #ff7e2f;
.container {
  width: 620px;
}
.dialog__card {
  height: 670px;
  width: 750px;
}
::v-deep .v-label {
  font-size: 14px !important;
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

.expirationDate__input {
  width: 300px;
  height: 60px;
}
.expirationDate__calender-input {
  height: 430px;
}
.memo__input {
  ::v-deep .v-text-field__slot {
    height: 50px;
  }
}

.button__wrapper {
  justify-content: flex-end;
  width: 100%;
  margin-top: 170px;
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
  display:inline !important
}
</style>

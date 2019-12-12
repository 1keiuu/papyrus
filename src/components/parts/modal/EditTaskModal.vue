<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="880px" overlay-color="black" overlay-opacity="0.65">
      <template v-slot:activator="{ on }"> </template>
      <v-card>
        <v-card-title class="title__wrapper">
          <p class="title">タスクを編集</p>
          <span class="title__line"></span>
        </v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-text-field v-model="input.name" label="タスク名" class="name__input"> </v-text-field>
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

        <v-row class="submitButton__wrapper">
          <v-layout justify-space-around>
            <div>
              <v-btn outlined color="#F25151" @click="handleCompleteButtonClick"
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
                    @click="handleDeleteButtonClick"
                    ><v-icon>mdi-trash-can-outline</v-icon></v-btn
                  >
                </template>
                <span>削除する</span>
              </v-tooltip>
            </div>
            <v-btn color="#6245ea" class="submitButton" outlined @click="handleStoreButtonClick">
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
      answer1:"",
      answer2:"",
      answer3:"",
      importanceScore:""
    },
    formerTargetRank: "",
    targetRankOptions: ["rank1", "rank2", "rank3", "rank4"],
    currentStep: 0,
    memoRules: [v => v.length <= 150 || ""]
  }),
  props: ["taskData"],
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    handleStoreButtonClick() {
      this.dialog = false;
      this.$emit(
        "store",
        this.input,
        this.formerTargetRank
      );
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
  created() {
  },
  watch: {
    taskData: function() {
      this.input = this.taskData
      this.formerTargetRank = this.taskData.targetRank;
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
  width: 200px;
}
.memo__input {
  ::v-deep .v-text-field__slot {
    height: 50px;
  }
}

.submitButton__wrapper {
  justify-content: flex-end;
  width: 100%;
}

.submitButton {
  width: 110px;
}
</style>

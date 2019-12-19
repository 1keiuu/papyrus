<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="880px" overlay-color="black" overlay-opacity="0.65">
      <template v-slot:activator="{ on }"> </template>
      <v-card>
        <v-card-title class="title__wrapper">
          <p class="title">目標を編集</p>
          <span class="title__line"></span>
        </v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-text-field v-model="input.name" label="目標名" class="name__input"> </v-text-field>
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
              v-model="input.description"
              label="説明"
              counter
              auto-grow=""
              no-resize
              maxlength='150'
              class="description__input"
              ><v-icon slot="prepend" :class="{ '--filled': input.memo !== '' }"
                >mdi-file-document-outline</v-icon
              ></v-textarea
            >
          </v-container>
        </v-card-text>

        <v-row class="submitButton__wrapper">
          <v-btn color="#6245ea" class="submitButton" outlined @click="handleSubmitButtonClick">
            保存
          </v-btn>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "EditTargetModal",
  data: () => ({
    dialog: false,
    input: {
      name: "",
      deadline: "",
      description: "",
      targetRank: ""
    },
    startMenu: "",
    deadlineRules: [v => v.length >= 1 || "期日を設定してください"],
    memoRules: [v => v.length <= 150 || ""]
  }),
  props: ["targetData"],
  methods: {
    openDialog() {
      this.dialog = true;
    },
    handleSubmitButtonClick() {
      this.dialog = false;
      this.$emit(
        "submit",
        this.input.name,
        this.input.deadline,
        this.input.description,
        this.input.targetRank
      );
    }
  },
  created() {},
  watch: {
    targetData: function() {
      this.input.name = this.targetData.name;
      this.input.description = this.targetData.description;
      this.input.deadline = this.targetData.deadline;
      this.input.targetRank = this.targetData.targetRank;
    }
  }
};
</script>

<style lang="scss" scoped>
$primary: #56a5bf;
$secondary: #7dc0d6;
$accent: #ff7e2f;

::v-deep .v-dialog {
  width: 750px;
  height: 670px;
}
.v-card {
  height: 670px;
  width: 750px;
}
::v-deep .v-label {
  font-size: 14px !important;
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

.deadline__input {
  width: 200px;
        padding-top: 50px;
}
.deadline__calender-input {
  width: 300px;
  height: 430px;
}
.description__input {
      padding-top: 50px;
            padding-bottom: 50px;
  ::v-deep .v-text-field__slot {
    height: 100px;
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

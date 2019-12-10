<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="800px">
      <template v-slot:activator="{ on }"> </template>
      <v-card>
        <v-card-title class="title__wrapper">
          <p class="title">目標を編集</p>
          <span class="title__line"></span>
        </v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-text-field v-model="input.name" label="目標名" class="name__input"> </v-text-field>
            <v-text-field
              v-model="input.deadline"
              label="期日"
              type="date"
              class="deadline__input"
            ></v-text-field>
            <v-textarea
              v-model="input.description"
              label="説明"
              counter
              auto-grow=""
              no-resize
              class="description__input"
            ></v-textarea>
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
      targetId:""
    }
    // descriptionRules: [v => v.length <= 150 || ""]
  }),
  props: ["targetData"],
  methods: {
    openDialog() {
      this.dialog = true;
    },
    handleSubmitButtonClick() {
      this.dialog = false;
      this.$emit("submit", this.input.name, this.input.deadline, this.input.description,this.input.targetRank);
    }
  },
  created() {
  },
  watch: {
    targetData: function() {
      this.input.name = this.targetData.name;
      this.input.description = this.targetData.description;
      this.input.deadline = this.targetData.deadline;
      this.input.targetRank = this.targetData.targetRank
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
}
.description__input {
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

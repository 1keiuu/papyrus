<template>
  <div>
    <v-layout class="question__answer-guide">
      <p>当てはまらない</p>
      <div class="answer-guide__line"></div>
      <p>当てはまる</p>
    </v-layout>
    <v-container>
      <v-row class="question__wrapper">
        <div class="question__icon">1</div>
        <div class="question__textArea">
          <p>このタスクは目標の達成にどれほど貢献しますか？</p>
        </div>
        <v-btn-toggle
          v-model="answers.answer1"
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
          v-model="answers.answer2"
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
          v-model="answers.answer3"
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
  </div>
</template>
<script>
export default {
  name: "QuestionGroup",
  data() {
    return {
      answers: {
        answer1: null,
        answer2: null,
        answer3: null
      }
    };
  },
  props: ["taskData","answersProp"],
  created() {
    if (!this.taskData) {
      this.answers.answer1 = this.answersProp.answer1;
      this.answers.answer2 = this.answersProp.answer2;
      this.answers.answer3 = this.answersProp.answer3;
    }
    if (this.taskData) {
      this.answers.answer1 = String(this.taskData.answer1);
      this.answers.answer2 = String(this.taskData.answer2)
      this.answers.answer3 = String(this.taskData.answer3)
    }
  },
  watch: {
    answersProp() {
      // 一度タスク追加完了した後の初期化
      this.answers.answer1 = this.answersProp.answer1;
      this.answers.answer2 = this.answersProp.answer2;
      this.answers.answer3 = this.answersProp.answer3;
      this.$emit("changedAnswers", this.answers);
    },
    taskData() {
      // taskDataが変わるという事は表示される編集モーダルの内容が変わる事
      // その変化にあわせてanswers(表示側)の値も変更させなきゃデータは変更、表示は変更されていないという状態になってしまう
      this.answers.answer1 = String(this.taskData.answer1);
      this.answers.answer2 = String(this.taskData.answer2)
      this.answers.answer3 = String(this.taskData.answer3)
    },
    "answers.answer1": function() {
      this.$emit("changedAnswers", this.answers);
    },
    "answers.answer2": function() {
      this.$emit("changedAnswers", this.answers);
    },
    "answers.answer3": function() {
      this.$emit("changedAnswers", this.answers);
    },
  }
};
</script>
<style lang="scss" scoped>
.question__wrapper {
    width: 730px;
  flex-wrap: unset;
  margin-top: 70px;
  margin-bottom: 5px;
  align-items: center;
  justify-content: center;
  &:first-child {
    margin-top: 10px;
  }
}
.question__textArea {
  width: 460px;
  font-size: 15px;
  padding-left: 10px;
  padding-right: 40px;
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
.question__answer-guide {
  margin-top: 15px;
  p {
    position: absolute;
    font-size: 10px;
    right: 50px;
    color: gray;
    &:first-child {
      right: 290px;
    }
  }
}
</style>

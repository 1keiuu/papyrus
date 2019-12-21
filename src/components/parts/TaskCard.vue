<template>
  <v-card
    width="290"
    v-if="taskData.status === 'doing'"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <v-layout class="taskCard__title-wrapper" align-center justify-space-between>
      <v-card-title class="taskCard__title">
        {{ taskData.name }}
      </v-card-title>
      <ImportanceIcon
        class="taskCard__importanceIcon"
        :class="{ '--active': isHover }"
        :taskData="taskData"
      ></ImportanceIcon>
    </v-layout>
    <v-card-subtitle v-if="taskData.deadline" class="taskCard__deadline">
      <p class="taskCard__deadline-title">期日:</p>
      <p
        :class="{
          'taskCard__deadline--today': dateDiff === 0,
          'taskCard__deadline--tomorrow': dateDiff === 1,
          'taskCard__deadline--past': dateDiff < 0
        }"
      >
        {{ deadline }}
      </p>
    </v-card-subtitle>
    <v-card-subtitle v-else class="taskCard__deadline">
      期日未設定
    </v-card-subtitle>
  </v-card>
</template>

<script>
import moment from "moment";
import store from "../../store";
import ImportanceIcon from "./ImportanceIconComponent";

export default {
  name: "TaskCard",
  data() {
    return {
      isHover: false,
      dateDiff: null
    };
  },
  components: {
    ImportanceIcon
  },
  props: ["taskData"],
  computed: {
    deadline() {
      const today = moment(new Date()).format("YYYY-MM-DD");
      const diff = moment(this.taskData.deadline).diff(today, "day");
      if (diff === 0) {
        return "今日";
      }
      if (diff === 1) {
        return "明日";
      }
      return this.taskData.deadline;
    }
  },
  watch: {
    deadline() {
      const today = moment(new Date()).format("YYYY-MM-DD");
      const diff = moment(this.taskData.deadline).diff(today, "day");
      this.dateDiff = diff;
    }
  },
  created() {
    const today = moment(new Date()).format("YYYY-MM-DD");
    const diff = moment(this.taskData.deadline).diff(today, "day");
    this.dateDiff = diff;
  }
};
</script>
<style scoped lang="scss">
.taskCard__title-wrapper {
  padding-top: 10px;
}
.taskCard__title {
  font-size: 13px;
  line-height: 20px;
  padding: 0px 0px 0px 15px !important;
}
.taskCard__deadline {
  padding-bottom: 8px;
  display: flex;
}
.taskCard__deadline-title {
  padding-right: 5px;
}
.taskCard__importanceIcon {
  padding-right: 10px;
  opacity: 0;
  &.--active {
    opacity: 1;
  }
}
.taskCard__deadline--today {
  color: $secondary;
}
.taskCard__deadline--tomorrow {
  color: $secondary;
}
.taskCard__deadline--past {
  color: #ff6767;
}
</style>

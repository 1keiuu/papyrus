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
    <v-card-subtitle v-if="taskData.deadline" class="taskCard__subTitle">
      期日:{{ taskData.deadline }}
    </v-card-subtitle>
    <v-card-subtitle v-else class="taskCard__subTitle">
      期日未設定
    </v-card-subtitle>
  </v-card>
</template>

<script>
import store from "../../store";
import ImportanceIcon from "./ImportanceIconComponent"

export default {
  name: "TaskCard",
  data() {
    return {
      isHover: false
    };
  },
  components: {
    ImportanceIcon
  },
  props: ["taskData"],
  computed: {},
  mounted() {}
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
.taskCard__subTitle {
  padding-bottom: 8px;
}
.taskCard__importanceIcon {
  padding-right: 10px;
  opacity: 0;
  &.--active {
    opacity: 1;
  }
}
</style>

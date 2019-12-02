<template>
  <v-card width="290" height="80">
    <v-card-title class="taskCard__title">
      {{taskData.taskName}}
    </v-card-title>
    <v-card-subtitle class="taskCard__subTitle">
      期日:{{taskData.taskDate}}
    </v-card-subtitle>
  </v-card>
</template>

<script>
import store from "../../store";
export default {
  name: "TaskCard",
  data() {
    return {
      show: false
    };
  },
  props: ["taskData"],
  computed: {
  },
  mounted() {
    // console.log(this.taskData)
  }
};
</script>
<style scoped>
.taskCard__title{
  font-size: 13px;
  padding-top:8px;
    padding-bottom:27px;

}
.taskCard__subTitle{
    padding-bottom:8px;
}
</style>

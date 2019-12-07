<template>
  <v-card width="290" v-if="taskData.status==='doing'">
    <v-card-title class="taskCard__title">
      {{taskData.taskName}}
    </v-card-title>
    <v-card-subtitle class="taskCard__subTitle">
      期日:{{taskData.taskDeadline}}
    </v-card-subtitle>
  </v-card>
</template>

<script>
import store from "../../store";

export default {
  name: "TaskCard",
  data() {
    return {
    };
  },
  components:{
  },
  props: ["taskData"],
  computed: {
  },
  mounted() {
  },
};
</script>
<style scoped>

.taskCard__title{
  font-size: 13px;
    line-height: 20px;
  padding-top:10px;
    padding-bottom:27px;

}
.taskCard__subTitle{
    padding-bottom:8px;
}

</style>

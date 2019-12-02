<template>
  <v-app>
    <v-sheet width="325" elevation="4" class="targetSheet__sheet">
      <v-card class="targetSheet__card">
        <div class="targetSheet__thumbnail-wrapper">
          <img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"  class="targetSheet__thumbnail" height="200px" width="100%">
          <div class="targetSheet__title-wrapper">
            <p class="targetSheet__title">{{ targetData.name }}</p>
          </div>
        </div>
        <v-card-actions>
          <v-card-subtitle v-if="targetData.deadline">期日:{{ targetData.deadline }} </v-card-subtitle>
          <v-card-subtitle v-else>期日未設定</v-card-subtitle>

          <v-spacer></v-spacer>

          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="show">
            <v-card-text v-if="targetData.description">
              {{ targetData.description }}
            </v-card-text>
            <v-card-text v-else>
              説明がありません
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
      <v-btn  color="#8471e2" outlined class="taskSheet__add-button">
        <v-icon >
          mdi-plus
        </v-icon>
        追加
      </v-btn>
      <div v-for="(card, index) in taskData" :key="index" class="taskCard__wrapper">
        <TaskCard :taskData="taskData[index]"> </TaskCard>
      </div>
    </v-sheet>
  </v-app>
</template>

<script>
import TaskCard from "./TaskCard";
export default {
  name: "TargetSheet",
  components: {
    TaskCard
  },
  data() {
    return {
      show: false
    };
  },
  props: ["targetData", "taskData"],
  mounted() {
    // console.log(this.taskData);
  }
};
</script>
<style scoped lang="scss">
$primary: #6245ea;
$secondary: #8471e2;

.targetSheet__title-wrapper {
  position: absolute;
  width: 235px;
  height: 40px;
  top: 160px;
  left: 90px;
  border-radius: 2px;
  background-color: $secondary;
}
.targetSheet__thumbnail{
  border-top-left-radius: 10px ;
  border-top-right-radius: 10px ;
}
.v-responsive__content{
    border-top-left-radius: 10px ;
  border-top-right-radius: 10px ;
}
.targetSheet__title {
  margin-bottom: 0;
  position: absolute;
  top: 10px;
  left: 10px;
  color: white;
}
.targetSheet__card {
  box-shadow: 0 0 0 !important;
  border-top-left-radius: 10px !important;
  border-top-right-radius: 10px !important;
}
.targetSheet__sheet{
 display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom:20px;
  border-top-left-radius: 10px ;
  border-top-right-radius: 10px ;
  }
  .taskCard__wrapper{
    margin:5px 0px
  }
.taskSheet__add-button{
  height:30px;
  width:290px;
  margin-bottom:10px
}
</style>

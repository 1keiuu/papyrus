<template>
  <v-card class="tasks__list">
    <v-list>
      <v-list-group
        v-for="(targetData, index) in targetsData"
        :key="targetData.name"
        :ripple="false"
        color="#56a5bf"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="targetData.name"></v-list-item-title>
          </v-list-item-content>
        </template>
        <div v-if="tasksData[index].length !== 1">
          <v-list-item v-for="(taskItem,taskIndex) in tasksData[index]" :key="taskItem.name">
            <v-list-item-content @mouseenter="hoverTaskNumber=taskIndex" @mouseleave="hoverTaskNumber=''">
              <v-layout class="list-item__wrapper" v-if="taskItem.status!=='subtitle'" align-center>
                <v-list-item-title v-text="taskItem.name"></v-list-item-title>
                <v-list-item-subtitle v-text="taskItem.deadline"></v-list-item-subtitle>
                <v-icon class="list-item__edit-icon" size=22 :class="{'--active':hoverTaskNumber===taskIndex}" @click="handleEditButtonClick">mdi-dots-vertical</v-icon>
              </v-layout>
              <v-layout class="list-item__subTitle-wrapper" v-else>
                <v-list-item-subtitle v-text="taskItem.name"></v-list-item-subtitle>
                <v-list-item-subtitle v-text="taskItem.deadline"></v-list-item-subtitle>
              </v-layout>
            </v-list-item-content>
          </v-list-item>
        </div>
        <div v-else>
          <v-list-item>
            <v-layout class="list-item__wrapper">
              <v-list-item-title>該当するタスクはありません</v-list-item-title>
            </v-layout>
          </v-list-item>
        </div>
      </v-list-group>
    </v-list>
    <!-- </v-list> -->
  </v-card>
</template>
<script>
import store from "../../store";
export default {
  name: "MatrixTaskLists",
  data() {
    return {
      hoverTaskNumber:''
    };
  },
  props: ["tasksData"],
  computed: {
    targetsData() {
      return this.$store.getters.targetsData;
    }
  },
  methods:{
    handleEditButtonClick() {
      console.log("clicked")
    }
  },
  created() {
  }
};
</script>
<style scoped lang="scss">
$primary: #56a5bf;
$secondary: #7dc0d6;
$accent: #ff7e2f;

.tasks__list {
  display: block;
  width: 410px;
  height: 520px;
}
.v-list-item{
    cursor:pointer;
}
.v-list-item__title {
  padding: 0;
  font-weight: 500;
  font-size: 17px;
}
.list-item__wrapper {
  padding-left: 20px;
  .v-list-item__title {
    font-weight: normal;
    font-size: 15px;
  }
.list-item__edit-icon{
  opacity:0;
  pointer-events:none;
    &.--active{
      opacity:1;
        pointer-events:all;
    }
  }
}
.list-item__subTitle-wrapper {
  margin-left: 15px;
  padding-bottom:10px;
  border-bottom: 1px solid #B9B8B8;
  .v-list-item__subtitle {
    font-weight: normal;
    color:#707070;
    font-size: 12px;
  }
}
</style>

<template>
  <v-app class="container">
    <v-container>
      <v-layout class="targetSheet__layout">
        <!-- <draggable
          group="myGroup"
          :options="options"
          @start="onStart"
          @end="onEnd"
          v-for="(sheet, index) in targetsData"
          :key="index"
          class="targetSheet__wrapper"
        > -->
        <div class="targetSheet__wrapper" v-for="(sheet, index) in targetsData" :key="index">
          <TargetSheet
            :targetDataProps="targetsData[index]"
            :taskData="storedTasksData[index]"
          ></TargetSheet>
          <v-btn @click="onB"></v-btn>
        </div>
        <!-- </draggable> -->
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import draggable from "vuedraggable";
import firebase from "firebase";
import router from "@/router";
import store from "../../store";
import TargetSheet from "../parts/TargetSheet";
export default {
  name: "Task",
  components: {
    TargetSheet
  },
  data() {
    return {
      options: {
        group: "myGroup",
        animation: 200
      },
      userId: firebase.auth().currentUser.uid,
      // primaryTaskData: [],
      // secondaryTaskData: [],
      // tertiaryTaskData: [],
      // keepTaskData: [],
      // typedTasksData: [],
    };
  },
  created() {
    // this.storedTasksData.filter((item, index) => {
    //   switch (item.targetRank) {
    //     case "primary":
    //       return this.primaryTaskData.push(item)
    //     case "secondary":
    //       return this.secondaryTaskData.push(item)
    //     case "rank3":
    //       return this.tertiaryTaskData.push(item)
    //     case "keep":
    //       return this.keepTaskData.push(item)
    //     default:
    //       console.log('none')
    //   }
    //   return false
    // })
    // this.typedTasksData.push(this.primaryTaskData, this.secondaryTaskData, this.tertiaryTaskData, this.keepTaskData);
  },
  methods: {
    submitEditTargetData(inputName, inputDescription, inputDeadline, targetId) {
      firebase
        .firestore()
        .collection("targetss")
        .doc(this.userId)
        .set(
          {
            [targetId]: {
              name: inputName,
              descrition: inputDescription,
              deadline: inputDeadline
            }
          },
          { merge: true }
        );
    },
    onB() {
      store.commit("deleteTaskData", "all");
    }
  },
  watch: {
    storedTasksData(array) {
      const newtask = array[array.length - 1];
      // 新しいデータが追加された時の処理
      switch (newtask.targetRank) {
        case "rank1":
          this.typedTasksData[0].push(newtask);
          break;
        case "rank2":
          this.typedTasksData[1].push(newtask);
          break;
        case "rank3":
          this.typedTasksData[2].push(newtask);
          break;
        case "rank4":
          this.typedTasksData[3].push(newtask);
          break;
        case null:
          this.typedTasksData.length = 0;
          break;
        default:
      }
    }
  },
  computed: {
    targetsData() {
      return this.$store.getters.targetsData;
    },
    storedTasksData() {
      return JSON.parse(JSON.stringify(this.$store.getters.tasksData));
    },
  }
};
</script>

<style lang="scss" scoped>
.container {
  overflow-x: scroll;
  padding: 0px;
}
@media (min-width: 960px) {
  .container {
    max-width: 100vw !important;
  }
}

.container {
  margin-top: 10px;
}

.targetSheet__layout {
  margin-left: 70px;
}

.targetSheet__wrapper {
  margin-left: 20px;
}
.targetSheet__wrapper:last-child {
  padding-right: 10px;
}

.sortable-chosen {
  opacity: 0.5;
  box-shadow: 2px 2px 5px;
}
</style>

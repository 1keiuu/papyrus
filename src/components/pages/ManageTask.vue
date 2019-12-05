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
            :class="{ moving: status.moving }"
            :targetDataProps="targetsData[index]"
            :taskData="typedTasksData[index]"
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
      task1Data: [],
      task2Data: [],
      task3Data: [],
      typedTasksData: [],
      status: {
        moving: false
      }
    };
  },
  created() {
    // firebase
    //   .firestore()
    //   .collection("tasks")
    //   .doc(this.userId)
    //   .get()
    //   .then(doc => {
    //     const obj = doc.data();
    //     Object.keys(obj).forEach(key => {
    //       this.taskData.push(obj[key]);
    //     });
    //     const target1 = this.taskData.filter((item, index) => item.category === "target1");
    //     target1.map(data => this.task1Data.push(data));
    //     const target2 = this.taskData.filter((item, index) => item.category === "target2");
    //     target2.map(data => this.task2Data.push(data));
    //     const target3 = this.taskData.filter((item, index) => item.category === "target3");
    //     target3.map(data => this.task3Data.push(data));
    //     const keep = this.taskData.filter((item, index) => item.category === "keep");
    //     keep.map(data => this.keep.push(data));

    //     this.tasksData.push(this.task1Data, this.task2Data, this.task3Data, this.keep);
    //     console.log(JSON.parse(JSON.stringify(this.tasksData)));
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    // firebase
    //   .firestore()
    //   .collection("targetss")
    //   .doc(this.userId)
    //   .onSnapshot(doc => {
    //     const obj = doc.data();
    //     Object.keys(obj).forEach(key => {
    //       this.targetsData.push(obj[key]);
    //     });
    //   });
    // console.log(JSON.parse(JSON.stringify(this.tasksData)));

    // const obj = this.tasksData
    // Object.keys(obj).forEach(key => {
    //   this.tasksData.push(obj[key]);
    // });
    const target1 = this.storedTasksData.filter((item, index) => item.category === "target1");
    target1.map(data => this.task1Data.push(data));
    const target2 = this.storedTasksData.filter((item, index) => item.category === "target2");
    target2.map(data => this.task2Data.push(data));
    const target3 = this.storedTasksData.filter((item, index) => item.category === "target3");
    target3.map(data => this.task3Data.push(data));
    const keep = this.storedTasksData.filter((item, index) => item.category === "keep");
    keep.map(data => this.keep.push(data));

    this.typedTasksData.push(this.task1Data, this.task2Data, this.task3Data, this.keep);
    console.log(this.storedTasksData);
    console.log(this.typedTasksData);
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
      store.commit("deleteTasksData", "all");
    }
  },
  watch: {
    storedTasksData(array) {
      const newtask = array[array.length - 1];
      console.log(array)
      switch (newtask.category) {
        case "target1":
          this.typedTasksData[0].push(newtask);
          break;
        case "target2":
          this.typedTasksData[1].push(newtask);
          break;
        case "target3":
          this.typedTasksData[3].push(newtask);
          break;
        case "keep":
          this.typedTasksData[4].push(newtask);
          break;
        case null:
          this.typedTasksData.length = 0;
          break;
        default:
      }
      // const target1 = this.storedTasksData.filter((item, index) => item.category === "target1");
      // target1.map(data => this.task1Data.push(data));
      // const target2 = this.storedTasksData.filter((item, index) => item.category === "target2");
      // target2.map(data => this.task2Data.push(data));
      // const target3 = this.storedTasksData.filter((item, index) => item.category === "target3");
      // target3.map(data => this.task3Data.push(data));
      // const keep = this.storedTasksData.filter((item, index) => item.category === "keep");
      // keep.map(data => this.keep.push(data));
      // this.typedTasksData.push(this.task1Data, this.task2Data, this.task3Data, this.keep);
      // console.log(array[array.length - 1]);
      // console.log(this.typedTasksData);
    }
  },
  computed: {
    targetsData() {
      return this.$store.getters.targetsData;
    },
    storedTasksData() {
      return JSON.parse(JSON.stringify(this.$store.getters.tasksData));
    },
    keep() {
      return this.$store.getters.keep;
    }
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

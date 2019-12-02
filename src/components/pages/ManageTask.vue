<template>
  <v-app class="container">
    <v-container>
      <v-layout class="targetSheet__layout">
        <draggable
          group="myGroup"
          :options="options"
          @start="onStart"
          @end="onEnd"
          v-for="(sheet, index) in targetData"
          :key="index"
          class="targetSheet__wrapper"
        >
          <TargetSheet
            :class="{ moving: status.moving }"
            :targetData="targetData[index]"
            :taskData="tasksData[index]"
          ></TargetSheet>
        </draggable>
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
    TargetSheet,
    draggable
  },
  data() {
    return {
      options: {
        group: "myGroup",
        animation: 200
      },
      targetData: [],
      tasksData: [],
      task1Data:[],
      task2Data:[],
      task3Data:[],
      keep:[],
      taskData: [],
      status: {
        moving: false
      }
    };
  },
  created() {
    const user = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection("tasks")
      .doc(user.uid)
      .get()
      .then(doc => {
        const obj = doc.data();
        Object.keys(obj).forEach(key => {
          this.taskData.push(obj[key]);
        });
        const o = this.taskData.filter((item, index) => item.category === "target1");
        o.map(data => this.task1Data.push(data));
        const c = this.taskData.filter((item, index) => item.category === "target2");
        c.map(data => this.task2Data.push(data));
        const d = this.taskData.filter((item, index) => item.category === "target3");
        d.map(data => this.task3Data.push(data));
        const e = this.taskData.filter((item, index) => item.category === "keep");
        e.map(data => this.keep.push(data));

        this.tasksData.push(this.task1Data,this.task2Data,this.task3Data,this.keep)
        console.log(JSON.parse(JSON.stringify(this.tasksData)))
      })
      .catch(err => {
        console.log(err);
      });
    firebase
      .firestore()
      .collection("targetss")
      .doc(user.uid)
      .get()
      .then(doc => {
        const obj = doc.data();
        Object.keys(obj).forEach(key => {
          this.targetData.push(obj[key]);
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    onStart() {
      this.status.moving = true;
    },
    onEnd() {
      this.status.moving = false;
    }
  },
  computed: {}
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
  &:hover {
    cursor: pointer;
  }
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

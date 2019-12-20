<template>
  <v-app class="container">
    <v-container>
      <v-layout class="targetSheet__layout">
        <div class="targetSheet__wrapper" v-for="(sheet, index) in storedTargetsData" :key="index">
          <TargetSheet
            :targetData="storedTargetsData[index]"
            :taskData="storedTasksData[index]"
          ></TargetSheet>
        </div>
                  <!-- <v-btn @click="resetTask">リセットボタン</v-btn> -->
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
  name: "ManageTask",
  components: {
    TargetSheet
  },
  data() {
    return {
      userId: firebase.auth().currentUser.uid,
    };
  },
  created() {
  },
  methods: {
    submitEditTargetData(inputName, inputDescription, inputDeadline, targetId) {
      firebase
        .firestore()
        .collection("targets")
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
    // resetTask() {
    //   store.commit("deleteTaskData", "all");
    // }
  },
  computed: {
    storedTargetsData() {
      return JSON.parse(JSON.stringify(this.$store.getters.targetsData));
    },
    storedTasksData() {
      return JSON.parse(JSON.stringify(this.$store.getters.tasksData));
    },
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 0px;
}
@media (min-width: 960px) {
  .container {
    max-width: 100vw !important;
  }
}

.targetSheet__layout {
  margin-left: 70px;
    padding-top: 30px;
    padding-left: 20px;

}

.targetSheet__wrapper {
  margin-left: 20px;
        display: inline;
}
.targetSheet__wrapper:first-child {
  margin-left: 0px;
}
.targetSheet__wrapper:last-child {
  padding-right: 20px;
}

.sortable-chosen {
  opacity: 0.5;
  box-shadow: 2px 2px 5px;
}
</style>

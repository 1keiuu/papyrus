<template>
  <div>
    <div v-if="this.iconName === 'firstArea'">
      <svg viewBox="0 0 100 100" class="svg">
        <circle cx="50.1" cy="49.9" r="49" fill="#EB8BB8" />
        <path
          fill="#fff"
          d="M39.5 74.4v-1.7c3.6-.1 6.2-.5 6.2-5.2V32.4c0-4.8-2.3-5.2-6.2-5.2v-1.7h21.2v1.7c-3.8.1-6.1.3-6.1 5.2v35.1c0 4.9 2.4 5.2 6.1 5.2v1.7H39.5z"
        />
      </svg>
    </div>

    <div v-if="this.iconName === 'secondArea'">
      <svg viewBox="0 0 100 100" class="svg">
        <circle cx="49.9" cy="49.8" r="49" fill="#8471E2" />
        <path
          class="st0"
          d="M30.4 74.1v-1.7c3.9-.1 6.1-.5 6.1-5.2V32.4c0-4.7-2.3-5.1-6.1-5.2v-1.7h38.9v1.7c-3.8.1-6.1.3-6.1 5.2v34.7c0 4.9 2.3 5.2 6.1 5.2V74H30.4zm24-41.7c0-1.2 0-5.2-4.6-5.2-4.5 0-4.5 3.9-4.5 5.2v34.7c0 1.3 0 5.2 4.5 5.2 4.6 0 4.6-3.9 4.6-5.2V32.4z"
          fill="#fff"
        />
      </svg>
    </div>

    <div v-if="this.iconName === 'thirdArea'">
      <svg class="svg" viewBox="0 0 100 100" xml:space="preserve">
        <circle cx="50.1" cy="49.8" r="49" fill="#71A9E2" />
        <path
          fill="#fff"
          d="M23.8 75v-1.7c3.4-.1 6.2-.5 6.2-5.2V33.5c0-4.7-2.3-5.1-6.2-5.2v-1.7h54.7v1.7c-3.8.1-6 .4-6 5.2v34.6c0 4.8 2.3 5.2 6 5.2V75H23.8zm22.9-41.5c0-1.1 0-5.2-4-5.2s-4 3.8-4 5.2v34.6c0 1.1 0 5.2 4 5.2s4-3.8 4-5.2V33.5zm16.9 0c0-1.1 0-5.2-4-5.2s-4 3.8-4 5.2v34.6c0 1.1 0 5.2 4 5.2s4-3.8 4-5.2V33.5z"
        />
      </svg>
    </div>
    <div v-if="this.iconName === 'forthArea'">
      <svg class="svg" viewBox="0 0 100 100" xml:space="preserve">
        <circle cx="49.9" cy="49.8" r="49" fill="#FFC400" />
        <path
          class="st0"
          fill="#fff"
          d="M75 35.6L62.4 76.3h-3L47.3 36.9c-.7-2.2-2.4-7.8-6.1-7.8-.5 0-3.2.5-3.2 5.2v35c0 4.9 2.3 5.2 6.1 5.2v1.7H22.9v-1.7c3.5-.1 6.2-.5 6.2-5.2v-35c0-4.8-2.3-5.2-6.2-5.2v-1.7h38v1.7c-1.9.1-5.4.1-5.4 3.1 0 1.1.5 2.5.5 2.8l8.6 28.4 8.6-27.9c.2-.6.5-1.9.5-3.2 0-3.5-5.1-3.3-6.8-3.2v-1.7h15.9v1.7c-5.1.3-7.1 4.1-7.8 6.5z"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "importanceIcon",
  props: ["taskData"],
  data() {
    return {
      iconName: ""
    };
  },
  computed: {
    deadlineDiff() {
      const taskDeadline = this.taskData.deadline;
      return moment(taskDeadline).diff(moment(new Date()), "day");
    }
  },
  methods: {
    culcImportance(taskData) {
      const taskDeadline = taskData.deadline;
      const deadlineDiff = moment(taskDeadline).diff(moment(new Date()), "day");
      const ic = () => {
        if (deadlineDiff >= 7) {
          switch (taskData.importanceScore > 11) {
            case true:
              this.iconName = "secondArea";
              break;
            case false:
              this.iconName = "forthArea";
              break;
            default:
          }
        } else if (this.deadlineDiff <= 7) {
          switch (taskData.importanceScore > 11) {
            case true:
              this.iconName = "firstArea";
              break;
            case false:
              this.iconName = "thirdArea";
              break;
            default:
          }
        }
        return new Promise(function(resolve) {
          resolve();
        });
      };
      ic().then(() => {
        // console.log(this.iconName);
      });
    }
  },
  watch: {
    taskData(taskData) {
      this.culcImportance(taskData);
    }
  },
  created() {
    this.culcImportance(this.taskData);
  }
};
</script>
<style scoped lang="scss">
.svg {
  width: 23px;
  height: 23px;
  fill: #9c98e5;
}
</style>

<template>
  <v-app class="container">
    <v-container>
      <v-layout class="layout">
        <draggable
          group="myGroup"
          :options="options"
          @start="onStart"
          @end="onEnd"
          v-for="(sheet, index) in sheetData"
          :key="index"
          class="ml-4"
        >
          <TargetSheet
            :class="{ moving: status.moving }"
            :sheetData="sheetData[index]"
          ></TargetSheet>
        </draggable>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import draggable from "vuedraggable";
import router from "@/router";
import TargetSheet from "../parts/TargetSheet";
export default {
  name: "SampleTask",
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
      sheetData: [{ name: "target1" }, { name: "target2" }, { name: "target3" }, { name: "Keep" }],
      status: {
        moving: false
      }
    };
  },
  mounted() {
  },
  methods: {
    onStart() {
      this.status.moving = true;
    },
    onEnd() {
      this.status.moving = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  overflow: scroll;
  padding: 0px;
}
@media (min-width: 960px) {
  .container {
    max-width: 4000px !important;
  }
}
.layout {
  margin-left: 70px;
  &:hover {
    cursor: pointer;
  }
}

.sortable-chosen  {
  opacity:0.5;
  box-shadow: 2px 2px 5px;
}
</style>

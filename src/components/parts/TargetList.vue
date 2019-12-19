<template>
  <div>
    <div class="targetList__title-wrapper">
      <v-icon class="targetList__title-icon" color="white" size="23px">mdi-bullseye-arrow</v-icon>
      <p class="targetList__title">短中期目標</p>
    </div>
    <v-card class="targetList">
      <v-list>
        <div v-for="(targetData, index) in targetsData" :key="index">
          <TargetListItem :targetData="targetData"></TargetListItem>
        </div>
      </v-list>
    </v-card>
  </div>
</template>
<script>
import TargetListItem from "./TargetListItem";
export default {
  name: "TargetList",
  props: ["targetsData"],
  components: { TargetListItem },
  data() {
    return { isCardHover: false };
  },
  methods: {
  },
  computed: {
  }
};
</script>
<style scoped lang="scss">
$primary: #56a5bf;
$secondary: #7dc0d6;
$accent: #ff7e2f;

.v-list{
  padding:0
}
.targetList {
  width: 600px;
  height: 140px;
}
.targetList__title-wrapper {
  width: 500px;
  height: 50px;
  padding-left: 15px;
  padding-right: 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  display: flex;
  align-items: center;
  background-color: $primary;
  .targetList__title-icon {
    margin-right: 15px;
  }
  .targetList__title {
    color: white;
    font-size: 20px;
    font-weight: bold;
    width: 100%;
    margin: 0;
  }
}
</style>

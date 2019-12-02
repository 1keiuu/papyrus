<template>
  <v-app>
    <v-sheet width="325" elevation="4">
      <v-card>
        <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img>
        <v-card-title>
          {{ sheetData.name }}
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-card-subtitle>期日:</v-card-subtitle>
          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <v-card-text>
              I'm a thing. But, like most politicians, he promised more than he could deliver. You
              won't have time for sleeping, soldier, not with all the bed making you'll be doing.
              Then we'll go with that data file! Hey, you add a one and two zeros to that or we
              walk! You're going to do his laundry? I've got to find a way to escape.
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
      <TaskCard v-for="(card, index) in cardData" :key="index"> </TaskCard>
    </v-sheet>
  </v-app>
</template>

<script>
import TaskCard from './TaskCard'
export default {
  name: "TargetSheet",
  components:{
    TaskCard
  },
  data() {
    return {
      cardData: [{ name: 1 }, { name: 2 }, { name: 3 }],
      show:false
    };
  },
  props: ["sheetData"],
  mounted() {
    console.log(this.$props);
  }
};
</script>
<style scoped></style>

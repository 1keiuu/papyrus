<template>
  <v-container class="v-container">
    <v-layout>
      <v-card class="v-card">
        <p class="pTitle">短中期目標</p>
        <div class="divCenterLine"></div>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Goals"
};
</script>

<style scoped>
.pTitle {
  color: #434343;
  font-size: 20px;
  margin-top: 17px;
  margin-bottom: 12px;
  margin-left: 20px;
  font-weight: bold;
}

.divCenterLine {
  border: solid #8471e2;
  border-width: 1.2px;
  width: 500px;
}

.v-card {
  width: 520px;
  height: 230px;
}
</style>

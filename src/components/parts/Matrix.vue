<template>
  <v-container class="v-container">
    <v-layout wrap>
      <v-card class="v-card">
        <v-layout wrap>
        <p class="pTitle">時間管理のマトリックス</p>
        <v-row justify="end" align="center" no-gutters class="mr-5">
        <v-btn class="mdiHelp" fab depressed outlined width="15px" height="15px">
          <v-icon class="mdiHelpIcon" size="7px">mdi-help</v-icon>
        </v-btn>
        </v-row>
        <div class="divCenterLine"></div>
        </v-layout>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Matrix"
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
  width: 540px;
}

.v-card {
  width: 597px;
  height: 626px;
}
.mdiHelp {
  color: #707070;
  margin-right: 13px;
}

.mdiHelpIcon {
  padding-bottom: 12px;
  padding-left: 1px;
}
</style>

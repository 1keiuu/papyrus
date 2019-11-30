<template>
  <v-tooltip color="white" offset-overflow>
    <template v-slot:activator="{ on }">
      <v-container class="v-container" v-on="on">
        <v-layout wrap>
          <v-card class="v-card">
            <v-layout wrap>
              <p class="pTitle">時間管理のマトリックス</p>
              <div class="divCenterLine"></div>
            </v-layout>
          </v-card>
        </v-layout>
      </v-container>
    </template>
    <span
      >
        <v-btn fab depressed outlined width="20px" height="20px">
          <v-icon class="mdiHelpIcon" size="12px">mdi-help</v-icon>
        </v-btn></span
    >
  </v-tooltip>
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
  width: 450px;
}

.v-card {
  width: 597px;
  height: 626px;
  margin-left: 30px;
}
.mdiHelp {
  color: #707070;
  margin-right: 13px;
}

.mdiHelpIcon {
  padding-bottom: 6px;
  padding-left: 1px;
}
</style>

<template>
<v-hover v-slot:default="{hover}">
  <v-container class="v-container">
    <v-layout wrap>
      <v-card class="v-card">
        <v-layout wrap>
        <p class="pTitle">時間管理のマトリックス</p>
        <div v-if="hover" class="divHover">
        <v-btn class="mdiHelp" fab depressed outlined width="20px" height="20px">
          <v-icon class="mdiHelpIcon" size="12px">mdi-help</v-icon>
        </v-btn>
        </div>
        <div class="divCenterLine"></div>
        </v-layout>
      </v-card>
    </v-layout>
  </v-container>
</v-hover>
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
  margin-top: 10px;
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

.divHover{
  align-self: center;
  padding-left: 200px
}
</style>

<template>
  <v-card width="290" height="80">
    <v-card-title>
      {{taskData.taskName}}
    </v-card-title>
    <v-card-subtitle>
      期日:{{taskData.taskDate}}
    </v-card-subtitle>
  </v-card>
</template>

<script>
import store from "../../store";
export default {
  name: "TaskCard",
  data() {
    return {
      show: false
    };
  },
  props: ["taskData"],
  computed: {
  },
  mounted() {
  }
};
</script>
<style scoped></style>

<template>
  <v-app>
    <!-- <v-navigation-drawer  class="v-navigation"> -->
    <v-card class="v-card v-navigation" max-width="70" min-height="200" tile>
      <v-list flat>
        <v-list-item-group v-model="item" class="v-list-item-group" mandatory>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            class="v-list-item"
            @click="sampleClick(item.name)"
          >
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-list-item-icon class="v-list-item-icon" v-on="on">
                  <v-icon v-text="item.icon" class="v-icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content class="v-list-item-content"> </v-list-item-content>
              </template>
              <span>{{ item.name }}</span>
            </v-tooltip>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
    <!-- </v-navigation-drawer> -->
  </v-app>
</template>

<script>
import router from "@/router";

export default {
  name: "Navigation",
  components: {},
  data: () => ({
    items: [
      {
        icon: "mdi-home",
        name: "Home",
        path: "/"
      },
      {
        icon: "mdi-clipboard-list-outline",
        name: "sampleTask",
        path: "/smapleTask"
      }
    ]
    // currentPath:
  }),
  methods: {
    sampleClick(target) {
      switch (target) {
        case "Home":
          this.$router.push("/");
          break;
        case "sampleTask":
          this.$router.push("/sampleTask");
          break;
        default:
      }
    }
  }
};
</script>

<style scoped>
.v-navigation {
  position: fixed;
}

.v-card {
  margin-top: 80px;
  height: 100vh;
}

.v-list-item {
  padding-left: 20px;
  color: #6245ea;
}

.v-list-item-icon {
  padding-left: 5px;
}
</style>

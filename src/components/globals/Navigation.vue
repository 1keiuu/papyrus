<template>
  <v-app>
    <!-- <v-navigation-drawer  class="v-navigation"> -->
    <v-card class="v-card v-navigation" max-width="70" min-height="200" tile>
      <v-list flat>
        <v-list-item-group class="v-list-item-group" mandatory>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            class="v-list-item"
            @click="handleItemClick(item.name)"
          >
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-list-item-icon class="v-list-item-icon" v-on="on">
                  <v-icon v-text="item.icon" class="v-icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content class="v-list-item-content"></v-list-item-content>
              </template>
              <span>{{ item.title }}</span>
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
        path: "/",
        title: "ホーム"
      },
      {
        icon: "mdi-clipboard-list-outline",
        name: "ManageTask",
        path: "/manageTaskPage",
        title: "タスク管理"
      },
      {
        icon: "mdi-border-all",
        name: "Matrix",
        path: "/matrixPage",
        title: "時間管理のマトリックス"
      }
    ]
  }),
  methods: {
    handleItemClick(target) {
      switch (target) {
        case "Home":
          this.$router.push("/", () => {});
          break;
        case "ManageTask":
          this.$router.push("/manageTask", () => {});
          break;
        case "Matrix":
          this.$router.push("/matrix", () => {});
          break;
        default:
      }
    }
  }
};
</script>

<style lang="scss" scoped>

.v-navigation {
  position: fixed;
  z-index: 20;
}

.v-card {
  padding-top: 85px;
  height: 100vh;
}

.v-list-item {
  padding-left: 20px;
  color: $primary;
}

.v-list-item-icon {
  padding-left: 5px;
}

.v-tooltip__content {
  font-size: 12px;
}

.v-list-item--active {
  border-right: 2px solid $primary;
}
</style>

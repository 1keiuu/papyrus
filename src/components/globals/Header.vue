<template>
  <!-- <v-app> -->
  <v-app-bar app height="74px">
    <h1 class="align-center font-weight-bold" style="font-size: 30px ; color:#56a5bf">Papyrus</h1>
    <v-spacer></v-spacer>

    <div class="Menu-items__container">
      <p v-show="userName" class="mr-8">こんにちは、{{ userName }}さん</p>
      <div class="button-group__wrapper">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              class="mr-7 button-group__archive"
              fab
              color="#56a5bf"
              width="36"
              height="36"
              rounded
              outlined
              v-on="on"
              @click="handleArchivedTasksButtonClick"
            >
              <v-layout justify-center fill-height>
                <v-icon class="archive__icon">mdi-history</v-icon>
              </v-layout>
            </v-btn>
          </template>
          <span>アーカイブを見る</span>
        </v-tooltip>
        <v-btn
          class="ma-2 mr-6 pl-2 button-group__completed"
          color="#56a5bf"
          small
          dark
          @click="handleCompletedTasksButtonClick"
        >
          <v-icon small>mdi-check</v-icon>
          完了済みを見る
        </v-btn>
        <v-btn class="ma-2 pl-3 mr-8 button-group__add-task" color="#ff7e2f" dark @click="handleAddTaskButtonClick">
          <v-icon class="pr-1">mdi-plus</v-icon>
          タスクを追加
        </v-btn>
      </div>
    </div>
    <v-menu open-on-click close-on-click offset-y bottom class="menu">
      <template v-slot:activator="{ on }">
        <div class="avator__wrapper" v-show="profileImageUrl">
          <v-avatar color="primary" size="50" v-on="on" style="cursor:pointer">
            <img :src="profileImageUrl" alt="profile" />
          </v-avatar>
        </div>
        <div class="avator__wrapper" v-show="!profileImageUrl">
          <v-avatar size="50" v-on="on" class="avator" style="cursor:pointer">
            <v-icon color="#417D91">mdi-account</v-icon>
          </v-avatar>
        </div>
      </template>

      <v-list dense width="210" height="110">
        <v-list-item-group>
          <v-list-item v-for="(menu, index) in menus" :key="index">
            <v-list-item-icon>
              <v-icon v-text="menu.icon" size=30></v-icon>
            </v-list-item-icon>
            <v-list-item-content @click="handleMenuItemClick(menu.name)">
              <v-list-item-title>{{ menu.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import firebase from "firebase";
import axios from "axios";

export default {
  name: "Header",
  components: {},

  data() {
    const user = firebase.auth().currentUser;
    return {
      menus: [
        {
          name: "edit",
          text: "プロフィールを編集",
          icon: "mdi-account"
        },
        {
          name: "logout",
          text: "ログアウト",
          icon: "mdi-logout"
        }
      ],
      loading: true,
      files: [],
      // profileImageUrl: this.profileImageUrlState
    };
  },
  props: ["userName"],
  methods: {
    handleMenuItemClick: function(target) {
      switch (target) {
        case "edit":
          this.$emit("edit");
          break;
        case "logout":
          if (window.confirm("ログアウトしてもよろしいでしょうか？")) {
            this.$emit("logout");
          } else {
            console.log("canceled");
          }
          break;
        default:
      }
    },
    handleArchivedTasksButtonClick() {
      this.$emit("archivedTasks");
    },
    handleAddTaskButtonClick() {
      this.$emit("addTask");
    },
    handleCompletedTasksButtonClick() {
      this.$emit("completedTasks");
    }
  },
  created: function() {
  },
  computed: {
    profileImageUrl() {
      return this.$store.getters.profileImageUrl;
    },
    userId() {
      return this.$store.getters.userId;
    },
  },
}
</script>
<style lang="scss" scoped>


.avator__wrapper {
  height: 100%;
  display: flex;
  align-items: center;
}

.avator{
  border:0.1px solid $primary
}

.Menu-items__container {
  display: flex;
  margin-top: 33px;
  margin-bottom: 17px;
  align-items: flex-end;
  justify-content: space-between;
}

.v-menu__content {
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
  margin-left: 12px;
  border-radius:1px
}

.v-list{
  width:200px;
  padding:0px;
  border-radius:1px;
  .v-list-item{
      height:55px;
  }
}


::v-deep .v-list-item__icon{
  margin-top: 17px !important;
  margin-right: 20px !important;
}

.button-group__wrapper {
  display: flex;
  align-items: center;
}

.button-group__completed{
  height:32px !important;
  font-size:14px !important;
}
.button-group__add-task{
  height:32px !important;
  font-size:14px !important;
}

.archive__icon {
  padding-right: 2px;
}


</style>

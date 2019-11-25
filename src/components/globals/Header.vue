<template>
  <!-- <v-app> -->
  <v-app-bar app height='84px'>
    <h1 class="align-center font-weight-bold" style="font-size: 30px ; color:#6245EA ">Papyrus</h1>
    <v-spacer></v-spacer>

    <div class="Menu-items__container">
      <p v-show="userName">こんにちは、{{ userName }}さん</p>
    <v-spacer></v-spacer>
    <div class="button-group__wrapper">
      <v-btn class="ma-2" fab color="indigo lighten-2" small rounded outlined>
        <v-icon>mdi-history</v-icon>
      </v-btn>
      <v-btn class="ma-2 pl-2" color="indigo lighten-2" small outlined>
        <v-icon small>mdi-check</v-icon>
        完了済を見る
      </v-btn>
      <v-btn class="ma-2 pl-3 mr-8" color="red lighten-2" dark @click="handleAddTaskButtonClick">
        <v-icon class="pr-1">mdi-plus</v-icon>
        タスクを追加
      </v-btn>
    </div>
    </div>
    <v-menu open-on-hover close-on-click offset-y bottom>
      <template v-slot:activator="{ on }">
        <div>
          <v-avatar color="primary" size="45" v-on="on" style="cursor:pointer">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
        </div>
      </template>

      <v-list dense flat width="210">
        <v-list-item-group>
          <v-list-item v-for="(menu, index) in menus" :key="index">
            <v-list-item-icon>
              <v-icon v-text="menu.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content @click="handleMenuItemClick(menu.name)">
              <v-list-item-title>{{ menu.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </v-app-bar>
  <!-- </v-app> -->
</template>

<script>
import firebase from "firebase";

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
      loading: true
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
    handleAddTaskButtonClick() {
      this.$emit("addTask");
    }
    // handleEditTargetButtonClick: () => {
    //   this.$emit("setTarget");
    // }
  },
  computed: {}
};
</script>
<style lang="scss" scoped>
$addButtonColor: #ef9a9a;
$targetButtonColor: #9fa8da;
$primary: #6245EA;

.v-application p {
  margin-bottom: 0px;
  margin-top: 10px;
}

.v-btn--outlined{
  border:1.5px solid;
}

.v-btn__content{
  margin-bottom: 2px;
}

.v-menu__content {
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
  margin-left: 12px;
}

.Menu-items__container{
  display:flex;
  margin-top: 33px;
  align-items:flex-end;
  justify-content: space-between
}

.button-group__wrapper {
  margin-right: 50px;
  display: flex;
  align-items: flex-end;
}
</style>

<template>
  <!-- <v-app> -->
  <v-app-bar app>
    <div class="align-center font-weight-light" style="font-size: 25px">Papyrus</div>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
        <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>

    <div v-show="loading" class="loader">
      <v-progress-circular
      indeterminate
      color="blue-gray"
    ></v-progress-circular>
    </div>
    <div v-show="!loading" class="itemContainer">
    <p v-show='name'>こんにちは、{{ name }}さん</p>
    </div>
    <v-spacer></v-spacer>
    <div class="button-group__wrapper">
      <v-btn class="ma-2 pl-2" color="indigo lighten-2" small outlined>
        <v-icon class="pr-1" small>mdi-target</v-icon>
        目標を設定
      </v-btn>
      <v-btn class="ma-2 pl-3 mr-8" color="red lighten-2" dark>
        <v-icon class="pr-1">mdi-plus</v-icon>
        タスクを追加
      </v-btn>
    </div>
    <v-menu open-on-hover close-on-click offset-y>
      <template v-slot:activator="{ on }">
        <v-avatar color="primary" size="45" v-on="on" style="cursor:pointer">
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
        </v-avatar>
      </template>

      <v-list dense flat width="210" elevation="0">
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
      name: firebase
        .firestore()
        .collection("user_info")
        .doc(user.uid)
        .get()
        .then(snapShot => {
          this.name = snapShot.data().name;
          this.loading = false
        })
        .catch(err => {
          console.log(err);
        }),
      loading : true,
    };
  },
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
    }
    // handleAddTaskButtonClick: () => {
    //   this.$emit("addTask");
    // },
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

.v-application p{
  margin-bottom:0px;
  margin-top:10px
}

.button-group__wrapper {
  margin-right: 50px;
  display: flex;
  align-items: flex-end;
}
</style>

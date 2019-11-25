<template>
  <!-- <v-app> -->
  <v-app-bar app height="84px">
    <h1 class="align-center font-weight-bold" style="font-size: 30px ; color:#6245EA ">Papyrus</h1>
    <v-spacer></v-spacer>

    <div class="Menu-items__container">
      <p v-show="userName">こんにちは、{{ userName }}さん</p>
      <v-spacer></v-spacer>
      <div class="button-group__wrapper">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              class="mb-1 mr-7 button-group__archive"
              fab
              color="indigo lighten-2"
              width="36"
              height="36"
              rounded
              outlined
              v-on="on"
            >
              <v-layout justify-center fill-height>
                <v-icon class="archive__icon">mdi-history</v-icon>
              </v-layout>
            </v-btn>
          </template>
          <span>アーカイブを見る</span>
        </v-tooltip>
        <v-btn
          class="ma-2 mr-10 pl-2 button-group__completed"
          color="indigo lighten-2"
          small
          outlined
        >
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
        <div class="avator__wrapper" v-show="profileImageUrl">
          <v-avatar color="primary" size="50" v-on="on" style="cursor:pointer">
            <img :src="profileImageUrl" alt="profile" />
          </v-avatar>
        </div>
        <div class="avator__wrapper" v-show="!profileImageUrl">
          <v-avatar size="50" v-on="on" style="cursor:pointer">
            <v-icon color="white" large>mdi-emoticon-happy-outline</v-icon>
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
      profileImageUrl: this.profileImageUrlState
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
  computed: {
    profileImageUrlState() {
      return this.$store.getters.profileImageUrl;
    }
  },
  created: function() {
    const user = firebase.auth().currentUser;
    const ref = firebase
      .storage()
      .ref()
      .child("profile")
      .child(user.uid);
    ref
      .getDownloadURL()
      .then(url => {
        this.profileImageUrl = url;
      })
      .catch(error => {
        console.log(error);
      });
    // axios
    //   .get(this.profileImageUrl)
    //   .then(response =>)
    //   .catch(error => {
    //     console.log(error);
    //   });
  }
};
</script>
<style lang="scss" scoped>
$addButtonColor: #ef9a9a;
$targetButtonColor: #9fa8da;
$primary: #6245ea;

.v-application p {
  margin-bottom: 0px;
  margin-top: 10px;
}

.v-tooltip__content {
  font-size: 12px;
}

.v-btn--outlined {
  border: 1.5px solid;
}

.v-btn__content {
  margin-bottom: 2px;
}

.avator__wrapper {
  height: 100%;
  display: flex;
  align-items: center;
}
.v-menu__content {
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
  margin-left: 12px;
}

.Menu-items__container {
  display: flex;
  margin-top: 33px;
  margin-bottom: 17px;
  align-items: flex-end;
  justify-content: space-between;
}

.button-group__wrapper {
  margin-left: 60px;
  margin-right: 30px;
  display: flex;
  align-items: flex-end;
}

.button-group__completed {
  margin-right: 30px;
}

.button-group__archive {
  margin-right: 20px;
}

.archive__icon {
  padding-right: 2px;
}
</style>

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
    <v-menu open-on-click close-on-click offset-y bottom>
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
export default {
  name: 'Header',
  components: {},

  data: () => ({
    //
  }),
}
</script>
<style scoped>

</style>

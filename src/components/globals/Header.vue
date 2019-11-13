<template>
  <!-- <v-app> -->
  <v-app-bar app>
    <div class="align-center font-weight-light" style="font-size: 25px">Papyrus</div>
    <v-spacer></v-spacer>
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
export default {
  name: 'Header',
  components: {},

  data: () => ({
    menus: [
      {
        name: 'edit',
        text: 'プロフィールを編集',
        icon: 'mdi-account',
      },
      {
        name: 'logout',
        text: 'ログアウト',
        icon: 'mdi-logout',
      },
    ],
  }),
  methods: {
    handleMenuItemClick: target => {
      switch (target) {
        case 'edit':
          console.log('edit')
          break
        case 'logout':
          console.log('logout')
          break
        default:
      }
    },
  },
}
</script>
<style scoped>
</style>

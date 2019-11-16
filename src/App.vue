<template>
  <v-app>
    <p-header @logout="handleHeaderMenuLogoutClick" @edit="handleHeaderMenuEditProfileClick" v-if="$route.name.indexOf('no_auth') == -1"></p-header>
    <v-content>
      <router-view ref="rv" />
    </v-content>
  </v-app>
</template>

<script>
import Header from '@/components/globals/Header'
import Navigation from '@/components/globals/Navigation'

export default {
  name: 'App',
  components: {
    'p-header': Header,
    'p-navigation': Navigation
  },

  data: () => ({
    //
  }),
  methods: {
    handleHeaderMenuLogoutClick() {
      this.$refs.rv.logout()
    },
    handleHeaderMenuEditProfileClick() {
      this.$refs.rv.openProfileEditModal()
    }
  },
}
</script>
<style scoped>

::-webkit-scrollbar{
  display:none
}
</style>

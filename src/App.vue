<template>
  <v-app>
    <p-header class="p-header" @logout="handleHeaderMenuLogoutClick" @edit="handleHeaderMenuEditProfileClick" v-if="$route.name.indexOf('no_auth') == -1"></p-header>
    <p-navigation class="p-navigation" v-if="$route.name.indexOf('no_auth') == -1"></p-navigation>
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


.p-navigation{
  position: absolute;
  z-index: 2
}

.p-header{
    z-index: 3
}
</style>

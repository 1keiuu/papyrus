<template>
  <v-app>
    <p-header></p-header>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Header from '@/components/globals/Header'

export default {
  name: 'App',
  components: {
    'p-header': Header,
  },

  data: () => ({
    //
  }),
}
</script>

<template>
  <v-app>
    <p-header @logout="handleHeaderMenuLogoutClick" @edit="handleHeaderMenuEditProfileClick" @addTask="handleHeaderAddTaskButtonClick" @setTarget="handleHeaderSetTargetButtonClick"
    v-if="$route.name.indexOf('no_auth') !== 0"></p-header>
    <AddTaskModal ref='addTask'></AddTaskModal>
    <v-content>
      <router-view ref="rv" />
    </v-content>
  </v-app>
</template>

<script>
import Header from '@/components/globals/Header'
import AddTaskModal from './components/parts/AddTaskModal'

export default {
  name: 'App',
  components: {
    'p-header': Header,
    AddTaskModal,
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
    },
    handleHeaderAddTaskButtonClick() {
      this.$refs.rv.openDialog();
    },
    handleHeaderSetTargetButtonClick() {
      this.$refs.rv.setTarget()
    },
  },
}
</script>
<style scoped>

::-webkit-scrollbar{
  display:none
}
</style>

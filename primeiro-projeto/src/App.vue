<template>
  <div id="app">
    <base-spinner/>
    <layout-notification/>
    <div class="container-fluid" v-if="isLogged">
      <div class="row">
        <div class="col-2 navigation-sidebar">
          <h1 class="app-tittle">Expenses</h1>
          <layout-navigation/>
        </div>
        <div class="col-9">
          <router-view/>
        </div>
      </div>
    </div>

    <router-view v-else/>
  </div>
</template>

<script>
import LayoutNavigation from './components/global/layout/LayoutNavigation'
import BaseSpinner from './components/global/BaseSpinner'
import LayoutNotification from './components/global/layout/LayoutNotification'

export default {
  name: 'App',
  components: {
    LayoutNavigation,
    BaseSpinner,
    LayoutNotification
  },
  data: () => ({ isLogged: false }),
  mounted () {
    this.$firebase.auth().onAuthStateChanged(user => {
      window.uid = user ? user.uid : null
      this.isLogged = !!user

      this.$router.push({ name: user ? 'Home' : 'login' }).catch(() => {})

      setTimeout(() => {
        this.$root.$emit('Spinner::hide')
      }, 300)
    })
  }
}
</script>

<style lang="scss" scoped>
#app{
  background-color: var(--dark);
  color: var(--light);
  min-height: 100vh;
  .navigation-sidebar{
    background-color: var(--dark-medium);
  }
  .app-tittle{
    font-size: 20pt;
    margin-top: 10px;
    text-align: center;
  }
}

</style>

<template>
  <button class="btn btn-logout" @click="logout()">
    <i class="fa fa-power-off"></i>
    Logout
  </button>
</template>

<script>
export default {
  methods: {
    async logout () {
      this.$root.$emit('Spinner::show')

      await this.$firebase.auth().signOut()

      window.uid = null

      this.$root.$emit('Spinner::hide')
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-logout{
  width: 100%;
  cursor: pointer;
  color: var(--white)!important;
  &:hover{
    color: var(--featured)!important;
  }
}

</style>

<template>
  <div class="base-spinner fa-4x" v-if="viseble">
    <i class="fas fa-circle-notch fa-spin"></i>
     </div>
</template>

<script>
export default {
  data () {
    return {
      viseble: true
    }
  },

  created () {
    this.$root.$on('Spinner::show', () => { this.viseble = true })
    this.$root.$on('Spinner::hide', () => { this.viseble = false })
  }
}
</script>

<style lang="scss" scoped>
.base-spinner{
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--dark-medium);
  color: var(--featured);
  z-index: 100000;
}

</style>

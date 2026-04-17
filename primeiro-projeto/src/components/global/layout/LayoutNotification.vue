<template>
  <div v-if="show" :class="`alert-${type}`" class="alert alert-dismissible fade show">
    {{ message }}
    <button type="button" class="close" @click="close">
      <span>&times;</span>
    </button>
  </div>
</template>

<script>
export default {
  data: () => ({
    show: false,
    message: '',
    type: 'danger'
  }),
  created () {
    this.$root.$on('notification::show', payload => {
      this.show = true
      this.message = payload.message
      this.type = payload.type

      setTimeout(() => { this.close() }, payload.timeout || 4000)
    })
  },
  methods: {
    close () {
      this.message = ''
      this.type = 'danger'
      this.show = false
    }
  }
}
</script>

<style scoped>
.alert{
  top: 20px;
  right: 20px;
  z-index: 1000;
  max-width: 400px;
  position: absolute;
}
</style>

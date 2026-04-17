<template>
  <div class="w-100 d-flex align-item-center justify-content-center">
    <button @click="showModal = true" class="bnt btn-lg btn-outline-primary ">
      <i class="fa fa-plus"></i>
      Novo gasto
    </button>

    <form @submit.prevent="submit()">
      <div class="modal fade" :class="{show: showModal}" :style="{ display: showModal ? 'block' : 'none' }" style="display: block;">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title fs-5" id="exampleModalLiveLabel">Adicionar novo gasto</h5>
              <button type="button" @click="closeModal()" class="btn-close">
                <span aria-hidden="true">X</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="form-group col-8">
                  <label for="">Descrição</label>
                  <input
                  type="text"
                  class="form-control"
                  v-model="form.description"
                  required>
                </div>
                <div class="form-group col-4">
                  <label for="">Valor (R$)</label>
                  <input
                  type="text"
                  class="form-control"
                  v-model="form.value"
                  required>
                </div>
                <div class="form-group col-12 d-flex flex-column align-items-center justify-content-center">
                  <input
                  ref="fileInput"
                  type="file"
                  class="d-none"
                  accept="image/*"
                  @change="handleFile($event)"
                  >
                  <button
                  @click="openFileDialog"
                  type="button"
                  class="btn
                  btn-outline-secondary"
                  >
                    adicionar comprovante
                  </button>
                  <div class="mt-2" v-if="form.receipt">
                    {{ form.receipt.name}}
                    <button
                    @click="form.receipt = ''"
                    type="button"
                    class="btn badge-light"
                   >
                   <i class="fa fa-trash text-danger"></i>
                  </button>
                  </div>
                </div>
              </div>
                </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary"  @click="closeModal()" data-bs-dismiss="modal">Fechar</button>
              <button class="btn btn-primary">
                <template v-if="loading">
                  <i class="fa fa-spinner fa-spin"></i>
                  incluindo ...
                </template>
                Incluir novo gasto
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div class="modal-backdrop fade" :style="{ display: showModal ? 'block' : 'none' }" :class="{show: showModal}" >
   </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    showModal: false,
    form: {
      receipt: '',
      description: '',
      value: ''
    }
  }),

  computed: {
    fileName () {
      const { receipt } = this.form
      if (receipt) {
        const split = receipt.name.split('.')
        return `${split[0]}-${new Date().getTime()}.${split[1]}`
      } else {
        return ''
      }
    }
  },
  methods: {
    handleFile ({ target }) {
      this.form.receipt = target.files[0]
    },
    openFileDialog () {
      this.$refs.fileInput.value = null
      this.$refs.fileInput.click()
    },
    async submit () {
      let url = ''

      try {
        this.$root.$emit('Spinner::show')
        const ref = this.$firebase.database().ref(window.uid)
        const id = ref.push().key

        if (this.form.receipt) {
          const snapshot = await this.$firebase.storage()
            .ref(window.uid)
            .child(this.fileName)
            .put(this.form.receipt)

          url = await snapshot.ref.getDownloadURL()
        }

        const payload = {
          id,
          ...this.form,
          receipt: url,
          creatAt: new Date().getTime()
        }
        ref.child(id).set(payload, err => {
          this.$root.$emit('Spinner::hide')
          if (err) {
            this.$root.$emit('notification::show', {
              type: 'danger',
              message: 'Erro ao adicionar novo gasto'
            })
          } else {
            this.$root.$emit('notification::show', {
              type: 'success',
              message: 'Gasto adicionado com sucesso'
            })
            this.closeModal()
          }
        })
      } catch (err) {
        this.$root.$emit('notification::show', {
          type: 'danger',
          message: 'Erro ao adicionar novo gasto'
        })
      }
    },
    closeModal () {
      this.showModal = false
      this.form = {
        receipt: '',
        description: '',
        value: ''
      }
    }
  }
}
</script>

<style scoped>
.modal-content {
  color: var(--dark);
}
</style>

import Vue from 'vue'

Vue.directive('money-format', (el, { value }) => {
  el.innerHTML = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  }).format(value)
})

Vue.directive('date-format', (el, { value }) => {
  if (!value) return

  // Garante que o timestamp seja um número, caso o Firebase tenha salvado como texto
  let timestamp = value
  if (typeof timestamp === 'string' && /^\d+$/.test(timestamp)) {
    timestamp = parseInt(timestamp, 10)
  }

  el.innerHTML = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(timestamp)).replace(/,?\s+/, ' às ')
})

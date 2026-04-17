import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: {
        icon: 'home',
        title: 'Home Page'
      },
      component: () => import(/* webpackChunkName: "home" */ '../pages/home/Home')
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        icon: 'sign-in-alt',
        title: 'Login'
      },
      component: () => import(/* webpackChunkName: "login" */ '../pages/login/Login')
    },
    {
      path: '/lista-gastos',
      name: 'lista-gastos',
      meta: {
        icon: 'list',
        title: 'Lista de Gastos'
      },
      component: () => import(/* webpackChunkName: "login" */ '../pages/lista-gastos/ListaGastos')
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || 'Carregando'} - Expenses`

  if (!window.uid && to.name !== 'login') {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router

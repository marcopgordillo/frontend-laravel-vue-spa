import { createRouter, createWebHistory } from 'vue-router'

import store from '@/store'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  const authUser = store.getters['auth/authUser']
  const reqAuth = to.matched.some(record => record.meta.requiresAuth)
  const loginQuery = { path: '/login', query: { redirect: to.fullPath } }

  if (reqAuth && !authUser) {
    store.dispatch('auth/getAuthUser').then(() => {
      if (!store.getters['auth/authUser']) next(loginQuery)
      else next()
    })
  } else {
    next()
  }
})

export default router

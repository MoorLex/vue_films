import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './routes'

Vue.use(Router)

const router = new Router({
  linkActiveClass: 'active',
  hashbang: false,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) return savedPosition
    else if (to.hash) return { selector: to.hash }
    else return { x: 0, y: 0 }
  },
  routes
})

export default router

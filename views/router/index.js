import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/list', component: () => import('../components/InterfaceList.vue') },
      { path: '/update', component: () => import('../components/InterfaceUpdate.vue') },
      { path: '/view', component: () => import('../components/InterfaceView.vue') },
    ]
  })
}
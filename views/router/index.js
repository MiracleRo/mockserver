import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    base: __dirname,
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/', component: () => import('components/InterfaceList.vue') },
      { path: '/update/:id', component: () => import('components/InterfaceUpdate.vue') },
      { path: '/create', component: () => import('components/InterfaceUpdate.vue') },
      { path: '/view', component: () => import('components/InterfaceView.vue') }
    ]
  })
}
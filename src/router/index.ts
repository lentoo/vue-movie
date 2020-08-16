import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Detail from '../components/detail.vue'
import List from '../components/list.vue'
const routes: Array<RouteRecordRaw> = [
  { path: '/detail/:id', name: 'detail', component: Detail },
  { path: '/movie', name: 'list', component: List },
  // { path: '*', redirect: '/movie' },
  {
    path: '/',
    redirect: '/movie'
  }
];

const router = createRouter({
  routes: routes,
  history: createWebHashHistory()
})

export default router
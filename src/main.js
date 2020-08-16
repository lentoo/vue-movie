import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import in_theaters from './components/in_theaters.vue'
import detail from './components/detail.vue'
import list from './components/list.vue'
import focus from './js/focus'
Vue.use(VueRouter);
Vue.use(focus);

const routes = [
  { path: '/detail/:id', component: detail },
  { path: '/:server/:page', component: list },
  { path: '*', redirect: '/in_theaters/0' }
];
const router = new VueRouter({
  routes: routes,
});
var vm = new Vue({
  el: '#app',
  router,
  render: h => h(App),
})

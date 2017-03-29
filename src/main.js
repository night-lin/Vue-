// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// src/main.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

// import App from './App'
import App from './App'
import Home from './components/Home'
import ManageCity from './components/ManageCity'
import AddCity from './components/AddCity'
import Setting from './components/Setting'

import iView from 'iview'
import 'iview/dist/styles/iview.css'    // 使用 CSS
import './assets/css/index.css'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(iView)

import store from './store'

// 自定义路由
const routes = [{
  path: '/',
  component: Home
}, {
  path: '/home',
  component: Home
}, {
  path: '/ManageCity',
  component: ManageCity
}, {
  path: '/AddCity',
  component: AddCity
}, {
  path: '/Setting',
  component: Setting
}
]

const router = new VueRouter({
  routes
})
/* import Vue from 'vue'
import App from './App'
import router from './router'
*/

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  ...App,
  store,
  components: {Home, App},
  created () {
    this.$Message.config({
      top: 0,
      duration: 1
    })
  }
}).$mount('#app')


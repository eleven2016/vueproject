// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 引用路由
import VueRouter from 'vue-router'
import routes from './config/routes'
Vue.use(VueRouter)
// 使用配置文件规则
const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  render: (h) => h(App)
})

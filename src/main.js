// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 引入vue
import Vue from 'vue'
// 引入入口模块
import App from './App'
// 引用VUE路由
import VueRouter from 'vue-router'
// 进入自己定义的路由配置
import routes from './router/routes'

// 引入ElementUI及其样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

// 使用VueRouter
Vue.use(VueRouter)
// 使用ElementUI
Vue.use(ElementUI)
// 定义全局的组件
Vue.component('icon', Icon)
// 设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false

// 使用自定义的路由规则
const router = new VueRouter({routes})

/* eslint-disable no-new */
new Vue({
  // 绑定index.html中的div
  el: '#app',
  // 使用路由
  router,
  template: '<App/>',
  components: { App },
  // 使用render函数进行页面渲染,此处渲染的是App.vue模块
  render: (h) => h(App)
})

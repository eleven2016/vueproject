// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 引入vue
import Vue from 'vue'
import Vuex from 'vuex'
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
import VueResource from 'vue-resource'

// 使用vuex进行全局状态管理
Vue.use(Vuex)
// 使用VueRouter
Vue.use(VueRouter)
// 使用ElementUI
Vue.use(ElementUI)
// 使用vue-resource
Vue.use(VueResource)
// 定义全局的组件
Vue.component('icon', Icon)
// 设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false

// 使用自定义的路由规则
const router = new VueRouter({routes})

const store = new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    }
  },
  getters: {
    getToken (state) {
      return state.token
    }
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (store.state.token) {  // 通过vuex state获取当前的token是否存在
      next()
    } else {
      next({
        path: '/',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  // 绑定index.html中的div
  el: '#app',
  store,
  // 使用路由
  router,
  // 使用render函数进行页面渲染,使用render就不用components了
  render: (h) => h(App)
})

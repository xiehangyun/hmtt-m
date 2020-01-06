import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载注册vant 组件模块
import './utils/register-vant'

// 加载全局样式
import './styles/index.less'
import 'amfe-flexible'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

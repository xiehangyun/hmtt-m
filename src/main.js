import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/validation'
// 加载注册vant 组件模块
import './utils/register-vant'
import './utils/datatime'

// 加载全局样式
import './styles/index.less'
import 'amfe-flexible'

// 注册全局组件
import Components from '@/components'
Vue.use(Components)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

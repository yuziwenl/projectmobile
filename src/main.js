import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import Vant from 'vant'
import VeeValidate, { Validator } from 'vee-validate'
// 导入VeeValidate的中文包
import zhCN from 'vee-validate/dist/locale/zh_CN'
import 'vant/lib/index.css'
import './styles/index.less'
Vue.use(VeeValidate)
Validator.localize('zhCN', zhCN)
Vue.config.productionTip = false
Vue.use(Vant)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

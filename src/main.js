import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import Vant from 'vant'
import VeeValidate, { Validator } from 'vee-validate'
// 导入VeeValidate的中文包
import zhCN from 'vee-validate/dist/locale/zh_CN'
import { fmtDate } from '@/utils/dayjs'
import 'vant/lib/index.css'
import './styles/index.less'
import Checklogin from '@/utils/CheckLogin'
Vue.use(Checklogin)
Vue.filter('fmtDate', fmtDate)
Vue.use(Vant)
Vue.use(VeeValidate, {
  events: ''
})
Validator.localize('zhCN', zhCN)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

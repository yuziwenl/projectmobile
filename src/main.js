import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import Vant from 'vant'
import VeeValidate from 'vee-validate'
import 'vant/lib/index.css'
import './styles/index.less'
Vue.use(VeeValidate)

Vue.config.productionTip = false
Vue.use(Vant)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

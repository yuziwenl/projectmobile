import Vue from 'vue'
import Router from 'vue-router'
import Tabbar from '@/views/Tabbar.vue'
import Home from '@/views/Home/index.vue'
Vue.use(Router)

export default new Router({
  routes: [{
  // name: 'tabbar',
    path: '/',
    component: Tabbar,
    children: [{
      name: 'Home',
      path: '',
      component: Home
    }]
  },
  {
    path: '/search-result/:q',
    name: 'search-result',
    props: true,
    component: () => import(/* webpackChunkName: "search" */ '../views/SearchResult.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue')
  }, {
    path: '/detail/:id',
    name: 'detail',
    // 路由跳转的时候对，对应的组件把动态路由参数，传递给组件
    props: true,
    component: () => import(/* webpackChunkName: "detail" */ '../views/detail/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login')
  }
  ]
})

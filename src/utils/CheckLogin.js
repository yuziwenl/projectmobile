export default {
  install (Vue) {
    Vue.prototype.$checkLogin = function () {
      if (!this.$store.state.user) {
        this.$dialog.confirm({
          title: '登录提示',
          message: '是否要跳转到登录页面'
        }).then(() => {
          this.$router.push({
            path: '/login',
            query: {
              redirect: this.$route.fullPath
            }
          })
        })
        return false
      }
      return true
    }
  }
}

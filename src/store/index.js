import Vue from 'vue'
import Vuex from 'vuex'
import * as storageTools from '@/utils/localStorage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: storageTools.getItem('user'),
    // 控制评论的回复组件是否显示
    showReplyList: false,
    currentComment: null
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      storageTools.setItem('user', user)
    },
    setShowReplyList (state, isShow) {
      state.showReplyList = isShow
    },
    setCurrentComment (state, comment) {
      state.currentComment = comment
    }
  },
  actions: {

  }
})

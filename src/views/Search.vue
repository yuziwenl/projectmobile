<template>
  <div>
    <!-- 搜索框 -->
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch(value)"
      @cancel="onCancel"
      @input='handleInput'
      clearable
      background="#3e9df8"
    />
    <!-- 搜索提示 -->
    <van-cell-group v-show="value">
      <van-cell @click="onSearch(item)"
      v-for="item in suggestionList" :key='item' icon="search">
      <div slot="title" v-html="highlight(item)"></div>
    </van-cell>
    </van-cell-group>

    <!-- 历史记录 -->
    <van-cell-group v-show="!value">
      <van-cell title="历史记录">
        <!-- 自定义右侧内容 -->
        <div v-show="isEdit" style="display:inline-block">
        <span>全部删除</span>&nbsp;
          <span @click="isEdit=false">完成</span>&nbsp;
        </div>
          <van-icon name="delete" size="18px" v-show="!isEdit" @click="isEdit=true"/>
      </van-cell>
      <van-cell v-for="(item,index) in histories" :key='item' @click="onSearch(item)"
      :title="item">
        <!-- 自定义右侧内容 -->
        <van-icon name="close" size="18px"  @click="handleDelete(index)" v-show="isEdit" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/search'
import { mapState } from 'vuex'
import * as storageTools from '@/utils/localStorage'
export default {
  name: 'Search',
  data () {
    return {
      value: '',
      suggestionList: [],
      isEdit: false,
      histories: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    if (this.user) {
      return
    }
    this.histories = storageTools.getItem('history') || []
  },
  methods: {
    onSearch (item) {
      this.$router.push({
        name: 'search-result',
        params: {
          q: item
        }
      })
      // 判断histories中是否已经存在item
      if (this.histories.includes(item)) {
        return
      }
      // 记录搜索历史
      this.histories.push(item)
      // 判断用户是否登录
      if (this.user) {
        // 发送请求
        return
      }
      // 没有登录，把历史记录存贮到本地存储
      storageTools.setItem('history', this.histories)
    },
    onCancel () {},
    // 在文本框输入的过程中获取搜索提示
    async handleInput () {
      // 判断是否为空
      if (this.value.length === 0) {
        return
      }
      const data = await getSuggestion(this.value)
      this.suggestionList = data.options
    },
    handleDelete (index) {
      this.histories.splice(index, 1)
      storageTools.setItem('history', this.histories)
    },
    highlight (item) {
      const reg = new RegExp(this.value, 'gi')
      return item.replace(reg, `<span style ="color:red">${this.value}</span>`)
    }
  }
}
</script>

<style>
</style>

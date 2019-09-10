<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar
      title="文章详情"
      left-text="返回"
      fixed
      @click-left="$router.back()"
    />
    <div class="article" v-if="article">
      <!-- 文章标题 -->
      <h2 class="article-title">{{article.title}}</h2>
      <!-- 作者信息 -->
      <author-info :article='article'></author-info>
      <!-- 文章内容 -->
      <div class="article-content" v-html="article.content">

      </div>
      <!-- 点赞和取消 -->
      <more-action :article='article'></more-action>
      <comment-list :isArticle="true" :id='article.art_id.toString()'></comment-list>
      <!-- 发布评论 -->
      <send-comment :isArticle='true' :target="article.art_id.toString()"></send-comment>
        <reply-list v-model="showReplyList" :art_id="id"></reply-list>
    </div>
  </div>
</template>

<script>
import { getArticle } from '@/api/article'
import AuthorInfo from './component/AuthorInfo'
import MoreAction from './component/MoreAction'
import CommentList from './component/CommentList'
import SendComment from './component/SendComment'
// 加载评论回复的组件
import ReplyList from './component/ReplyList'
import { mapState } from 'vuex'
export default {
  name: 'Detail',
  props: ['id'],
  components: {
    AuthorInfo,
    MoreAction,
    CommentList,
    SendComment,
    ReplyList
  },
  computed: {
    ...mapState(['showReplyList'])
  },
  data () {
    return {
      article: null
    }
  },

  methods: {
    async loadData () {
      try {
        const data = await getArticle(this.id)
        this.article = data
      } catch (error) {
        console.dir(error)
      }
    }
  },
  created () {
    this.loadData()
  }
}
</script>

<style lang="less" scoped>
.article {
  margin-top: 48px;
  padding: 0px 20px;
  .article-title {
    font-size: 20px;
    font-weight: bold;
  }
  .article-content {
    font-size: 14px;
  }
}
</style>

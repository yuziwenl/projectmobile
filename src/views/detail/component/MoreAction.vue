<template>
  <div class="more-action">
    <van-button
      :icon="article.attitude===1?'star':'star-o'"
      round
      :loading="false"
      type="danger"
      @click='handleLike'
    >点赞</van-button>

    <van-button
      icon="delete"
      round
      :loading="false"
      type="danger"
    >不喜欢</van-button>
  </div>
</template>

<script>
import { likeArticle, unLikeArticle } from '@/api/article'
export default {
  props: ['article'],
  methods: {
    async handleLike () {
      // 用户对文章的态度, -1: 无态度，0-不喜欢，1-点赞
      if (this.article.attitude === 1) {
        await unLikeArticle(this.article.art_id)
        this.article.attitude = -1
      } else {
        await likeArticle(this.article.art_id)
        this.article.attitude = 1
      }
    }
  }
}

</script>

<style lang="less" scoped>
.more-action {
  padding: 20px;
  display: flex;
  justify-content: space-around;
}
</style>

<template>
  <div class="auth-info">
    <div class="base-info">
      <img class="avatar" :src="article.aut_photo" alt="">
      <div>
        <p>{{ article.aut_name }}</p>
        <p>{{ article.pubdate | fmtDate }}</p>
      </div>
    </div>
    <div>
      <van-button
        type="danger"
        :loading="loading"
        @click='handleFollow'
      >{{article.is_followed?'已':''}}关注</van-button>
    </div>
  </div>
</template>

<script>
import { followUser, unFollowUser } from '@/api/user'
export default {
  name: 'AuthorInfo',
  props: ['article'],
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async handleFollow () {
      this.loading = true
      if (this.article.is_followed) {
        await unFollowUser(this.article.aut_id)
        this.article.is_followed = false
      } else {
        await followUser(this.article.aut_id)
        this.article.is_followed = true
      }
      this.loading = false
    }

  }
}
</script>

<style lang="less" scoped>
.auth-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  .base-info {
    display: flex;
    align-items: center;
  }
  .avatar {
    margin-right: 10px;
    width: 50px;
    height: 50px;
    border-radius: 100%;
  }
}
</style>

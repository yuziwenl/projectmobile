<template>
  <div>
    <div class="not-login" v-if="!user">
      <div class="circle" @click="handleLogin">
        <span>登录</span>
      </div>
    </div>
    <div v-else>
      <van-cell-group class="user-info">
        <van-cell class="base-info" is-link :border="false" @click="$router.push('user-profile')">
          <div slot="title">
            <img class="avatar" :src="userInfo.photo" alt="">
            <span class="title">{{userInfo.name}}</span>
          </div>
        </van-cell>
        <van-grid class="data-info" :border="false">
          <van-grid-item>
            <span class="count">{{userInfo.art_count}}</span>
            <span class="text">头条</span>
          </van-grid-item>
          <van-grid-item>
            <span class="count">{{userInfo.follow_count}}</span>
            <span class="text">关注</span>
          </van-grid-item>
          <van-grid-item>
            <span class="count">{{ userInfo.fans_count }}</span>
            <span class="text">粉丝</span>
          </van-grid-item>
          <van-grid-item>
            <span class="count">{{ userInfo.like_count }}</span>
            <span class="text">获赞</span>
          </van-grid-item>
        </van-grid>
      </van-cell-group>
      <van-cell-group>
        <van-grid clickable>
          <van-grid-item icon="star" text="我的收藏"/>
          <van-grid-item icon="chat" text="我的评论"/>
          <van-grid-item icon="like" text="我的点赞"/>
          <van-grid-item icon="browsing-history" text="浏览历史"/>
        </van-grid>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="消息通知" is-link />
        <van-cell title="用户反馈" is-link />
        <van-cell title="小智同学" is-link />
        <van-cell title="系统设置" is-link to="/settings" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'User',
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.loadUserInfo()
  },
  methods: {
    async loadUserInfo () {
      if (!this.$checkLogin()) {
        return
      }
      const data = await getUserInfo()
      this.userInfo = data
    },
    handleLogin () {
      this.$router.push({
        path: '/login',
        query: {
          redirect: this.$route.fullPath
        }
      })
    }
  }
}
</script>

<style lang="less">
.not-login {
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  .circle {
    width: 50px;
    height: 50px;
    padding: 20px;
    background-color: red;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 20px;
  }
}

.user-info {
  .base-info {
    display: flex;
    align-items: center;
    background-color: #0096fa;
    div {
      display: flex;
      align-items: center
    }
    .avatar {
      margin-right: 15px;
      width: 50px;
      border-radius: 100%;
    }
  }
  .data-info {
    .text {
      font-size: 14px;
    }
    .count {
      font-size: 12px;
    }
  }
  /deep/ .van-cell__right-icon {
    color: #fff
  }
  /deep/ .van-grid-item__content {
    background-color: #0096fa;
  }
}
</style>

<template>
  <div>
     <van-nav-bar
      title="黑马头条" fixed
    />
    <!-- 频道列表 -->
    <van-tabs animated  v-model="activeIndex">
      <van-tab v-for="channel in channels" :title="channel.name" :key="channel.id">
            <!-- 文章列表,不同的标签页下有不同的列表 -->
        <van-list
          v-model="currentChannel.loading"
          :finished="currentChannel.finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell
            v-for="article in currentChannel.articles"
            :key="article.art_id.toString()"
            :title="article.title"
          />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getDefaultOrUserChannels } from '@/api/channel'
import { getArticles } from '@/api/article'
export default {
  name: 'Home',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      channels: [],
      activeIndex: 0
    }
  },
  created () {
    this.loadChannels()
  },
  computed: {
    currentChannel () {
      return this.channels[this.activeIndex]
    }
  },
  methods: {
    async loadChannels () {
      const data = await getDefaultOrUserChannels()
      // 给所有的频道设置，时间戳和文章数组
      data.channels.forEach((channel) => {
        channel.timestamp = null
        channel.articles = []
        channel.loading = false
        channel.finished = false
      })
      this.channels = data.channels
    },
    async onLoad () {
      const data = await getArticles({
        channel_id: this.currentChannel.id,
        timestamp: this.currentChannel.timestamp || Date.now(),
        with_top: 1
      })
      this.currentChannel.timestamp = data.pre_timestamp
      this.currentChannel.articles.push(...data.results)
      this.currentChannel.loading = false
      if (data.results.length === 0) {
        this.currentChannel.finished = true
      }
    }
  }
}
</script>

<style lang='less' scoped>
.van-tabs {
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    z-index: 10;
  }
  /deep/ .van-tabs__content {
    margin-top: 90px;
    margin-bottom: 50px;
  }
}

</style>

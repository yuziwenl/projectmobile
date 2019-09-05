<template>
  <div>
     <van-nav-bar
      title="黑马头条" fixed
    />
    <!-- 频道列表 -->
    <van-tabs animated  v-model="activeIndex">
      <van-tab v-for="channel in channels" :title="channel.name" :key="channel.id">
            <!-- 文章列表,不同的标签页下有不同的列表 -->
             <van-pull-refresh v-model="currentChannel.pullLoading" @refresh="onRefresh"
                  :success-text="successText">
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
          >  <div slot="label">
                <!-- grid 显示封面
                  article.cover.type   0 没有图片   1 1个图片 3 3个图片
                 -->
                <van-grid v-if="article.cover.type" :border="false" :column-num="3">
                  <van-grid-item
                    v-for="(img, index) in article.cover.images"
                    :key="img + index"
                  >
                      <van-image lazy-load height="80" :src="img" >
                      <!-- 图片的加载提示 -->
                      <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                      </template>
                      <!-- 自定义加载失败提示 -->
                      <template v-slot:error>加载失败</template>
                    </van-image>
                  </van-grid-item>
                </van-grid>
                <p>
                  <span>{{ article.aut_name }}</span>&nbsp;
                  <span>{{ article.comm_count }}评论</span>&nbsp;
                  <span>{{ article.pubdate |fmDate }}</span>&nbsp;

                  <van-icon name="cross" class="close" />
                </p>
              </div>
            </van-cell>
        </van-list>
       </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getDefaultOrUserChannels } from '@/api/channel'
import { getArticles } from '@/api/article'
import Vue from 'vue'
import { Lazyload } from 'vant'
// options 为可选参数，无则不传
Vue.use(Lazyload)
export default {
  name: 'Home',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      channels: [],
      activeIndex: 0,
      successText: ''
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
        // 上啦加载
        channel.loading = false
        channel.finished = false
        // 下拉加载
        channel.pullLoading = false
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
    },
    async onRefresh () {
      const data = await getArticles({
        channel_id: this.currentChannel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      this.currentChannel.pullLoading = false
      this.currentChannel.articles.unshift(...data.results)
      this.successText = `加载了${data.results.length}`
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
.close {
  float: right;
}

</style>

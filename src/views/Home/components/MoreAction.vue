<template>
 <van-dialog
    :value='value'
    @input="$emit('input',$event)"
    :showConfirmButton="false"
    closeOnClickOverlay
  >
   <van-cell-group v-show="!showReports">
      <van-cell title="不感兴趣" icon="location-o" @click="handle('dislike')"/>
      <van-cell title="反馈垃圾内容" icon="location-o" is-link @click="showReports=true"/>
      <van-cell title="拉黑作者" icon="location-o"
      @click="handle('blacklist')"/>
    </van-cell-group>
    <!-- 举报文章 -->
    <van-cell-group v-show="showReports">
      <van-cell icon="arrow-left" @click="showReports=false"/>
      <van-cell title="标题夸张"/>
      <van-cell title="低俗色情"/>
      <van-cell title="错别字多"/>
    </van-cell-group>
  </van-dialog>
</template>

<script>
import { dislikeArticle } from '@/api/article'
export default {
  name: 'MoreAction',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showReports: false
    }
  },
  methods: {
    handle (type) {
      switch (type) {
        case 'dislike':
          this.dislike()
          break
        case 'blacklist':
          break
      }
    },
    async dislike () {
      try {
        await dislikeArticle(this.article.art_id)
        this.$toast.success('操作成功')
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>

<style>
</style>

<template>
  <van-popup
    :value='value'
    @input="$emit('input',$event)"
    position="bottom"
    :style="{ height: '90%' }"
  >
      <van-cell icon="cross" @click="$emit('input', false)"/>
    <!-- 我的频道 -->
    <van-cell title="我的频道" label="点击进入频道">
      <van-button
        round
        type="danger"
        size="mini"
        v-show="!isEdit"
        @click="isEdit=true"
      >编辑</van-button>
        <van-button
        round
        type="danger"
        size="mini"
        v-show="isEdit"
        @click="isEdit=false"
      >完成</van-button>
    </van-cell>
    <van-grid>
      <van-grid-item
        v-for="(channel,index) in channels"
        :key="channel.id"
        @click="handleMyChannelItem(index,channel.id)"
      >
      <div slot="text" class="van-grid-item__text" :class="{ active: active === index }" >
          {{ channel.name }}
        </div>
        <van-icon
          slot="icon"
          class="close-icon"
          name="close"
        v-show="isEdit && index !== 0"
        />
      </van-grid-item>
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell title="推荐频道" label="点击添加频道" />
    <van-grid>
      <van-grid-item
      @click='handleChannelItem(channel)'
        v-for="channel in recommendChannels"
        :key="channel.id"
        :text="channel.name"
      />
    </van-grid>
  </van-popup>
</template>

<script>
import { getAllChannels, deleteChannel, addChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/localStorage'

export default {
  name: 'ChannelEdit',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannels () {
      const ids = this.channels.map((channel) => {
        return channel.id
      })
      return this.allChannels.filter((channel) => {
        return !ids.includes(channel.id)
      })
    }

  },
  data () {
    return {
      isEdit: false,
      allChannels: []
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      const data = await getAllChannels()
      this.allChannels = data.channels
    },
    async handleMyChannelItem (index, channelId) {
      if (!this.isEdit) {
        // 告诉父组件，选中的频道的索引
        // 关闭对话框
        this.$emit('activeChange', index)
        return
      }

      this.channels.splice(index, 1)
      if (this.user) {
        await deleteChannel(channelId)
      }
      setItem('channels', this.channels)
      // 判断当前激活项的索引，是否是数组中的最后一项的索引
      if (this.active === this.channels.length - 1 && this.isEdit) {
        this.$emit('last')
      }
    },
    async handleChannelItem (channel) {
      this.$set(channel, 'timestamp', null)
      this.$set(channel, 'articles', [])
      this.$set(channel, 'loading', false)
      this.$set(channel, 'finished', false)
      this.$set(channel, 'pullLoading', false)
      this.channels.push(channel)
      if (this.user) {
        await addChannel(channel.id, this.channels.length)
      }
      setItem('channels', this.channels)
    }
  }
}
</script>

<style lang="less" scoped>
.close-icon {
  position: absolute;
  right: 0;
  top: 0;
}
.active {
  color: red
}
</style>

<template>
<div>
<van-nav-bar
      title="搜索结果"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
      <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="article in list"
        :key="article.art_id.toString()"
        :title="article.title"
      />
    </van-list>
</div>

</template>

<script>
import { getSearchResults } from '@/api/search'
export default {
  name: 'SearchResult',
  props: ['q'],
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10
    }
  },
  methods: {
    async onLoad () {
      const data = await getSearchResults({
        page: this.page,
        per_page: this.per_page,
        q: this.q
      })
      this.list.push(...data.results)
      this.page++
      this.loading = false
      if (data.results.lengt === 0) {
        this.loading = true
      }
    }
  }
}
</script>

<style>

</style>

<template>
<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell
      v-for="(item, index) in list"
      :key="index"
      :title="item.title"
      @click="$router.push(`/article/${item.art_id}`)"
    />
  </van-list>
  </van-pull-refresh>
</template>

<script>
import { getArticles } from '@/api/article.js'
export default {
  name: 'articles-list',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      isLoading: false
    }
  },
  methods: {
    async onLoad () {
      let { data: { data: { results, pre_timestamp: timestamp } } } = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      this.list.push(...results)
      this.loading = false
      results.length ? this.timestamp = timestamp : this.finished = true
    },
    async onRefresh () {
      let { data: { data: { results } } } = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      this.list.unshift(...results)
      this.isLoading = false
      this.$toast(results.length ? `更新了${results.length}条数据` : '暂无数据更新')
    }
  },
  created () {
    this.onLoad()
  }
}
</script>

<style>

</style>

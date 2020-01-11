<template>
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
    />
  </van-list>
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
      timestamp: null
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
    }
  },
  created () {
    this.onLoad()
  }
}
</script>

<style>

</style>

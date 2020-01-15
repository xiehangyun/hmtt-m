<template>
  <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <van-cell
   v-for="(article, index) in list"
   :key="index"
   :title="article.title"
  />
</van-list>
</template>

<script>
import { getSearch } from '@/api/search.js'
export default {
  props: {
    q: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      let { data: { data: { results } } } = await getSearch({
        page: this.page,
        per_page: this.per_page,
        q: this.q
      })
      this.list.push(...results)
      this.loading = false
      results.length ? this.page++ : this.finished = true
    }
  }
}
</script>

<style>

</style>

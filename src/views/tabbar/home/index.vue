<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar title="首页" fixed />
    <!-- /导航栏 -->

    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-tab :title="item.name" v-for="(item,index) in channelsList" :key="index">
          <!-- TODO: 文章列表 -->
          <article-list :channel='item' />
      </van-tab>
    </van-tabs>
    <!-- /频道列表 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channels.js'
export default {
  name: 'HomePage',
  components: {},
  props: {},
  data () {
    return {
      active: 0, // 控制标签页的激活项
      channelsList: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getUserChannels()
  },
  mounted () {},
  methods: {
    async getUserChannels () {
      let { data: { data: { channels } } } = await getUserChannels()
      this.channelsList = channels
    }
  }
}
</script>
<style lang="less" scoped>
.home-container {
  .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
.home-container {
  padding-top: 47px;
  padding-bottom: 50px;
}
</style>

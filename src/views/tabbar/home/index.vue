<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar title="首页" fixed />
    <!-- /导航栏 -->

    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-icon slot="nav-right" name="wap-nav" class="nav-right" @click="SwitchEdit" />
      <van-tab :title="item.name" v-for="(item,index) in channelsList" :key="index">
          <!-- TODO: 文章列表 -->
          <article-list :channel='item' />
      </van-tab>
    </van-tabs>
    <!-- /频道列表 -->
    <!-- /频道弹出层 -->
    <van-popup
      v-model="isChannelsListEdit"
      position="bottom"
      closeable
      close-icon-position="top-left"
      :style="{height: '95%'}"
      round
    >
    <channels-edit :active="active" :user-channels="channelsList" @activeChange="changeActive" @close="isChannelsListEdit = false"></channels-edit>
    </van-popup>
    <!-- /频道弹出层 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channels.js'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomePage',
  components: {},
  props: {},
  data () {
    return {
      active: 0, // 控制标签页的激活项
      channelsList: [],
      isChannelsListEdit: false
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
      let channels
      getItem('userChannels') ? channels = getItem('userChannels') : { data: { data: { channels } } } = await getUserChannels()
      this.channelsList = channels
    },
    SwitchEdit () {
      this.isChannelsListEdit = !this.isChannelsListEdit
    },
    changeActive (value) {
      this.active = value
    }
  }
}
</script>
<style lang="less" scoped>
.home-container {
/deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    z-index: 1;

}
  }

.home-container {
  padding-top: 90px;
  padding-bottom: 50px;
}
/deep/ .van-icon-wap-nav {
    position: fixed;
    right: 0;
    line-height: 44px;
    background: #fff;
    }
</style>

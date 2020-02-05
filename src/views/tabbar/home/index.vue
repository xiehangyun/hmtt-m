<template>
  <div class="home-container">
    <!-- 导航栏 -->
     <div class="nav-bar">
      <div class="logo"></div>
      <van-button
        class="search-btn"
        round
        type="info"
        size="small"
        icon="search"
        @click="$router.push('/search')"
      >搜索</van-button>
    </div>
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

.home-container {
  padding-top: 90px;
  padding-bottom: 50px;
  .nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    height: 46px;
    background-color: #3196fa;
    z-index: 1;
    .logo {
      background: url("./logo-light.png") no-repeat;
      background-size: cover;
      width: 100px;
      height: 30px;
    }
    .search-btn {
      background-color: #5babfb;
      width: 50%;
    }
  }}
</style>

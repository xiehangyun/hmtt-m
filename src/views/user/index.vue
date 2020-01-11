<template>
  <div class="user-container">
    <!-- 导航栏 -->
    <van-nav-bar :title="userInfoById.name" left-arrow @click-left="$router.back(-1)" />
    <!-- /导航栏 -->

    <!-- 用户信息 -->
    <div class="user-info-container">
      <div class="row1">
        <van-image
          class="col1"
          fit="cover"
          round
          :src="userInfoById ? userInfoById.photo : 'https://img.yzcdn.cn/vant/cat.jpeg'"
        />
        <div class="col2">
          <div class="row1">
            <div class="item">
              <div class="count">{{userInfoById.art_count}}</div>
              <div class="text">发布</div>
            </div>
            <div class="item">
              <div class="count">{{userInfoById.follow_count}}</div>
              <div class="text">关注</div>
            </div>
            <div class="item">
              <div class="count">{{userInfoById.fans_count}}</div>
              <div class="text">粉丝</div>
            </div>
            <div class="item">
              <div class="count">{{userInfoById.like_count}}</div>
              <div class="text">获赞</div>
            </div>
          </div>
          <div class="action">
            <van-button
              type="primary"
              size="small"
            >私信</van-button>
            <van-button
              type="default"
              size="small"
            >编辑资料</van-button>
          </div>
        </div>
      </div>
      <div class="intro-wrap">
        <div>
          <span>认证：</span>
          <span>{{userInfoById.certi}}</span>
        </div>
        <div>
          <span>简介：</span>
          <span>{{userInfoById.intro}}</span>
        </div>
      </div>
    </div>
    <!-- /用户信息 -->
    <!-- 文章列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getUserArticles"
    >
  <van-cell
    v-for="(item,index) in list"
    :key="index"
    :title="item.title"
  />
</van-list>
    <!-- /文章列表 -->
  </div>
</template>

<script>
import { getUserById } from '@/api/user.js'
import { getUserArticles } from '@/api/article'
export default {
  name: 'UserPage',
  components: {},
  props: {},
  data () {
    return {
      userId: this.$route.params.userById,
      userInfoById: {},
      loading: false,
      finished: false,
      page: 1,
      list: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getUserById()
    this.getUserArticles()
  },
  mounted () {},
  methods: {
    async getUserById () {
      let { data: { data } } = await getUserById(this.userId)
      this.userInfoById = data
    },
    async getUserArticles () {
      let { data: { data: { results } } } = await getUserArticles(this.userId, {
        page: this.page,
        per_page: 20
      })
      this.list.push(...results)
      this.loading = false
      results.length ? this.page++ : this.finished = true
    }
  }
}
</script>

<style scoped lang="less">
.user-container {
  font-size: 14px;
  .user-info-container {
    padding: 12px;
    background-color: #fff;
    margin-bottom: 10px;
    >.row1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .item {
        text-align: center;
        .text {
          font-size: 12px;
        }
      }
      >.col1 {
        width: 80px;
        height: 80px;
      }
      >.col2 {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        width: 70%;
        height: 80px;
        padding: 0 12px;
        >.row1 {
          display: flex;
          justify-content: space-between;
        }
        .action {
          display: flex;
          justify-content: space-between;
          .van-button {
            width: 45%;
          }
        }
      }
    }
  }
}
</style>

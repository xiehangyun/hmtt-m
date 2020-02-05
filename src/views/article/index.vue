<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="文章详情"
      left-arrow
      fixed
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <!-- 加载中 -->
    <van-loading
      v-if="loading"
      class="loading"
      color="#1989fa"
      vertical
    >
      <slot>加载中...</slot>
    </van-loading>
    <!-- /加载中 -->

    <!-- 文章详情 -->
    <div class="detail" v-else-if="article.title">
      <h3 class="title">{{article.title}}</h3>
      <div class="author-wrap">
        <div class="base-info">
          <van-image
            class="avatar"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div class="text">
            <p class="name">{{article.aut_name}}</p>
            <p class="time">{{article.pubdate | relativeTime}}</p>
          </div>
        </div>
        <van-button
         v-if="!user || article.aut_id !== user.id"
         class="follow-btn"
         :type="article.is_followed ? 'default' : 'info'"
         size="small"
         round
         @click="onfollowed"
        >{{article.is_followed ? '已关注' : '+ 关注' }}</van-button>
      </div>
      <div class="markdown-body" v-html="article.content">
      </div>
      <van-divider>正文结束</van-divider>
    </div>
    <!-- /文章详情 -->

    <!-- 加载失败提示 -->
    <div class="error" v-else>
      <img src="./no-network.png" alt="no-network">
      <p class="text">亲，网络不给力哦~</p>
      <van-button
        class="btn"
        type="default"
        size="small"
        @click="getArticleContent"
      >点击重试</van-button>
    </div>
    <!-- /加载失败提示 -->

    <!-- 文章评论 -->
    <van-cell ref="comment-area-tip" title="全部评论" :border="false" />
    <article-comment :article-id='articleId' />
    <!-- /文章评论 -->

    <!-- 底部区域 -->
    <div class="footer">
      <van-button
        class="write-btn"
        type="default"
        round
        size="small"
      >写评论</van-button>
      <van-icon
        class="comment-icon"
        name="comment-o"
        info="9"
      />
      <van-icon
        color="orange"
        :name="article.is_collected ? 'star' : 'star-o'"
        @click="onCollected"
      />
      <van-icon
        color="#e5645f"
        :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
        @click="onlikings"
      />
      <van-icon class="share-icon" name="share" />
    </div>
    <!-- /底部区域 -->
  </div>
</template>

<script>
import { getArticleById, postCollected, delCollected } from '@/api/article.js'
import { likings, delLikings, addFollowings, delFollowings } from '@/api/user.js'
import { mapState } from 'vuex'
import ArticleComment from './components/article-comment'

export default {
  name: 'ArticlePage',
  components: {
    ArticleComment
  },
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      article: {},
      loading: true
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.getArticleContent()
  },
  mounted () {

  },
  methods: {
    async getArticleContent () {
      this.loading = true
      try {
        let { data: { data } } = await getArticleById(this.articleId)
        this.article = data
        this.collected = data.collected
        this.loading = false
      } catch (err) {
        this.loading = false
      }
    },
    async onCollected () {
      this.$toast.loading({
        duration: 0,
        message: '操作中...',
        forbidClick: true
      })
      try {
        if (this.article.is_collected) {
          await delCollected(this.articleId)
          this.$toast.success('取消成功')
        } else {
          await postCollected(this.articleId)
          this.$toast.success('收藏成功')
        }
        this.article.is_collected = !this.article.is_collected
      } catch (err) {
        this.$toast('操作失败')
      }
    },
    async onlikings () {
      this.$toast.loading({
        duration: 0,
        message: '操作中...',
        forbidClick: true
      })
      try {
        if (this.article.attitude === 1) {
          await delLikings(this.articleId)
          this.$toast.success('取消成功')
          this.article.attitude = -1
        } else {
          await likings(this.articleId)
          this.$toast.success('点赞成功')
          this.article.attitude = 1
        }
      } catch (err) {
        this.$toast('操作失败')
      }
    },
    async onfollowed () {
      this.$toast.loading({
        duration: 0,
        message: '操作中...',
        forbidClick: true
      })
      try {
        if (this.article.is_followed) {
          await delFollowings(this.article.aut_id)
          this.article.is_followed = false
          this.$toast.success('取消成功')
        } else {
          await addFollowings(this.article.aut_id)
          this.article.is_followed = true
          this.$toast.success('关注成功')
        }
      } catch (err) {
        this.$toast('操作失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "./github-markdown.css";

.article-container {
  padding: 46px 20px 150px;
  background: #fff;
  .loading {
    padding-top: 100px;
    text-align: center;
  }
  .detail {
    .title {
      margin: 0;
      padding-top: 24px;
      font-size: 20px;
      color: #3A3A3A;
    }
    .author-wrap {
      padding: 20px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .base-info {
        display: flex;
        align-items: center;
        .avatar {
          width: 35px;
          height: 35px;
          margin-right: 5px;
        }
        .text {
          .name {
            margin: 0;
            font-size: 12px;
          }
          .time {
            margin: 0;
            font-size: 10px;
            color: #999;
          }
        }
      }
      .follow-btn {
        width: 85px;
      }
    }
  }
  .error {
    padding-top: 100px;
    text-align: center;
    .text {
      font-size: 15px;
    }
    .btn {
      width: 30%;
    }
  }
  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .write-btn {
      width: 160px;
    }
    .van-icon {
      font-size: 20px;
    }
    .comment-icon {
      bottom: -2px;
    }
    .share-icon {
      bottom: -2px;
    }
  }
}
</style>

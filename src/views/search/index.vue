<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/" class="search-form">
      <van-search
        v-model="searchContent"
        placeholder="请输入搜索关键词"
        show-action
        background="#3296fa"
        @search="onSearch(searchContent)"
        @cancel="$router.back()"
        @input="searchSuggestions"
        @focus="isResultShow = false"
      />
    </form>
    <!-- /搜索栏 -->

    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :q="searchContent"></search-result>
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <van-cell-group v-else-if="searchContent">
      <van-cell icon="search" v-for="(item,index) in Suggestions" :key="index" @click="onSearch(item)">
          <div slot="title" v-html="highlight(item)"></div>
      </van-cell>
    </van-cell-group>
    <!-- /联想建议 -->

    <!-- 历史记录 -->

    <van-cell-group v-else>
      <van-cell title="历史记录">
          <template v-if="isDelete">
        <span @click="searchHistories = []">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDelete = false" >完成</span>
        </template>
        <van-icon name="delete" v-else @click="isDelete = true" />
      </van-cell>
      <van-cell :title="item" v-for="(item,index) in searchHistories" :key="index" @click="onHistoriesClick(item,index)">
        <van-icon name="close" v-show="isDelete"></van-icon>
      </van-cell>
    </van-cell-group>
    <!-- /历史记录 -->
  </div>
</template>

<script>
import { getSuggestions } from '@/api/search'
import { debounce } from 'lodash'
import { getItem, setItem } from '@/utils/storage'
export default {
  name: 'SearchPage',
  components: {},
  props: {},
  data () {
    return {
      searchContent: '', // 搜索内容
      isResultShow: false,
      Suggestions: [],
      searchHistories: getItem('search-histories') || [],
      isDelete: false
    }
  },
  computed: {},
  watch: {
    searchHistories (newVal) {
      setItem('search-histories', newVal)
    }
  },
  created () {},
  mounted () {},
  methods: {
    onSearch (q) {
      this.searchContent = q
      let searchHistories = this.searchHistories
      let index = searchHistories.indexOf(q)
      if (index !== -1) {
        searchHistories.splice(index, 1)
      }
      searchHistories.unshift(q)
      this.isResultShow = true
    },
    searchSuggestions: debounce(async function () {
      if (!this.searchContent) {
        return
      }
      let { data: { data: { options } } } = await getSuggestions(this.searchContent)
      this.Suggestions = options
    }, 400),
    highlight (str) {
      let reg = new RegExp(this.searchContent, 'ig')
      return str.replace(reg, `<span style="color: red">${this.searchContent}</span>`)
    },
    onHistoriesClick (item, index) {
      if (this.isDelete) {
        this.searchHistories.splice(index, 1)
      } else {
        this.onSearch(item)
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
  padding-top: 54px;
  // 让搜索栏固定在顶部
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .van-search__action {
    color: #fff;
  }
}
</style>

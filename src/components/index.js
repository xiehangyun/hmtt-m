import articleList from './article-list'
import channelsEdit from './channels-edit'
import searchResult from './search-result'
export default {
  install (Vue) {
    Vue.component('article-list', articleList)
    Vue.component('channels-edit', channelsEdit)
    Vue.component('search-result', searchResult)
  }
}

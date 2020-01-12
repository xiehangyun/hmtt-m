import articleList from './article-list'
import channelsEdit from './channels-edit'
export default {
  install (Vue) {
    Vue.component('article-list', articleList)
    Vue.component('channels-edit', channelsEdit)
  }
}

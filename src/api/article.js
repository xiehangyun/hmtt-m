import request from '@/utils/request'

// 获取用户文章列表
export const getUserArticles = (userId, params) => {
  return request({
    url: `/app/v1_0/users/${userId}/articles`,
    params
  })
}

// 获取频道文章列表
export const getArticles = params => {
  return request({
    url: '/app/v1_1/articles',
    method: 'GET',
    params
  })
}

// 获取置顶文章
export const getArticleById = articleId => {
  return request({
    url: `/app/v1_0/articles/${articleId}`,
    method: 'GET'
  })
}

// 文章收藏
export const postCollected = target => {
  return request({
    url: '/app/v1_0/article/collections',
    method: 'POST',
    data: {
      target
    }
  })
}

// 文章取消收藏
export const delCollected = target => {
  return request({
    url: `/app/v1_0/article/collections/${target}`,
    method: 'DELETE'
  })
}

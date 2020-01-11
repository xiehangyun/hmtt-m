import request from '@/utils/request'

// 获取用户文章列表
export const getUserArticles = (userId, params) => {
  return request({
    url: `/app/v1_0/users/${userId}/articles`,
    params
  })
}

// 获取频道文章列表
export const getArticles = (params) => {
  return request({
    url: '/app/v1_1/articles',
    method: 'GET',
    params
  })
}

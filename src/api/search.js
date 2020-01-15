import request from '@/utils/request'

// 搜索联想建议请求
export const getSuggestions = q => {
  return request({
    url: '/app/v1_0/suggestion',
    method: 'GET',
    params: {
      q
    }
  })
}

export const getSearch = params => {
  return request({
    url: '/app/v1_0/search',
    method: 'GET',
    params
  })
}

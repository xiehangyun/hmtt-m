import request from '@/utils/request'

// 发送登陆请求获取token
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

// 发送获取验证码请求，获取验证码
export const getCode = data => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${data}`
  })
}

// 获取用户详情
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}

// 获取指定用户信息
export const getUserById = data => {
  return request({
    method: 'GET',
    url: `/app/v1_0/users/${data}`
  })
}

// 对文章点赞
export const likings = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target
    }
  })
}

// 取消对文章点赞
export const delLikings = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${target}`
  })
}

// 关注用户
export const addFollowings = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target
    }
  })
}

// 取消关注用户
export const delFollowings = target => {
  return request({
    url: `/app/v1_0/user/followings/${target}`,
    method: 'DELETE'
  })
}

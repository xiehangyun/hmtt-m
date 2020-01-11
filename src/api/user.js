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

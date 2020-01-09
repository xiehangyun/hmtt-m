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

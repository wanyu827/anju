import request from '@/utils/request'

/**
 *用户登录接口
 * @param {object{username,password}} data
 * @returns
 */
export const login = data => request({
  method: 'POST',
  url: '/user/login',
  data
})

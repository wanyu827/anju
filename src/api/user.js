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
/**
 * 获取用户信息
 * @param {token} authorization
 * @returns
 */
export const userInfo = authorization => request({
  url: '/user',
  headers: {
    authorization
  },
  method: 'GET'
})
/**
 * 查看收藏列表
 * @param {token} authorization
 * @returns
 */
export const watchCollection = authorization => request({
  url: '/user/favorites',
  method: 'GET',
  headers: {
    authorization
  }
})
/**
 * 查看以发布房源
 * @param {token} authorization
 * @returns
 */
export const rentHouse = authorization => request({
  url: '/user/houses',
  method: 'GET',
  headers: {
    authorization
  }
})

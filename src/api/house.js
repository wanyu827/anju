import request from '@/utils/request'
/**
 * 查询房屋具体信息
 * @param {id} id
 * @returns
 */
export const getHouseInformation = id => request({
  url: `/houses/${id}`
})
/**
 * 添加收藏
 * @param {token} authorization
 * @param {房屋code} id
 * @returns
 */
export const addFavorites = (authorization, id) => request({
  url: `/user/favorites/${id}`,
  method: 'POST',
  headers: {
    authorization
  }
})
/**
 * 删除收藏
 * @param {token} authorization
 * @param {房屋code} id
 * @returns
 */
export const delFavorites = (authorization, id) => request({
  url: `/user/favorites/${id}`,
  method: 'DELETE',
  headers: {
    authorization
  }
})

/**
 * 查看房屋是否收藏
 * @param {token} authorization
 * @param {房屋code} id
 * @returns
 */
export const isFavorites = (authorization, id) => request({
  url: `/user/favorites/${id}`,
  headers: {
    authorization
  }
})

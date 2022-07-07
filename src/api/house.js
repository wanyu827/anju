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
/**
 * 获取发布房屋所需的条件
 * @param {token} authorization
 * @returns
 */
export const getPublisherCondition = authorization => request({
  url: '/houses/params',
  headers: {
    authorization
  }
})
/**
 * 房屋图像上传
 * @param {*} file
 * @returns
 */
export const updateHouseImg = (file) => request({
  url: '/houses/image',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  },
  data: file
})
/**
 * 发布房源
 * @param {*} data
 * @param {token} authorization
 * @returns
 */
export const updateHouseSource = (data, authorization) => request({
  url: '/user/houses',
  method: 'POST',
  headers: {
    authorization
  },
  data
})
/**
 * 获取所有房屋列表
 * @param {token} authorization
 * @returns
 */
export const getAllHouse = (params) => request({
  url: '/houses',
  params
})
/**
 * 获取房屋查询条件
 * @param {城市id} id
 * @returns
 */
export const searchHouseCondition = id => request({
  url: '/houses/condition',
  params: {
    id
  }
})

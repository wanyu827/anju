import request from '@/utils/request'

// 获取热门城市
export const hotCityAPI = () =>
  request({
    method: 'GET',
    url: '/area/hot'
  })
// 获取城市列表
export const allCityAPI = params => request({
  method: 'GET',
  url: '/area/city',
  params
})

export const queryHouseData = (id) => request({
  url: `/area/map?id=${id}`
})
/**
 * 根据城市名称查询城市信息
 * @param {城市名称} name
 * @returns
 */
export const getCityInfo = (name) => request({
  url: '/area/info',
  params: {
    name
  }
})
/**
 * 使用关键字查询小区信息
 * @param {关键词} name
 * @param {当前定位城市id} id
 * @returns
 */
export const getCommunityList = (name, id) => request({
  url: '/area/community',
  params: {
    name,
    id
  }
})

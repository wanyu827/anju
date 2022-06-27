import request from '@/utils/request'
// 获取轮播图
export const getSwiperAPI = () =>
  request({
    method: 'GET',
    url: '/home/swiper'
  })
// 获取城市列表数据
export const getCityAPI = (params) =>
  request({
    url: '/area/city',
    method: 'GET',
    params
  })
/**
 *获取租房小组信息
 * @param {地区id} params
 * @returns
 */
export const houseGroup = params => request({
  url: '/home/groups',
  method: 'GET',
  params
})
/**
 *租房资讯
 * @param {地区id} params
 * @returns object
 */
export const houseInformation = params => request({
  url: '/home/news',
  method: 'GET',
  params
})

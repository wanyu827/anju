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

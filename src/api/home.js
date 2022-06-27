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

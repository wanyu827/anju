<template>
  <div>
    <div id="container" v-if="houseDataList.length !== undefined"></div>
  </div>
</template>

<script>
// https://lbsyun.baidu.com/jsdemo.htm#eAddMarker
import { queryHouseData } from '@/api/city'
export default {
  async created () {
    this.getHouseData()
    this.getList()
  },
  mounted () {
    this.biduMap()
  },
  data () {
    return {
      houseDataList: [],
      list: []
    }
  },
  methods: {
    async getHouseData () {
      try {
        const res = await queryHouseData('AREA|88cff55c-aaa4-e2e0')
        console.log(res)
        this.houseDataList = res.data.body
      } catch (err) {
        console.log(err)
      }
    },
    async getList () {
      console.log(this.houseDataList)
      // console.log(this.list)
      console.log(11)
    },
    biduMap () {
      console.log(this.houseDataList)
      const { BMapGL } = window
      const map = new BMapGL.Map('container')
      // 创建地图实例
      const point = new BMapGL.Point(116.404, 39.928)
      // // 创建点坐标
      map.centerAndZoom(point, 15)
      // 初始化地图，设置中心点坐标和地图级别

      map.centerAndZoom(new BMapGL.Point(116.404, 39.928), 15)
      map.enableScrollWheelZoom(true)
      // 创建点标记
      const marker1 = new BMapGL.Marker(new BMapGL.Point(116.404, 39.925))
      const marker2 = new BMapGL.Marker(new BMapGL.Point(116.404, 39.915))
      const marker3 = new BMapGL.Marker(new BMapGL.Point(116.395, 39.935))
      const marker4 = new BMapGL.Marker(new BMapGL.Point(116.415, 39.931))
      // 在地图上添加点标记
      map.addOverlay(marker1)
      map.addOverlay(marker2)
      map.addOverlay(marker3)
      map.addOverlay(marker4)
    }
  },
  computed: {},
  watch: {
    // houseDataList (newVal) {
    //   this.biduMap()
    // }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
#container {
  width: 100vw;
  height: 100vh;
}
</style>

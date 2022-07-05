<template>
  <div class="main">
    <div class="nav">
      <van-nav-bar z-index="0">
        <template #left>
          <van-icon name="arrow-left" />
        </template>
      </van-nav-bar>
      <SearchBar class="search"></SearchBar>
    </div>
    <van-sticky>
      <van-row type="flex">
        <van-col span="6">区域<i class="iconfont icon-xiajiantou"></i></van-col>
        <van-col span="6">方式<i class="iconfont icon-xiajiantou"></i></van-col>
        <van-col span="6">租金<i class="iconfont icon-xiajiantou"></i></van-col>
        <van-col span="6">筛选<i class="iconfont icon-xiajiantou"></i></van-col>
      </van-row>
    </van-sticky>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <HouseList
        v-for="(item, index) in allCityList"
        :key="index"
        :list="item"
      ></HouseList>
    </van-list>
  </div>
</template>

<script>
import { getAllHouse } from '@/api/house'
import { getCityInfo } from '@/api/city'
import SearchBar from '@/components/SearchBar.vue'
import HouseList from '@/components/HouseList.vue'
export default {
  async created () {
    const res = await getCityInfo(this.$store.state.currentCity)
    // console.log('res1', res1)
    this.cityId = res.data.body.value
    this.getAllHouseList()
  },
  data () {
    return {
      allCityList: [],
      cityId: '',
      start: 0,
      end: 20,
      loading: false,
      finished: false
    }
  },
  methods: {
    async getAllHouseList () {
      this.$toast.loading({
        duration: 0,
        message: '加载中...'
      })
      // const id = this.$store.state.
      const res = await getAllHouse({ cityId: this.cityId, stat: this.start, end: this.end })
      console.log(res)
      if (res.data.body.list.length <= 0) {
        this.finished = true
        return
      }
      this.allCityList.push(...res.data.body.list)
      this.loading = false
      this.$toast.clear()
    },
    onLoad () {
      this.start = this.end
      this.end += 20
      this.getAllHouseList()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { SearchBar, HouseList }
}
</script>

<style lang="less" scoped>
.main {
  margin-bottom: 50px;
}
.nav {
  position: relative;
}
.search {
  position: absolute;
  top: 0;
  margin-top: -3px;
  margin-left: 30px;
  height: 40px;
  width: 340px;
}
.van-row {
  background-color: #fff;
  align-items: center;
  height: 40px;
  font-size: 17px;
  border-bottom: 1px solid #e4e6f0;
  .iconfont {
    margin-left: 3px;
    color: #bbb;
    font-size: 12px;
  }
}
</style>

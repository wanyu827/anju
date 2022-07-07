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
    <van-sticky id="select">
      <van-row type="flex">
        <van-col span="6" @click="areaClick"
          >区域<i class="iconfont icon-xiajiantou"></i
        ></van-col>
        <van-col span="6" @click="typeClick"
          >方式<i class="iconfont icon-xiajiantou"></i
        ></van-col>
        <van-col span="6" @click="priceClick"
          >租金<i class="iconfont icon-xiajiantou"></i
        ></van-col>
        <van-col span="6" @click="moreClick"
          >筛选<i class="iconfont icon-xiajiantou"></i
        ></van-col>
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
    <van-popup v-model="showSelect" position="top">
      <van-row type="flex">
        <van-col span="6" @click="areaClick"
          >区域<i class="iconfont icon-xiajiantou"></i
        ></van-col>
        <van-col span="6" @click="typeClick"
          >方式<i class="iconfont icon-xiajiantou"></i
        ></van-col>
        <van-col span="6" @click="priceClick"
          >租金<i class="iconfont icon-xiajiantou"></i
        ></van-col>
        <van-col span="6" @click="moreClick"
          >筛选<i class="iconfont icon-xiajiantou"></i
        ></van-col>
      </van-row>

      <van-area :area-list="areaList" value="110000" @confirm="onConfirm" />

      <!--  <div class="btn">
        <van-button type="default">取消</van-button>
        <van-button type="primary">确定</van-button>
      </div> -->
    </van-popup>

    <van-popup v-model="showMore" position="right" :style="{ height: '100%' }"
      >11</van-popup
    >
  </div>
</template>

<script>
// import AreaSelect from './components/AreaSelect.vue'
import { getAllHouse, searchHouseCondition } from '@/api/house'
import { getCityInfo } from '@/api/city'
import SearchBar from '@/components/SearchBar.vue'
import HouseList from '@/components/HouseList.vue'
export default {
  name: 'SearchHouse',
  async created () {
    const res = await getCityInfo(this.$store.state.currentCity)
    // console.log('res1', res1)
    this.cityId = res.data.body.value
    this.getAllHouseList()
    const res1 = await searchHouseCondition(res.data.body.value)
    // console.log('res1', res1)
    this.conditionList = res1.data.body
  },
  data () {
    return {
      allCityList: [],
      cityId: '',
      start: 0,
      end: 20,
      loading: false,
      finished: false,
      showSelect: false,
      showMore: false,
      conditionList: {},
      areaList: {
        province_list: {},
        city_list: {},
        county_list: {}
      },
      selectList: {}
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
    },
    async areaClick () {
      this.areaList = {
        province_list: {},
        city_list: {},
        county_list: {}
      }
      this.areaList.province_list[110000] = this.conditionList.area.label
      this.areaList.province_list[120000] = this.conditionList.subway.label
      let num = 110100
      this.conditionList.area.children.forEach(item => {
        this.areaList.city_list[num] = item.label
        // console.log(item)
        if (item.children) {
          item.children.forEach(item => { this.areaList.county_list[num++] = item.label })
        }
        num = parseInt(num / 100) * 100 + 100
      })
      let num1 = 120100
      this.conditionList.subway.children.forEach(item => {
        this.areaList.city_list[num1] = item.label
        // console.log(item)
        if (item.children) {
          item.children.forEach(item => { this.areaList.county_list[num1++] = item.label })
        }
        num1 = parseInt(num1 / 100) * 100 + 100
      })
      this.showSelect = true
    },
    typeClick () {
      this.areaList = {
        province_list: {},
        city_list: {},
        county_list: {}
      }
      let num = 110100
      this.conditionList.rentType.forEach(item => {
        this.areaList.city_list[num] = item.label
        num += 100
      })
      // let num = 110100
      console.log('type')
      this.showSelect = true
    },
    priceClick () {
      this.areaList = {
        province_list: {},
        city_list: {},
        county_list: {}
      }
      let num = 110100
      this.conditionList.price.forEach(item => {
        this.areaList.city_list[num] = item.label
        num += 100
      })
      console.log('price')
      this.showSelect = true
    },
    moreClick () {
      this.showSelect = false
      this.showMore = true
    },
    onConfirm (val, provice, city, country) {
      console.log(val)
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
  padding-left: 15px;
  .iconfont {
    margin-left: 3px;
    color: #bbb;
    font-size: 12px;
  }
}
/deep/.van-popup--top {
  top: 46px !important;
}

/deep/.van-picker__toolbar {
  position: absolute;
  bottom: 0;
  z-index: 9999;
  width: 100%;
  button {
    &:nth-child(1) {
      flex: 1;
      color: #21b97a;
    }
    &:nth-child(2) {
      flex: 2;
      background-color: #21b97a;
      color: #fff;
    }
  }
}
</style>

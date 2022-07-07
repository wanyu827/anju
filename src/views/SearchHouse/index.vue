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

    <van-popup
      v-model="showMore"
      position="right"
      :style="{ height: '100%', width: '80%' }"
    >
      <div class="big">
        <dl>
          <dt>户型</dt>
          <dd>
            <span
              v-for="(item, index) in conditionList.roomType"
              :key="index"
              :class="{ active: selected.indexOf(item.value) != -1 }"
              @click="active(index, item.value)"
              >{{ item.label }}</span
            >
          </dd>
          <dt>朝向</dt>
          <dd>
            <span
              v-for="(item, index) in conditionList.oriented"
              :key="index"
              :class="{ active: selected.indexOf(item.value) != -1 }"
              @click="active(index, item.value)"
              >{{ item.label }}</span
            >
          </dd>
          <dt>楼层</dt>
          <dd>
            <span
              v-for="(item, index) in conditionList.floor"
              :key="index"
              :class="{ active: selected.indexOf(item.value) != -1 }"
              @click="active(index, item.value)"
              >{{ item.label }}</span
            >
          </dd>
          <dt>房屋亮点</dt>
          <dd>
            <span
              v-for="(item, index) in conditionList.characteristic"
              :key="index"
              :class="{ active: selected.indexOf(item.value) != -1 }"
              @click="active(index, item.value)"
              >{{ item.label }}</span
            >
          </dd>
        </dl>
      </div>
    </van-popup>
    <div class="btn" v-show="showMore">
      <van-button @click="onClear">清除</van-button>
      <van-button type="primary" @click="onConfirmMore">确定</van-button>
    </div>

    <van-empty
      v-if="allCityList.length === 0"
      class="custom-image"
      image="/imgs/not-found.png"
      description="描述文字"
    >
      <template #description>
        <span>暂无房源</span>
      </template>
    </van-empty>
  </div>
</template>

<script>
// import AreaSelect from './components/AreaSelect.vue'
import { getAllHouse, searchHouseCondition, searchInfomation } from '@/api/house'
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
      selectList: {},
      searchConditionList: [],
      selected: []
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
    },
    onClick (item) {
      this.searchConditionList.push(item.value)
    },
    active (index, item) {
      // this.selected.indexOf(item) 判断item下标是否为-1，
      // 是-1则数组中匹配不到该数据，添加
      // 不是-1则说明匹配到了，抹除
      if (this.selected.indexOf(item) !== -1) {
        this.selected.splice(this.selected.indexOf(item), 1) // 取消
      } else {
        this.selected.push(item)// 选中添加到数组里
      }
      console.log(JSON.parse(JSON.stringify(this.selected)))
    },
    onClear () {
      this.selected = []
    },
    async onConfirmMore () {
      try {
        const res = await searchInfomation({ cityId: this.cityId, more: this.selected.join(',') })
        console.log(res)
        this.allCityList = res.data.body.list
        this.showMore = false
      } catch (err) {
        console.log(err)
      }
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

.big {
  padding: 15px;
}
dt {
  font-size: 15px;
  color: #333;
  margin: 20px 0;
}
dd {
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 14px;
  margin-left: 40px;
  margin-right: 40px;
  span {
    display: inline-block;
    height: 32px;
    width: 70px;
    margin: 0 20px 15px 0;
    border: 1px solid #ddd;
    border-radius: 3px;
    line-height: 32px;
    text-align: center;
    font-size: 12px;
    color: #888;
  }
}
.active {
  border: 1px solid #21b97a;
  color: #21b97a;
  background-color: #defaef;
}
.btn {
  position: fixed;
  bottom: 0;
  left: 80px;
  width: 80%;
  z-index: 3333;
  display: flex;
  .van-button {
    &:nth-child(1) {
      flex: 1;
    }
    &:nth-child(2) {
      flex: 2;
      text-align: center;
      align-content: center;
    }
  }
}
/deep/.custom-image .van-empty__image {
  width: 150px;
  height: 98px;
  margin-top: 50px;
}
</style>

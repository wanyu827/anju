<template>
  <div>
    <!-- 导航栏 -->
    <!-- <van-nav-bar class="navbar" title="城市列表" fixed>
      <template #left>
        <router-link to="/home">
          <van-icon name="arrow-left" />
        </router-link>
      </template>
    </van-nav-bar> -->
    <NavBar title="城市列表" to="/home"></NavBar>
    <!-- 导航栏 -->
    <!-- 热门城市 -->
    <div class="main">
      <van-index-bar
        :index-list="indexList"
        highlight-color="red"
        :sticky="false"
      >
        <van-index-anchor index="1">当前城市</van-index-anchor>
        <van-cell title="文本" />

        <van-index-anchor index="2">热门城市</van-index-anchor>
        <van-cell
          :title="item.label"
          v-for="(item, index) in hotCityList"
          :key="index"
        />
        <van-index-anchor></van-index-anchor>
        <van-cell
          :title="item.label"
          v-for="item in allCityList"
          :key="item.value"
        />
      </van-index-bar>
    </div>
    <!-- 热门城市 -->
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import { hotCityAPI, allCityAPI } from '@/api/city'
// import pinyin from 'js-pinyin'
export default {
  created () {
    this.getHotCityList()
    this.getAllcityList()
  },
  data () {
    return {
      hotCityList: [],
      indexList: [

        'A',
        'B',
        'C',
        'D',
        'F',
        'G',
        'H',
        'J',
        'K',
        'L',
        'M',
        'N',
        'Q',
        'S',
        'T',
        'W',
        'X',
        'Y',
        'Z'
      ],
      allCityList: [],
      cityNameList: [],
      firstName: {}
    }
  },
  methods: {
    async getHotCityList () {
      try {
        const res = await hotCityAPI()
        this.hotCityList = res.data.body
      } catch (err) {
        console.log(err)
      }
    },
    async getAllcityList () {
      try {
        const res = await allCityAPI({ level: 1 })
        console.log(res)
        function sortNumber (a, b) {
          const aa = a.short
          const bb = b.short
          if (aa < bb) {
            return -1
          } else if (aa === bb) {
            return 0
          } else {
            return 1
          }
        }
        this.allCityList = res.data.body.sort(sortNumber)
        /*      for (const key in this.allCityList) {
          console.log(1)
          this.cityNameList.push(this.allCityList[key].label)
        }

        await this.indexList.forEach((item) => {
          this.firstName[item] = []
          console.log(11)
          this.cityNameList.forEach((el) => {
            const first = pinyin.getFullChars(el).substring(0, 1)
            if (first === item) {
              this.firstName[item].push(el)
            }
          })
        }) */
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { NavBar }
}
</script>

<style lang="less" scoped>
.main {
  margin-top: 46px;
}

/deep/.van-index-bar__index {
  margin: 7px 0;
}
</style>

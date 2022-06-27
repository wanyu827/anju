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
    <NavBar title="城市列表"></NavBar>
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
export default {
  created () {
    this.getHotCityList()
    this.getAllcityList()
  },
  data () {
    return {
      hotCityList: [],
      indexList: [
        '#',
        '热',
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
      allCityList: []
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

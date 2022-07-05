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
      <van-index-bar :index-list="list" z-index="0">
        <van-index-anchor index="#">当前城市 </van-index-anchor
        ><van-cell :title="currentCity" @click="checkCity(currentCity)" />

        <van-index-anchor index="热">热门城市</van-index-anchor>
        <van-cell
          :title="item.label"
          v-for="(item, index) in hotCityList"
          :key="index"
          @click="checkCity(item.label)"
        />

        <div v-for="(item, index) in firstName" :key="index">
          <van-index-anchor :index="index">{{ index }}</van-index-anchor>
          <van-cell
            :title="item1"
            v-for="(item1, index) in item"
            :key="index"
            @click="checkCityNull"
          ></van-cell>
        </div>
      </van-index-bar>
    </div>
    <!-- 热门城市 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NavBar from '@/components/NavBar.vue'
import { hotCityAPI, allCityAPI } from '@/api/city'
import pinyin from 'js-pinyin'
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
      list: ['#', '热', 'A',
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
        'Z'],
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
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中...'
      })
      try {
        const res = await allCityAPI({ level: 1 })
        console.log(res)
        this.allCityList = res.data.body
        pinyin.setOptions({ checkPolyphone: false, charCase: 0 })
        for (const key in this.allCityList) {
          this.cityNameList.push(this.allCityList[key].label)
        }

        await this.indexList.forEach((item) => {
          this.firstName[item] = []
          this.cityNameList.forEach((el) => {
            const first = pinyin.getFullChars(el).substring(0, 1)
            if (first === item) {
              this.firstName[item].push(el)
            }
          })
        })
        this.$forceUpdate()
        this.$toast.clear()
      } catch (err) {
        console.log(err)
      }
    },
    checkCity (city) {
      console.log(city)
      this.$store.commit('setCurrentCity', city)
      this.$router.push('/home')
    },
    checkCityNull () {
      this.$toast('该城市无房源')
    }

  },
  computed: {
    ...mapState(['currentCity'])
  },
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
/deep/.van-index-bar__index--active {
  padding: 0;
  color: #fff;
  background-color: #21b97a;
  border-radius: 100%;
  display: inline-block;
  font-size: 12px;
  width: 15px;
  height: 15px;
  line-height: 15px;
  text-align: center;
}
/deep/.van-index-bar__index {
  padding: none;
}
</style>

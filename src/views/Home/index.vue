<template>
  <div class="main">
    <SearchBar></SearchBar>
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item
        class="swipe"
        v-for="obj in swiperImageList"
        :key="obj.id"
      >
        <img :src="'http://liufusong.top:8080' + obj.imgSrc" />
      </van-swipe-item>
    </van-swipe>
    <!-- 轮播图结束 -->
    <!-- 导航栏 -->
    <van-row class="daohang" gutter="20">
      <van-col span="6" v-for="(item, index) in navList" :key="index">
        <router-link :to="item.to">
          <van-image width="60" height="60" round fit="cover" :src="item.src" />
          <div>{{ item.title }}</div>
        </router-link>
      </van-col>
    </van-row>
    <!-- 导航栏结束 -->
    <!-- 租房小组 -->
    <div class="group">
      <div class="group-top">
        <h3>租房小组</h3>
        <span>更多</span>
      </div>

      <div class="container">
        <div
          class="group-container"
          v-for="obj in houseGroupList"
          :key="obj.id"
        >
          <van-image
            width="50"
            height="50"
            :src="'http://liufusong.top:8080' + obj.imgSrc"
          />
          <div class="right">
            <p>{{ obj.title }}</p>
            <p>{{ obj.desc }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 租房小组结束 -->
    <!-- 资讯 -->
    <div class="information">
      <h3>租房资讯</h3>
      <span>更多</span>
    </div>
    <ul class="info-list">
      <li v-for="obj in informationList" :key="obj.id">
        <div class="left">
          <img :src="'http://liufusong.top:8080' + obj.imgSrc" alt="" />
        </div>
        <div class="right">
          <div class="top">
            <p>{{ obj.title }}</p>
          </div>
          <div class="bottom"><span>租房</span> <span>限购</span></div>
          <span>{{ obj.date }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'

import { getSwiperAPI, getCityAPI, houseGroup, houseInformation } from '@/api/home'
export default {
  async created () {
    this.getSwiperList()
    this.getHouseGroup()
    this.getHouseInformation()
  },
  data () {
    return {
      // 轮播图数据
      swiperImageList: [],
      // 导航数据
      navList: [
        { src: '/imgs/1.png', title: '整租', to: '' },
        { src: '/imgs/2.png', title: '合租', to: '' },
        { src: '/imgs/3.png', title: '地图找房', to: '' },
        { src: '/imgs/4.png', title: '去出租', to: this.$store.state.token ? '/add' : '/login' }
      ],
      // 城市列表数据
      cityList: [],
      houseGroupList: [],
      informationList: []
    }
  },
  methods: {
    // 获取轮播图
    async getSwiperList () {
      try {
        const res = await getSwiperAPI()
        this.swiperImageList = res.data.body
        // console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    // 获取城市列表数据
    async getCityList () {
      try {
        const res = await getCityAPI({ level: 1 })
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    // 获取租房小组
    async getHouseGroup () {
      try {
        const res = await houseGroup()
        console.log(res)
        this.houseGroupList = res.data.body
      } catch (err) {
        console.log(err)
      }
    },
    // 获取租房资讯
    async getHouseInformation () {
      try {
        const res = await houseInformation({ area: 'AREA|88cff55c-aaa4-e2e0' })
        console.log(res)
        this.informationList = res.data.body
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { SearchBar }
}
</script>

<style lang="less" scoped>
.main {
  margin-bottom: 50px;
}
li {
  list-style: none;
}
// 轮播图区域
.swipe {
  width: 10rem;
  height: 212px;
  img {
    width: 100%;
  }
}
// 轮播图指示器外层
/deep/.van-swipe__indicators {
  position: absolute;
  bottom: 5px;
}
// 轮播图指示器
/deep/.van-swipe__indicator {
  width: 8px;
  height: 8px;
}
// 轮播图指示器选中
/deep/.van-swipe__indicator--active {
  background-color: #666;
}
// 导航
.daohang {
  text-align: center;
  font-size: 14px;
  color: #333;
  padding-top: 10px;
  .van-image {
    margin-bottom: 8px;
  }
}
// 租房小组
.group {
  background-color: #eee;
  padding: 10px 10px 0;
  margin-top: 10px;
  // 文字
  .group-top {
    display: flex;
    justify-content: space-between;
    h3 {
      font-size: 14px;
      margin: 5px 0 10px 10px;
    }
    span {
      font-size: 14px;
      margin: 5px 0 10px;
      color: #666;
    }
  }
  // 内容
  .container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .group-container {
      width: 4.6rem;
      display: flex;
      align-items: center;
      background-color: #fff;
      border-radius: 5px;
      padding: 5px 0;
      &:nth-child(2n) {
        margin-left: 10px;
      }
      margin-bottom: 10px;
      .van-image {
        margin: 0 10px;
      }
      .right {
        p {
          font-size: 14px;
          margin: 0;
          padding: 0;
        }
      }
    }
  }
}
// 资讯
.information {
  display: flex;
  justify-content: space-between;
  h3 {
    font-size: 14px;
    margin: 10px;
  }
  span {
    font-size: 14px;
    margin: 10px;
    color: #666;
  }
}
.info-list > li {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid #ccc;
  img {
    width: 150px;
  }
  p {
    font-size: 16px;
    font-weight: 700;
  }
  .bottom {
    span {
      font-size: 12px;
      border: 1px solid #ccc;
      padding: 2px 8px;
      color: #666;
    }
  }
  .right {
    position: relative;
    margin-left: 10px;
    & > span {
      position: absolute;
      bottom: 0;
      right: 10px;
      font-size: 14px;
      color: #666;
    }
  }
}
</style>

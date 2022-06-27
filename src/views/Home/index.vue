<template>
  <div>
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
        <van-image width="60" height="60" round fit="cover" :src="item.src" />
        <div>{{ item.title }}</div>
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
        <div class="group-container">
          <van-image
            width="50"
            height="50"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
          <div class="right">
            <p>家住回龙观</p>
            <p>归属的感觉</p>
          </div>
        </div>
        <div class="group-container">
          <van-image
            width="50"
            height="50"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
          <div class="right">
            <p>家住回龙观</p>
            <p>归属的感觉</p>
          </div>
        </div>
        <div class="group-container">
          <van-image
            width="50"
            height="50"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
          <div class="right">
            <p>家住回龙观</p>
            <p>归属的感觉</p>
          </div>
        </div>
        <div class="group-container">
          <van-image
            width="50"
            height="50"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
          <div class="right">
            <p>家住回龙观</p>
            <p>归属的感觉</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 租房小组结束 -->
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'
import { getSwiperAPI, getCityAPI } from '@/api/home'
export default {
  async created () {
    this.getSwiperList()
  },
  data () {
    return {
      // 轮播图数据
      swiperImageList: [],
      // 导航数据
      navList: [
        { src: '/imgs/1.png', title: '整租' },
        { src: '/imgs/2.png', title: '合租' },
        { src: '/imgs/3.png', title: '地图找房' },
        { src: '/imgs/4.png', title: '去出租' }
      ],
      // 城市列表数据
      cityList: []
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
        const res = await getCityAPI()
        console.log(res)
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
  .van-image {
    padding: 10px 0;
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
</style>

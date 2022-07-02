<template>
  <div>
    <NavBar
      :title="houseInfoList.community ? houseInfoList.community + '' : ''"
      to="/favorites"
    ></NavBar>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#888">
      <van-swipe-item
        v-for="(image, index) in houseInfoList.houseImg"
        :key="index"
      >
        <img :src="'http://liufusong.top:8080' + image" />
      </van-swipe-item>
    </van-swipe>
    <!-- 标题 -->
    <div class="title">
      <h3>{{ houseInfoList.title }}</h3>
      <div class="tags-ft">
        <div
          class="tags"
          v-for="(item, index) in houseInfoList.tags"
          :key="index"
        >
          <span>{{ item }}</span>
        </div>
      </div>
      <div class="housedetails">
        <div class="left">
          <div class="price">
            <span>{{ houseInfoList.price }}</span
            >/月
          </div>
          <div class="txt">租金</div>
        </div>
        <div class="middle">
          <div class="top">{{ houseInfoList.roomType }}</div>
          <div class="txt">房型</div>
        </div>
        <div class="right">
          <div class="top">{{ houseInfoList.size }}平米</div>
          <div class="txt">面积</div>
        </div>
      </div>
      <div class="houseloft">
        <div class="top">
          <div>装修：<span>精装</span></div>
          <div>
            朝向：<span
              v-for="(item, index) in houseInfoList.oriented"
              :key="index"
              >{{ item }}</span
            >
          </div>
        </div>
        <div class="bottom">
          <div>
            楼层：<span>{{ houseInfoList.floor }}</span>
          </div>
          <div>类型：<span>普通住宅</span></div>
        </div>
      </div>
    </div>
    <!-- map加房屋配套 -->
    <div class="overview">
      <div class="title">小区：天山星城</div>
      <div id="map"></div>
      <div class="peitao"><h3>房屋配套</h3></div>
      <!-- 房屋配套 -->
      <van-grid
        :column-num="5"
        v-if="houseInfoList.supporting && houseInfoList.supporting.length !== 0"
      >
        <van-grid-item
          v-for="(item, index) in houseInfoList.supporting"
          :key="index"
          :text="item"
        >
          <template #icon>
            <i
              v-for="(item1, index) in iconList"
              :key="index"
              class="iconfont"
              :class="item === item1.name ? item1.icon : ''"
            ></i>
          </template>
        </van-grid-item>
      </van-grid>
      <div class="title-empty" v-else>暂无数据</div>
    </div>
    <!-- map加房屋配套 -->
    <!-- 房源概况 -->
    <div class="information">
      <h3>房源概况</h3>
      <div class="details">
        <div class="top">
          <div class="left">
            <van-image round src="http://liufusong.top:8080/img/avatar.png" />
            <div class="txt">
              <p>王女士</p>
              <i class="iconfont icon-renzheng"><i>已认证房主</i></i>
            </div>
          </div>
          <div class="right">
            <van-button plain type="primary" size="mini">发消息</van-button>
          </div>
        </div>
        <div class="bottom">
          {{
            houseInfoList.description && houseInfoList.description.length > 10
              ? houseInfoList.description
              : "1.周边配套齐全，地铁四号线陶然亭站，交通便利，公交云集，距离北京南站、西站都很近距离。2.小区规模大，配套全年，幼儿园，体育场，游泳馆，养老院，小学。3.人车分流，环境优美。4.精装两居室，居家生活方便，还有一个小书房，看房随时联系。"
          }}
        </div>
      </div>
    </div>
    <!-- 房源概况 -->
    <!-- 猜你喜欢 -->
    <div class="guessLove">
      <h3>猜你喜欢</h3>
      <HouseList
        v-for="(item, index) in list"
        :key="index"
        :list="item"
      ></HouseList>
    </div>
    <!-- 猜你喜欢 -->
    <div class="tabBar">
      <div class="collection" @click="collection">
        <i class="iconfont icon-shoucang" v-if="isCollection === false"></i
        ><img src="http://liufusong.top:8080/img/star.png" v-else />
        收藏
      </div>
      <div>在线咨询</div>
      <div class="phone">电话预约</div>
    </div>
  </div>
</template>

<script>
import NavBar from './NavBar.vue'
import { getHouseInformation, addFavorites, delFavorites, isFavorites } from '@/api/house'
import HouseList from './HouseList.vue'
export default {
  name: 'HouseDetails',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  created () {
    this.getHouseInformationList()
    this.isFavorite()
  },
  data () {
    return {
      houseInfoList: [],
      iconList: [
        { name: '衣柜', icon: 'icon-yigui' },
        { name: '洗衣机', icon: 'icon-xiyiji' },
        { name: '空调', icon: 'icon-kongdiao' },
        { name: '天然气', icon: 'icon-meiqitianranqi' },
        { name: '冰箱', icon: 'icon-bingxiang' },
        { name: '暖气', icon: 'icon-shuinuanqigongcheng' },
        { name: '电视', icon: 'icon-dianshi' },
        { name: '热水器', icon: 'icon-haofangtuo400iconfont2reshuiqi' },
        { name: '宽带', icon: 'icon-kuandai' },
        { name: '沙发', icon: 'icon-shafa' }
      ],
      list: [
        {
          houseImg: '/img/message/1.png',
          title: '安贞西里 3室1厅',
          tags: [
            '随时看房'
          ],
          price: 4500,
          desc: '三室/20/南/深圳海航城',
          houseCode: 'e91f10ff-3bae-1b4a'

        },
        {
          houseImg: '/img/message/2.png',
          title: '天居园 2室1厅',
          tags: [
            '近地铁'
          ],
          price: 7200,
          desc: '/81m²/南/低楼层',
          houseCode: '5cc491981439630e5b4c7f61'
        },
        {
          houseImg: '/img/message/3.png',
          title: '角门甲4号院 1室1厅',
          tags: [
            '集中供暖'
          ],
          price: 4300,
          desc: '52m²/西南/低楼层',
          houseCode: '5cc491981439630e5b4c7f61'
        }
      ],
      isCollection: false
    }
  },

  methods: {
    async getHouseInformationList () {
      try {
        const res = await getHouseInformation(this.id)
        this.houseInfoList = res.data.body
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    getMap () {
      const { BMapGL } = window
      const map = new BMapGL.Map('map')
      // 创建地图实例
      const point = new BMapGL.Point(this.houseInfoList.coord.longitude, this.houseInfoList.coord.latitude)
      // 创建点坐标
      map.centerAndZoom(point, 15)
      // 初始化地图，设置中心点坐标和地图级别
      map.centerAndZoom(new BMapGL.Point(this.houseInfoList.coord.longitude, this.houseInfoList.coord.latitude), 15)
      map.enableScrollWheelZoom(true)
      const opts = {
        position: new BMapGL.Point(this.houseInfoList.coord.longitude, this.houseInfoList.coord.latitude) // 指定文本标注所在的地理位置
        // offset: new BMapGL.Size(30, -30) // 设置文本偏移量
      }
      // 创建文本标注对象
      const label = new BMapGL.Label(this.houseInfoList.community, opts)
      // 自定义文本标注样式
      label.setStyle({
        color: '#fff',
        borderRadius: '5px',
        borderColor: '#ccc',
        padding: '10px',
        fontSize: '12px',
        height: '30px',
        lineHeight: '10px',
        fontFamily: '微软雅黑',
        background: '#ee5d5b'
      })
      // // 创建点标记
      // const marker1 = new BMapGL.Marker(new BMapGL.Point(this.houseInfoList.coord.longitude, this.houseInfoList.coord.latitude))
      // // 在地图上添加点标记
      // map.addOverlay(marker1)
      map.addOverlay(label)
    },
    async collection () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '加载中...'
      })
      const authorization = this.$store.state.token
      const id = this.id
      if (this.isCollection) {
        try {
          await delFavorites(authorization, id)
          this.isCollection = false
          this.$toast.success('删除收藏')
        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          await addFavorites(authorization, id)
          this.isCollection = true
          this.$toast.success('收藏成功')
        } catch (err) {
          console.log(err)
        }
      }
    },
    async isFavorite () {
      const authorization = this.$store.state.token
      const id = this.id
      try {
        const res = await isFavorites(authorization, id)
        console.log(res)
        this.isCollection = res.data.body.isFavorite
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {
    houseInfoList (newVal) {
      this.getMap()
    }
  },
  filters: {},
  components: { NavBar, HouseList },
  mounted () {
    document.querySelector('body').setAttribute('style', 'background-color:#f6f5f6')
  },
  beforeDestroy () {
    document.querySelector('body').removeAttribute('style')
  }

}
</script>

<style scoped lang='less'>
// 轮播图
.my-swipe .van-swipe-item {
  height: 252px;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  margin-top: 46px;
}
/deep/.van-swipe__indicator {
  background-color: #ccc;
}
// 标题
.title {
  padding: 15px;
  background-color: #fff;
  h3 {
    font-weight: 400;
    font-size: 16px;
    color: #333;
    margin-top: 16px;
  }
  .tags-ft {
    display: flex;
    align-items: center;
    padding-top: 10px;
    // line-height: 50px;
    // justify-content: space-around;
    .tags {
      &:nth-child(even) > span {
        background-color: #e1f5ed;
        color: #3fc28c;
      }
      flex: 1;
      span {
        font-size: 12px;
        border-radius: 3px;
        padding: 4px 5px;
        margin-right: 5px;
        line-height: 12px;
        color: #39becd;
        background: #e1f5f8;
      }
    }
  }
}
// 房子细节
.housedetails {
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #cecece;
  border-bottom: 1px solid #cecece;
  margin: 15px 0;
  padding: 15px 0;
  .txt {
    font-size: 14px;
    color: #999;
    text-align: center;
  }
  .left {
    .price {
      font-size: 12px;
      font-weight: 400;
      color: #fa5741;
      text-align: center;
      span {
        color: #fa5741;
        font-size: 18px;
        font-weight: bolder;
      }
    }
  }
  .middle,
  .right {
    .top {
      font-size: 18px;
      font-weight: bolder;
      color: #fa5741;
      text-align: center;
    }
  }
}

// 楼层
.houseloft {
  .top,
  .bottom {
    display: flex;
    margin-bottom: 5px;
    div {
      flex: 1;
      color: #999;
      font-size: 13px;
      span {
        color: #333;
        margin-right: 5px;
      }
    }
  }
}
.overview {
  margin-top: 10px;
  background-color: #fff;
  #map {
    height: 150px;
    width: 100%;
  }
  .title {
    font-size: 14px;
    color: #333;
  }
  .peitao {
    h3 {
      padding: 15px 0;
      margin: 0 10px;
      font-size: 15px;
      border-bottom: 1px solid #cecece;
    }
  }
}
// 房屋配套
/deep/.van-grid-item__text {
  color: #333;
  font-size: 14px;
}
.iconfont {
  font-size: 24px;
}
.icon-shafa {
  font-weight: 600;
}
.title-empty {
  font-size: 14px;
  padding-left: 10px;
}
// 房源概况
.information {
  margin: 10px 0;
  background-color: #fff;
  padding: 0 10px;
  h3 {
    padding: 15px 0;
    font-size: 15px;
    border-bottom: 1px solid #cecece;
  }
  .details {
    .top {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
      overflow: visible;
      .left {
        display: flex;
        align-items: center;
        .van-image {
          width: 52px;
          height: 52px;
          margin-right: 10px;
        }
        .txt {
          font-size: 14px;
          color: #333;
          .iconfont {
            font-size: 12px;
            color: #fa5741;
            i {
              margin-left: 3px;
            }
          }
        }
      }
      .right {
        padding-right: 10px;
        padding-top: 10px;
        /deep/.van-button {
          font-size: 14px;
          padding: 3px 10px;
        }
      }
    }
    .bottom {
      font-size: 14px;
      color: #333;
      padding-bottom: 10px;
    }
  }
}
// 猜你喜欢
.guessLove {
  background-color: #fff;
  margin-bottom: 50px;
  h3 {
    padding: 15px 0;
    margin: 0 10px;
    font-size: 15px;
    border-bottom: 1px solid #cecece;
  }
}
.tabBar {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 50px;
  background-color: #fff;
  border-top: 1px solid #e8e8e9;
  div {
    flex: 1;
    border-right: 1px solid #e8e8e9;
    text-align: center;
    font-size: 17px;
    color: #999;
    line-height: 50px;
  }
  .collection {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 16px;
      height: 16px;
    }
    .iconfont {
      font-size: 17px;
    }
  }
  .phone {
    background-color: #21b97a;
    color: #fff;
  }
}
</style>
